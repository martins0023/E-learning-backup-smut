"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import DashboardNav from "../../../../components/DashboardNav";
import Image from "next/image";

const Page = () => {
  const params = useParams();
  const router = useRouter();

  // Debugging: Log params to check if it's correctly fetched
  console.log("Params:", params);

  const handleCreatequiz = (e) => {
    e.preventDefault(); // Prevent form submission
    if (params.id) {
      router.push(`/lecturer/quiz/create-quiz/${params.id}`);
    } else {
      console.error("Invalid or missing params.id");
    }
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
            <div className="flex justify-between flex-row items-center mt-5 px-8">
              <div className="flex justify-start flex-start justify-items-start">
                <p className="text-primary font-semibold text-[32px]">
                  Cyber Security Quiz
                </p>
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

              <form onSubmit={handleCreatequiz} className="flex flex-col gap-8 ">
                <input
                  placeholder="Enter title"
                  className="flex p-2 text-black justify-center items-center border border-black w-[600px] h-[56px] gap-2"
                />

                <select className="flex justify-center items-center border max-w-7xl border-black w-[600px] h-[56px] cursor-pointer gap-2">
                  <option id="text" className="text-[#A9A9A9] font-normal">
                    select number of questions
                  </option>
                  <option id="1">1</option>
                  <option id="2">2</option>
                  <option id="3">3</option>
                  <option id="4">4</option>
                  <option id="5">5</option>
                </select>

                <select className="flex justify-center items-center border max-w-7xl border-black w-[600px] h-[56px] cursor-pointer gap-2">
                  <option id="text" className="text-[#A9A9A9] font-normal">
                    multiple choice questions?
                  </option>
                  <option id="yes">YES</option>
                  <option id="no">NO</option>
                </select>

                <div className="flex justify-center flex-row items-center gap-5">
                  <button
                    type="button"
                    className="h-[48px] w-full bg-white border-[1px] border-primary text-primary rounded-full"
                    onClick={() => router.push(`/lecturer/quiz/${params.id}`)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-[48px] w-full bg-primary text-white rounded-full"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
