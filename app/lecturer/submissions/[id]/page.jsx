"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import DashboardNav from "../../../../components/DashboardNav";
import Sidebar from "../../../../components/Sidebar";
import { GetApi } from "../../../../utils/Actions";

const studentsData = [
  {
    id: 1,
    regNo: "CYS/HND/F22/3280",
    name: "Ojo Oyewole",
    status: "submitted",
    time: "23 mins",
    hasDocument: true,
  },
  {
    id: 2,
    regNo: "CYS/HND/F22/3281",
    name: "Samuel Oladipo",
    status: "pending",
    time: "45 mins",
    hasDocument: false,
  },
  {
    id: 3,
    regNo: "CYS/HND/F22/3282",
    name: "Amaka Uche",
    status: "submitted",
    time: "12 mins",
    hasDocument: true,
  },
  {
    id: 4,
    regNo: "CYS/HND/F22/3283",
    name: "Fatima Bello",
    status: "pending",
    time: "30 mins",
    hasDocument: false,
  },
];

const Page = (props) => {
  const [filter, setFilter] = useState("all"); // filter state
  const params = useParams();

  // Function to handle filtering logic
  const filteredStudents = studentsData.filter((student) => {
    if (filter === "all") return true;
    return student.status === filter;
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
          {/* Course Content Header */}
          <h1 className="text-3xl font-bold text-center mb-6">Submission</h1>

          <div className="flex flex-row justify-between">
            <p className="text-primary font-semibold text-[28px]">
              Cyber Security Assignment -1
            </p>

            {/* Filter Dropdown */}
            <div className="flex bg-white items-center gap-1 cursor-pointer border-black border p-3 mt-5 rounded-sm h-[37px] w-[118px]">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-black font-medium text-[16px] bg-white"
              >
                <option value="all">All</option>
                <option value="submitted">Submitted</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Display Filtered Students */}
          <div className="gap-3">
            {filteredStudents.map((student) => (
              <div
                className="flex flex-row justify-between mt-10"
                key={student.id}
              >
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/assets/images/user.png"
                    width={20}
                    height={20}
                    className="w-[50px] h-[50px] rounded-full"
                    alt="profile"
                  />
                  <div className="flex flex-col ">
                    <p className="font-semibold text-black text-[18px]">
                      {student.regNo}
                    </p>
                    <p className="font-normal text-black text-[16px]">
                      {student.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-20">
                  {/* Status Container with Fixed Width */}
                  <div className="flex flex-row items-center gap-2 w-[120px]">
                    <p className="font-medium text-black text-[14px]">
                      {student.status === "submitted" ? "Submitted" : "Pending"}
                    </p>
                    <Image
                      src={
                        student.status === "submitted"
                          ? "/assets/success-icon.png"
                          : "/assets/pending2.png"
                      }
                      width={20}
                      height={20}
                      className="w-[20px] h-[20px]"
                      alt={student.status}
                    />
                  </div>

                  {/* Document Container with Fixed Width */}
                  <div className="flex flex-row items-center gap-2 w-[160px]">
                    <p className="font-medium text-black text-[14px]">
                      {student.hasDocument
                        ? "Document Attached"
                        : "No Document"}
                    </p>
                    <Image
                      src={
                        student.hasDocument
                          ? "/assets/pdf.png"
                          : "/assets/settings-icon.png"
                      }
                      width={20}
                      height={20}
                      className="w-[20px] h-[20px]"
                      alt="document status"
                    />
                  </div>

                  <p className="font-medium text-black text-[14px]">
                    {student.time}
                  </p>
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
