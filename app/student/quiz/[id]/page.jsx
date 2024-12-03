"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../../components/DashboardNav";
import Sidebar from "../../components/Sidebar";
import { useRouter, useParams } from "next/navigation";


const Page = () => {
  const [filter, setFilter] = useState("all"); // filter state
  const router = useRouter();
  const params = useParams();

  // Function to handle filtering logic

  const quizOption = [
    {
      id: 1,
      quizoptionSelection: "Cyber Security Quiz",
      type: `/student/quiz/quiz-test/${params.id}`,
      time: "10",
      date: "MON SEP 7",
    },
    {
      id: 2,
      quizoptionSelection: "My Scores",
      type: "",
    },
  ];
  const filteredSubmits = quizOption.filter((student) => {
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
            {filteredSubmits.map((quizType) => (
              <div
                key={quizType.id}
                className="bg-[#F9F9F9] w-[311px] h-[163px] border-[0.5px] rounded-md border-primary cursor-pointer"
                onClick={() => navigateToAddr(quizType.type)} // Pass the type as an argument
              >
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex flex-col">
                    {quizType.quizoptionSelection == "My Scores" && (
                      <div>
                        <Image
                          src="/assets/scores.png"
                          width={60}
                          height={60}
                          className="w-[60px] h-[60px]"
                          alt="scores"
                        />
                      </div>
                    )}
                    <p className="font-semibold text-primary text-[24px]">
                      {quizType.quizoptionSelection}
                    </p>
                    {quizType.quizoptionSelection == "Cyber Security Quiz" && (
                      <div className="flex flex-col gap-3 mt-3">
                        <div className="flex flex-row gap-1 items-center">
                          <Image
                            src="/assets/time-red.png"
                            width={16}
                            height={16}
                            className="w-[16px] h-[16px]"
                            alt="time"
                          />
                          <p className="text-[10px] text-primary">
                            Quiz starts in {quizType.time} mins
                          </p>
                        </div>

                        <div className="flex flex-row gap-1 items-center">
                          <Image
                            src="/assets/calendar.png"
                            width={16}
                            height={16}
                            className="w-[16px] h-[16px]"
                            alt="time"
                          />
                          <p className="text-[10px] text-primary">
                            {quizType.date}
                          </p>
                        </div>
                      </div>
                    )}
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
