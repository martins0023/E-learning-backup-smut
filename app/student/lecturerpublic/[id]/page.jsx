"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetApi } from "../../../../utils/Actions";
import coursesData from "../../data/courses"; // Import course data
import LogoutButton from "../../../../components/LogoutButton";
import DashboardNav from "../../components/DashboardNav";
import Sidebar from "../../components/Sidebar";

const Page = () => {
  const router = useRouter();
  const { id } = useParams(); // Get 'id' from route parameters
  const [data, setData] = useState({});
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingCourse, setLoadingCourse] = useState(false);
  const params = useParams();

  const GetLecturer = async (id) => {
    try {
      const response = await GetApi(`api/lecturer/get-user/${id}`);
      if (response.success) {
        return response.lecturerdata;
      } else {
        console.error(response.message);
        return null;
      }
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  

  useEffect(() => {
    const GetStudent = async () => {
      try {
        const response = await GetApi(`api/student/${id}`);
        if (response.success) {
          setData(response.data);
          setCourses(response.data.courses || []); // Assuming courses is inside response.data
          setErrorMsg("");
        } else {
          setErrorMsg(response.message);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      GetStudent();
    }
  }, [id]); // Run effect when 'id' changes

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

  const createCourse = () => {
    router.push(`/student/dashboard/getstarted/${id}`);
  };

  const navHome = () => {
    router.push(`/student/dashboard/${id}`);
  };

  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <section>
      <header className="flex items-center justify-between mb-8 pt-9 mr-5 ml-5">
        <div onClick={navHome} className="cursor-pointer">
          <Image src="/assets/logo.png" alt="vconnect" width={183} height={66} />
        </div>

        <div className="relative flex items-center w-full max-w-xl h-[52px] bg-white rounded-full p-3 border-black border-[1px]">
          <Image src="/assets/search.png" width={18} height={18} alt="search" />
          <input
            type="text"
            placeholder="Search your notes, lectures, class here."
            className="flex-grow px-4 py-2 outline-none text-[16px] font-medium border-black border-1"
          />
        </div>

        <button onClick={createCourse} className="bg-primary text-white rounded-md h-[41px] px-6 py-2">
          Join class
        </button>

        <div className="flex items-center cursor-pointer">
          <div className="relative mr-4">
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-xs text-white">
              5
            </span>
            <Image src="/assets/notifications-bell.png" alt="Notifications" width={40} height={40} />
          </div>

          <div className="flex items-center">
            <Image
              src={data.image || "/assets/images/user.png"}
              alt={`${data.firstname || "User"} ${data.lastname || ""}`}
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px]"
            />
            <p className="ml-2 text-black font-semibold">Hi, {data.firstname || "User"}</p>
          </div>
        </div>
      </header>

      <div className="p-20">
        <div className="mb-10 cursor-pointer" onClick={handleBack}>
          <Image src="/assets/back_icon.png" width={25} height={20} alt="Back" />
        </div>

        <div className="flex flex-row justify-between gap-10">
          <div className="flex flex-col">
            <Image src={data.image || "/assets/images/user.png"} width={200} height={200} className="w-[200px] h-[200px] rounded-full" />
            <p className="text-black font-bold text-[30px] mt-4">
              Hello,<span className="uppercase"> {data.firstname || ""} {data.lastname || ""}</span>
            </p>
            <p className="text-black font-medium text-[20px]">{data.role || "Student"}</p>

            <div className="mt-4">
              <p className="text-black font-bold text-[18px]">About me</p>
              <p className="w-[563px] font-medium text-[16px]">Fullname:  <span className="text-black font-normal uppercase">{data.firstname || "No data available"} {data.lastname || "No data available"}</span> </p>
              <p className="w-[563px] font-medium text-[16px]">Matriculation Number:  <span className="text-black font-normal">{data.matric_no || "No data available"}</span> </p>
              <p className="w-[563px] font-medium text-[16px]">Level:  <span className="text-black font-normal">{data.level || "No data available"}</span> </p>
              <p className="w-[563px] font-medium text-[16px]">Department:  <span className="text-black font-normal">{data.department || "No data available"}</span> </p>
              <p className="w-[563px] font-medium text-[16px]">Session:  <span className="text-black font-normal">{data.session || "No data available"}</span> </p>
              <p className="w-[563px] font-medium text-[16px]">Email:  <span className="text-black font-normal">{data.email || "No data available"}</span> </p>
            </div>

            <div className="mt-4">
              <LogoutButton />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-bold text-[20px]">My courses </p>
            <div className="flex flex-row gap-[40px] flex-wrap">
              {coursesData.map((course) => (
                <div key={course.id} className="flex flex-col" onClick={() => navigateToDetails(course._id)}>
                  <Image src={course.courseImage} width={306} height={256} alt="Course Thumbnail" />
                  <p className="text-black font-bold text-[18px] w-[286px]">{course.courseName}</p>
                  <p className="text-black font-normal text-[14px] mt-1 w-[286px]">{course.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
