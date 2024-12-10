"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../../components/Sidebar";
import DashboardNav from "../../../../components/DashboardNav";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { GetApi } from "../../../../utils/Actions";

const page = () => {
    const router = useRouter();
    const params = useParams();


    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");

    const [courses, setCourses] = useState([]);
    const [loadingCourse, setLoadingCourse] = useState(false);

    // const courses = [
    //   {
    //     id: 1,
    //     title: "(CYS 313) Cyber Diplomacy and International Cooperation",
    //     status: "Draft",
    //     progress: 40, // Example percentage
    //     public: true,
    //     imgSrc: "/assets/cys313.png",
    //   },
    //   {
    //     id: 2,
    //     title: "(CYS 311) Introduction to Security and Policy Development",
    //     status: "Complete",
    //     progress: 100,
    //     public: true,
    //     imgSrc: "/assets/cyss311.png",
    //   },
    // ];

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
            } catch (err) {
                console.log(err);
                setErrorMsg(err.message);
            } finally {
                setLoading(false);
            }
        }
        getCourses();
    }, [courseId, params.id])

    const handleNavigate = (id) => {
        router.push(`/lecturer/courses/continue/${params.id}/?courseId=${id}`);

    };

    const lectureContinue = (id) => {
        router.push(`/lecturer/lecture/lecture-start/${params.id}/?courseId=${id}`);

    };

    if (loading) {
        <div>Loading...</div>
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
                                                courses.map((course, index) => (
                                                    <div className="w-[618px]">
                                                        <div
                                                            key={course.id}
                                                            className="bg-primary h-[180px] flex flex-row p-4 rounded-lg rounded-b-none"
                                                        >
                                                            <div className="flex flex-col">
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
                                                                <div className="mt-2">
                                                                    <p className="text-white font-normal text-[12px]">{course.level} level</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-end ml-20">
                                                                <Image
                                                                    src={course.thumbnail || "/assets/default-course.jpg"}
                                                                    width={68}
                                                                    height={68}
                                                                    alt="course"
                                                                    className="rounded-full w-[68px] h-[68px]"
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="bg-outline border-[1px] justify-between h-[129px] items-center p-3 flex flex-row border-[#0000003d]">
                                                            <div className="">
                                                                <p className="text-primary font-bold text-[20px]">
                                                                    Join the Class
                                                                </p>
                                                                <div className="w-[374px h-[45px] flex flex-row gap-1 p-1 ">
                                                                    <p className="text-[#757575] font-normal text-[12px] w-[352px]">
                                                                        class starts in {course.schedule.time}
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

                                                            <div
                                                                // Pass the entire course object

                                                                className="flex flex-row items-center gap-[54.5px]">
                                                                <Image
                                                                    onClick={() => lectureContinue(course._id)}
                                                                    src="/assets/next-east.png"
                                                                    className="w-[40px] h-[40px] cursor-pointer"
                                                                    width={40}
                                                                    height={40}
                                                                />
                                                                <div onClick={() => handleNavigate(course._id)} className="text-primary cursor-pointer underline font-normal text-[10px]">
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