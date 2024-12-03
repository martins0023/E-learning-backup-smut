"use client";

import React from "react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear user session or token
    localStorage.removeItem("authToken"); // Example: Remove token from localStorage
    sessionStorage.removeItem("userData"); // Example: Remove user data from sessionStorage

    // Redirect to login or homepage
    router.push("/lecturer/getstarted/login"); // Change this route as per your app
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
