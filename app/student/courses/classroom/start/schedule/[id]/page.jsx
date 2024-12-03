"use client";
import React, { useState } from "react"; // Import useState
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "../../../../../components/Sidebar";
import DashboardNav from "../../../../../components/DashboardNav";

const Page = () => {
  const params = useParams()
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev); // Toggle checkbox state
  };

  return (
    <div className="flex w-full">
      <Sidebar params={params.id} />
      <div className="ml-60 w-full">
        <div className="bg-white w-full h-[128px]">
          <DashboardNav params={params.id} />
        </div>

        <motion.div
          className="p-8"
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
          <div className="flex justify-center items-center flex-row gap-[24px] mt-4">
            {[
              {
                title: "Networking Essentials (NCC 311)",
                time: "10:30 AM",
                startsIn: "45 mins",
                date: "Wed Feb 15",
                lecturerName: "Dr Ajibade Solomon",
              },
            ].map((lecture, index) => (
              <div className="flex flex-col" key={index}>
                <p className="text-black font-bold text-[32px] justify-center w-[516px]">
                  {lecture.title}
                </p>

                <div className="bg-[#E7E7E7] w-[516px] h-[82px] gap-10 mt-10 p-4 items-center justify-center flex">
                  <p className="text-black font-normal text-[16px]">
                    Please click the button below to join the class.
                  </p>
                  <Image
                    src="/assets/zoom.png"
                    className="w-[57.57px] h-[50px]"
                    width={57.57}
                    height={50}
                    alt="zoom"
                  />
                </div>

                {/* Button with conditional styles */}
                <button
                  className={`flex flex-row gap-3 items-center text-[24px] font-normal mt-[40px] p-2 rounded-full justify-center h-[56px] w-full ${
                    isChecked
                      ? "bg-[#E4E4E4] cursor-not-allowed"
                      : "bg-primary text-white"
                  }`}
                  disabled={isChecked} // Disable the button when checked
                >
                  Join
                </button>

                <div className="justify-center flex flex-row mt-10 items-center gap-[80px]">
                  <div className="flex flex-col">
                    <p className="text-black font-normal text-[24px]">
                      Mark Attendance
                    </p>
                    <p className="text-[#BC0B0B] font-normal text-[12px]">
                      Click the check box to mark your attendance.
                    </p>
                  </div>

                  {/* Checkbox to toggle button state */}
                  <input
                    type="checkbox"
                    className="w-[30px] h-[30px] border-[2px] border-gray-50"
                    onChange={handleCheckboxChange} // Handle checkbox changes
                    checked={isChecked} // Sync state with checkbox
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
