"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import DashboardNav from "../../components/DashboardNav";
import { useRouter, useParams } from "next/navigation";

const studentGroup = [
    {
      id: 1,
      studentName: "Ojo Oyewole",
      studentMatric: "CS/HND/F22/3260",
      image: "/assets/images/user.png"
    },
    {
      id: 2,
      studentName: "Sarah Bouchard",
      studentMatric: "CS/HND/F22/3260",
      image: "/assets/images/user.png"
    },
    {
      id: 3,
      studentName: "Miracle Abidemi",
      studentMatric: "CS/HND/F22/3260",
      image: "/assets/images/user.png"
    },
  ];

const page = () => {
  const [filter, setFilter] = useState("all"); // filter state
  //const studentTotal = length(studentGroup);

  //
  const params = useParams();
  const filteredSubmits = studentGroup.filter((student) => {
    if (filter === "all") return true;
    return false;
  });
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

        {/* Content */}
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
          <div className="flex flex-row gap-[40px]">
            <div className="flex flex-col w-[641px]">
              <h1 className="text-[32px] font-semibold mb-4">
                Cyber Security Group Assignment
              </h1>
              <div className="text-primary text-[16px] mb-6">
                <p className="text-[16px]">Group A</p>
                <div className="flex flex-row gap-2 items-center mt-3">
                  <Image
                    src="/assets/time-red.png"
                    width={20}
                    height={20}
                    className="w-[24px] h-[24px] "
                    alt="time"
                  />
                  <p className="text-[16px]">To be submitted at 10:00 AM</p>
                </div>
                <div className="flex flex-row gap-2 items-center mt-2">
                  <Image
                    src="/assets/calendar.png"
                    width={20}
                    height={20}
                    className="w-[24px] h-[24px] "
                    alt="time"
                  />
                  <p className="text-[16px]">Mon SEP 14</p>
                </div>

                <div className="bg-[#F2F2F2] w-[641px] p-3 mt-3">
                <h2 className="text-[20px] font-bold  text-black">Assignment</h2>
                <ul className="list-disc text-[16px] mt-2">
                <p className="text-black"> Q1. enim ad minim veniam, quis nostrud exeration ullamco laboris nisi ut aliquip ex ea commod.</p>
                    <div className="flex flex-row gap-2 items-center">
                      <Image
                        src="/assets/check.png"
                        width={14}
                        height={14}
                        className="w-[14px] h-[14px]"
                        alt="add"
                      />
                      <p className="text-black"> Ut enim ad minim veniam, quis nostrud exeration ullamco laboris nisi ut aliquip ex ea commod.</p>
                    </div>
                </ul>
                <p className="text-[14px] font-bold text-black">show more</p>
              </div>
              </div>

              
            </div>

            <div className="bg-outline border-black border-[1px] w-[424px] p-5">
              <p className="text-primary font-bold text-[16px]">Group A (3)</p>
              <div className=" mt-5">
                {filteredSubmits.map((students) => (
                  <div className="flex mt-3 flex-row gap-3 items-center">
                    <Image
                      src={students.image}
                      width={60}
                      height={60}
                      className="w-[60px] h-[60px] rounded-full"
                      alt="profile"
                    />
                    <div className="flex flex-col">
                    <p className="font-semibold text-[20px]">{students.studentName}</p>
                    <p className="font-normal text-[14px]">{students.studentMatric}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default page