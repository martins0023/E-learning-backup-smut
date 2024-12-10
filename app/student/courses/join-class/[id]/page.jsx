"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../../../components/DashboardNav";
import Sidebar from "../../../components/Sidebar";
import { GetApi } from "../../../../../utils/Actions";

const page = () => {
  const params = useParams();
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  const [details, setDetails] = useState({});
  const [courses, setCourses] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false);

//   const filteredCourses = coursesData.filter((course) => {
//     if (filter === "all") return true;
//     return course.addedTime === filter;
//   });

  useEffect(() => {

    const getStudent = async () => {
      try {
        setLoadingStudent(true);
        const response = await GetApi(`api/student/${params.id}`);
        if (response.success) {
          setDetails(response.data);
          setErrorMsg("");

          setLoadingCourse(true);
          await GetApi(
            `api/course/course-student/student?level=${response.data.level}&department=${response.data.department}`
          )
            .then((result) => {
              if (result.success) {
                setCourses(result.data);
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
              setLoadingCourse(false);
            });
        } else {
          setErrorMsg(response.message);
        }
      } catch (err) {
        console.log(err);
        setErrorMsg(err.message);
      } finally {
        setLoadingStudent(false);
      }
    };

    getStudent();
  }, []);

  const navigateToDetails = (id) => {
    router.push(`/student/courses/course-detail/${params.id}?courseId=${id}`); // Navigate to dynamic page
  };

  const navigateToSchedule = (id) => {
    router.push(`/student/courses/classroom/start/schedule/${params.id}?courseId=${id}`); // Navigate to dynamic page
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
                      <div className="grid grid-cols-2 gap-[24px] mt-4">
                        {loadingCourse ? (
                          <>Loading...</>
                        ) : (
                          courses.map((course) => (
                            <div className="w-[618px]">
                              <div
                                key={course.id}
                                className="bg-primary h-[180px] p-4 rounded-lg rounded-b-none"
                              >
                                <h3 className="text-[24px] font-bold text-white mt-1">
                                    {course.name} ({course.code})
                                </h3>
                                <p className="text-white font-normal text-[12px] mt-2">{course.lecturer_id.lastname} {course.lecturer_id.firstname}</p>

                                <div className="flex flex-row gap-2 items-center mt-2">
                                  <Image
                                    src="/assets/access-date.png"
                                    className="w-[16px] h-[16px]"
                                    width={16}
                                    height={16}
                                  />
                                  <p className="text-white font-normal text-[12px]">{course.schedule.time}</p>
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
                                    <p className="text-black text-[20px] font-bold">
                                      {course.schedule.duration}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex flex-row items-center gap-[54.5px]">
                                  <Image
                                    onClick={() => navigateToSchedule(course._id)}
                                    src="/assets/next-east.png"
                                    className="w-[40px] h-[40px] cursor-pointer"
                                    width={40}
                                    height={40}
                                  />
                                  <div key={course.id} onClick={() => navigateToDetails(course._id)} className="cursor-pointer text-primary underline font-normal text-[10px]">
                                    View course
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
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