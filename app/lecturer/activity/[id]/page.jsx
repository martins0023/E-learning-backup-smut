"use client";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Sidebar from "../../../../components/Sidebar";
import DashboardNav from "../../../../components/DashboardNav";

const courseActivitysData = [
  {
    id: 1,
    courseName: "Networking Essentials (NCC 311) ",
    activityType: "Assignment 1",
    time: "23 mins ago",
    hasDocument: true,
    submittedPeople: 34,
    pendingPeople: 17,
    duration: "new",
    documents: [
      {
        id: 1,
        name: "Assignment 1.pdf",
        url: "/assets/assignment1.pdf",
        img: "/assets/pdf.png",
      },
      {
        id: 2,
        name: "Lecture Notes.pdf",
        url: "/assets/lecture_notes.pdf",
        img: "/assets/doc.png",
      },
    ],
  },
  {
    id: 2,
    courseName: "Networking Protocols (NCC 312)",
    activityType: "Quiz 1",
    time: "45 mins",
    hasDocument: true,
    submittedPeople: 40,
    pendingPeople: 5,
    duration: "new",
    documents: [
      {
        id: 1,
        name: "Assignment 1.pdf",
        url: "/assets/assignment1.pdf",
        img: "/assets/pdf.png",
      },
      {
        id: 2,
        name: "Lecture Notes.pdf",
        url: "/assets/lecture_notes.pdf",
        img: "/assets/pdf.png",
      },
    ],
  },
  {
    id: 3,
    courseName: "Certified Ethical Hacking (NCC 313) ",
    activityType: "Quiz 2",
    time: "12 mins",
    hasDocument: true,
    submittedPeople: 20,
    pendingPeople: 10,
    duration: "old",
    documents: [
      {
        id: 1,
        name: "Assignment 1.pdf",
        url: "/assets/assignment1.pdf",
        img: "/assets/doc.png",
      },
      {
        id: 2,
        name: "Lecture Notes.pdf",
        url: "/assets/lecture_notes.pdf",
        img: "/assets/doc.png",
      },
    ],
  },
  {
    id: 4,
    courseName: "IP protocols Essentials (NCC 314) ",
    activityType: "Assignment 2",
    time: "30 mins",
    hasDocument: true,
    submittedPeople: 30,
    pendingPeople: 16,
    duration: "old",
    documents: [
      {
        id: 1,
        name: "Assignment 1.pdf",
        url: "/assets/assignment1.pdf",
        img: "/assets/doc.png",
      },
      {
        id: 2,
        name: "Lecture Notes.pdf",
        url: "/assets/lecture_notes.pdf",
        img: "/assets/pdf.png",
      },
    ],
  },
];

const Page = () => {
  const router = useRouter();
  const params = useParams();

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false); // Initialize loading state
  const [errorMsg, setErrorMsg] = useState(""); // Initialize error state
  const [filter, setFilter] = useState("all"); // filter state

  // Function to handle filtering logic
  const filteredStudents = courseActivitysData.filter((courseActivity) => {
    if (filter === "all") return true;
    return courseActivity.duration === filter;
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
          <div className="flex flex-row justify-end">
            {/* Filter Dropdown */}
            <div className="flex bg-white items-center gap-1 cursor-pointer border-black border p-3 mt-5 rounded-sm h-[37px] w-[118px]">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-black font-medium text-[16px] bg-white"
              >
                <option value="all">All</option>
                <option value="new">Newest</option>
                <option value="old">Old</option>
              </select>
            </div>
          </div>

          {/* Display Filtered Students */}
          <div className="gap-3">
            {filteredStudents.map((courseActivity) => (
              <div
                className="flex flex-row justify-between mt-10"
                key={courseActivity.id}
              >
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/assets/icon1.png"
                    width={20}
                    height={20}
                    className="w-[50px] h-[50px] rounded-full"
                    alt="profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-black mt-5 text-[18px]">
                      {courseActivity.courseName}
                    </p>
                    <p className="text-primary font-medium text-[12px]">
                      {courseActivity.activityType}
                    </p>
                    <div className="mt-3 flex flex-row">
                      {courseActivity.documents &&
                      courseActivity.documents.length > 0 ? (
                        courseActivity.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center mt-2">
                            <Image
                              src={doc.img} // Dynamically load image icon from document object
                              width={20}
                              height={20}
                              className="w-[20px] h-[20px] mr-2"
                              alt="Document icon"
                            />
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center">
                          <Image
                            src="/assets/settings-icon.png" // Default icon if no documents are available
                            width={20}
                            height={20}
                            className="w-[20px] h-[20px] mr-2"
                            alt="No document"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-10">
                  {/* Status Container with Fixed Width */}
                  <div className="flex flex-row items-center gap-2 w-[120px]">
                    <Image
                      src="/assets/success-icon.png"
                      width={20}
                      height={20}
                      className="w-[20px] h-[20px]"
                      alt={courseActivity.duration}
                    />
                    <p className="font-medium text-black text-[14px]">
                      {courseActivity.submittedPeople} {` `}{" "}
                    </p>
                    <p className="font-medium text-black text-[14px]">
                      submitted
                    </p>
                  </div>

                  {/* Document Container with Fixed Width */}
                  <div className="flex flex-col justify-end gap-2">
                    <p className="font-medium text-[#0000007e] text-[14px] items-end">
                      {courseActivity.time}
                    </p>
                    <div className="flex flex-row items-center gap-2 w-[160px]">
                      <Image
                        src="/assets/pending.png"
                        width={20}
                        height={20}
                        className="w-[20px] h-[20px]"
                        alt="document duration"
                      />
                      <p className="font-medium text-[#E7024D] text-[14px]">
                        {courseActivity.pendingPeople} {` `} pending
                      </p>
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

export default Page;
