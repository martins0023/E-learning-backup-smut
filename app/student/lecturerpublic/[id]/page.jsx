"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GetApi } from "../../../../utils/Actions";
import DashboardNav from "../../../../components/DashboardNav";
import Sidebar from "../../../../components/Sidebar";
import LogoutButton from "../../../../components/LogoutButton";

const Page = () => {
  const { id } = useParams(); // Lecturer ID from URL
  const router = useRouter();
  const [lecturer, setLecturer] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [courses, setCourses] = useState([]);
  const params = useParams();

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

  const handleBack = () => {
    router.back(); // Navigate to the previous page
  };

  useEffect(() => {
    const fetchLecturerDetails = async () => {
      try {
        setLoading(true);
        const response = await GetApi(`api/lecturer/${id}`);
        if (response.success) {
          setLecturer(response.data);
        } else {
          setErrorMsg(response.message || "Failed to fetch lecturer details");
        }
      } catch (err) {
        setErrorMsg("An error occurred while fetching lecturer details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLecturerDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <section>
      <div className="flex flex-col">
        <div className="p-20">
          <div className="mb-10 cursor-pointer" onClick={handleBack}>
            <Image
              src="/assets/back_icon.png"
              width={25}
              height={20}
              alt="Back Icon"
              className="w-[25px] h-[20px] rounded-full"
            />
          </div>
          <div className="flex flex-row justify-between gap-10">
            {/* Lecturer Information */}
            <div className="flex flex-col">
              <Image
                src={lecturer?.image ? lecturer?.image : "/assets/images/user.png"}
                width={200}
                height={200}
                className="w-[200px] h-[200px] rounded-full"
              />
              <p className="text-black font-bold text-[30px] mt-4">
                Mr {lecturer?.firstname} {lecturer?.lastname}
              </p>
              <p className="text-black font-medium text-[20px]">{lecturer?.role}</p>
              <div className="mt-4">
                <p className="text-black font-bold text-[18px]">About me</p>
                <p className="w-[563px] font-normal text-[16px]">{lecturer?.bio}</p>
              </div>
              {/* <div className="mt-4">
                <LogoutButton />
              </div> */}
            </div>

            {/* Courses Information */}
            <div className="flex flex-col gap-4">
              <p className="font-bold text-[20px]">Courses Taught</p>
              <div className="flex flex-row gap-[40px] flex-wrap">
                {courses.map((course) => (
                  <div key={course._id} className="flex flex-col">
                    <Image
                      src={course.thumbnail}
                      width={306}
                      height={256}
                      alt="Course Thumbnail"
                      className="h-[300px] w-[300px]"
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
      </div>
    </section>
  );
};

export default Page;
