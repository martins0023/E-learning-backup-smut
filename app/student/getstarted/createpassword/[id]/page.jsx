"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "../../../../../components/Forms/Input";
import { Btn } from "../../../../../components/Forms/Btn";
import { usePostApi } from "../../../../../utils/Actions";

// Function to evaluate password strength
const getPasswordStrength = (password) => {
  let strength = 0;

  // Increase strength score based on the presence of these character types
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  // Return the strength level (0 to 5)
  return strength;
};

const CreatePassword = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Password states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //show password and hide
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength states
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [confirmPasswordStrength, setConfirmPasswordStrength] = useState(0);

  // Handle changes to the password input
  const handlePasswordChange = (event) => {
    const pass = event.target.value;
    setPassword(pass);
    setPasswordStrength(getPasswordStrength(pass));
  };

  // Handle changes to the confirm password input
  const handleConfirmPasswordChange = (event) => {
    const pass = event.target.value;
    setConfirmPassword(pass);
    setConfirmPasswordStrength(getPasswordStrength(pass));
  };

  // Set password strength color based on strength level
  const getStrengthColor = (strength) => {
    if (strength <= 2) return "bg-red-500"; // Weak
    if (strength === 3) return "bg-orange-500"; // Medium
    return "bg-green-500"; // Strong
  };

  //set password strength text
  const getStrengthText = (strength) => {
    if (strength <= 2) return "Weak";
    if (strength === 3) return "Medium";
    return "Strong";
  };

  // Check if passwords match and are strong
  const isPasswordMatch = password === confirmPassword;
  const isFormValid =
    password === confirmPassword &&
    passwordStrength >= 3 &&
    confirmPasswordStrength >= 3;

  // Handle continue action when both conditions are satisfied
  const handleContinue = async () => {
    if (!isFormValid) return;
    try {
      const body = {
        password: password,
        role: "student",
      };
      setLoading(true);
      const response = await usePostApi(`api/auth/sign-up/${params.id}`, body);
      if (response.success) {
        setErrorMsg("");
        router.push(`/student/getstarted/welcome/${params.id}`);
      } else {
        setErrorMsg(response.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push(`/student/getstarted/login`);
  };

  const handleSignup = () => {
    router.push(`/student/getstarted`);
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
          <p className="block text-gray-700 text-sm font-bold mb-2 text-center text-[18px]">
            Please create your password
          </p>

          {/* Password Input */}
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              handleChange={handlePasswordChange}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mb-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img src="/assets/visibility_on.png" alt="Show" />
              ) : (
                <img src="/assets/visibility_off.png" alt="Hide" />
              )}
            </span>
          </div>

          {/* Password Strength Bar and Text */}
          <div className="mb-4">
            <div className="w-full h-1 bg-gray-300">
              <div
                className={`h-full ${getStrengthColor(
                  passwordStrength
                )} rounded-full`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold mt-1 block">
              {getStrengthText(passwordStrength)}
            </span>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Input
              id="confirmpassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              handleChange={handleConfirmPasswordChange}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <img src="/assets/visibility_on.png" alt="Show" />
              ) : (
                <img src="/assets/visibility_off.png" alt="Hide" />
              )}
            </span>
          </div>

          {/* Confirm Password Strength Bar and Text */}
          <div className="mb-4">
            <div className="w-full h-1 bg-gray-300">
              <div
                className={`h-full ${getStrengthColor(
                  confirmPasswordStrength
                )} rounded-full`}
                style={{ width: `${(confirmPasswordStrength / 5) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold mt-1 block">
              {getStrengthText(confirmPasswordStrength)}
            </span>
          </div>

          {/* Password Match Status */}
          <div
            className={`text-center mb-4 font-semibold ${
              isPasswordMatch ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPasswordMatch ? "Passwords match" : "Passwords do not match"}
          </div>

          {/* THIS DISPLAY THE ERROR MESSAGE */}
          <div className="text-red-700 text-center font-bold">{errorMsg}</div>

          {/* Continue Button */}
          <div className="flex items-center justify-center mt-5">
            <Btn
              label="Continue"
              handleClick={handleContinue}
              disabled={isFormValid ? false : true}
              loading={loading}
            />
          </div>
        </form>
      </div>

      {/* Right Side with Image */}
      <div className="w-1/2 flex justify-center items-center p-10 bg-[#FFFFFF]">
        <div className="flex flex-col justify-center items-center">
          <img src="/assets/diploma.png" alt="Diploma" className="mt-4" />
        </div>
      </div>
    </section>
  );
};

export default CreatePassword;