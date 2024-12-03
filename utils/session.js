// import "server-only";

"use server"

import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.SECRET);
const cookie = {
  name: "access_token",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  // duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    // .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err) {
    return null;
  }
}

export const createSession = async (id, role, isAdmin) => {
  // const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({id: id, role: role, isAdmin: isAdmin });

  cookies().set(cookie.name, session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    // expires: expires,
  });
  
};


export const verifyToken = async (request) => {
  const accessCookie =  request.cookies.get("access_token");
  if(!accessCookie) {
   return null;
  }

  const token = await decrypt(accessCookie.value);
  if(!token) {
   return null;
  }
  return token;
 
}

export const verifyUser = async () => {

  const verify = await verifyToken(cookies())
  if (!verify) return null;

  if(NextRequest.user?.id !== verify.id) return null; 

  return true;
}

// export const getUserId = async () => {
//   const accessCookie = await cookies().get(cookies.name).then((cookieJar) => cookieJar.get(cookies.name));

//   if(!accessCookie) {
//     return null;
//    }
 
//    const token = await decrypt(accessCookie.value);
//    if(!token) {
//     return null;
//    }
 
//    return token._id;
// }

// export const verifyUser = () => {
//     if(!verifyToken) {
//       return NextResponse.json({message: "You are not authorized!"}, {status: 403})
//     } else {
//       if()
//     }
// }

export const verifyLoginSession = async () => {
  const cookie = cookies().get(cookies.name)?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  if (session?.userId && session?.role == "session_alt") {
    
    // return { userId: session?.userId };
    // return true
    NextResponse.next();
  } else {
    redirect("/login");
  }
};

export const logout = async () => {
    cookies().delete(cookie.name);
    // redirect("/login")
};
