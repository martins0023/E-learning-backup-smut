"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import DashboardNav from "../../components/DashboardNav";
import Sidebar from "../../components/Sidebar";
//import coursesData from "@app/student/data/courses";
import coursesData from "../../data/courses"; // Import course data
import { GetApi } from "../../../../utils/Actions";

const CoursesPage = () => {
  const params = useParams();
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  const [details, setDetails] = useState({});
  const [courses, setCourses] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false);

  const filteredCourses = coursesData.filter((course) => {
    if (filter === "all") return true;
    return course.addedTime === filter;
  });

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
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2 items-center bg-black p-3 h-[37px]">
              <Image
                src="/assets/activity.png"
                width={20}
                height={20}
                className="w-[25px] h-[25px] rounded-full"
                alt="profile"
              />
              <p className="text-white font-semibold text-[20px]">Courses</p>
            </div>
            <div className="flex justify-end">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-black font-medium text-[16px] bg-white border p-3 rounded-sm"
              >
                <option value="NEWEST">Newest</option>
                <option value="OLDEST">Oldest</option>
                <option value="RECENT">Recent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[30px] mt-5">
            {loadingCourse ? (
              <>Loading...</>
            ) : (
              courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-outline border-[1px] border-[#00000046] cursor-pointer"
                  onClick={() => navigateToDetails(course._id)}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={"/assets/course1.png"}
                      width={188}
                      height={188}
                      alt="course"
                      className="w-[188px] h-[188px] p-2 rounded-xl"
                    />
                    <div>
                      <p className="font-bold text-black text-[20px]">
                        {course.name} ({course.code})
                      </p>
                      <div className="flex items-center gap-2">
                        <Image
                          src={course?.lecturer_id.image ? course?.lecturer_id.image : "/assets/images/user.png"}
                          width={25}
                          height={25}
                          className="rounded-full"
                          alt="lecturer"
                        />
                        <p className="font-medium text-black text-[16px]">
                          {course.lecturer_id.lastname} {course.lecturer_id.firstname}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesPage;
