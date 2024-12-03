"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"; // Import useState to handle expand/collapse state
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../../../components/DashboardNav";
import Sidebar from "../../../components/Sidebar";
import { GetApi } from "../../../../../utils/Actions";

const CourseDetails = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const courseId = searchParams.get("courseId")
  // const { id } = params;
  const router = useRouter();
  const [details, setDetails] = useState({});
  const [course, setCourse] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingStudent, setLoadingStudent] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false);



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
            `api/course/${courseId}`
          )
            .then((result) => {
              if (result.success) {
                setCourse(result.data);
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


  const [expandedSections, setExpandedSections] = useState({}); // State to track expanded sections

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const navigateToLecture = () => {
    router.push(`/student/courses/classroom/${id}`);
  };

  const navigateToLecturer = () => {
    //router.push(`/dashboard/profile/${id}`);
    router.push(`/dashboard/profile`);
  };

  if(loadingStudent) {
    return <div className="">Loading...</div>
  }

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
          <div className="flex gap-[60px]">
            <div>
              <Image
                src={course.thumbnail}
                width={513}
                height={300}
                alt="course"
                className="rounded-md w-[513px]"
              />
              <h1 className="text-[20px] w-[513px] font-bold mt-4">
                ({course.code}) {course.name}
              </h1>
              <p className="mt-2 w-[513px] text-left">{course.desc}</p>
              <div className="bg-[#F2F2F2] w-[513px] p-3">
                <h2 className="text-[20px] font-bold">What you’ll learn</h2>
                <ul className="list-disc text-[16px] mt-2">
                  {/* {
                    loadingCourse ? <>Loading...</> : (
                      course[0]?.section.map((section, index) => (
                        <div key={index} className="flex flex-row gap-2 items-center">
                          <Image
                            src="/assets/check.png"
                            width={14}
                            height={14}
                            className="w-[14px] h-[14px]"
                            alt="check"
                          />
                          <p>{section.title}</p>
                        </div>
                      ))

                    )
                  } */}
                </ul>
                <p className="text-[14px] font-bold">show more</p>
              </div>
            </div>

            {/* <div className="w-[563px]">
              <h2 className="text-[24px] font-bold">Course Content</h2>
              <div className="flex flex-col mt-2 gap-3">
                {course.content.map((section, index) => (
                  <div key={index}>
                    <div
                      className="flex flex-row items-center justify-between cursor-pointer"
                      onClick={() => toggleSection(index)}
                    >
                      <p className="font-medium text-[16px]">{section.title}</p>
                      <Image
                        src={expandedSections[index] ? "/assets/collapse.png" : "/assets/add-black.png"}
                        width={14}
                        height={14}
                        className=""
                        alt={expandedSections[index] ? "collapse" : "expand"}
                      />
                    </div>
                    {expandedSections[index] && (
                      <p className="text-[14px] mt-2 text-gray-600">{section.details}</p>
                    )}
                  </div>
                ))}
                <button
                  onClick={navigateToLecture}
                  className="flex flex-row gap-3 items-center mt-4 p-2 bg-black justify-center h-[56px] text-white w-full"
                >
                  Lecture room
                  <Image
                    src="/assets/east.png"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px]"
                    alt="lecture room"
                  />
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-20">
                <div>
                  <p className="text-black font-bold text-[24px]">Lecturer</p>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <Image
                    src={course?.lecturer_id.image ? course?.lecturer_id.image : "/assets/images/user.png"}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="lecturer"
                  />
                  <p>{course.lecturer_id.firstname} {course.lecturer_id.lastname}</p>
                </div>

                <div>
                  <p className="text-black font-normal text-[16px]">
                   {course.lecturer_id.bio}
                  </p>
                  <p className="font-bold mt-1">show more</p>
                </div>
              </div>
              <button onClick={navigateToLecturer} className="flex flex-row gap-3 items-center mt-4 p-2 bg-outline border border-black justify-center h-[56px] text-black w-full">
                View Profile
              </button>
            </div> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetails;
