"use client";

// import Sidebar from "../../../components/Sidebar";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import DashboardNav from "../../../../../components/DashboardNav";
import Sidebar from "../../../../../components/Sidebar";
import { useEffect, useState } from "react";
import { GetApi } from "../../../../../utils/Actions";

const GetStarted = () => {
  const router = useRouter();
  const params = useParams();

  const [data, setData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [nameCourse, setNameCourse] = useState({
    name: "",
    code: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const GetLecturer = async () => {
      try {
        setLoading(true);
        const response = await GetApi(
          `api/course/lecturer-course/${params.id}`
        );
        if (response.success) {
          setData(response.data);
        } else {
          setErrorMsg(response.message);
        }
      } catch (err) {
        console.log(err);
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    GetLecturer();
  }, []);

  const handleCancelClick = () => {
    router.push(`/dashboard`);
  };

  const handleCourseSelect = (e, name, code) => {
    setSelectedCourse(e.target.id)
    setNameCourse({ name: name, code: code })
  };

  const handleContinueClick = () => {
    if(selectedCourse == "") return;
    const courseName = `${nameCourse.name} (${nameCourse.code})`
    router.push(`/lecturer/courses/continue/event/${params.id}?courseId=${selectedCourse}&courseName=${courseName}`);
  };

  return (
    <div className="flex">
      <Sidebar params={params.id} />
      <div className="ml-60 w-full">
        <div className="bg-white w-full h-[128px]">
          <DashboardNav params={params.id} />
        </div>

        <div className="mt-4">
          <div className="mr-10">
            <p className="flex flex-col items-center text-black font-bold text-[32px] mr-10">
              Create an Event
            </p>
          </div>
          <div className="ml-60">
            <p className="font-semibold text-[24px] text-black">
              Choose from your courses
            </p>
            <div className="mt-4">
              <form className="space-y-2">
                {/* Radio Inputs */}
                {loading ? (
                  <>Loading...</>
                ) : (
                  data.map((res, index) => (
                    <>
                      <div key={index}>
                        <input
                          type="radio"
                          id={res._id}
                          name="course"
                          className="mr-2"
                          onChange={(e) => handleCourseSelect(e, res.name, res.code)}
                        />
                        <label htmlFor="course1" className="text-lg text-black">
                          {res.name} ({res.code})
                        </label>
                      </div>
                    </>
                  ))
                )}

                {/* Buttons */}
                <div className="flex flex-row items-center justify-center mr-60 mt-12 gap-10">
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="w-48 bg-white border border-primary text-primary rounded-full h-12 text-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleContinueClick}
                    className="w-48 bg-primary text-white rounded-full h-12 text-lg font-medium hover:bg-primary-dark"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
