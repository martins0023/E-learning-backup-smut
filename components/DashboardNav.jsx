"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { GetApi, VerifyGetApi } from "../utils/Actions";

const DashboardNav = (props) => {
  const router = useRouter();
  const [data, setData] = useState({})
  const params = useParams();

    
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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


  // if (!data) return;

  // const handleNavProfile = () => {
  //   router.push("/lecturer/profile");
  // };

  const createCourse = () => {
    router.push(`/lecturer/dashboard/getstarted/${params.id}`);
  };
  return (
    <header className="flex items-center justify-between mb-8 pt-9 mr-5 ml-5">
      <div className="relative flex items-center w-full max-w-xl h-[52px] bg-white rounded-full p-3 border-black border-[1px]">
        <Image src="/assets/search.png" width={18} height={18} alt="search" />
        <input
          type="text"
          placeholder="Search your notes, lectures, class here."
          className="flex-grow px-4 py-2 outline-none text-[16px] font-medium border-black border-1"
        />
      </div>
      <button onClick={createCourse} className="bg-primary text-white rounded-md h-[41px] px-6 py-2">
        Start the Class
      </button>
      <div
        className="flex items-center cursor-pointer"
      >
        <div className="relative mr-4">
          <span className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-xs text-white">
            5
          </span>
          <Image
            src="/assets/notifications-bell.png"
            alt="Notifications"
            className="w-[48px] h-[48px]"
            width={48}
            height={48}
          />
        </div>
        <Link href={`/lecturer/profile/${props.params}`}
          className="flex items-center cursor-pointer"
        >
          <Image
            src={data.image ? data.image : "/assets/images/user.png"}
            // src="/assets/images/profile.jpg"
            alt="Dr. James Adetola"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p className="ml-2 text-black font-semibold capitalize">{data.lastname} {data.middlename} {data.firstname}</p>
        </Link>
      </div>
    </header>
  );
};

export default DashboardNav;
