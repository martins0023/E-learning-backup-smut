"use client";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Sidebar from "../../../../components/Sidebar";
import DashboardNav from "../../../../components/DashboardNav";
import { GetApi } from "../../../../utils/Actions";

const studentsData = [
  {
    id: 1,
    regNo: "CYS/HND2/F22/3280",
    name: "Ojo Oyewole",
    status: "submitted",
    attendance: 1,
    class: "HND2",
    hasDocument: true,
  },
  {
    id: 2,
    regNo: "CYS/HND1/F22/3281",
    name: "Samuel Olad",
    status: "pending",
    attendance: 1,
    class: "HND1",
    hasDocument: false,
  },
  {
    id: 3,
    regNo: "CYS/HND2/F22/3282",
    name: "Amaka Uche",
    status: "submitted",
    attendance: 1,
    class: "HND2",
    hasDocument: true,
  },
  {
    id: 4,
    regNo: "CYS/HND1/F22/3283",
    name: "Fatima Bello",
    status: "pending",
    attendance: 1,
    class: "HND1",
    hasDocument: false,
  },
];

const page = () => {
  const router = useRouter();
  const params = useParams();

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false); // Initialize loading state
  const [errorMsg, setErrorMsg] = useState(""); // Initialize error state
  const [filter, setFilter] = useState("all"); // filter state

  // Function to handle filtering logic
  const filteredStudents = studentsData.filter((student) => {
    if (filter === "all") return true;
    return student.class === filter;
  });

  useEffect(() => {
    // Fetch courses for the lecturer
    const getCourses = async () => {
      try {
        setLoading(true); // Start loading
        const response = await GetApi(`api/course/lecturer-course/${params.id}`);
        if (response.success) {
          setCourses(response.data); // Set fetched courses
          setErrorMsg(""); // Clear any error messages
        } else {
          setErrorMsg(response.message); // Show error message if API fails
        }
      } catch (err) {
        console.error(err);
        setErrorMsg("Error fetching courses"); // Display generic error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (params.id) {
      getCourses(); // Only fetch if params.id is available
    }
  }, [params.id]);
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
          <h1 className="text-3xl font-bold text-center mb-6">All students</h1>

          <div className="flex flex-row justify-between">
            <p className="text-primary font-semibold text-[28px]">
              Students Records
            </p>

            {/* Filter Dropdown */}
            <div className="flex flex-row items-center justify-items-center gap-20">
              <p className="text-black font-medium text-[20px] mt-3">
                Total number of students{" "}
                <span className="font-bold"> ({studentsData.length})</span>
              </p>

              <div className="flex bg-white items-center gap-1 cursor-pointer border-black border p-3 mt-5 rounded-sm h-[37px] w-[118px]">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="text-black font-medium text-[16px] bg-white"
                >
                  <option className="text-black font-semibold" value="all">
                    All
                  </option>
                  <option
                    className="text-black font-semibold"
                    value="HND1"
                  >
                    HND 1
                  </option>
                  <option className="text-black font-semibold" value="HND2">
                    HND 2
                  </option>
                </select>
              </div>
            </div>
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
                    <p className="font-normal text-black text-[18px]">
                      {student.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-2 w-[120px]">
                  <p className="font-semibold text-primary text-[18px]">
                    {student.regNo}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-20">
                  {/* Document Container with Fixed Width */}
                  <div className="flex flex-row items-center gap-2 w-full">
                    <p className="font-medium text-black text-[14px]">
                      {student.attendance}% {` `} attendance
                    </p>
                    <div className="w-48 bg-gray-200 h-[4px] mt-2">
                      <div
                        className="bg-primary h-[4px]"
                        style={{ width: `${student.attendance}%` }}
                      ></div>
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
