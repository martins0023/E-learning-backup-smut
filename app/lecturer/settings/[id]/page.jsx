"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetApi } from "../../../../utils/Actions";

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
// Dynamically import ReactQuill without SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const Page = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the 'id' of the logged-in lecturer from the route parameters
  const [data, setData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const params = useParams();

  
  const [activeTab, setActiveTab] = useState("vlearningProfile");
  //const [biography, setBiography] = useState("");
  //const [isClient, setIsClient] = useState(false); // Track if on client side
  const [messageContent, setMessageContent] = useState("");

  const quillRef = useRef();
  useEffect(() => {
    if (quillRef.current && quillRef.current.getEditor) {
      const editor = quillRef.current.getEditor();
      // Any further customizations if needed
    }
  }, []);

  const createCourse = () => {
    router.push(`/lecturer/dashboard/getstarted/${params.id}`);
  };

  const navHome = () => {
    router.push(`/lecturer/dashboard/${id}`);
  };

  const [selectedImage, setSelectedImage] = useState("/assets/images/user.png");
  const [fileName, setFileName] = useState("No file selected");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <section>
      <header className="flex items-center justify-between pt-9 mr-5 ml-5">
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
              alt="name"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="ml-2 text-black font-semibold">Hi, {data.firstname}</p>
          </div>
        </div>
      </header>

      <div className="p-20">
        <div className="flex flex-row justify-between mb-8">
          <p className="text-black font-bold text-[48px]">Profile & Settings</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-8">
          <button
            className={`mr-8 pb-2 ${activeTab === "vlearningProfile" ? "border-b-4 border-primary text-primary font-semibold" : "text-gray-600"}`}
            onClick={() => setActiveTab("vlearningProfile")}
          >
            VLearning Profile
          </button>
          <button
            className={`pb-2 ${activeTab === "profilePicture" ? "border-b-4 border-primary text-primary font-semibold" : "text-gray-600"}`}
            onClick={() => setActiveTab("profilePicture")}
          >
            Profile Picture
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "vlearningProfile" ? (
          <div className="w-[859px]">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">First Name</label>
              <input
                type="text"
                placeholder={data.firstname}
                className="w-full border border-gray-300 p-4 rounded-md h-[66px]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Last Name</label>
              <input
                type="text"
                placeholder={data.lastname}
                className="w-full border border-gray-300 p-4 rounded-md h-[66px]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                placeholder={data.email}
                className="w-full border border-gray-300 p-4 rounded-md h-[66px]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Headline</label>
              <input
                type="text"
                placeholder="Headline"
                className="w-full border border-gray-300 p-4 rounded-md h-[66px]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Biography</label>
              {/*<div className="flex items-center space-x-2 mb-2">
                <button className="text-gray-700 font-semibold">B</button>
                <button className="text-gray-700 font-semibold italic">I</button>
                </div>*/}
              <textarea
                placeholder={data.bio}
                className="w-full border border-gray-300 p-2 rounded-md"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button className="bg-primary text-white px-6 rounded-full w-[184px] mt-4 text-[24px] h-[64px]">Save</button>
            </div>
          </div>
        ) : (
            <div className="w-[862px]">
            <label className="block font-semibold mb-4 text-[32px]">Image Preview</label>
            <div className="text-gray-600 text-[20px] mb-2">Minimum 200×200 pixels. Maximum 6000×6000 pixels</div>
            
            {/* Image Preview */}
            <div className="flex justify-center w-[862px] h-[393px] border-[1px] border-black items-center">
              <Image
                src={data.image ? data.image : {selectedImage}}
                alt="Profile Picture"
                width={320}
                height={320}
                className="w-[320px] h-[320px] object-cover"
              />
            </div>
      
            {/* Upload Section */}
            <div className="w-full mt-3 flex flex-row">
              {/* Display File Name */}
              <div className="bg-[#F2F2F2] border-black border-[1px] border-r-0 flex items-center w-[410px] h-[64px]">
                <p className="text-black text-[20px] ml-4">{fileName}</p>
              </div>
      
              {/* Upload Button */}
              <label className="bg-white flex items-center justify-center border-black border-[1px] w-[452px] h-[64px] cursor-pointer">
                <p className="text-black font-bold ml-4">Upload file</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
      
            {/* Save Button */}
            <div className="flex justify-end">
              <button className="bg-primary text-white px-6 rounded-full w-[184px] mt-4 text-[24px] h-[64px]">Save</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
