"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../../components/Forms/Input";
import { Btn } from "../../../components/Forms/Btn";
import { usePostApi } from "../../../utils/Actions";

const Signup = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleContinue = async () => {
    if (inputValue == "") return;
    try {
      setLoading(true);
      const response = await usePostApi(`api/lecturer/check-lecturer`, {
        staff_id: inputValue,
      });
      if (response.success) {
        setErrorMsg("");
        router.push(`/lecturer/getstarted/createpassword/${response.data?._id}`);
      } else {
        setErrorMsg(response.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }

    // router.push(`/lecturer/getstarted/createpassword/123`);
  };

  const handleLogin = () => {
    router.push(`/lecturer/getstarted/login`);
  };

  const handleSignup = () => {
    router.push(`/lecturer/getstarted`);
  };

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <section className="flex h-screen bg-[#F9F9F9]">
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-[#F9F9F9]">
        <img src="/assets/logo.png" alt="vconnet" className="mb-6" />
        <h1 className="text-3xl font-bold text-[#B22222] mb-2">
          You are Welcome!
        </h1>
        <p className="text-sm text-primary mb-8">
          Please{" "}
          <span onClick={handleLogin} className="underline cursor-pointer">
            login
          </span>
          /
          <span onClick={handleSignup} className="underline cursor-pointer">
            Signup
          </span>{" "}
          to your account.
        </p>
        <form className="w-full max-w-md">
          <p
            className="block text-gray-700 text-sm font-bold mb-2 text-center text-[18px]"
            htmlFor="staff-id"
          >
            Please enter your Staff Identity number
          </p>

          <Input handleChange={handleInputChange} id="staff_id" type="text" placeholder="Enter staff ID" value={inputValue} />

          <div className="text-red-700 text-center font-bold">{errorMsg}</div>

          <div className="flex items-center justify-center mt-5">
            <Btn label="Continue" handleClick={handleContinue} disabled={inputValue ? false : true} loading={loading} />
          </div>
        </form>
      </div>
      <div className="w-1/2 flex justify-center items-center p-10 bg-[#FFFFFF]">
        <div className="flex flex-col justify-center items-center">
          <img src="/assets/diploma.png" alt="Diploma" className="mt-4" />
        </div>
      </div>
    </section>
  );
};

export default Signup;
