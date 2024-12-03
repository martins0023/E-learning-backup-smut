"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../../../../../components/Sidebar";
import DashboardNav from "../../../../../components/DashboardNav";
import Image from "next/image";
//import Sidebar from "../../../../components/Sidebar";
//import DashboardNav from "../../../../components/DashboardNav";

// Sample data for student details
const groupDetails = {
  id: 1,
  name: "Group A",
  topic: "(CYS301) Application Security to Cyber Security",
  dueDate: "Mon SEP 14", 
  time: "10:00AM",
  students: [
    { id: 1, name: "James Adetola", regNo: "CYS/F22/3280" },
    { id: 2, name: "Ridwallunai Olawale", regNo: "CYS/F22/3281" },
    { id: 3, name: "Ojo Oyewole", regNo: "CYS/F22/3282" },
    // Add more student data here
  ],
};

const page = () => {
  const params = useParams();
  const router = useRouter();

  const handleBack = () => {
    router.push(`/dashboard/group/groups`);
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
        <div className="p-8 flex justify-between">
          <div className="flex flex-col w-[641px]">
            <p className="text-black font-bold text-[28px]">
              {groupDetails.topic} Group Assignment
            </p>
            <p className="text-primary font-semibold text-[16px] mt-4">
              {groupDetails.name}{" "}
              <span className="font-normal">
                ({groupDetails.students.length} students)
              </span>
            </p>

            <div className="flex flex-row items-center gap-2 mt-3 mb-1">
              <Image
                src="/assets/time-red.png"
                alt="time"
                width={16}
                height={16}
                className="rounded w-[16px] h-[16px]"
              />
              <p className="text-[16px] font-normal">
                To be submitted at {groupDetails.time}
              </p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <Image
                src="/assets/calendar.png"
                alt="time"
                width={16}
                height={16}
                className="rounded w-[16px] h-[16px]"
              />
              <p className="text-[16px] font-normal">{groupDetails.dueDate}</p>
            </div>

            <div className="mt-5 p-3 flex w-[641px] h-[175px] gap-7 bg-[#F2F2F2]">
              <div className="w-full rounded-md">
                <p className="text-black font-bold text-[20px]">Assignment</p>
                <p className="mt-1 font-normal text-[16px]">
                  <span className="">Q1. </span>
                  This is your group assignment as regarding the cybersecurity assigment, please treat as urgent...
                </p>

                <div className="flex flex-col gap-1 ">
                  <div className="flex flex-row">
                    <Image
                      src="/assets/check.png"
                      alt="markdown"
                      width={24}
                      height={24}
                      className="rounded w-[24px] h-[24px]"
                    />
                    <p className="w-[581px] font-normal text-[16px]">
                      This assignment will contribute and be an addition to your C.A assessment, so you can do as you want
                    </p>
                  </div>
                  <div className="flex items-start justify-start">
                    <p className="font-bold  text-[14px]">show more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 w-[424px] border-black border-[1px] h-full p-3 pb-10">
            <h3 className="text-primary font-bold text-[16px] mb-1">
              Group Members
            </h3>
            <div className="mt-3 gap-4">
              {groupDetails.students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center mt-2"
                >
                  <img
                    src={`/assets/images/user.png`} // Replace with actual image logic
                    alt={student.name}
                    className="h-[60px] w-[60px] rounded-full mr-4"
                  />
                  <div className="gap-1">
                    <p className="text-[20px] font-semibold text-black">{student.regNo}</p>
                    <p className="font-semibold text-[14px]">{student.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
