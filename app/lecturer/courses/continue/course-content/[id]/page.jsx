"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../../../../../../components/Sidebar";
import DashboardNav from "../../../../../../components/DashboardNav";
import { useRouter, useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { BsFillTrashFill } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import Image from "next/image";
import Modal from "react-modal";
import { GetApi, usePutApi } from "../../../../../../utils/Actions";
import axios from "axios";
import { ContinueBtn } from "../../../../../../components/Forms/Btn";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const CourseId = searchParams.get("courseId")
  //const title = searchParams.get("title");
  //const imgSrc = searchParams.get("imgSrc");
  //const { id } = useParams(); // This will correctly extract the dynamic id from the URL
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedFile, setSelectedFile] = useState(null); // State to manage selected file
  const [fileStatus, setFileStatus] = useState("pending"); // State to track file processing status

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
    
  const [sections, setSections] = useState([
    {
      count: 1,
      title: "Introduction",
      content: "",
      fileStatus: "pending",
      lectures: [{ count: 1, title: "Introduction to the Course" }],
      quizzes: [],
      assignments: [],
    },
  ]);


   
  useEffect(() => {
    const fetchCourse = async() =>{
      try {
        try {
          setLoading(true);
          const response = await GetApi(`api/course/${CourseId}`)
          if (response.success) {
            setData(response.data);
            if(response.data.section.length > 0) setSections(response.data.section);
            setSelectedImage(response.data.thumbnail)
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



  const [quizSections, setQuizSections] = useState([
    {
      id: "",
      title: "",
      description: "",
      quiz: [{ id: 1, title: "", description: "" }],
    },
  ]);

  //modal state
  const [convertmodalIsOpen, setConvertModalIsOpen] = useState(false);

  const convertopenModal = () => {
    //navigate("/");
    setConvertModalIsOpen(true);
  };

  const convertcloseModal = () => {
    setConvertModalIsOpen(false);
  };

  //handle image upload state
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Display the selected image
      setUploadSuccess(true); // Show the success message
    }
  };


  // States for managing the addition of lectures, quizzes, and assignments
  const [newLecture, setNewLecture] = useState("");
  const [isAddingLecture, setIsAddingLecture] = useState(null); // Track lecture input visibility per section
  const [newQuiz, setNewQuiz] = useState({ title: "", description: "" }); // Track quiz data
  const [isAddingQuiz, setIsAddingQuiz] = useState(null); // Track quiz input visibility per section
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
  }); // Track assignment data
  const [isAddingAssignment, setIsAddingAssignment] = useState(null); // Track assignment input visibility per section




  const addSection = () => {
    const newSection = {
      count: sections.length + 1,
      title: `Section ${sections.length + 1}`,
      lectures: [],
      fileStatus: "pending",
      quizzes: [],
      assignments: [],
    };
    setSections([...sections, newSection]);
  };


    
  // Function to handle file selection
  const handleFileChange = (e, sectionIndex) => {
    const updatedSections = [...sections];

    setSelectedFile(e.target.files[0]);
    updatedSections[sectionIndex].content = e.target.files[0];
    
    setFileStatus("processing"); // Set status to processing after file selection
    updatedSections[sectionIndex].fileStatus = "processing";
    
    // Simulate file upload process
    setTimeout(() => {
      setFileStatus("successful"); // Set status to successful after file processing
      updatedSections[sectionIndex].fileStatus = "successful";
      setIsModalOpen(false); // Close modal after file selection
    }, 2000); // Simulate a 2-second file upload process

    setSections(updatedSections);
  };

  const handleAddLecture = (sectionIndex) => {
    const updatedSections = [...sections];
    const newLectureId = updatedSections[sectionIndex].lectures.length + 1;

    updatedSections[sectionIndex].lectures.push({
      count: newLectureId,
      title: newLecture,
    });

    setSections(updatedSections);
    setNewLecture(""); // Reset input
    setIsAddingLecture(null); // Close input box
  };

  // Function to add a new quiz to a section
  const handleAddQuiz = (sectionIndex) => {
    const updatedSections = [...sections];
    const newQuizId = sections[sectionIndex].quizzes.length + 1;

    updatedSections[sectionIndex].quizzes.push({
      count: newQuizId,
      title: newQuiz.title,
      description: newQuiz.description,
    });

    setSections(updatedSections);
    setNewQuiz({ title: "", description: "" }); // Reset quiz input
    setIsAddingQuiz(null); // Close quiz form
  };

  // Function to add a new assignment to a section
  const handleAddAssignment = (sectionIndex) => {
    const updatedSections = [...sections];
    const newAssignmentId =
      updatedSections[sectionIndex].assignments.length + 1;

    updatedSections[sectionIndex].assignments.push({
      // id: newAssignmentId,
      title: newAssignment.title,
      description: newAssignment.description,
    });

    setSections(updatedSections);
    setNewAssignment({ title: "", description: "" }); // Reset assignment input
    setIsAddingAssignment(null); // Close assignment form
  };

  //handle submit button
  const handleSubmit = async () => {

    setLoading(true);

    for (let i = 0; i < sections.length; i++) {
      if(typeof sections[i].content === "string") continue;
      const formData = new FormData();
      formData.append("file", sections[i].content)
      formData.append("upload_preset", "e-learning-files")
      formData.append("cloud_name", "ayomikun")

      try {
       const cloud_response = await axios.post("https://api.cloudinary.com/v1_1/ayomikun/auto/upload", formData)
       console.log(cloud_response.data)
        sections[i].content = await cloud_response.data.secure_url;

        setSections([...sections]);

      } catch(err) {
        console.log(err)
        setErrorMsg(err.message);
      }
      
    }


    try {
     
      const response = await usePutApi(`api/course/${CourseId}`, {section: sections, progress: data.progress && data.progress >= 60 ? data.progress : 60});
      if (response.success) {
        setErrorMsg("");
        convertopenModal();

      } else {
        setErrorMsg(response.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }

    // router.push("/dashboard");
  };

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
          {/* Course Content Header */}
          <h1 className="text-3xl font-bold text-center mb-6">
            Course Content
          </h1>

          {/* Sections & Lectures */}
          {sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="border border-black mb-6 rounded-sm bg-[#EEEFF4] p-4"
            >
              <p className="text-[20px] text-black font-bold mb-1">
                Section {section.count}:
              </p>
              <div className="flex flex-row items-center gap-2 mb-4">
                <Image
                  src="/assets/file-preview.png"
                  width={24}
                  height={24}
                  alt="file preview"
                />
                <p className="text-black font-medium text-[20px]">
                  {section.title}
                </p>
              </div>
              {/* Lectures */}
              {section.lectures.map((lecture, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white border-black border p-3 mb-4 rounded-sm"
                >
                  {/* Lecture Info */}
                  <div className="flex justify-between items-center">
                    <div className="flex flex-row items-center">
                      <div className="flex flex-row items-center">
                        <Image
                          src="/assets/check-black.png"
                          width={24}
                          height={24}
                          alt="check"
                        />
                        <p className="text-lg ml-1">
                          <span className="font-medium text-black text-[20px]">
                            Lecture {lecture.count}:
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-row ml-2 items-center">
                        <Image
                          src="/assets/file-preview.png"
                          width={24}
                          height={24}
                          alt="file preview"
                          className="w-[24px] h-[24px]"
                        />
                        <p className="text-black font-medium text-[20px]">
                          {lecture.title}
                        </p>
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <MdOutlineEdit className="cursor-pointer text-xl text-black" />
                        <BsFillTrashFill className="cursor-pointer text-xl text-black" />
                      </div>
                    </div>
                    {/* + Content Button */}
                    <div className="flex flex-row items-center gap-2">
                      <div
                        onClick={() => setIsModalOpen(true)} // Open modal on click
                        className="flex bg-white items-center gap-2 cursor-pointer border-black border p-3  rounded-sm h-[45px] w-[141px]"
                      >
                        <Image
                          src="/assets/add-black.png"
                          width={24}
                          height={24}
                          className="w-[24px] h-[24px]"
                          alt="Image alt"
                        />
                        <p className="text-black font-medium text-[20px]">
                          Content
                        </p>
                      </div>
                      <Image
                        src="/assets/keyboard_arrow_down.png"
                        width={24}
                        height={24}
                        className="w-[24px] h-[24px] cursor-pointer"
                        alt="dropdown"
                      />
                    </div>
                  </div>

                  {/* File Status Section */}
                  <div className="mt-4 flex flex-row items-center">
                    <div className="flex flex-col justify-center items-start">
                      {/* Show the processing or success message based on file status */}
                      {sections[sectionIndex].fileStatus === "processing" && (
                        <div className="flex flex-row items-center justify-center gap-3">
                          <Image
                            src="/assets/image-process.png"
                            width={150}
                            height={50}
                            className="w-[171px] h-[72px]"
                            alt="image alt"
                          />
                          <p className="text-red-500 font-medium">
                            Processing...
                          </p>
                        </div>
                      )}
                      {sections[sectionIndex].fileStatus === "successful" && (
                        <div className="flex flex-row items-center justify-center gap-3">
                          <Image
                            src="/assets/image-process.png"
                            width={150}
                            height={50}
                            alt="image alt"
                            className="w-[171px] h-[72px]"
                          />
                          <div className="flex flex-col">
                            <p className="text-[#0AA564] font-medium">
                              Successful
                            </p>
                            <div className="flex items-center">
                              <MdOutlineEdit className="cursor-pointer text-lg text-black mr-2" />
                              <p
                                onClick={() => setIsModalOpen(true)}
                                className="text-black font-medium cursor-pointer"
                              >
                                Edit Content
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Modal for uploading PDF */}
              {isModalOpen && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-xl p-8 w-[500px]">
                    <div className="flex justify-start">
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-lg"
                      >
                        &times;
                      </button>
                    </div>
                    <h2 className="text-center text-lg font-semibold mb-1">
                      Upload a PDF file
                    </h2>

                    <div className="p-6 flex flex-col justify-center items-center">
                      <div className="border-1 border-[#828282] flex flex-col justify-center w-full h-[206px] items-center bg-[#EEEFF4]">
                        <Image
                          src="/assets/pdf-icon.png" // Use a PDF icon image if available
                          alt="PDF Icon"
                          width={50}
                          height={50}
                          className="mb-4"
                        />
                        <p className="text-[24px] mb-2 text-black font-medium">
                          PDF
                        </p>
                      </div>
                      <div className="flex flex-row justify-center items-center mt-3">
                        <p className="text-black font-normal text-[20px]">
                          Drag and drop a pdf or {" "}
                        </p>
                        <label className="text-blue-600 underline cursor-pointer">
                          {" "}
                          select a file
                          <input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, sectionIndex)}
                          />
                        </label>
                      </div>
                    </div>
                    {selectedFile && (
                      <p className="mt-4 text-center text-sm text-gray-600">
                        Selected file: {selectedFile.name}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Quizzes */}
              {section.quizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start justify-between bg-white border-black border p-3 mb-4 rounded-sm"
                >
                  <div className="">
                    <div className="flex flex-row items-center">
                      <Image
                        src="/assets/check-black.png"
                        width={24}
                        height={24}
                        alt="check"
                      />
                      <p className="text-lg ml-1">
                        <span className="font-medium text-black text-[20px]">
                          Quiz {quiz.count}:
                        </span>{" "}
                      </p>
                      <MdOutlineEdit className="cursor-pointer text-xl text-black ml-1" />
                    </div>
                    <div className="flex flex-row items-start mt-3 gap-1">
                      <Image
                        src="/assets/file-preview.png"
                        width={20}
                        height={20}
                        alt="file preview"
                        className="w-[20px] h-[20px]"
                      />
                      {quiz.description}
                    </div>
                    <div className="flex bg-white items-center gap-1 cursor-pointer border-black border p-3 mt-5 rounded-sm h-[37px] w-[118px]">
                      <Image
                        src="/assets/add-black.png"
                        width={16}
                        height={16}
                        alt="image alt"
                        className="w-[16px] h-[16px]"
                      />
                      <p className="text-black font-medium text-[16px]">
                        Questions
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Assignments */}
              {section.assignments.map((assignment, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start justify-between bg-white border-black border p-3 mb-4 rounded-sm"
                >
                  <div className="">
                    <div className="flex flex-row items-center">
                      <Image
                        src="/assets/check-black.png"
                        width={24}
                        height={24}
                        alt="assignment"
                      />
                      <p className="text-lg ml-1">
                        <span className="font-medium text-black text-[20px]">
                          Assignment {assignment.count}:
                        </span>
                      </p>
                      <MdOutlineEdit className="cursor-pointer text-xl text-black ml-1" />
                    </div>

                    <div className="flex flex-row items-start mt-2 gap-1">
                      <Image
                        src="/assets/file-preview.png"
                        width={20}
                        height={20}
                        alt="file preview"
                        className="w-[20px] h-[20px]"
                      />
                      <p className="text-black font-medium text-[16px]">
                        {assignment.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Lecture Frame */}
              {isAddingLecture === sectionIndex && (
                <div className="border border-gray-300 p-4 mb-4 rounded-sm">
                  <label className="block text-lg mb-2">New Lecture:</label>
                  <input
                    type="text"
                    value={newLecture}
                    onChange={(e) => setNewLecture(e.target.value)}
                    placeholder="Enter a Title"
                    className="border border-gray-300 p-2 w-full mb-4"
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setIsAddingLecture(null)}
                      className="border border-gray-500 text-gray-500 rounded px-4 py-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAddLecture(sectionIndex)}
                      className="bg-primary text-white rounded px-4 py-2"
                    >
                      Add Lecture
                    </button>
                  </div>
                </div>
              )}

              {/* Add Quiz Frame */}
              {isAddingQuiz === sectionIndex && (
                <div className="border border-gray-300 p-4 mb-4 rounded-sm">
                  <label className="block text-lg mb-2">New Quiz:</label>
                  <input
                    type="text"
                    value={newQuiz.title}
                    onChange={(e) =>
                      setNewQuiz({ ...newQuiz, title: e.target.value })
                    }
                    placeholder="Enter a Title"
                    className="border border-gray-300 p-2 w-full mb-4"
                  />
                  <div className="border border-gray-300 p-2 w-full mb-4">
                    <button className="font-bold text-lg mr-2">B</button>
                    <button className="italic text-lg">I</button>
                    <textarea
                      value={newQuiz.description}
                      onChange={(e) =>
                        setNewQuiz({ ...newQuiz, description: e.target.value })
                      }
                      placeholder="Test Description."
                      className="border border-gray-300 p-2 w-full h-24"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setIsAddingQuiz(null)}
                      className="border border-gray-500 text-gray-500 rounded px-4 py-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAddQuiz(sectionIndex)}
                      className="bg-primary text-white rounded px-4 py-2"
                    >
                      Add Quiz
                    </button>
                  </div>
                </div>
              )}

              {/* Add Assignment Frame */}
              {isAddingAssignment === sectionIndex && (
                <div className="border border-gray-300 p-4 mb-4 rounded-sm">
                  <label className="block text-lg mb-2">New Assignment:</label>
                  <input
                    type="text"
                    value={newAssignment.title}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        title: e.target.value,
                      })
                    }
                    className="border border-gray-400 p-2 w-full mb-2"
                    placeholder="Enter assignment title"
                  />
                  <textarea
                    value={newAssignment.description}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        description: e.target.value,
                      })
                    }
                    className="border border-gray-400 p-2 w-full mb-2"
                    placeholder="Enter assignment description"
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleAddAssignment(sectionIndex)}
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      Add Assignment
                    </button>
                  </div>
                </div>
              )}

              {/* Add Lecture, Quiz, Assignment */}
              <div className="flex gap-8 mt-4 border-dashed border-2 border-primary py-2 px-6 rounded-sm text-primary">
                <button
                  onClick={() => setIsAddingLecture(sectionIndex)}
                  className="font-medium text-[20px] text-primary"
                >
                  + Lecture
                </button>
                <button
                  onClick={() => setIsAddingQuiz(sectionIndex)}
                  className="font-medium text-[20px] text-primary"
                >
                  + Quiz
                </button>
                <button
                  onClick={() => setIsAddingAssignment(sectionIndex)}
                  className="font-medium text-[20px] text-primary"
                >
                  + Assignment
                </button>
              </div>
            </div>
          ))}

          {/* Add Section */}
          <div className="flex justify-start mt-8">
            <button
              onClick={addSection}
              className="bg-white py-2 flex flex-row items-center justify-center gap-2 w-[247px] h-[56px] rounded-sm text-black border border-black font-medium text-[20px]"
            >
              <Image
                src="/assets/add-black.png"
                width={24}
                alt="image alt"
                height={24}
                className="w-[24px] h-[24px]"
              />{" "}
              Section
            </button>
          </div>

          {/* Course Image Upload */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-2">Course Image</h3>
            <div className="flex items-center mt-3">
              <div
                className={`w-[276px] h-[216px] flex items-center justify-center rounded-sm border ${
                  uploadSuccess
                    ? "border-green-500"
                    : "border-[#BDBDBD] bg-[#EEEFF4]"
                }`}
              >
                {/* Show selected image or placeholder */}
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded image"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    src="/assets/upload-image.png"
                    width={140}
                    height={140}
                    alt="upload image"
                  />
                )}
              </div>
              <div className="ml-6 gap-3">
                <p className="text-black text-[18px] font-normal mt-2 w-[628px] mb-2">
                  Upload your course image here. Important guidelines: 750x422
                  pixels, .jpg, .gif, or .png. No text on the image.
                </p>
                <input
                  type="file"
                  className="border rounded p-2"
                  onChange={handleImageUpload}
                />
                {/* Success message */}
                {uploadSuccess && (
                  <div className="flex bg-[#0A8E7E] w-full h-[64px] items-center justify-center">
                    <div className="flex flex-row items-center gap-2">
                      <Image
                        src="/assets/success-white.png"
                        width={20}
                        height={20}
                        className="w-[20px] h-[20px]"
                        alt="image alt"
                      />
                      <p className="text-white text-[16px] text-semibold">
                        Image is successfully uploaded!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-[64px] flex justify-center">
            {/* <button
              onClick={handleSubmit}
              className="bg-primary text-white py-3 px-8 rounded-full text-lg font-semibold"
            >
              Submit for Review
            </button> */}
            
            <ContinueBtn label="Submit for Review" loading={loading} handleClick={handleSubmit} />
          </div>

          <div className="flex items-center justify-center ">
            <Modal
              isOpen={convertmodalIsOpen}
              onRequestClose={convertcloseModal}
              contentLabel="success"
              className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-10"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
              <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-7 flex flex-col items-center m-3">
                <div className="p-3 mt-9 flex justify-center items-center">
                  <img
                    src="/assets/success-icon.png"
                    alt="success"
                    width={100}
                    height={100}
                    className="w-full h-auto items-center"
                  />
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-[26px] text-[#000000]">
                    SUCCESSFULL
                  </p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="font-medium text-center text-[16px] text-[#000000]">
                    You course IS SUCCESSFULLY CREATED
                  </p>
                </div>
                <button
                  onClick={convertcloseModal}
                  className="mt-6 bg-[#ffff] font-montserrat py-3 px-20 text-[#8E1011] border-[1.5px] border-[#8E1011] rounded-full uppercase w-full h-[60px]"
                >
                  done
                </button>
              </div>
            </Modal>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default page;
