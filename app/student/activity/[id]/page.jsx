"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../../components/DashboardNav";
import Sidebar from "../../components/Sidebar";
import coursesData from "../../data/courses";
import { useRouter, useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const [filter, setFilter] = useState("all"); // filter state
  const router = useRouter();

  const navigateToDetails = (id) => {
    router.push(`/student/courses/${id}`); // Navigate to dynamic page
  };

  // Function to handle filtering logic
  const filteredStudents = coursesData.filter((student) => {
    if (filter === "all") return true;
    return student.addedTime === filter;
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
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 items-center bg-black p-3 h-[37px]">
              <Image
                src="/assets/activity.png"
                width={20}
                height={20}
                className="w-[25px] h-[25px] rounded-full"
                alt="profile"
              />
              <p className="text-white font-semibold text-[20px]">Activity</p>
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

          <div className="grid grid-cols-2 gap-[30px] mt-5">
            {filteredStudents.map((course) => (
              <div
                key={course.id}
                className="bg-[#F9F9F9] w-[] h-[163px] border-[0.5px] rounded-md border-primary cursor-pointer"
                onClick={() => navigateToDetails(course.id)}
              >
                <div className="flex items-center gap-3 p-4">
                  <div>
                    <p className="font-bold text-primary text-[20px]">
                      {course.courseName}
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
