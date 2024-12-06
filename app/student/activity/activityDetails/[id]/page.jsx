"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import DashboardNav from "../../../components/DashboardNav";
import { GetApi } from "../../../../../utils/Actions";

const studentsData = [
  {
    id: 1,
    regNo: "CYS/HND/F22/3280",
    name: "Ojo Oyewole",
    status: "submitted",
    time: "23 mins",
    hasDocument: true,
  },
  {
    id: 2,
    regNo: "CYS/HND/F22/3281",
    name: "Samuel Oladipo",
    status: "pending",
    time: "45 mins",
    hasDocument: false,
  },
  {
    id: 3,
    regNo: "CYS/HND/F22/3282",
    name: "Amaka Uche",
    status: "submitted",
    time: "12 mins",
    hasDocument: true,
  },
  {
    id: 4,
    regNo: "CYS/HND/F22/3283",
    name: "Fatima Bello",
    status: "pending",
    time: "30 mins",
    hasDocument: false,
  },
];

const Page = () => {
  const { id } = useParams(); // Extract the dynamic course ID from the URL
  const [filter, setFilter] = useState("all"); // filter state
  const params = useParams();
  const router = useRouter();
  const { query } = router;

  // Extract details from query parameters
  const courseName = query?.courseName || "Unknown Course";
  const lecturerName = query?.lecturerName || "Unknown Lecturer";

  const [courseDetails, setCourseDetails] = useState(null); // Course details state
  //const [lecturerName, setLecturerName] = useState(""); // Lecturer's name state

  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

//   useEffect(() => {
//     // Fetch course details based on the ID
//     const course = coursesData.find((course) => course.id === id);
//     if (course) {
//       setCourseDetails(course);
//       setLecturerName(course.lecturerName || "Unknown Lecturer"); // Replace with real data
//     }
//   }, [id]);

  // Function to handle filtering logic
  const filteredStudents = studentsData.filter((student) => {
    if (filter === "all") return true;
    return student.status === filter;
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
          <div className="mb-10 cursor-pointer" onClick={handleBack}>
                <Image
                  src="/assets/back_icon.png"
                  width={25}
                  height={20}
                  className="w-[25px] h-[20px] rounded-full"
                />
              </div>

          <div className="flex flex-row justify-between">
            <p className="text-black font-semibold text-[28px]">
                {courseDetails?.courseName || "Cyber Security Department"}
            </p>

            {/* Filter Dropdown */}
            <div className="flex bg-white items-center gap-1 cursor-pointer border-black border p-3 mt-5 rounded-sm h-[37px] w-[118px]">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-black font-medium text-[16px] bg-white"
              >
                <option value="all">All</option>
                <option value="submitted">Submitted</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Image
              src="/assets/activity.png"
              width={20}
              height={20}
              className="w-[25px] h-[25px] rounded-full"
              alt="profile"
            />
            <p className="text-black text-[18px] font-medium">Activity</p>
          </div>

          {/* Display Filtered Students */}
          <div className="gap-3">
            {filteredStudents.map((student) => (
              <div
                className="flex flex-row justify-between mt-10"
                key={student.id}
              >
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/assets/images/user.png"
                    width={20}
                    height={20}
                    className="w-[50px] h-[50px] rounded-full"
                    alt="profile"
                  />
                  <div className="flex flex-col ">
                    <p className="font-semibold text-black text-[18px]">
                      Mr Jimoh
                    </p>
                    <p className="font-normal text-primary text-[16px]">
                      Lecturer
                    </p>
                    <p className="font-normal text-[#0000006e] text-[16px]">
                      shared networking notes & study materials
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <p className="font-normal text-black text-[14px] mb-3">
                    4 mins ago
                  </p>
                  <div className="flex flex-row items-center gap-2">
                  <p className="font-normal text-black text-[14px]">
                    download files
                  </p>
                  <Image
                    src="/assets/download.png"
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px] rounded-full"
                    alt="profile"
                  />
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
