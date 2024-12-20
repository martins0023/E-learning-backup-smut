import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter, useParams } from "next/navigation";



const Welcome = async ({data}) => {
  const router = useRouter();
  const params = useParams();

  const navContinue = () => {
    router.push(`/student/dashboard/${params.id}`);
  }
  return (
    <div className="flex flex-col items-center">
      <div className="mt-10">
        <Image
          src="/assets/logo.png"
          width={183}
          height={66}
          className="]"
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
        <p className="text-[26px] font-semibold text-primary text-center capitalize">
          {data.lastname} {data.firstname} {data.middlename}
        </p>

        <div className="gap-[2px] mt-2">
          <p className="text-[24px] font-normal text-black text-center mt-1">
            {data.matric_no}
          </p>
          <p className="text-[24px] font-normal text-black text-center mt-1">
            {data.department}
          </p>
          <p className="text-[24px] font-normal text-black text-center mt-1">
            {data.level}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <div
          onClick={navContinue}
          className="flex items-center cursor-pointer justify-center bg-primary text-white font-normal text-[20px] w-[691px] rounded-full h-[64px]"
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default Welcome;
