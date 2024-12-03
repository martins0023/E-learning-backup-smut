"use client"
import React from "react";
import Sidebar from "../../../../components/Sidebar";
import DashboardNav from "../../../../components/DashboardNav";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const page = () => {
  const router = useRouter();
  const params = useParams()

  const navigateToSchedule = (id) => {
    router.push(`/student/courses/classroom/start/schedule/${params.id}`); // Navigate to dynamic page
  };
  return (
    <div className="flex w-full">
      <Sidebar params={params.id} />
      <div className="ml-60 w-full">
        <div className="bg-white w-full h-[128px]">
          <DashboardNav params={params.id} />
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
                              <div className="bg-[#EEEFF4] w-[374px h-[45px] flex flex-row gap-1 p-1 ">
                                <Image
                                  src="/assets/info-error.png"
                                  className="w-[12px] h-[12px] mt-1"
                                  width={12}
                                  height={12}
                                />
                                <p className="text-[#757575] font-normal text-[12px] w-[352px]">
                                  Access will not be granted if you are more
                                  than 10 minutes late to class.
                                </p>
                              </div>
                              <div className="flex flex-row items-center gap-1 mt-1">
                                <Image
                                  src="/assets/start-time.png"
                                  className="w-[24px] h-[24px] "
                                  width={24}
                                  height={24}
                                />
                                <p className="text-black text-[20px] font-bold">9:40:12</p>
                              </div>
                            </div>

                            <div className="flex flex-row items-center gap-[54.5px]">
                              <Image
                                onClick={navigateToSchedule}
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
