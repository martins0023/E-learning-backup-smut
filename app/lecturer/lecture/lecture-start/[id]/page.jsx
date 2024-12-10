"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Sidebar from "../../../../../components/Sidebar";
import DashboardNav from "../../../../../components/DashboardNav";
import Image from "next/image";
import { GetApi } from "../../../../../utils/Actions";

const groupDetails = {
    id: 1,
    name: "Group A",
    topic: "(CYS301) Application Security to Cyber Security",
    dueDate: "Mon SEP 14",
    time: "10:00AM",
    students: [
        { id: 1, name: "James Adetola", regNo: "CYS/F22/3280", present: false },
        { id: 2, name: "Ridwallunai Olawale", regNo: "CYS/F22/3281", present: false },
        { id: 3, name: "Ojo Oyewole", regNo: "CYS/F22/3282", present: false },
    ],
};

const Page = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState("all");
    const [groupStudents, setGroupStudents] = useState(groupDetails.students);
    const [searchQuery, setSearchQuery] = useState("");
    const [allowAttendance, setAllowAttendance] = useState(false);
    const router = useRouter();
    const courseId = searchParams.get("courseId");
    const [course, setCourse] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loadingCourse, setLoadingCourse] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleBack = () => {
        router.push(`/dashboard/group/groups`);
    };

    const filteredStudents = groupStudents.filter((student) => {
        const matchesSearch = searchQuery
            ? student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.regNo.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        if (filter === "all") return matchesSearch;
        if (filter === "present") return matchesSearch && student.present;
        if (filter === "absent") return matchesSearch && !student.present;
    });

    const toggleAttendance = (id) => {
        setGroupStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === id
                    ? { ...student, present: !student.present }
                    : student
            )
        );
    };

    const handleSave = () => {
        console.log("Attendance Saved:", groupStudents);
        alert("Attendance has been saved successfully!");
    };

    useEffect(() => {
        const getCourses = async () => {
            try {
                setLoadingCourse(true);
                const response = await GetApi(`api/course/lecturer-course/${params.id}`);
                if (response.success) {
                    setCourses(response.data);

                    // Find the specific course using courseId
                    const selectedCourse = response.data.find((course) => course._id === courseId);
                    setCourse(selectedCourse || null);
                } else {
                    setErrorMsg(response.message);
                }
            } catch (err) {
                console.error(err);
                setErrorMsg(err.message);
            } finally {
                setLoadingCourse(false);
            }
        };
        getCourses();
    }, [courseId, params.id]);

    return (
        <div className="flex w-full">
            <Sidebar params={params.id} />

            <div className="ml-60 w-full">
                <div className="bg-white w-full h-[128px]">
                    <DashboardNav params={params.id} />
                </div>

                <div className="p-8 flex justify-between">
                    <div className="flex flex-col w-[641px]">
                        <div className="p-2 gap-7 bg-[#F2F2F2]">
                            <p className="text-black font-bold text-[28px]">
                                {course ? `(${course.code}) ${course.name}` : "Loading course details..."}
                            </p>
                        </div>

                        <div className="flex flex-col gap-8 mt-16 ">
                            <div className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2">
                                <Image
                                    src="/assets/add-black.png"
                                    width={20}
                                    height={20}
                                    alt="add"
                                />
                                <p className="text-black text-[14px] font-medium">
                                    Assignment Group
                                </p>
                            </div>

                            <div className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2">
                                <Image
                                    src="/assets/add-black.png"
                                    width={20}
                                    height={20}
                                    alt="add"
                                />
                                <p className="text-black text-[14px] font-medium">
                                    Project Group
                                </p>
                            </div>

                            <div className="flex justify-center items-center border border-black w-[600px] h-[56px] cursor-pointer gap-2">
                                <Image
                                    src="/assets/add-black.png"
                                    width={20}
                                    height={20}
                                    alt="add"
                                />
                                <p className="text-black text-[14px] font-medium">
                                    Presentation Group
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[424px]">
                        <div className="flex flex-row mb-3 gap-2 items-center">
                            <Image
                                src="/assets/attendance-icon.png"
                                width={36}
                                height={36}
                                alt="add"
                                className="h-[36px] h-[36px]"
                            />
                            <p className="text-primary font-bold text-[32px]">Attendance</p>
                        </div>

                        <div className="border-black border-[1px] h-fit p-3 pb-10">
                            <div className="mt-8">
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    className="w-full border p-2 rounded"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-4 mt-4">
                                <button
                                    className={`p-2 rounded border ${filter === "all" ? "bg-primary text-white" : ""}`}
                                    onClick={() => setFilter("all")}
                                >
                                    All
                                </button>
                                <button
                                    className={`p-2 rounded border ${filter === "present" ? "bg-primary text-white" : ""}`}
                                    onClick={() => setFilter("present")}
                                >
                                    Present
                                </button>
                                <button
                                    className={`p-2 rounded border ${filter === "absent" ? "bg-primary text-white" : ""}`}
                                    onClick={() => setFilter("absent")}
                                >
                                    Absent
                                </button>
                            </div>

                            <div className="mt-8">
                                {filteredStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between border p-2 rounded mt-2"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={`/assets/images/user.png`}
                                                alt={student.name}
                                                className="h-[60px] w-[60px] rounded-full"
                                            />
                                            <div>
                                                <p className="text-black font-semibold text-[16px]">{student.name}</p>
                                                <p className="text-gray-500 text-[14px]">{student.regNo}</p>
                                            </div>
                                        </div>
                                        <label className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={student.present}
                                                onChange={() => toggleAttendance(student.id)}
                                            />
                                            <span className="text-[14px]">{student.present ? "Present" : "Absent"}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <label className="flex items-center gap-3 mt-5">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5"
                                    checked={allowAttendance}
                                    onChange={(e) => setAllowAttendance(e.target.checked)}
                                />
                                <span className="text-[16px] font-medium">Allow students to mark attendance</span>
                            </label>

                            <button
                                className={`mt-4 w-full h-[40px] bg-primary text-white font-bold rounded-full ${allowAttendance ? "" : "opacity-50 cursor-not-allowed"
                                    }`}
                                disabled={!allowAttendance}
                                onClick={handleSave}
                            >
                                Save Attendance
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
