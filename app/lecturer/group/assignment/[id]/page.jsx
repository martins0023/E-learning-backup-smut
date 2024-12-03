"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Sidebar from "../../../../../components/Sidebar";
import DashboardNav from "../../../../../components/DashboardNav";
import { useRouter, useParams } from "next/navigation";

const page = () => {
  const [filter, setFilter] = useState("all"); // filter state
  const router = useRouter();
  const params = useParams();

  const handleNav = () => {
    router.push(`/lecturer/group/groups/${params.id}`);
  }

  const handleBack = () => {
    router.push(`/lecturer/group/${params.id}`);
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
                  className="text-black font-medium text-[16px] bg-white"
                >
                  <option value="all">All</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
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
                <select className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2">
                  
                    <option id="1">1</option>
                    <option id="2">2</option>
                    <option id="3">3</option>
                </select>

                <select className="flex justify-center items-center border max-w-7xl border-black w-[600px] h-[56px] cursor-pointer gap-2">
                    <option id="text" className="text-[#A9A9A9] font-normal">select number of students in a group</option>
                    <option id="1">1</option>
                    <option id="2">2</option>
                    <option id="3">3</option>
                </select>

                <div className="flex justify-center flex-row items-center gap-5">
                  <button onClick={handleBack} className="h-[48px] w-full bg-white border-[1px] border-primary text-primary rounded-full">
                    Cancel
                  </button>
                  <button onClick={handleNav} className="h-[48px] w-full bg-primary text-white rounded-full">
                    Continue
                  </button>
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
