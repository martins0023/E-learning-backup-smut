"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../../../components/Forms/Input";
import { Btn } from "../../../../components/Forms/Btn";

import { loginApi } from "../../../../utils/Actions";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.push(`/student/getstarted/login`);
  };

  const handleSignup = () => {
    router.push(`/student/getstarted`);
  };

  const [value, setValue] = useState({
    matric_no: "",
    password: "",
    role: "student"
  });

  // Function to handle input change
  const handleInputChange = (e, name) => {
    setValue({ ...value, [name]: e.target.value });
  };

  const Inputs = [
    {
      id: "staff_id",
      name: "matric_no",
      type: "text",
      placeholder: "Enter matric number",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      type: showPassword ? "text" : "password", // Toggle between text/password
      placeholder: "Enter password",
    },
  ]

    
  const handleContinue = async() => {

    if(value.matric_no === "" || value.password === "") return 
// CYS/ND/F22/3411
    try {
      setLoading(true);
      const response = await loginApi(`api/auth/login`, value);
      if (response.success) {
        setErrorMsg("");
        router.push(`/student/dashboard/${response.data._id}`);
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
    <section className="flex h-screen bg-[#F9F9F9]">
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-[#F9F9F9]">
        <img src="/assets/logo.png" alt="vconnet" className="mb-6" />
        <h1 className="text-3xl font-bold text-[#B22222] mb-2">
          Welcome Back!
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
          <p className="block text-gray-700 text-sm font-bold mb-2 text-center text-[18px]">
            Please enter your matriculation number
          </p>
          {Inputs.map((input, i) => (
            <div key={i} className="relative mb-4">
              <Input
                {...input}
                value={value[input.name]}
                handleChange={handleInputChange}
              />
              {/* Toggle visibility for password input */}
              {input.name === "password" && (
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <img src="/assets/visibility_on.png" alt="Show" />
                  ) : (
                    <img src="/assets/visibility_off.png" alt="Hide" />
                  )}
                </span>
              )}
            </div>
          ))}
          <div className="flex justify-between items-center">
            <div className="gap-2 flex justify-between">
              <input type="checkbox" id="checkbox" className="" />
              <p className="text-[#0000005b] text-[12px]">Remember Me</p>
            </div>

            <div className="cursor-pointer">
              <p className="text-[#0000005b] text-[12px]">Forgot Password?</p>
            </div>
          </div>

           {/* THIS DISPLAY THE ERROR MESSAGE */}
           <div className="text-red-700 text-center font-bold">{errorMsg}</div>

          <div className="flex items-center justify-center mt-5">
          <Btn
              label="Login"
              handleClick={handleContinue}
              disabled={value.matric_no ? false : true}
              loading={loading}
            />
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
