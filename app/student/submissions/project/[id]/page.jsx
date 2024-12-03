"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardNav from "../../../components/DashboardNav";
import Sidebar from "../../../components/Sidebar";
import { useRouter, useParams } from "next/navigation";

const submissionType = [
  {
    id: 1,
    submissionName: "Individual Project Submission",
    type: "/student/submissions/project/individual",
  },
  {
    id: 2,
    submissionName: "Group Project Submission",
    type: "/student/submissions/project/group",
  },
  {
    id: 3,
    submissionName: "Project Submission Status",
    type: "/student/submissions/project/status",
  },
];

const Page = () => {
  const params = useParams();
  const [filter, setFilter] = useState("all"); // filter state
  const router = useRouter();

  // Function to handle filtering logic
  const filteredSubmits = submissionType.filter((student) => {
    if (filter === "all") return true;
    return false;
  });

  // Function to navigate to the specific URL
  const navigateToAddr = (type) => {
    router.push(type); // Navigate to the provided type URL
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

        {/* Content */}
        <motion.div
          className="p-8 flex"
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
          <div className="grid grid-cols-3 gap-[32px] mt-5">
            {filteredSubmits.map((submitType) => (
              <div
                key={submitType.id}
                className="bg-[#F9F9F9] w-[311px] h-[163px] border-[0.5px] rounded-md border-primary cursor-pointer"
                onClick={() => navigateToAddr(submitType.type)} // Pass the type as an argument
              >
                <div className="flex items-center gap-3 p-4">
                  <div className="items-center flex">
                    <p className="font-bold text-primary text-[20px]">
                      {submitType.submissionName}
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

export default Page;
