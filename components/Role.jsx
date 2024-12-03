"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Role = () => {
  const params = useSearchParams();
  // console.log(params.get("route"))
  // State to manage the selected role and button activity
  const [selectedRole, setSelectedRole] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [route, setRoute] = useState("");


  useEffect(() => {
  if(params.get("route")) {
    setRoute(params.get("route"));
  } else {
    setRoute("");
  }
  }, [params.get("route")]);

  // Handler when a role is clicked
  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setButtonEnabled(true);
  };

  const handleRoute = () => {
    if(buttonEnabled) {
      if(selectedRole === "Student" && route) {
        return "/student/getstarted/login"
      } else if(selectedRole === "Student" && !route) {
        return "/student/getstarted"
      } else if(selectedRole === "Lecturer" && route) {
        return "/lecturer/getstarted/login"
      } else if(selectedRole === "Lecturer" && !route) {
        return "/lecturer/getstarted"
      }
    } else {
      return "#"
    }
  }


  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-10 flex flex-col justify-center items-center">
        <Image
          src="/assets/logo.png"
          width={183}
          height={66}
          className="w-[183px] h-[66px]"
          alt="logo"
        />
        <p className="text-black font-bold text-[30px] mt-5">
          Please select your role{" "}
        </p>
      </div>

      <div className="flex flex-row mt-6 gap-5">
        {/* Student Role */}
        <div
          onClick={() => handleRoleClick("Student")}
          className={`cursor-pointer rounded-md h-[380px] w-[260px] flex items-center justify-center border-[1px] 
          ${
            selectedRole === "Student"
              ? "bg-gradient-to-r from-[#65E2B5] to-[#BCFF9D] border-none"
              : "bg-[#EEEFF4] border-black"
          }`}
        >
          <div className="flex flex-col gap-3 items-center justify-center justify-items-center">
            <Image
              src="/assets/student-icon.png"
              width={95}
              height={66}
              className="w-[95px] h-[66px]"
              alt="lecturer"
            />
            <p className="text-black font-semibold text-[24px]">Student</p>
          </div>
        </div>

        {/* Lecturer Role */}
        <div
          onClick={() => handleRoleClick("Lecturer")}
          className={`cursor-pointer rounded-md h-[380px] w-[260px] flex items-center justify-center border-[1px] 
          ${
            selectedRole === "Lecturer"
              ? "bg-gradient-to-r from-[#65E2B5] to-[#BCFF9D] border-none"
              : "bg-[#EEEFF4] border-black"
          }`}
        >
          <div className="flex flex-col gap-3 items-center justify-center justify-items-center">
            <Image
              src="/assets/lecturer-icon.png"
              width={95}
              height={66}
              className="w-[95px] h-[66px]"
              alt="lecturer"
            />
            <p className="text-black font-semibold text-[24px]">Lecturer</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {/* Conditionally enable the Continue button based on selection */}
        <Link
          href={handleRoute()}
          className={`flex items-center justify-center text-[#A0A0A0] font-normal text-[20px] w-[550px] rounded-full h-[64px] 
          ${
            buttonEnabled
              ? "bg-primary text-white"
              : "bg-[#E4E4E4] cursor-not-allowed"
          }`}
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Role;
