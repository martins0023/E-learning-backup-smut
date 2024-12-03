"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../../../../components/DashboardNav";
import Sidebar from "../../../../components/Sidebar";
import { useRouter, useParams } from "next/navigation";

const courseActivitysData = [
  {
    id: 1,
    courseName: "Design and implementation of IDS ",
    activityType: "Assignment 1",
    time: "23 mins ago",
    timedate: "02 July 2024 02:34 Pm",
    hasDocument: true,
    submittedPeople: 34,
    pendingPeople: 17,
    duration: "new",
    documents: [
      {
        id: 1,
        name: "Assignment 1.pdf",
        url: "/assets/assignment1.pdf",
        img: "/assets/pdf.png",
      },
      {
        id: 2,
        name: "Lecture Notes.pdf",
        url: "/assets/lecture_notes.pdf",
        img: "/assets/doc.png",
      },
    ],
  },
  {
    id: 2,
    courseName: "UFC firewall implementation",
    activityType: "Quiz 1",
    time: "45 mins",
    hasDocument: true,
    submittedPeople: 40,
    pendingPeople: 5,
    timedate: "02 July 2024 02:34 Pm",
    duration: "new",
    documents: [
      {
        id: 1,
        name: "Assignment 1.pdf",
        url: "/assets/assignment1.pdf",
        img: "/assets/pdf.png",
      },
      {
        id: 2,
        name: "Lecture Notes.pdf",
        url: "/assets/lecture_notes.pdf",
        img: "/assets/pdf.png",
      },
    ],
  },
  {
    id: 3,
    courseName: "Ubuntu live server on Digital ocean",
    activityType: "Quiz 2",
    time: "12 mins",
    hasDocument: true,
    submittedPeople: 20,
    timedate: "02 July 2024 02:34 Pm",
    pendingPeople: 10,
    duration: "old",
    documents: [
      {
        id: 1,
        name: "Assignment 1.pdf",
        url: "/assets/assignment1.pdf",
        img: "/assets/doc.png",
      },
      {
        id: 2,
        name: "Lecture Notes.pdf",
        url: "/assets/lecture_notes.pdf",
        img: "/assets/doc.png",
      },
    ],
  },
  {
    id: 4,
    courseName: "Convert IPV4 TO IPV6 deployed on AWS",
    activityType: "Assignment 2",
    time: "30 mins",
    hasDocument: true,
    timedate: "02 July 2024 02:34 Pm",
    submittedPeople: 30,
    pendingPeople: 16,
    duration: "old",
    documents: [
      {
        id: 1,
        name: "Assignment 1.pdf",
        url: "/assets/assignment1.pdf",
        img: "/assets/doc.png",
      },
      {
        id: 2,
        name: "Lecture Notes.pdf",
        url: "/assets/lecture_notes.pdf",
        img: "/assets/pdf.png",
      },
    ],
  },
];

const page = () => {
  const [filter, setFilter] = useState("all"); // filter state
  const params = useParams();

  // Function to handle filtering logic
  const filteredStudents = courseActivitysData.filter((courseActivity) => {
    if (filter === "all") return true;
    return courseActivity.duration === filter;
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
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 items-center p-3">
              <Image
                src="/assets/activity.png"
                width={20}
                height={20}
                className="w-[25px] h-[25px] rounded-full"
                alt="profile"
              />
              <p className="text-black font-semibold text-[20px]">
                Submission Status
              </p>
            </div>
            <div className="flex justify-end">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-black font-medium text-[16px] bg-white border p-4 rounded-sm w-[154px]"
              >
                <option value="NEWEST">Newest</option>
                <option value="OLDEST">Oldest</option>
                <option value="RECENT">Recent</option>
              </select>
            </div>
          </div>
          <div className="gap-3">
            {filteredStudents.map((courseActivity) => (
              <div
                className="flex flex-row justify-between mt-10"
                key={courseActivity.id}
              >
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/assets/icon1.png"
                    width={20}
                    height={20}
                    className="w-[50px] h-[50px] rounded-full"
                    alt="profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-black text-[16px]">
                      {courseActivity.courseName}
                    </p>
                    <p className="text-black font-normal text-[12px]">
                      {courseActivity.timedate}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-10">
                  {/* Status Container with Fixed Width */}
                  <div className="flex flex-row items-center gap-2 w-[120px]">
                    <Image
                      src="/assets/success-icon.png"
                      width={20}
                      height={20}
                      className="w-[20px] h-[20px]"
                      alt={courseActivity.duration}
                    />
                    <p className="font-medium text-black text-[14px]">
                      submitted
                    </p>
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
