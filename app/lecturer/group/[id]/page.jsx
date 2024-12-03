"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import DashboardNav from "../../../../components/DashboardNav";
import Image from "next/image";

const page = () => {
  const [filter, setFilter] = useState("all"); // filter state
  const router = useRouter();
  const params = useParams();

  const handleNavAssignment = () => {
    router.push(`/lecturer/group/assignment/${params.id}`);
  }
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
          <div className="text-center flex flex-col justify-center ">
            <p className="text-black font-bold text-[28px]">Create group</p>
            <div className="flex justify-between flex-row items-center mt-5 px-8">
              <div className="flex">
                <p className="text-primary font-semibold text-[20px]">
                  Cyber Security Group
                </p>
              </div>

              <div className="flex bg-white items-center gap-1 cursor-pointer border-black border p-3 mt-5 rounded-sm h-[37px] w-[118px] mr-5">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="text-black font-medium text-[16px] bg-white w-full max-w-3xl"
                >
                  <option value="all">All</option>
                  <option value="hnd1">HND 1</option>
                  <option value="hnd2">HND 2</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-10 px-8 flex w-full gap-7">
            <div className="flex gap-20">
              <div className="flex flex-col ">
                {/* Course Image */}
                <Image
                  src="/assets/cyss311.png"
                  alt="(COM301) Introduction to Cyber Security"
                  width={530}
                  height={304}
                  className="rounded w-[530px] h-[304px]"
                />

                {/* Course Title */}
                <p className="text-black text-[24px] font-bold mt-5 w-[530px]">
                  (CYS301) Application Security to Cyber Security
                </p>
              </div>

              <div className="flex flex-col gap-8 ">
                <div onClick={handleNavAssignment} className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2">
                  <Image
                    src="/assets/add-black.png"
                    width={20}
                    height={20}
                    alt="add"
                  />
                  <p className="text-black text-[14px] font-medium">
                    Assignment Group
                  </p>
                </div>

                <div className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2">
                  <Image
                    src="/assets/add-black.png"
                    width={20}
                    height={20}
                    alt="add"
                  />
                  <p className="text-black text-[14px] font-medium">
                    Project Group
                  </p>
                </div>
                
                <div className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2">
                  <Image
                    src="/assets/add-black.png"
                    width={20}
                    height={20}
                    alt="add"
                  />
                  <p className="text-black text-[14px] font-medium">
                    Presentation Group
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default page;
