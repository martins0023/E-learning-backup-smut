"use client";

import Sidebar from "../../../../../../components/Sidebar";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import DashboardNav from "../../../../../../components/DashboardNav";
import { useEffect, useState } from "react";
import { GetApi, usePutApi } from "../../../../../../utils/Actions";
import { ContinueBtn } from "../../../../../../components/Forms/Btn";

const EventPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const CourseId = searchParams.get("courseId");
  const CourseName = searchParams.get("courseName");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [data, setData] = useState({})

  // State to manage selected frequency and duration
  const [selectedFrequency, setSelectedFrequency] = useState("once");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedDuration, setSelectedDuration] = useState("1 hr");
  const [selectedTime, setSelectedTime] = useState("12:00");

  // Function to handle frequency selection
  const handleFrequencyChange = (frequency) => {
    setSelectedFrequency(frequency);
    // Reset day and duration when frequency changes
    if (frequency === "once") setSelectedDuration("1 hr");
    if (frequency === "daily") setSelectedDay("Mo"); // Reset to Monday for daily
    if (frequency === "weekly") setSelectedDay("Monday"); // Reset for weekly
    if (frequency === "monthly") setSelectedDay("1st of Month");
  };

  // Function to handle day selection (for daily/weekly/monthly frequencies)
  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  // Function to handle duration selection
  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  // Function to handle time selection
  const handleTime = (time) => {
    setSelectedTime(time);
  };

     
  useEffect(() => {
    const fetchCourse = async() =>{
      try {
        try {
          setLoading(true);
          const response = await GetApi(`api/course/${CourseId}`)
          if (response.success) {
            setData(response.data);
            if(response.data.schedule.frequency ) setSelectedFrequency(response.data.schedule.frequency);
            if(response.data.schedule.day ) setSelectedDay(response.data.schedule.day);
            if(response.data.schedule.duration ) setSelectedDuration(response.data.schedule.duration);
            if(response.data.schedule.time ) setSelectedTime(response.data.schedule.time);
          } else {
            setData({});
            setErrorMsg(response.message);
          }
        } catch (err) {
          setErrorMsg(err.message);
        } finally {
          setLoading(false);
        }
      } catch (e) {

      }
    }

    fetchCourse()
  }, [])

  const handleNext = async () => {

    const schedule = {
      frequency : selectedFrequency,
      day: selectedDay,
      duration: selectedDuration,
      time: selectedTime,
    }


    try {
      setLoading(true);
      const response = await usePutApi(`api/course/${CourseId}`, {
        schedule: schedule,
        progress: data.progress && data.progress >= 80 ? data.progress : 80,
      });
      if (response.success) {
        setErrorMsg("");
        router.push(`/lecturer/courses/continue/event/class-link/${params.id}?courseId=${CourseId}`);
      } else {
        setErrorMsg(response.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar params={params.id} />

      {/* Main Content */}
      <div className="ml-60 w-full">
        {/* Dashboard Navigation */}
        <div className="bg-white w-full h-[128px]">
          <DashboardNav params={params.id} />
        </div>

        {/* Event Creation Section */}
        <div className="flex flex-col items-center w-full mt-8 ">
          <p className="text-black font-bold text-[32px]">Create an Event</p>

          {/* Selected Course Information */}
          <div className="w-full max-w-5xl mt-8 bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="text-[20px] text-black font-semibold">{CourseName}</p>
          </div>

          {/* Frequency Selection */}
          <div className="w-full max-w-5xl mt-6 p-4">
            <h3 className="font-semibold text-lg mb-4">Frequency</h3>
            <div className="flex justify-between gap-8">
              {["once", "daily", "weekly", "monthly"].map((frequency) => (
                <button
                  key={frequency}
                  className={`px-4 py-2 rounded-full w-full border ${
                    selectedFrequency === frequency
                      ? "bg-black text-white"
                      : "bg-white text-black border-black"
                  }`}
                  onClick={() => handleFrequencyChange(frequency)}
                >
                  {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Day Selection for Daily Frequency */}
          {selectedFrequency === "daily" && (
            <div className="w-full max-w-5xl mt-6 p-4">
              <h3 className="font-semibold text-lg mb-4">Day</h3>
              <div className="flex justify-between gap-8">
                {["Mo", "Tu", "We", "Th", "Fr"].map((day) => (
                  <button
                    key={day}
                    className={`px-4 py-2 w-full rounded-full border ${
                      selectedDay === day
                        ? "bg-black text-white"
                        : "bg-white text-black border-black"
                    }`}
                    onClick={() => handleDayChange(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Duration Selection */}
          <div className="w-full max-w-5xl mt-6 p-4">
            <h3 className="font-semibold text-lg mb-4">Duration</h3>
            <div className="flex justify-between gap-8">
              {["5 min", "10 min", "20 min", "30 min", "1 hr"].map(
                (duration) => (
                  <button
                    key={duration}
                    className={`px-4 py-2 w-full rounded-full border ${
                      selectedDuration === duration
                        ? "bg-black text-white"
                        : "bg-white text-black border-black"
                    }`}
                    onClick={() => handleDurationChange(duration)}
                  >
                    {duration}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Time Selection */}
          <div className="w-full max-w-5xl mt-6 p-4">
            <h3 className="font-semibold text-lg mb-4">Time</h3>
            <div className="relative flex items-center">
              <Image
                src="/assets/time.png"
                alt="Time image"
                width={20}
                height={20}
                className="absolute left-3 text-gray-500"
              />
              <input
                type="time"
                className="pl-10 pr-4 py-2 w-[290px] rounded-md border border-gray-400"
                value={selectedTime}
                onChange={(e) => handleTime(e.target.value)}
              />
            </div>
          </div>

          {/* Cancel and Next Buttons */}
          <div className="flex gap-8 items-center justify-between mt-6 mb-20">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2 h-[53px] bg-white items-center border w-[163px] border-primary text-primary rounded-full"
            >
              Cancel
            </button>
            {/* <button
              onClick={handleNext}
              className="px-6 py-2 bg-primary h-[53px] items-center text-white rounded-full w-[163px]"
            >
              Next
            </button> */}
            <ContinueBtn label="Next" loading={loading} handleClick={handleNext} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
