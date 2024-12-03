"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi"; // For the 'x-cancel' icon
import Sidebar from "../../../../../../components/Sidebar";
import DashboardNav from "../../../../../../components/DashboardNav";
import Image from "next/image";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { ContinueBtn, PreviousBtn } from "../../../../../../components/Forms/Btn";
import {  GetApi, usePutApi } from "../../../../../../utils/Actions";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const CourseId = searchParams.get("courseId")

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState({})

  const [responses, setResponses] = useState([""]); // State to store the added responses


  
  useEffect(() => {
    const fetchCourse = async() =>{
      try {
        try {
          setLoading(true);
          const response = await GetApi(`api/course/${CourseId}`);
          if (response.success) {
            setData(response.data);
            setResponses(response.data.prerequisites);
          } else {
            setData({});
            setErrorMsg(response.message);
          }
        } catch (err) {
          setErrorMsg(err.message);
        } finally {
          setLoading(false);
        }
      } catch (e) {

      }
    }

    fetchCourse()
  }, [])

  // Function to handle "Continue" button click
  const handleContinue = async () => {
    if(responses.length > 0) {
      try {
        // const formData = new FormData();
        // formData.append("prerequisites", JSON.stringify(responses));
        // formData.append("progress", 10);
  
        setLoading(true);
        const body = {
          prerequisites: responses,

        }

        const response = await usePutApi(`api/course/${CourseId}`, {prerequisites: responses, progress: data.progress && data.progress >= 40 ? data.progress : 40});
        if (response.success) {
          setErrorMsg("");
          router.push(`/lecturer/courses/continue/course-content/${params.id}?courseId=${response.data._id}`)
  
        } else {
          setErrorMsg(response.message);
        }
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
      // return router.push(`/lecturer/courses/continue/course-content/${params.id}?courseId=${response.data._id}`);
    };
  }

  // Use useEffect to wait for router.query to be populated
  useEffect(() => {
    if (router.query && router.query.id) {
      setId(router.query.id); // Set the course ID once it's available
    }
  }, [router.query]);

  // Function to handle adding a new response
  const handleAddResponse = () => {
    setResponses([...responses, ""]); // Add an empty string to represent a new input field
  };

  // Function to handle updating the value of a specific response
  const handleResponseChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  // Function to remove a specific response
  const handleRemoveResponse = (index) => {
    const updatedResponses = responses.filter((_, i) => i !== index);
    setResponses(updatedResponses);
  };

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <Sidebar params={params.id} />

      {/* Main Content */}
      <div className="ml-60 w-full">
        {/* Dashboard Navigation */}
        <div className="bg-white w-full h-[128px]">
          <DashboardNav params={params.id} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotate: 30 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            type: "spring",
            stiffness: 300,
          }}
        >
          <div className="flex flex-col items-center w-full mt-8">
            <p className="text-black text-center font-bold text-[32px] w-[920px]">
              What are the requirements or prerequisites for taking your course?
            </p>
          </div>

          {/* Form Section */}
          <div className="">
            <div className="flex flex-col items-center w-full mt-6 px-6">
              {/* Loop through each response and display input field */}
              {responses.map((response, index) => (
                <div
                  key={index}
                  className="w-[700px] relative flex flex-start flex-col items-center mb-4"
                >
                  <input
                    type="text"
                    className="border border-black w-full h-[50px] p-2 text-black"
                    placeholder={`Add response ${index + 1}`}
                    value={response}
                    onChange={(e) =>
                      handleResponseChange(index, e.target.value)
                    }
                  />

                  {/* Cancel button to remove the input */}
                  <button
                    className="absolute right-2 top-2 text-gray-500 hover:text-red-600"
                    onClick={() => handleRemoveResponse(index)}
                  >
                    <FiX size={20} />
                  </button>
                </div>
              ))}
            </div>
            {/* Add more responses button */}
            <div
              onClick={handleAddResponse}
              className="flex flex-row items-center mt-1 cursor-pointer ml-[330px]"
            >
              <Image
                src="/assets/add-black.png"
                width={18}
                height={18}
                className="w-[18px] h-[18px]"
                alt="add more"
              />
              <p className="text-black font-bold text-[14px]">
                Add more to your response
              </p>
            </div>

            {/* Bottom Buttons */}
            <div className="flex items-center justify-items-center w-full gap-[195px] mt-12 ml-[335px]">
              <PreviousBtn handleClick={() => router.back()} label="Previous" />
              <ContinueBtn handleClick={handleContinue} label="Continue" loading={loading} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default page;
