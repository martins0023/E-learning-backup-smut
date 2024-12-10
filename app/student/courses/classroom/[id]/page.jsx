"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../../../components/DashboardNav";
import Sidebar from "../../../components/Sidebar";
import { GetApi } from "../../../../../utils/Actions";

const page = () => {
  const params = useParams()
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox status
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const router = useRouter();
  const [details, setDetails] = useState({});
  const [course, setCourse] = useState(null);
  const [lecturer, setLecturer] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false);
  const [loadingLecturer, setLoadingLecturer] = useState(false);
  const [expandedSections, setExpandedSections] = useState({}); // Track expanded sections

  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  useEffect(() => {
    const getStudent = async () => {
      try {
        setLoadingStudent(true);
        const response = await GetApi(`api/student/${params.id}`);
        if (response.success) {
          setDetails(response.data);
          setErrorMsg("");

          setLoadingCourse(true);
          const result = await GetApi(`api/course/${courseId}`);
          if (result.success) {
            setCourse(result.data);
            setErrorMsg("");

            // Now fetch the lecturer's details using lecturer_id
            setLoadingLecturer(true);
            const lecturerResult = await GetApi(`api/course/lecturer-course/${result.data.lecturer_id.$oid}`);
            console.log("Lecturer ID:", result.data?.lecturer_id);
            //console.log("Lecturer ID:", lecturerResult);
            if (lecturerResult.success) {
              setLecturer(lecturerResult.data);
              console.log("Lecturer API Data:", lecturerResult.data);
              setErrorMsg("");
            } else {
              setErrorMsg(lecturerResult.message);
            }
          } else {
            setErrorMsg(result.message);
          }
        } else {
          setErrorMsg(response.message);
        }
      } catch (err) {
        console.log(err);
        setErrorMsg(err.message);
      } finally {
        setLoadingStudent(false);
        setLoadingCourse(false);
        setLoadingLecturer(false);
      }
    };

    getStudent();
  }, [courseId, params.id]);

  const navigateToSchedule = (id) => {
    router.push(`/student/courses/classroom/start/schedule/${params.id}?courseId=${id}`); // Navigate to dynamic page
  };

  const navigateToDetails = (id) => {
    router.push(`/student/courses/course-detail/${params.id}?courseId=${id}`); // Navigate to dynamic page
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
                      {/* {[
                        {
                          title: "Networking Essentials (NCC 311)",
                          time: "10:30 AM",
                          startsIn: "45 mins",
                          date: "Wed Feb 15",
                          lecturerName: "Dr Ajibade Solomon",
                        },
                      ].map((lecture, index) => ( */}
                        <div className="w-[718px]">
                          <div
                            className="bg-primary h-[180px] p-4 rounded-lg rounded-b-none"
                          >
                            <h3 className="text-[24px] font-bold text-white mt-1">
                            {course?.name} ({course?.code})
                            </h3>
                            <p className="text-white font-normal text-[12px] mt-2">{course?.name} ({course?.code})</p>

                            <div className="flex flex-row gap-2 items-center mt-2">
                              <Image
                                src="/assets/access-date.png"
                                className="w-[16px] h-[16px]"
                                width={16}
                                height={16}
                              />
                              <p className="text-white font-normal text-[12px]">{course?.schedule.duration}</p>
                            </div>
                          </div>
                          <div className="bg-outline border-[1px] justify-between h-[129px] items-center p-3 flex flex-row border-[#0000003d]">
                            <div className="">
                              <p className="text-primary font-bold text-[20px]">
                                Join the Class
                              </p>
                              <p className="text-black text-[12px] font-normal">{`Class starts in `} {course?.schedule.time}</p>
                            </div>

                            <div className="flex flex-row items-center gap-[54.5px]">
                              <Image
                                onClick={() => navigateToSchedule(course._id)}
                                src="/assets/next-east.png"
                                className="w-[40px] h-[40px] cursor-pointer"
                                width={40}
                                height={40}
                              />
                              <div onClick={() => navigateToDetails(course._id)} className="cursor-pointer text-primary underline font-normal text-[10px]">
                                View course
                              </div>
                            </div>
                          </div>
                        </div>
                      {/* ))} */}
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
