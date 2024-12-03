"use client"
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const createCourse = () => {
    router.push("/lecturer/dashboard/getstarted")
  }

  const navHome = () => {
    router.push("/student/dashboard")
  }

  const myProfile = () => {
    router.push("/student/profile")
  }

  const sendMessage = () => {
    router.push("/student/inbox/compose")
  }
  return (
    <section>
      <header className="flex items-center justify-between mb-8 pt-9 mr-5 ml-5">
        <div onClick={navHome} className="cursor-pointer">
          <Image
            src="/assets/logo.png"
            alt="vconnect"
            width={183}
            height={66}
          />
        </div>
        <div className="relative flex items-center w-full max-w-xl h-[52px] bg-white rounded-full p-3 border-black border-[1px]">
          <Image src="/assets/search.png" width={18} height={18} alt="search" />
          <input
            type="text"
            placeholder="Search your notes, lectures, class here."
            className="flex-grow px-4 py-2 outline-none text-[16px] font-medium border-black border-1"
          />
        </div>
        <button className="bg-primary text-white rounded-md h-[41px] px-6 py-2">
          Create New Class/Event
        </button>
        <div className="flex items-center cursor-pointer">
          <div className="relative mr-4">
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-xs text-white">
              5
            </span>
            <Image
              src="/assets/notifications-bell.png"
              alt="Notifications"
              className="w-[40px] h-[40px]"
              width={40}
              height={40}
            />
          </div>
          <div className="flex items-center cursor-pointer" onClick={myProfile}>
            <Image
              src="/assets/images/profile.jpg"
              alt="Dr. James Adetola"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="ml-2 text-black font-semibold">Hi, James</p>
          </div>
        </div>
      </header>

      <div className="p-20">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <Image
              src="/assets/images/profile.jpg"
              width={200}
              height={200}
              className="w-[200px] h-[200px] rounded-full"
            />

            <p className="text-black font-bold text-[30px] mt-4">
              Dr. Ajibade Solomon{" "}
            </p>
            <p className="text-black font-medium text-[20px]">Lecturer </p>

            <div className="mt-4">
              <p className="text-black font-bold text-[18px]">About me</p>
              <p className="w-[563px] font-normal text-[16px]">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga.{" "}
                <br className="mt-2" /> Et harum quidem rerum facilis est et
                expedita distinctio. Nam libero tempore, cum soluta nobis est
                eligendi optio cumque nihil impedit quo minus id quod maxime
                placeat facere possimus, omnis voluptas assumenda est, omnis
                dolor repellendus. Temporibus autem quibusdam et aut officiis
                debitis aut rerum necessitatibus saepe eveniet ut et voluptates
                repudiandae sint et molestiae non recusandae.{" "}
                <br className="mt-2" /> Itaque earum rerum hic tenetur a
                sapiente delectus, ut aut reiciendis voluptatibus maiores alias
                consequatur aut perferendis doloribus asperiores repellat.
              </p>
            </div>
            <div className="mt-4">
              <button onClick={sendMessage} className="text-white bg-black rounded-none h-[56px] w-[583px] flex items-center justify-center text-[24px] font-semibold">send a message</button>
            </div>
          </div>

          <div className="flex justify-center flex-col gap-3">
            <p className="font-bold text-[20px]">Assigned courses (2)</p>

            <div className="flex flex-row gap-3">
              <div className="flex flex-col">
                <Image src="/assets/cys341.png" width={306} height={256} />
                <p className="text-black font-bold text-[18px] w-[286px]">(COM301) Introduction to Cyber Security</p>
                <p className="text-black font-normal text-[14px] mt-1 w-[286px]">Lorem ipsum dolor sit amet, consetur adipiscing elit.</p>
              </div>
              <div className="flex flex-col">
                <Image src="/assets/cys321.png" width={306} height={256} />
                <p className="text-black font-bold text-[18px] w-[286px]">(COM421) AI: The Future of Cyber Security</p>
                <p className="text-black font-normal text-[14px] mt-1 w-[286px]">Lorem ipsum dolor sit amet, consetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
