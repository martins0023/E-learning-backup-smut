"use server";

import { NextRequest, NextResponse } from "next/server";
import axiosClient from "../config/client";
import { createSession, verifyUser } from "./session";

const baseUrl =  process.env.BASEURL

export const usePostApi = async (url, body) => {
  try {
    const response = await axiosClient.post(`/${url}`, body, {headers: {'Content-Type': 'application/json'}});
    const data = await response.data;
    if (response.status === 200) {
      return { success: true, message: data.message, data: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

export const usePutApi = async (url, body) => {
  try {
    const response = await axiosClient.put(`/${url}`, body, {headers: {'Content-Type': 'application/json'}});
    const data = await response.data;
    if (response.status === 200) {
      return { success: true, message: data.message, data: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};

export const usePutFormApi = async (url, body) => {
  try {
    const response = await axiosClient.put(`/${url}`, body, {headers: {'Content-Type': 'multipart/form-data'}});
    const data = await response.data;
    if (response.status === 200) {
      return { success: true, message: data.message, data: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};


export const GetApi = async (url) => {
    try {
        const response = await axiosClient.get(`/${url}`);
        const data = await response.data;
        if (response.status === 200) {
          return { success: true, message: data.message, data: data.data };
        } else {
          return { success: false, message: data.message };
        }
      } catch (err) {
        console.log(err)
        return { success: false, message: err.response?.data?.message || err.message };
      }
}

export const VerifyGetApi = async (url) => {
  try {

  const checkUser = await verifyUser()
  if(!checkUser) return { success: false, message: data.message };
  
    const response = await axiosClient.get(`/${url}`);
    const data = await response.data;
    if (response.status === 200) {
      return { success: true, message: data.message, data: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (err) {
    console.log(err)
    return { success: false, message: err.response?.data?.message || err.message };
  }
}

export const loginApi = async (url, body) => {
  try {
    const response = await axiosClient.post(`/${url}`, body, {headers: {'Content-Type': 'application/json'}});

    const data = await response.data;
    if (response.status === 200) {
      await createSession(data.data?._id, data.data?.role, data.data?.isAdmin)
      return { success: true, message: data.message, data: data.data };
    } else {
      return { success: false, message: data.message };
    }
  } catch (err) {
    return { success: false, message: err.response?.data?.message || err.message };
  }
};