"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../../../components/DashboardNav";
import Sidebar from "../../../components/Sidebar";
import { GetApi } from "../../../../../utils/Actions";

const CourseDetails = () => {
  const searchParams = useSearchParams();
  const params = useParams();
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
            const lecturerResult = await GetApi(`api/lecturer/get-user/${result.data.lecturer_id.$oid}`);
            if (lecturerResult.success) {
              setLecturer(lecturerResult.data);
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

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const navigateToLecture = () => {
    router.push(`/student/courses/classroom/${params.id}`);
  };

  const navigateToLecturer = () => {
    router.push(`/lecturer/lecturerpublic/${lecturer?.staff_id}`);
  };

  if (loadingStudent || loadingCourse) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <div className="text-center">Course details not available</div>;
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
            {/* Course Overview Section */}
            <div className="flex flex-col">
              <div className="mb-10 cursor-pointer" onClick={handleBack}>
                <Image
                  src="/assets/back_icon.png"
                  width={25}
                  height={20}
                  className="w-[25px] h-[20px] rounded-full"
                />
              </div>
              <Image
                src={course?.thumbnail || "/assets/default-course.jpg"}
                width={513}
                height={300}
                alt="course"
                className="rounded-md w-[513px]"
              />
              <h1 className="text-[20px] w-[513px] font-bold mt-4">
                ({course?.code}) {course?.name}
              </h1>
              <p className="mt-2 w-[513px] text-left">{course?.desc}</p>
              <div className="bg-[#F2F2F2] w-[513px] p-3">
                <h2 className="text-[20px] font-bold">What you’ll learn</h2>
                <ul className="list-disc text-[16px] mt-2">
                  {course?.section?.length > 0 ? (
                    course.section.map((section, index) => (
                      <div
                        key={index}
                        className="flex flex-row gap-2 items-center"
                      >
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
                  ) : (
                    <p>No sections available</p>
                  )}
                </ul>
                <p className="text-[14px] font-bold">show more</p>
              </div>
            </div>

            {/* Course Content Section */}
            <div className="w-[563px] mt-10">
              <h2 className="text-[24px] font-bold">Course Content</h2>
              <div className="flex flex-col mt-2 gap-3">
                {course?.section?.map((section, index) => (
                  <div key={index}>
                    <div
                      className="flex flex-row items-center justify-between cursor-pointer"
                      onClick={() => toggleSection(index)}
                    >
                      <p className="font-medium text-[16px]">{section.title}</p>
                      <Image
                        src={
                          expandedSections[index]
                            ? "/assets/collapse.png"
                            : "/assets/add-black.png"
                        }
                        width={14}
                        height={14}
                        alt={expandedSections[index] ? "collapse" : "expand"}
                      />
                    </div>

                    {/* Render Lectures, Assignments, and Quizzes */}
                    {expandedSections[index] && (
                      <div className="text-[14px] mt-2 text-gray-600">
                        <h3 className="font-bold">Lectures</h3>
                        {section.lectures?.length > 0 ? (
                          section.lectures.map((lecture) => (
                            <p key={lecture._id.$oid}>• {lecture.title}</p>
                          ))
                        ) : (
                          <p>No lectures available</p>
                        )}

                        <h3 className="font-bold mt-4">Assignments</h3>
                        {section.assignments?.length > 0 ? (
                          section.assignments.map((assignment) => (
                            <p key={assignment._id.$oid}>
                              • {assignment.title} - {assignment.description}
                            </p>
                          ))
                        ) : (
                          <p>No assignments available</p>
                        )}

                        <h3 className="font-bold mt-4">Quizzes</h3>
                        {section.quizzes?.length > 0 ? (
                          section.quizzes.map((quiz) => (
                            <p key={quiz._id.$oid}>
                              • {quiz.title} - {quiz.description}
                            </p>
                          ))
                        ) : (
                          <p>No quizzes available</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div>
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

                <div className="mt-5 flex flex-col">
                  <p className="text-black font-semibold text-[20px]">
                    Lecturer
                  </p>
                  {lecturer ? (
                    <div className="flex flex-row mt-3 items-center justify-items-center gap-3">
                      <Image
                        src={lecturer.image || "/assets/images/user.png"}
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-full"
                        alt="Lecturer"
                      />
                      <p className="text-black font-semibold text-[18px]">
                        {`${lecturer.firstname} ${lecturer.lastname}`}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      Lecturer details not available
                    </div>
                  )}
                  <div>
                    <p className="mt-2 text-black text-[14px]">
                      {lecturer?.bio || "Lecturer biography not available."}
                    </p>
                    <p className="font-bold text-black">show more</p>

                    <button
                      onClick={navigateToLecturer}
                      className="border-black mt-3 outline border-0.5 text-[16px] items-center w-full h-[56px] rounded-none"
                    >
                      View Profile
                    </button>
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

export default CourseDetails;
