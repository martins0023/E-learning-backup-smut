"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { Btn } from "../../../../components/Forms/Btn";
import { useRouter } from "next/navigation";
import { Input } from '../../../../components/Forms/Input';
import { loginApi } from '../../../../utils/Actions';

const Login = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //show password and hide
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  const [value, setValue] = useState({
    staff_id: "",
    password: "",
    role: "lecturer"
  });

  const Inputs = [
    {
      id: "staff_id",
      name: "staff_id",
      type: "text",
      placeholder: "Enter Staff ID",
    },
    {
      id: "password",
      name: "password",
      type: showPassword ? "text" : "password", // Toggle between text/password
      placeholder: "Enter password",
    },
  ]

  // Function to handle input change
  const handleInputChange = (e, name) => {
    setValue({ ...value, [name]: e.target.value });
  };

  const handleLogin = () => {
    router.push(`/lecturer/getstarted/login`);
  };

  const handleSignup = () => {
    router.push(`/lecturer/getstarted`);
  };

  const handleContinue = async () => {

    
    if(value.staff_id === "" || value.password === "") return 
// CYS/ND/F22/3411
    try {
      setLoading(true);
      const response = await loginApi(`api/auth/login`, value);
      if (response.success) {
        setErrorMsg("");
        router.push(`/lecturer/dashboard/${response.data._id}`);
      } else {
        setErrorMsg(response.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }


    // router.push(`/lecturer/dashboard`);
  }


  return (
    <section className="flex h-screen bg-[#F9F9F9]">
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-[#F9F9F9]">
        <img src="/assets/logo.png" alt="vconnet" className="mb-6" />
        <h1 className="text-3xl font-bold text-[#B22222] mb-2">
          Welcome back!
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
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input className="mr-2 leading-tight" type="checkbox" />
              <span className="text-sm text-gray-600">Remember Me</span>
            </label>
            <a href="#" className="text-sm text-[#B22222] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* THIS DISPLAY THE ERROR MESSAGE */}
          <div className="text-red-700 text-center font-bold">{errorMsg}</div>

          <div className="flex items-center justify-center mt-5">
            <Btn
              label="Login"
              handleClick={handleContinue}
              disabled={value.staff_id ? false : true}
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

export default Login;
