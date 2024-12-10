"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../../components/DashboardNav";
import Sidebar from "../../components/Sidebar";
import { useParams, useRouter } from "next/navigation";
import { GetApi } from "../../../../utils/Actions";

const coursesData = [
  {
    id: 1,
    regNo: "CS/HND2/F22/3280",
    courseName: "(CYS 311) Introduction to Security and  Policy Development",
    status: "submitted",
    attendance: 1,
    addedTime: "RECENT",
    hasDocument: true,
  },
  {
    id: 2,
    regNo: "CS/HND1/F22/3281",
    courseName: "(NCC 311) Networking Essentials",
    status: "pending",
    attendance: 1,
    addedTime: "NEWEST",
    hasDocument: false,
  },
  {
    id: 3,
    regNo: "CS/HND2/F22/3282",
    courseName: "(CYS312) Operating Systems Security",
    status: "submitted",
    attendance: 1,
    addedTime: "OLDEST",
    hasDocument: true,
  },
  {
    id: 4,
    regNo: "CS/HND1/F22/3283",
    courseName: "(CYS 313) Cyber Diplomacy and International Cooperation",
    status: "pending",
    attendance: 1,
    addedTime: "NEWEST",
    hasDocument: false,
  },
];

const page = () => {
  const [filter, setFilter] = useState("all"); // filter state
  const router = useRouter();
  const params = useParams();

  const [isClient, setIsClient] = useState(false);
  const [details, setDetails] = useState({})
  const [courses, setCourses] = useState([])
  const [errorMsg, setErrorMsg] = useState("")
  const [loadingStudent, setLoadingStudent] = useState(false)
  const [loadingCourse, setLoadingCourse] = useState(false)

  useEffect(() => {
    setIsClient(true); // Ensures this logic runs only on the client-side

        
    const getStudent = async () => {
      try {
        setLoadingStudent(true)
        const response = await GetApi(`api/student/${params.id}`)
        if (response.success) {
          setDetails(response.data)
          setErrorMsg("");


          setLoadingCourse(true)
          await GetApi(`api/course/course-student/student?level=${response.data.level}&department=${response.data.department}`)
          .then((result) => {
            if (result.success) {
              setCourses(result.data)
              setErrorMsg("");
            } else {
              setErrorMsg(result.message);
            }
          })
          .catch((err) => {
            console.log(err);
            setErrorMsg(err.message);
          })
          .finally(() => {
            setLoadingCourse(false)
          })


        } else {
          setErrorMsg(response.message);
        }
      } catch(err) {
        console.log(err);
        setErrorMsg(err.message);
      } finally {
        setLoadingStudent(false);
      }
    }


    // const getCourses = async () => {
    //   try {
    //     setLoadingCourse(true)
    //     const res = await GetApi(`api/course/course-student/student?level=${details.level}&${details.department}`)
    //     if (res.success) {
    //       setCourses(res.data)
    //       setErrorMsg("");
    //     } else {
    //       setErrorMsg(res.message);
    //     }
    //   } catch(err) {
    //     console.log(err);
    //     setErrorMsg(err.message);
    //   } finally {
    //     setLoadingCourse(false);
    //   }
    // }
        
    getStudent();
    // getCourses();
  }, []);

  // Function to handle filtering logic
  const filteredStudents = courses.filter((student) => {
    if (filter === "all") return true;
    return student.addedTime === filter;
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
          <div className="flex flex-end justify-end">
            <div className="flex items-center bg-white gap-1 cursor-pointer border-black border p-3 mt-5 rounded-sm h-[37px] w-[118px]">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-black font-medium text-[16px] bg-white"
              >
                <option className="text-black font-semibold" value="NEWEST">
                  Newest
                </option>
                <option className="text-black font-semibold" value="OLDEST">
                  OLDEST
                </option>
                <option className="text-black font-semibold" value="RECENT">
                  RECENT
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/assets/activity.png"
                width={20}
                height={20}
                className="w-[25px] h-[25px] rounded-full"
                alt="profile"
              />
              <p className="text-black font-semibold text-[20px]">Attendance</p>
            </div>

            {/* Filter Dropdown */}
            <div className="flex flex-row items-center justify-items-center gap-20">
              <p className="text-primary font-semibold text-[32px] mt-3">
                Total percentage{" "}
                <span className="font-bold"> 1 %</span>
              </p>
            </div>
          </div>

          {/* Display Filtered Students */}
          <div className="gap-[30px]">
            {filteredStudents.map((student) => (
              <div className="bg-outline border-[1px] p-3 mt-5 gap-8 border-[#00000046]">
                <div
                  className="flex flex-row justify-between"
                  key={student.id}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <div className="flex flex-col ">
                      <p className="font-bold text-black text-[20px]">
                        {student.name} ({student.code})
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-20">
                    {/* Document Container with Fixed Width */}
                    <div className="flex flex-col items-center gap-2 w-full">
                      <p className="font-medium text-black text-[14px]">
                        1% {` `}
                      </p>
                      <div className="w-24 bg-gray-200 h-[4px] mt-2">
                        <div
                          className="bg-primary h-[4px]"
                          style={{ width: `${1}%` }}
                        ></div>
                      </div>
                    </div>
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

export default page;
