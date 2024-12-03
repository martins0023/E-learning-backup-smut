"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import DashboardNav from "../../../../components/DashboardNav";
import { GetApi } from "../../../../utils/Actions";

const months = [
  { name: "January", days: 31 },
  { name: "February", days: 28 }, // Adjust for leap year if needed
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Timetable = (props) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({})
  const [errorMsg, setErrorMsg] = useState("");

  const [courses, setCourses] = useState([])

  const [activeMonthIndex, setActiveMonthIndex] = useState(
    new Date().getMonth()
  );
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [visibleStartIndex, setVisibleStartIndex] = useState(0); // Track visible days
  const [selectedClass, setSelectedClass] = useState(null); // Track selected class
  const datesContainerRef = useRef(null);

  // Generate all days for the selected month
  const generateDays = (monthIndex) => {
    const { days } = months[monthIndex];
    const firstDay = new Date(2024, monthIndex, 1).getDay(); // Get the starting day of the month

    return Array.from({ length: days }, (_, i) => ({
      day: daysOfWeek[(firstDay + i) % 7],
      date: i + 1,
    }));
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true)
        const response = await GetApi(`api/course/lecturer-course/${params.id}`)
        if (response.success) {
          setErrorMsg("");
          setCourses(response.data)
        } else {
          setErrorMsg(response.message);
        }
      } catch(err) {
        console.log(err);
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    }
    getCourses();
  }, [])

  useEffect(() => {
  
    const GetLecturer = async () => {
      try {
        const response = await GetApi(`api/lecturer/${props.params}`);
        if (response.success) {
          setData(response.data);
          setErrorMsg("");
          setCourses(response.data)
        } else {
          setErrorMsg(response.message);
        }
      } catch(err) {
        console.log(err);
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    GetLecturer();
  
  }, [])

  // Scroll the view such that the current date appears in the 8th slot
  useEffect(() => {
    const startIndex = Math.max(currentDate - 8, 0);
    setVisibleStartIndex(startIndex);
  }, [currentDate]);

  // Calculate visible days (13 at a time)
  const getVisibleDays = (allDays) => {
    return allDays.slice(visibleStartIndex, visibleStartIndex + 13);
  };

  // Handle scrolling logic
  const scrollDays = (direction, totalDays) => {
    const newIndex =
      direction === "next"
        ? Math.min(visibleStartIndex + 13, totalDays - 13) // Prevent overscroll
        : Math.max(visibleStartIndex - 13, 0); // Prevent underscroll

    setVisibleStartIndex(newIndex);
  };

  const isToday = (date) =>
    activeMonthIndex === new Date().getMonth() && date === currentDate;

  const days = generateDays(activeMonthIndex); // All days for the selected month
  const visibleDays = getVisibleDays(days); // Visible 13 days

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
          {/* Month Selector */}
          <div className="flex justify-between items-center w-full mb-4">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {months.map((month, index) => (
                <button
                  key={month.name}
                  className={`text-[15px] font-normal p-1 ml-2 ${
                    activeMonthIndex === index
                      ? "text-primary font-extrabold"
                      : "text-black"
                  }`}
                  onClick={() => {
                    setActiveMonthIndex(index);
                    setVisibleStartIndex(0); // Reset the visible days on month change
                  }}
                >
                  {month.name}
                </button>
              ))}
            </div>
          </div>

          {/* East and West Scroll Buttons */}
          <div className="relative flex items-center w-full">
            <button
              className="absolute left-0 rounded-full p-2"
              onClick={() => scrollDays("prev", days.length)}
              disabled={visibleStartIndex === 0} // Disable if at start
            >
              <Image
                src="/assets/prev.png"
                width={30}
                height={30}
                className="w-[30px] h-[30px] rounded-full"
                alt="profile"
              />
            </button>

            <div
              className="flex overflow-hidden gap-4 px-12"
              ref={datesContainerRef}
            >
              {visibleDays.map(({ day, date }) => (
                <div>
                  <div
                    key={date}
                    onClick={() => setSelectedClass(date)}
                    className={`min-w-[50px] h-[50px] rounded-full flex flex-col items-center justify-center font-semibold ${
                      isToday(date)
                        ? "bg-primary text-white shadow-lg"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <span>{date}</span>
                  </div>
                  <div className="p-3">
                    <span
                      className={`${
                        isToday(date) ? "text-black font-bold" : ""
                      }`}
                    >
                      {day}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className=" rounded-full p-2"
              onClick={() => scrollDays("next", days.length)}
              disabled={visibleStartIndex + 13 >= days.length} // Disable if at end
            >
              <Image
                src="/assets/next.png"
                width={30}
                height={30}
                className="w-[30px] h-[30px] rounded-full"
                alt="next"
              />
            </button>
          </div>

          {/* Timetable Grid */}
          <div className="grid grid-cols-5 gap-4 mt-8">
            {[
              {
                title:
                  "(CYS 311) Introduction to Security and Policy Development",
                time: "8am to 10am",
                typeofClass: "class",
                courseCode: "CYS 311",
                dayofweek: "Saturday",
              },
              {
                title: "(CYS 314) Mathematics for Cyber Security",
                time: "10am to 12pm",
                typeofClass: "class",
                courseCode: "CYS 314",
                dayofweek: "Wednesday",
              },
              {
                title: "(CYS 312) Operating Systems Security",
                time: "12pm to 2pm",
                typeofClass: "class",
                courseCode: "CYS 312",
                dayofweek: "Friday",
              },
              {
                title: "Empty Slot",
                time: "2pm to 4pm",
                typeofClass: "class",
                courseCode: "NONE",
                dayofweek: "Tuesday",
              },
              {
                title: "Empty Slot",
                time: "4pm to 6pm",
                typeofClass: "class",
                courseCode: "NONE",
                dayofweek: "Monday",
              },
            ].map((lecture, index) => (
              <div
                key={index}
                onClick={() => setSelectedClass(lecture)}
                className="border-t-0 h-[380px] border-b-0 border-[1px] cursor-pointer p-3 border-primary"
              >
                <p className="text-primary font-bold text-center mb-2">
                  {lecture.time}
                </p>
                <div
                  key={index}
                  className="border border-primary h-[286px] bg-[#F9F9F9] p-4 rounded-lg text-center"
                >
                  <p className="text-primary font-bold text-left">
                    {lecture.title}
                  </p>
                  <p className="text-primary text-left font-bold text-[20px] mt-2">
                    {lecture.typeofClass}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {selectedClass && (
            <div className="fixed right-0 top-0 h-full w-[544px] bg-white p-5 shadow-lg">
              <div className="mt-10">
                <Image
                  src={data.image ? data.image : "/assets/images/user.png"}
                  width={180}
                  height={180}
                  className="w-[180px] h-[180px] rounded-full border border-black boder-[1px]"
                  alt="next"
                />

                <div className="mt-5">
                  <p className="text-black font-semibold text-[32px]">
                    {data.lastname} {data.middlename} {data.firstname}
                  </p>
                  <p className="font-normal text-[24px]">Lecturer</p>
                </div>

                <div className="flex justify-between items-center w-full mb-4 mt-2">
                  <select
                    value={activeMonthIndex}
                    onChange={(e) =>
                      setActiveMonthIndex(Number(e.target.value))
                    }
                    className="p-2 border-[1px] border-black mt-3"
                  >
                    {months.map((month, index) => (
                      <option key={month.name} value={index}>
                        {month.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
              <p className="mt-4 text-black font-semibold text-[16px]">{selectedClass.courseCode}</p>
              <p className="font-normal text-[12px]">{selectedClass.time}</p>
              <p className="font-normal text-[12px]">{selectedClass.dayofweek}</p>
              </div>
              <button
                onClick={() => setSelectedClass(null)}
                className="p-2 bg-primary text-white rounded-md justify-bottom mt-10"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Timetable;
