"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetApi } from "../../../../utils/Actions";
import LogoutButton from "../../../../components/LogoutButton";

const GetLecturer = async (id) => {
  try {
    const response = await GetApi(`api/lecturer/get-user/${id}`);
    if (response.success) {
      return response.data;
    } else {
      console.error(response.message);
      return null;
    }
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

const page = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the 'id' of the logged-in lecturer from the route parameters
  const [data, setData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const lecturerData = await GetLecturer(id);
        setData(lecturerData);
      }
    };

    const getCourses = async () => {
      try {
        const response = await GetApi(`api/course/lecturer-course/${id}`);
        if (response.success) {
          setErrorMsg("");
          setCourses(response.data || []); // Handle empty course list
        } else {
          setErrorMsg(response.message || "Failed to load courses.");
        }
      } catch (err) {
        setErrorMsg(err.message || "An error occurred while fetching courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    getCourses();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading while data is being fetched
  }

  if (!data) {
    return <p>Failed to load lecturer data.</p>;
  }

  const createCourse = () => {
    router.push(`/lecturer/dashboard/getstarted/${id}`);
  };

  const navHome = () => {
    router.push(`/lecturer/dashboard/${id}`);
  };

  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <section>
      <header className="flex items-center justify-between mb-8 pt-9 mr-5 ml-5">
        <div onClick={navHome} className="cursor-pointer">
          <Image
            src="/assets/logo.png"
            alt="vconnect"
            width={183}
            height={66}
          />
        </div>
        <div className="relative flex items-center w-full max-w-xl h-[52px] bg-white rounded-full p-3 border-black border-[1px]">
          <Image src="/assets/search.png" width={18} height={18} alt="search" />
          <input
            type="text"
            placeholder="Search your notes, lectures, class here."
            className="flex-grow px-4 py-2 outline-none text-[16px] font-medium border-black border-1"
          />
        </div>
        <button
          onClick={createCourse}
          className="bg-primary text-white rounded-md h-[41px] px-6 py-2"
        >
          Create New Class/Event
        </button>
        <div className="flex items-center cursor-pointer">
          <div className="relative mr-4">
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-xs text-white">
              5
            </span>
            <Image
              src="/assets/notifications-bell.png"
              alt="Notifications"
              className="w-[40px] h-[40px]"
              width={40}
              height={40}
            />
          </div>
          <div className="flex items-center">
            <Image
              src={data.image ? data.image : "/assets/images/user.png"}
              alt={`${data.firstname} ${data.lastname}`}
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="ml-2 text-black font-semibold">
              Hi, {data.firstname}
            </p>
          </div>
        </div>
      </header>

      <div className="p-20">
        <div className="mb-10 cursor-pointer" onClick={handleBack}>
        <Image
              src="/assets/back_icon.png"
              width={25}
              height={20}
              className="w-[25px] h-[20px] rounded-full"
            />
        </div>
        <div className="flex flex-row justify-between gap-10">
          <div className="flex flex-col">
            <Image
              src={data.image ? data.image : "/assets/images/user.png"}
              width={200}
              height={200}
              className="w-[200px] h-[200px] rounded-full"
            />
            <p className="text-black font-bold text-[30px] mt-4">
              Mr {data.firstname} {data.lastname}
            </p>
            <p className="text-black font-medium text-[20px]">{data.role}</p>
            <div className="mt-4">
              <p className="text-black font-bold text-[18px]">About me</p>
              <p className="w-[563px] font-normal text-[16px]">{data.bio}</p>
            </div>
            <div className="mt-4">
              <LogoutButton />
            </div>
          </div>

          <div className="flex justify-center flex-col gap-3">
            <p className="font-bold text-[20px]">
              My courses ({courses.length})
            </p>
            <div className="flex flex-row gap-[40px] flex-wrap">
              {courses.map((course) => (
                <div key={course._id} className="flex flex-col">
                  <Image
                    src={"/assets/cys321.png"}
                    width={306}
                    height={256}
                    alt="Course Thumbnail"
                  />
                  <p className="text-black font-bold text-[18px] w-[286px]">
                    {course.name}
                  </p>
                  <p className="text-black font-normal text-[14px] mt-1 w-[286px]">
                    {course.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
