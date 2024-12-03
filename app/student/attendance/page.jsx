"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../components/DashboardNav";
import Sidebar from "../components/Sidebar";

const coursesData = [
  {
    id: 1,
    regNo: "CS/HND2/F22/3280",
    courseName: "(CYS 311) Introduction to Security and  Policy Development",
    status: "submitted",
    attendance: 23,
    addedTime: "RECENT",
    hasDocument: true,
  },
  {
    id: 2,
    regNo: "CS/HND1/F22/3281",
    courseName: "(NCC 311) Networking Essentials",
    status: "pending",
    attendance: 45,
    addedTime: "NEWEST",
    hasDocument: false,
  },
  {
    id: 3,
    regNo: "CS/HND2/F22/3282",
    courseName: "(CYS312) Operating Systems Security",
    status: "submitted",
    attendance: 12,
    addedTime: "OLDEST",
    hasDocument: true,
  },
  {
    id: 4,
    regNo: "CS/HND1/F22/3283",
    courseName: "(CYS 313) Cyber Diplomacy and International Cooperation",
    status: "pending",
    attendance: 30,
    addedTime: "NEWEST",
    hasDocument: false,
  },
];

const page = () => {
  const [filter, setFilter] = useState("all"); // filter state

  // Function to handle filtering logic
  const filteredStudents = coursesData.filter((student) => {
    if (filter === "all") return true;
    return student.addedTime === filter;
  });
  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-60 w-full">
        {/* Dashboard Navigation */}
        <div className="bg-white w-full h-[128px]">
          <DashboardNav />
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
          {/* Course Content Header */}
          <div className="flex flex-end justify-end">
            <div className="flex items-center bg-white gap-1 cursor-pointer border-black border p-3 mt-5 rounded-sm h-[37px] w-[118px]">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-black font-medium text-[16px] bg-white"
              >
                <option className="text-black font-semibold" value="NEWEST">
                  Newest
                </option>
                <option className="text-black font-semibold" value="OLDEST">
                  OLDEST
                </option>
                <option className="text-black font-semibold" value="RECENT">
                  RECENT
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/assets/activity.png"
                width={20}
                height={20}
                className="w-[25px] h-[25px] rounded-full"
                alt="profile"
              />
              <p className="text-black font-semibold text-[20px]">Attendance</p>
            </div>

            {/* Filter Dropdown */}
            <div className="flex flex-row items-center justify-items-center gap-20">
              <p className="text-primary font-semibold text-[32px] mt-3">
                Total percentage{" "}
                <span className="font-bold"> {coursesData.length} %</span>
              </p>
            </div>
          </div>

          {/* Display Filtered Students */}
          <div className="gap-[30px]">
            {filteredStudents.map((student) => (
              <div className="bg-outline border-[1px] p-3 mt-5 gap-8 border-[#00000046]">
                <div
                  className="flex flex-row justify-between"
                  key={student.id}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-col ">
                      <p className="font-bold text-black text-[20px]">
                        {student.courseName}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-20">
                    {/* Document Container with Fixed Width */}
                    <div className="flex flex-col items-center gap-2 w-full">
                      <p className="font-medium text-black text-[14px]">
                        {student.attendance}% {` `}
                      </p>
                      <div className="w-24 bg-gray-200 h-[4px] mt-2">
                        <div
                          className="bg-primary h-[4px]"
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default page;
