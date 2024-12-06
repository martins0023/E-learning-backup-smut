import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter, useParams } from "next/navigation";

const Welcome = ({data}) => {
  const router = useRouter();
  const params = useParams();

  const navContinue = () => {
    router.push(`/lecturer/dashboard/${params.id}`);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10">
        <Image
          src="/assets/logo.png"
          width={183}
          height={66}
          className="w-[183px] h-[66px]"
          alt="logo"
        />
        <p className="text-black font-medium text-[30px] mt-10">
          You are welcome!{" "}
        </p>
      </div>
      <div className="mt-3 gap-3 items-center justify-center">
        <Image
          src={data.image ? data.image : "/assets/images/user.png"}
          width={259}
          height={259}
          className="w-[259px] h-[259px] rounded-full"
          alt="profile"
        />
        <p className="text-[26px] font-semibold text-primary text-center  capitalize">
          {data.lastname} {data.firstname} {data.middlename}
        </p>
        <p className="text-[24px] font-normal text-black text-center mt-3">
          Lecturer
        </p>
      </div>
      <div className="mt-5">
        <div
          onClick={navContinue}
          className="flex items-center justify-center bg-primary text-white font-normal text-[20px] w-[691px] rounded-full h-[64px]"
        >
          Go to Login
        </div>
      </div>
    </div>
  );
};

export default Welcome;
