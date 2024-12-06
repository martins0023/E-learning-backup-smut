"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardNav from "../../../components/DashboardNav";
import Sidebar from "../../../components/Sidebar";
import { useRouter, useParams } from "next/navigation";

const Page = () => {
  const [filter, setFilter] = useState("all"); // filter state
  const router = useRouter();
  const params = useParams();

  const submissionType = [
    {
      id: 1,
      submissionName: "Individual Submission",
      type: `/student/submissions/assignment/individual/${params.id}`,
    },
    {
      id: 2,
      submissionName: "Group Submission",
      type: `/student/submissions/assignment/group/${params.id}`,
    },
    {
      id: 3,
      submissionName: "Submission Status",
      type: `/student/submissions/assignment/status/${params.id}`,
    },
  ];

  const navigateToAddr = (type) => {
    if (type) {
      router.push(type);
    }
  };

  return (
    <div className="flex w-full">
      <Sidebar params={params.id} />
      <div className="ml-60 w-full">
        <div className="bg-white w-full h-[128px]">
          <DashboardNav params={params.id} />
        </div>

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
            {submissionType.map((submitType) => (
              <div
                key={submitType.id}
                className="bg-[#F9F9F9] w-[311px] h-[163px] border-[0.5px] rounded-md border-primary cursor-pointer"
                onClick={() => navigateToAddr(submitType.type)}
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
