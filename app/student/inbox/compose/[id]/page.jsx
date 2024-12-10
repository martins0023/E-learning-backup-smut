"use client";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Sidebar from "../../../components/Sidebar";
import DashboardNav from "../../../components/DashboardNav";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
// import DynamicTextEditor from "../../../../components/Forms/DynamicTextEditor";

const messages = [];

const InboxPage = (props) => {


  const params = useParams();
  const DynamicTextEditor = dynamic(
    () => import("../../../../../components/Forms/DynamicTextEditor"),
    { ssr: false }
  );

  const [sortOrder, setSortOrder] = useState("Newest");
  const [filter, setFilter] = useState("All");
  const [messageContent, setMessageContent] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const router = useRouter();
  const navigateToInbox = (type) => {
    router.push(`/student/inbox/${params.id}`); // Navigate to the provided type URL
  };

  // const navigateBack = (type) => {
  //   router.push("/student/inbox"); // Navigate to the provided type URL
  // };

  const handleQuillChange = (value) => {
    setMessageContent(value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // if (file) {
    //   const uploadSimulation = setInterval(() => {
    //     setUploadProgress((prev) => {
    //       if (prev >= 100) {
    //         clearInterval(uploadSimulation);
    //         setUploadedFile(file.name); // Show file name on successful upload
    //         return 100;
    //       }
    //       return prev + 10; // Simulate upload progress
    //     });
    //   }, 200); // Adjust time interval as needed
    // }
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
          className="p-8"
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
          {/* Search and Filter Options */}
          <div className="flex items-center gap-[60px] mb-6">
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
            <div>
              <div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="text-gray-600 font-medium text-[16px] bg-white border p-4 rounded-sm w-[154px]"
                >
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Compose New Message Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Compose New Message
            </h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="To:"
                className="w-full p-3 border border-gray-300 rounded-md mb-2"
              />
              <input
                type="text"
                placeholder="Subject:"
                className="w-full p-3 border border-gray-300 rounded-md mb-2"
              />
            </div>

            {/* Rich Text Editor with React Quill */}
            <div className="border border-gray-300 rounded-md p-3 mb-4 h-[300px]">
              <DynamicTextEditor value={messageContent} handleDes={handleQuillChange} />
            </div>

            {/* Attachment Section */}
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/assets/attachment.png"
                width={29.35}
                height={31.16}
                className="w-[29.35px] h-[31.16px]"
                alt="attachment"
              />
              <span className="text-gray-600 font-semibold">Attachment</span>
            </div>
            <div className="border-2 border-dashed border-primary p-8 text-center mb-4 text-gray-600">
              <label className="cursor-pointer">
                DRAG FILE HERE OR{" "}
                <span className="text-primary">BROWSE FILE</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2 text-primary">
                  Uploading: {uploadProgress}%
                </div>
              )}
              {uploadProgress === 100 && uploadedFile && (
                <div className="mt-2 text-green-600 flex flex-row gap-2 items-center">
                  <Image
                    src="/assets/check_circle.png"
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px]"
                    alt="attachment"
                  />
                  Uploaded: {uploadedFile}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 items-center">
              <button
                onClick={navigateToInbox}
                className="px-4 py-2 border justify-center border-gray-300 rounded-full h-[44px] w-[157px] items-center"
              >
                Cancel
              </button>
              <button className="flex justify-center px-4 h-[44px] py-2 bg-primary text-white rounded-full items-center w-[157px]">
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InboxPage;
