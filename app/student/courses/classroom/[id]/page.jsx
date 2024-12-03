"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../../../components/DashboardNav";
import Sidebar from "../../../components/Sidebar";

const page = () => {
  const router = useRouter();

  const navigateToStart = (id) => {
    router.push(`/student/courses/classroom/${id}/start`); // Navigate to dynamic page
  };
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="ml-60 w-full">
        <div className="bg-white w-full h-[128px]">
          <DashboardNav />
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
          <div className="w-full">
            <div>
              <div className="mb-8">
                <div className="flex flex-row justify-between">
                  {/* row 1 */}
                  <div className="flex flex-col gap-[43px] ml-3">
                    {/* schedule section */} {/* col 1 */}
                    <div className="flex flex-row gap-[24px] mt-4">
                      {[
                        {
                          title: "Networking Essentials (NCC 311)",
                          time: "10:30 AM",
                          startsIn: "45 mins",
                          date: "Wed Feb 15",
                          lecturerName: "Dr Ajibade Solomon",
                        },
                      ].map((lecture, index) => (
                        <div className="w-[718px]">
                          <div
                            key={index}
                            className="bg-primary h-[180px] p-4 rounded-lg rounded-b-none"
                          >
                            <h3 className="text-[24px] font-bold text-white mt-1">
                              {lecture.title}
                            </h3>
                            <p className="text-white font-normal text-[12px] mt-2">{` ${lecture.lecturerName}`}</p>

                            <div className="flex flex-row gap-2 items-center mt-2">
                              <Image
                                src="/assets/access-date.png"
                                className="w-[16px] h-[16px]"
                                width={16}
                                height={16}
                              />
                              <p className="text-white font-normal text-[12px]">{`${lecture.date}`}</p>
                            </div>
                          </div>
                          <div className="bg-outline border-[1px] justify-between h-[129px] items-center p-3 flex flex-row border-[#0000003d]">
                            <div className="">
                              <p className="text-primary font-bold text-[20px]">
                                Join the Class
                              </p>
                              <p className="text-black text-[12px] font-normal">{`Class starts in ${lecture.time}`}</p>
                            </div>

                            <div className="flex flex-row items-center gap-[54.5px]">
                              <Image
                                onClick={navigateToStart}
                                src="/assets/next-east.png"
                                className="w-[40px] h-[40px] cursor-pointer"
                                width={40}
                                height={40}
                              />
                              <p className="text-primary underline font-normal text-[10px]">
                                View course
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
