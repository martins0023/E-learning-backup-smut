"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Sidebar from "../../../../../components/Sidebar";
import DashboardNav from "../../../../../components/DashboardNav";

const CourseDetail = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const imgSrc = searchParams.get("imgSrc");

  if (!title || !imgSrc) {
    return <p>Loading...</p>; // Display a loading message if the data is not yet available
  }

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

        {/* Course Detail */}

        <motion.div
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
          <div className="mt-10 px-8 flex w-full gap-7">
            <div className="flex gap-20">
              <div className="flex flex-col ">
                {/* Course Image */}
                <Image
                  src={imgSrc}
                  alt={title}
                  width={530}
                  height={304}
                  className="rounded w-[530px] h-[304px]"
                />

                {/* Course Title */}
                <p className="text-black text-[24px] font-bold mt-5 w-[530px]">
                  {title}
                </p>
              </div>

              <div className="flex flex-col gap-3 ">
                <div className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2">
                  <Image
                    src="/assets/add-black.png"
                    width={20}
                    height={20}
                    alt="add"
                  />
                  <p className="text-black text-[14px] font-medium">
                    Lecture note
                  </p>
                </div>

                <div className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2">
                  <Image
                    src="/assets/add-black.png"
                    width={20}
                    height={20}
                    alt="add"
                  />
                  <p className="text-black text-[14px] font-medium">Quiz</p>
                </div>
                <div className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2">
                  <Image
                    src="/assets/add-black.png"
                    width={20}
                    height={20}
                    alt="add"
                  />
                  <p className="text-black text-[14px] font-medium">
                    Assignment
                  </p>
                </div>

                <div className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2 mt-10">
                  <Image
                    src="/assets/add-black.png"
                    width={20}
                    height={20}
                    alt="add"
                  />
                  <p className="text-black text-[14px] font-medium">Section</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;
