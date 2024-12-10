"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getUserId } from "../../../utils/session";
import { GetApi } from "../../../utils/Actions";
import NotificationModal from "./NotificationModal";

const DashboardNav = (props) => {
  
  const router = useRouter();
  const params = useParams();
  const [data, setData] = useState({})

  const [courses, setCourses] = useState("");
    
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true); // Show the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Hide the modal
  };

useEffect(() => {
  
  const GetStudent = async () => {
    try {
      const response = await GetApi(`api/student/${props.params}`);
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

  GetStudent();

}, [])

const JoinClass = () => {
  router.push(`/student/courses/join-class/${params.id}`);
};
const handleNotification = () => {
  router.push(`/student/notification/${params.id}`);
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
      <button onClick={JoinClass} className="bg-primary text-white rounded-md h-[41px] px-6 py-2">
        Join the class
      </button>
      <div className="flex items-center cursor-pointer">
        <div onClick={handleOpenModal} >
          <NotificationModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
        <Link href={`/student/profile/${props.params}`}
          className="flex items-center cursor-pointer"
        >
          <Image
            src={data.image ? data.image : "/assets/images/user.png"}
            alt="Dr. James Adetola"
            width={50}
            height={50}
            className="rounded-full h-[50px] w-[50px]"
          />
          <p className="ml-2 text-black font-semibold">Hi, {data.firstname}</p>
        </Link>
      </div>
    </header>
  );
};

export default DashboardNav;
