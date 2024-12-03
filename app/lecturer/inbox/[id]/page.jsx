"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../../components/Sidebar";
import DashboardNav from "../../../../components/DashboardNav";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { GetApi } from "../../../../utils/Actions";

const messages = [
  {
    id: 1,
    sender: "Ojo Oyewole (CYS/HND/3280)",
    subject: "Introducing our new tool!",
    snippet: "A small river named Duden flows by their supplies necessary regalia.",
    date: "20 Mar 2018",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    attachment: "My-Photo.jpgAustralia-trip.ppt",
    time: "11:30 AM",
    profileImage: "/assets/images/user.png"
  },
  {
    id: 2,
    sender: "Musiliu Ishola (CYS/HND/3250)",
    subject: "Introducing our new tool!",
    snippet: "A small river named Duden flows by their supplies necessary regalia.",
    date: "20 Mar 2018",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    attachment: "My-Photo.jpgAustralia-trip.ppt",
    time: "11:30 AM",
    profileImage: "/assets/images/user.png"
  },
  {
    id: 3,
    sender: "Ronke Tolani (CYS/HND/3330)",
    subject: "Getting started on how to run innovation and premier!",
    snippet: "A small river named Duden flows by their supplies necessary regalia.",
    date: "20 Mar 2018",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    attachment: "My-Photo.jpgAustralia-trip.ppt",
    time: "11:30 AM",
    profileImage: "/assets/images/user.png"
  },
  {
    id: 4,
    sender: "Wuse Asake (CYS/HND/3230)",
    subject: "Checking for latest update on the previous assignment!",
    snippet: "A small river named Duden flows by their supplies necessary regalia.",
    date: "20 Mar 2018",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    attachment: "My-Photo.jpgAustralia-trip.ppt",
    time: "11:30 AM",
    profileImage: "/assets/images/user.png"
  },
  // Add more messages as needed for demonstration
];

const InboxPage = (props) => {
  const params = useParams();
  const router = useRouter();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const navigateToCompose = (id) => {
    router.push(`/lecturer/inbox/compose/${params.id}`); // Navigate to dynamic page
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === "Unread") return !message.isRead;
    if (filter === "Marked") return message.isMarked;
    return true;
  });

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <Sidebar params={params.id} />

      {/* Main Content */}
      <div className="ml-60 w-full">
        {/* Dashboard Navigation */}
        <div className="bg-white w-full h-[128px]">
          <DashboardNav params={params.id} />
        </div>

        {/* Content */}
        <motion.div
          className="p-8 flex"
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
          {/* Message List */}
          <div className="w-1/3 pr-4 ">
            {/* Filters and Sort */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4">
                {["All", "Unread", "Marked"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilter(tag)}
                    className={`${
                      filter === tag
                        ? "text-primary font-bold text-[14px]"
                        : "text-[#8C8C8C]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="text-gray-600 font-medium text-[16px] bg-white border p-4 rounded-sm w-[154px]"
              >
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>

            {/* Message Items */}
            <div>
              {filteredMessages.map((message) => (
                <div>
                  <div
                    key={message.id}
                    onClick={() => handleSelectMessage(message)}
                    className={`cursor-pointer p-4 rounded-sm gap-1 mb-2 flex flex-row ${
                      selectedMessage?.id === message.id
                        ? "bg-primary text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <div>
                      <Image
                        src={message.profileImage}
                        width={45}
                        height={40}
                        className="w-[45px] h-[40px] rounded-full"
                        alt={message.sender}
                      />
                    </div>
                    <div>
                      <div className="flex flex-row items-center justify-between">
                        <p className="font-bold">{message.sender}</p>
                        <p className="text-gray-500 text-[10px]">
                          {message.date}
                        </p>
                      </div>
                      <p className="text-[14px] font-semibold text-primary">
                        {message.subject}
                      </p>
                      <p className="text-[14px] font-normal text-[#ABAFB3]">
                        {message.snippet}
                      </p>
                    </div>
                  </div>
                  <hr className="w-full h-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div className="w-2/3 pl-4">
            {selectedMessage ? (
              <div>
                <div className="flex flex-row gap-1">
                  <Image
                    src={selectedMessage.profileImage}
                    width={45}
                    height={40}
                    className="w-[45px] h-[40px] rounded-full"
                    alt={selectedMessage.sender}
                  />
                  <div>
                    <p className="text-black text-[16px] font-bold">
                      {selectedMessage.sender}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      To: Me, {selectedMessage.date}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-[24px] text-primary">
                  {selectedMessage.subject}
                </p>

                <div className="flex flex-row justify-between mt-">
                    <p className="text-[#ABAFB3] text-[14px] font-semibold">To:Me,ladipo@gmail.com</p>
                    <p className="text-[#ABAFB3] text-[14px] font-semibold">{selectedMessage.time}</p>
                </div>
                <p className="text-sm mb-4 mt-5">{selectedMessage.content}</p>
                <p className="text-sm font-bold mb-4">Kind Regards</p>
                <p className="text-sm">{selectedMessage.sender}</p>
                <div className="mt-4">
                  <p className="font-bold">Attachment:</p>
                  <a href="#" className="text-blue-500">
                    {selectedMessage.attachment}
                  </a>
                </div>
                {/* Reply Box */}
                <div className="mt-4">
                  <textarea
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="It's really amazing, I want to know more about it...!"
                  ></textarea>
                  <div className="justify-end flex-end flex">
                  <button className="flex justify-center mt-2 px-4 h-[44px] py-2 bg-primary text-white rounded-full items-center w-[157px]">
                    Send
                  </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Select a message to view details or{" "}
                <span onClick={navigateToCompose} className="underline text-primary cursor-pointer">
                  compose a message
                </span>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InboxPage;
