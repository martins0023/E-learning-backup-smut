"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../../components/Sidebar";
import DashboardNav from "../../../../components/DashboardNav";
import { GetApi } from "../../../../utils/Actions";

const Dashboard = () => {
  const router = useRouter();
  const params = useParams();

  const handleGetstarted = () => {
    router.push(`/lecturer/dashboard/getstarted/${params.id}`);
  };

  const JoinClass = () => {
    router.push(`/dashboard/getstarted`);
  };

  const ViewDetails = () => {
    router.push(`/dashboard/getstarted`);
  };

  const [isClient, setIsClient] = useState(false);
  const [course, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsClient(true); // Ensures this logic runs only on the client-side

    const getCourses = async () => {
      try {
        setLoading(true)
        const response = await GetApi(`api/course/lecturer-course/${params.id}`)
        if (response.success) {
          setCourses(response.data)
          setErrorMsg("");
        } else {
          setErrorMsg(response.message);
        }
      } catch(err) {
        console.log(err);
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    }
    getCourses();

  }, []);



  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar params={params.id} />
      <div className="ml-60 w-full">
        {/* Dashboard Navigation */}
        <div className="bg-white w-full h-[128px]">
          {/* <Suspense fallback={<>Loading...</>}> */}
          <DashboardNav params={params.id} />
          {/* </Suspense> */}
        </div>
      <motion.div
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
        <div className="w-full p-6 bg-[#F9F9F9]">
          <div>
            <div className="mb-8">
              <div className="flex flex-row justify-between">
                {/* row 1 */}
                <div className="flex flex-col gap-[43px] ml-3">
                  <div className="flex flex-row justify-between mb-[-40px] items-center ">
                    <h2 className="text-xl font-bold text-[#000000] text-[24px]">
                      Today’s Schedule
                    </h2>
                    <p className="text-black text-[12px] font-medium underline">
                      view all
                    </p>
                  </div>{" "}
                  {/* schedule section */} {/* col 1 */}
                  <div className="flex flex-row gap-[24px] mt-4">
                    {loading == true ? <>Loading</> : (
                      course.length > 0 ? (
                        course.map((lecture, index) => (
                          <div
                            key={index}
                            className="bg-primary h-[250px] w-[233px] p-4 rounded-lg"
                          >
                            <p className="text-white text-[12px] font-normal">{`Lecture at ${lecture.time? lecture.time : "time no set yet"}`}</p>
    
                            <h3 className="text-[20px] font-bold text-white mt-1">
                              {lecture.name}
                            </h3>
                            <div className="flex flex-row gap-2 items-center mt-3">
                              <Image
                                src="/assets/access-time.png"
                                className="w-[16px] h-[16px]"
                                width={16}
                                height={16}
                              />
                              <p className="text-white font-normal text-[12px]">{`Class starts in ${lecture.startsIn}`}</p>
                            </div>
                            <div className="flex flex-row gap-2 items-center mt-2">
                              <Image
                                src="/assets/access-date.png"
                                className="w-[16px] h-[16px]"
                                width={16}
                                height={16}
                              />
                              <p className="text-white font-normal text-[12px]">{`${lecture.date}`}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                              <button className="text-[12px] bg-white w-[105px] rounded-sm h-[27px] text-primary justify-items-center text-center items-center">
                                Join the Class
                              </button>
                              <button className="text-white text-[10px]">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))
                      ) : "No course available"

                    )}
                    <div className="bg-white w-fit h-fit pb-4 rounded-lg">
                      <div className="flex flex-col gap-1 mt-2 p-3">
                        <div className="flex flex-row items-center gap-1">
                          <Image
                            src="/assets/access-time-gray.png"
                            width={12}
                            height={12}
                            alt="access time"
                            className="w-[12px] h-[12px]"
                          />
                          <p className="text-[10px] text-[#000000cc] font-normal">
                            Next at 01:30 Pm
                          </p>
                        </div>

                        <div className="flex flex-row items-center gap-1">
                          <Image
                            src="/assets/access-calendar.png"
                            width={12}
                            height={12}
                            alt="access time"
                            className="w-[12px] h-[12px]"
                          />
                          <p className="text-[10px] text-[#00000079] font-normal">
                            Mon Feb 14
                          </p>
                        </div>

                        <p className="text-[10px] text-[#000000c4] font-normal">
                          Hacking
                        </p>
                      </div>
                      <hr className="h-1 w-full text-[#000000c4] mt-2" />
                      <div className="flex flex-col gap-1  p-3">
                        <div className="flex flex-row items-center gap-1">
                          <Image
                            src="/assets/access-time-gray.png"
                            width={12}
                            height={12}
                            alt="access time"
                            className="w-[12px] h-[12px]"
                          />
                          <p className="text-[10px] text-[#000000cc] font-normal">
                            Next at 01:30 Pm
                          </p>
                        </div>

                        <div className="flex flex-row items-center gap-1">
                          <Image
                            src="/assets/access-calendar.png"
                            width={12}
                            height={12}
                            alt="access time"
                            className="w-[12px] h-[12px]"
                          />
                          <p className="text-[10px] text-[#00000079] font-normal">
                            Mon Feb 14
                          </p>
                        </div>

                        <p className="text-[10px] text-[#000000c4] font-normal">
                          Hacking
                        </p>
                      </div>
                      <hr className="h-1 w-full text-[#000000c4] mt-2" />
                      <div className="flex justify-center mt-4">
                        <Image
                          src="/assets/next.png"
                          className="cursor-pointer"
                          width={30}
                          height={30}
                          alt="next"
                        />
                      </div>
                    </div>
                  </div>
                  {/* col 2 */}
                  {/* Attendance section */}
                  <div className="flex flex-row gap-[32px]">
                    <div className="flex flex-col gap-[32px]">
                      <div className="bg-white p-4 rounded-lg w-[301px] h-[97px]">
                        <div className="flex flex-row gap-2">
                          <Image
                            src="/assets/person-icon.png"
                            className="h-[20px] w-[20px]"
                            width={20}
                            height={20}
                          />
                          <p className="text-[16px] font-semibold text-black">
                            Attendance
                          </p>
                        </div>

                        <p className="text-black font-medium text-[10px]">
                          Check student attendance.
                        </p>
                        <button className="text-black mt-3 underline text-[10px]">
                          View summary
                        </button>
                      </div>

                      <div className="bg-white p-4 rounded-lg w-[301px]">
                        <div className="flex flex-row items-center justify-items-center justify-between mb-3">
                          <p className="font-medium text-black text-[20px]">
                            Quick Upload
                          </p>
                          <Image
                            src="/assets/add.png"
                            className="w-[14px] h-[14px]"
                            width={14}
                            height={14}
                          />
                        </div>
                        <form className="flex gap-4 flex-col">
                          <div className="flex flex-row gap-4">
                            <select className="mb-2 p-1 border rounded-full w-[63px] h-[27px] text-[8px] items-center justify-items-center">
                              <option className="text-black text-[8px] font-normal">
                                Note
                              </option>
                              <option className="text-black text-[8px] font-normal">
                                Assignment
                              </option>
                            </select>
                            <select className="mb-2 p-1 border rounded-full w-[63px] h-[27px] text-[8px] items-center justify-items-center">
                              <option>Subject</option>
                              <option>Cyber Security</option>
                            </select>
                            <div className="relative">
                              <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                              />
                              <label
                                htmlFor="fileInput"
                                className="flex items-center justify-center mb-2 p-1 border rounded-full w-[63px] h-[27px] text-[8px] text-black font-medium cursor-pointer"
                              >
                                Attach
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="ml-1 h-3 w-3 text-black"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </label>
                            </div>
                          </div>
                          <div className="border rounded-md h-[99px] relative">
                            <textarea
                              className="w-full h-full border-none rounded-md p-2 text-[10px] resize-none"
                              placeholder="Type your message..."
                            ></textarea>
                            <button className="bg-[#8B0000] rounded-xl text-white absolute bottom-2 right-2 px-3 py-1 text-[10px]">
                              SEND
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Activity section */}
                    <div className="flex flex-col gap-[32px]">
                      <div className="bg-white p-4 rounded-lg h-fit w-[301px]">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-row gap-3">
                            <Image
                              src="/assets/activity.png"
                              width={25}
                              height={25}
                              className="w-[25px] h-[25px]"
                              alt="activity"
                            />
                            <p className="text-[14px] font-semibold text-black">
                              Activity
                            </p>
                          </div>

                          <div className="flex flex-row items-center justify-end">
                            <button className="text-black font-normal text-[10px] ">
                              View all
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          {[
                            {
                              title: "Mathematics for Cyber security",
                              time: "4 mins ago",
                              type: "Quiz",
                              resources: ["Shared PDF"],
                              icons: ["/assets/pdf.png"],
                            },
                            {
                              title: "Networking Essentials (NCC 311)",
                              time: "4 mins ago",
                              type: "Quiz",
                              resources: [
                                "Shared Ethical Hacking Notes & Study Material",
                              ],
                              icons: ["/assets/pdf.png", "/assets/doc.png"],
                            },
                            {
                              title: "Networking Essentials (NCC 311)",
                              time: "4 mins ago",
                              type: "Quiz",
                              resources: [
                                "Shared Ethical Hacking Notes & Study Material",
                              ],
                              icons: ["/assets/pdf.png", "/assets/doc.png"],
                            },
                            // Add more items here as needed
                          ].map((item, index) => (
                            <ul className="mt-5" key={index}>
                              <li className="flex flex-row justify-between text-black font-semibold text-[12px]">
                                {item.title}
                                <p className="text-[#00000075] font-normal text-[8px]">
                                  {item.time}
                                </p>
                              </li>
                              <p className="text-primary text-[8px] font-medium">
                                {item.type}
                              </p>
                              {item.resources.map((resource, resIndex) => (
                                <p
                                  key={resIndex}
                                  className="text-[#00000075] text-[8px] font-medium"
                                >
                                  {resource}
                                </p>
                              ))}
                              <div className="flex flex-row gap-1 mt-1">
                                {item.icons.map((icon, iconIndex) => (
                                  <Image
                                    key={iconIndex}
                                    src={icon}
                                    width={24}
                                    height={24}
                                    className="mt-1"
                                    alt="Resource Icon"
                                  />
                                ))}
                              </div>
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="flex justify-center items-center ml-4">
                  <div className="h-full w-[1px] bg-[#0000006b]"></div>
                </div>

                {/* row 2 */}
                <div className="flex flex-col mr-3">
                  <div className="bg-[#636363] h-[128px] w-[453px] ">
                    <div className="flex flex-row items-center justify-center mt-5 gap-8 ">
                      <Image
                        src="/assets/clock.png"
                        width={80}
                        height={80}
                        alt="clock"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="text-white font-bold text-[16px]">
                          Schedule time for class
                        </p>
                        <button
                          onClick={handleGetstarted}
                          className="h-[51px] font-semibold text-black bg-white rounded-full text-[16px]"
                        >
                          Get started
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-black font-bold text-[24px]">
                      Submissions
                    </p>

                    <div className="bg-white rounded-md mt-3">
                      <div className="p-5">
                        <div className="flex flex-row gap-3">
                          <Image
                            src="/assets/icon1.png"
                            width={30}
                            height={30}
                            className="w-[30px] h-[30px]"
                            alt="submission"
                          />
                          <div className="flex flex-col gap-1">
                            <p className="text-black font-semibold text-[12px]">
                              Cyber Security Assignment -1
                            </p>
                            <p className="text-black font-semibold text-[8px]">
                              02 July 2024 02:34 Pm
                            </p>
                          </div>

                          <div className="flex flex-row gap-1 ml-4">
                            <Image
                              src="/assets/pdf.png"
                              width={24}
                              height={24}
                              alt="PDF"
                              className="w-[24px] h-[24px]"
                            />
                            <Image
                              src="/assets/doc.png"
                              width={24}
                              height={24}
                              alt="DOC"
                              className="w-[24px] h-[24px]"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row relative">
                          <div className="flex flex-col gap-2 mt-1">
                            <div className="flex flex-row items-center gap-1">
                              <Image
                                src="/assets/correct.png"
                                width={20}
                                height={20}
                                alt="correct"
                                className="w-[20px] h-[20px]"
                              />
                              <p className="text-[#4BAE4F] font-semibold text-[10px]">
                                30 Submitted
                              </p>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                              <Image
                                src="/assets/pending.png"
                                width={20}
                                height={20}
                                alt="pending"
                                className="w-[20px] h-[20px]"
                              />
                              <p className="text-[#E7024D] font-semibold text-[10px]">
                                10 Submitted
                              </p>
                            </div>
                          </div>

                          <p className="absolute bottom-2 right-2 text-black text-[10px] underline font-medium">
                            View all
                          </p>
                        </div>
                        <hr className="h-1 w-full text-black mt-2" />

                        <div className="flex flex-row gap-3 mt-3">
                          <Image
                            src="/assets/icon1.png"
                            width={30}
                            height={30}
                            className="w-[30px] h-[30px]"
                            alt="submission"
                          />
                          <div className="flex flex-col gap-1">
                            <p className="text-black font-semibold text-[12px]">
                              Cyber Security Assignment -1
                            </p>
                            <p className="text-black font-semibold text-[8px]">
                              02 July 2024 02:34 Pm
                            </p>
                          </div>

                          <div className="flex flex-row gap-1 ml-4">
                            <Image
                              src="/assets/pdf.png"
                              width={24}
                              height={24}
                              alt="PDF"
                              className="w-[24px] h-[24px]"
                            />
                            <Image
                              src="/assets/doc.png"
                              width={24}
                              height={24}
                              alt="DOC"
                              className="w-[24px] h-[24px]"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row relative">
                          <div className="flex flex-col gap-2 mt-1">
                            <div className="flex flex-row items-center gap-1">
                              <Image
                                src="/assets/correct.png"
                                width={20}
                                height={20}
                                alt="correct"
                                className="w-[20px] h-[20px]"
                              />
                              <p className="text-[#4BAE4F] font-semibold text-[10px]">
                                30 Submitted
                              </p>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                              <Image
                                src="/assets/pending.png"
                                width={20}
                                height={20}
                                alt="pending"
                                className="w-[20px] h-[20px]"
                              />
                              <p className="text-[#E7024D] font-semibold text-[10px]">
                                10 Submitted
                              </p>
                            </div>
                          </div>

                          <p className="absolute bottom-2 right-2 text-black text-[10px] underline font-medium">
                            View all
                          </p>
                        </div>
                      </div>
                    </div>
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

export default Dashboard;
