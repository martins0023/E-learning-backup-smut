// middleware.js

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/session";
import { redirect } from "next/navigation";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const access_token = await verifyToken(request);
  if (!access_token) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    NextRequest.user = access_token;
    NextResponse.next()
  }
}

// Middleware configuration to exclude static assets and specified paths

export const config = {
  matcher: [
    "/student/dashboard/:path",
    "/student/courses/:path",
    "/student/activity/:path",
    "/student/time-table/:path",
    "/student/inbox/:path",
    "/student/submissions/:path",
    "/student/group/:path",
    "/student/quiz/:path",
    "/student/profile/:path",

    "/lecturer/dashboard/:path",
    "/lecturer/courses/:path",
    "/lecturer/activity/:path",
    "/lecturer/timetable/:path",
    "/lecturer/inbox/:path",
    "/lecturer/submissions/:path",
    "/lecturer/all-students/:path",
    "/lecturer/group/:path",
    "/lecturer/quiz/:path",
    "/lecturer/profile/:path",
  ],
};
