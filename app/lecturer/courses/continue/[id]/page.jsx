"use client";
import { useRouter, useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Sidebar from "../../../../../components/Sidebar";
import DashboardNav from "../../../../../components/DashboardNav";
import DynamicTextEditor from "../../../../../components/Forms/DynamicTextEditor";
import { useState, useEffect } from "react";
import { PreviousBtn, ContinueBtn} from "../../../../../components/Forms/Btn"

import Image from "next/image";
import { TextArea } from "../../../../../components/Forms/Input";
import {GetApi, usePutFormApi } from "../../../../../utils/Actions";

const ContinueCourse = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const CourseId = searchParams.get("courseId")

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState({})
  
  const [value, setValue] = useState({
    desc: "",
    subtitle: ""
  });

  useEffect(() => {
    const fetchCourse = async() =>{
      try {
        try {
          setLoading(true);
          const response = await GetApi(`api/course/${CourseId}`);
          if (response.success) {
            setData(response.data);
            setValue({desc: response.data?.desc, subtitle: response.data.subtitle})
          } else {
            setErrorMsg(response.message);
            return setData({});
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
  const handleContinue = async() => {

    // if(data.progress && data.progress >= 10) {
    //   return router.push(`/lecturer/courses/continue/requirements/${params.id}`);
    // } else {
      
    // }

    if (!value.subtitle || value.desc.length < 200) return alert( "Please ensure the subtitle is filled and the course description has at least 200 words.");

    try {
      const formData = new FormData();
      formData.append("desc", value.desc);
      formData.append("subtitle", value.subtitle);
      data.progress && data.progress >= 20? formData.append("progress", data.progress)  : formData.append("progress", 20);
      


      setLoading(true);
      const response = await usePutFormApi(`api/course/${CourseId}`, formData);
      if (response.success) {
        setErrorMsg("");
        router.push(`/lecturer/courses/continue/requirements/${params.id}?courseId=${response.data._id}`);

      } else {
        setErrorMsg(response.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }


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

        <div className="flex flex-col items-center w-full mt-8">
          <p className="text-black font-bold text-[32px]">
            What will students learn in your course?
          </p>
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-center mt-8">
          <div className="flex flex-col">
            <label className="text-black text-[20px] font-bold mb-2">
              Course subtitle
            </label>
            <TextArea name="subtitle" value={value.subtitle} placeholder="e.g. Define ... , Identify ...." handleTextarea={(e) => setValue({...value, subtitle: e.target.value})} />
            <p className="text-gray-500 mt-2 text-[14px] font-normal">
              Your title should be a mix of attention-grabbing, informative
              content. It should have a minimum of 80 words.
            </p>
            <div className="flex flex-row items-center">
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
          </div>

          <div className="mt-6 ">
            <div className="flex flex-col w-[920px]">
              <label className="text-black text-[20px] font-bold mb-2">
                Course description
              </label>
              <DynamicTextEditor value={value.desc} handleDes={(e) => setValue({...value, desc: e})} />
            </div>
          </div>
          <div className="items-start">
            <p className="text-gray-500 text-[14px]">
              Description should have a minimum of 200 words.
            </p>
          </div>
            {/* THIS DISPLAY THE ERROR MESSAGE */}
            <div className="text-red-700 text-center font-bold">{errorMsg}</div>
          {/* Bottom Buttons */}
          <div className="flex flex-row justify-between mt-8 mb-10 gap-[370px]">
            <div>
              <PreviousBtn handleClick={() => router.back()} label="Previous" />
            </div>
            <div>
              <ContinueBtn handleClick={handleContinue} label="Continue" loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueCourse;
