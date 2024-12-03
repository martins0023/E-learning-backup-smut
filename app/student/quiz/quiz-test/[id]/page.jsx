"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import DashboardNav from "../../../components/DashboardNav";
import Sidebar from "../../../components/Sidebar";
import { useRouter, useParams } from "next/navigation";

// Questions and options
const questions = [
  {
    id: 1,
    question: "What is the purpose of a CAPTCHA in online security?",
    options: [
      "Detecting Malware",
      "Blocking Ads",
      "Preventing automated bots",
      "Encrypting data",
    ],
    answer: 2,
  },
  {
    id: 2,
    question: "What is Phishing?",
    options: [
      "A method of fishing",
      "A technique to steal sensitive information",
      "Detecting Viruses",
      "Encrypting data",
    ],
    answer: 1,
  },
  {
    id: 3,
    question: "What does HTTPS stand for?",
    options: [
      "Hyper Text Transfer Protocol Secure",
      "Hyper Text Transfer Password",
      "Hyper Text Test Secure",
      "Hyper Test Transfer Protocol Simple",
    ],
    answer: 0,
  },
  {
    id: 4,
    question: "What is two-factor authentication?",
    options: [
      "A single method of login",
      "A way to bypass login",
      "A method that uses two ways of verification",
      "An encryption tool",
    ],
    answer: 2,
  },
  {
    id: 5,
    question: "What is a firewall?",
    options: [
      "A barrier to protect unauthorized access",
      "An encryption method",
      "A phishing tool",
      "A method of hacking",
    ],
    answer: 0,
  },
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const params = useParams();

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0 && !quizFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endQuiz();
    }
  }, [timeLeft, quizFinished]);

  const endQuiz = () => {
    setQuizFinished(true);
    setShowModal(true); // Show modal with the score
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      setShowModal(true); // Show modal if no answer is selected
    } else {
      if (selectedOption === questions[currentQuestion].answer) {
        setScore((prevScore) => prevScore + 1);
      }

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setTimeLeft(60);
      } else {
        endQuiz();
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Function to calculate stepper color based on current question
  const getStepperColor = (step) => {
    return currentQuestion >= step ? "border-primary border border-[3.48px]" : "bg-gray-200";
  };

  return (
    <div className="flex w-full">
      <Sidebar params={params.id} />

      <div className="ml-60 w-full">
        <div className="bg-white w-full h-[128px]">
          <DashboardNav params={params.id} />
        </div>

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
          <div className="justify-center flex flex-col items-center W-[899px]">
            <div className="gap-3 justify-center items-center flex flex-col">
              <p className="font-semibold text-[32px]">Cyber Security Quiz</p>
              <div className="flex justify-center items-center gap-3 mt-3">
                {questions.map((_, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`flex items-center justify-center w-[23.8px] h-[23.8px] rounded-full ${getStepperColor(
                        index
                      )}`}
                    >
                      <p className="text-center font-medium text-[13.93px] text-black">
                        {index + 1}
                      </p>
                    </div>
                    {index < questions.length - 1 && (
                      <div className="w-[40px] h-[3px] bg-gray-400"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {quizFinished ? null : (
              <div className="mt-5">
                <p className="text-black font-normal text-[24px]">
                  Q{currentQuestion + 1}.{" "}
                  <span className="font-semibold text-[32px]">
                    {questions[currentQuestion].question}
                  </span>
                </p>
                <div className="mt-5 gap-[10px]">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`cursor-pointer w-[899px] h-[81px] p-3 gap-2 items-center flex flex-row mt-3 ${
                        selectedOption === index
                          ? "bg-primary text-white"
                          : "bg-[#F4F3F6] text-black"
                      }`}
                    >
                      <div
                        className={`w-[39px] h-[39px] flex items-center justify-center rounded-full ${
                          selectedOption === index
                            ? "bg-white text-primary"
                            : "bg-[#EDE8E3] text-primary"
                        }`}
                      >
                        <p className="font-bold">
                          {String.fromCharCode(65 + index)}
                        </p>
                      </div>
                      <p className="font-medium text-[24px]">{option}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-row justify-between mt-5 w-[889px]">
                  <button
                    className="flex flex-row justify-items-center p-3 gap-1 justify-center items-center bg-outline border-[1px] border-black rounded-full w-[169.54px] h-[37.26px]"
                    disabled={currentQuestion === 0}
                    onClick={() => setCurrentQuestion((prev) => prev - 1)}
                  >
                    <Image
                      src="/assets/polygon-west.png"
                      width={7.55}
                      height={7.55}
                      className="w-[7.55px] h-[7.55px]"
                      alt="polygon-west"
                    />
                    <p className="text-black font-medium text-[13.93]">
                      Previous Question
                    </p>
                  </button>

                  <div className="flex flex-row items-center gap-3">
                    <Image
                      src="/assets/start-time.png"
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px]"
                      alt="polygon-east"
                    />
                    <p className="font-regular">
                      Countdown is{" "}
                      <span className="text-primary font-semibold">
                        {timeLeft} secs
                      </span>
                    </p>
                  </div>

                  <button
                    className="flex flex-row justify-items-center p-3 gap-1 justify-center items-center bg-primary rounded-full w-[169.54px] h-[37.26px]"
                    onClick={handleNextQuestion}
                  >
                    <p className="text-white font-medium text-[13.93]">
                      Next Question
                    </p>
                    <Image
                      src="/assets/polygon-east.png"
                      width={7.55}
                      height={7.55}
                      className="w-[7.55px] h-[7.55px]"
                      alt="polygon-east"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Modal for No Answer Selected and Final Score */}
            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-3xl w-[890px] h-[636px]">
                  {quizFinished ? (
                    <div className="flex flex-col items-center justify-center">
                      <h2 className="text-black font-semibold text-[36px] mb-4">
                        Quiz Completed!
                      </h2>
                      <div className="bg-primary rounded-full w-[428px] gap-[-20px] flex flex-col items-center justify-center h-[428px]">
                        <p className="text-white font-semibold text-[25px]">
                          Your score
                        </p>
                        <p className="font-bold text-[167.2px] w-[96.37px] h-[196.23px] text-white">
                          {score}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-items-center flex-col">
                      <h2 className="text-black font-semibold text-[36px] mb-4">
                        No answer selected
                      </h2>
                      <div className="bg-[#F5E5E5] flex items-center justify-center justify-items-center w-[794px] h-[56px] mt-3">
                        <p className="text-primary font-medium">
                          Oops! You Need To Select An Answer To Continue
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-center items-center">
                    <button
                      onClick={closeModal}
                      className="mt-4 bg-outline border-black border-[1px] text-black py-2 px-4 rounded-full w-[80px]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
