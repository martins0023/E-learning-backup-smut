"use client";
import { motion } from "framer-motion";
import Sidebar from "../../../../../components/Sidebar";
import DashboardNav from "../../../../../components/DashboardNav";
import { useRouter, useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const router = useRouter();
  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <Sidebar params={params.id} />

      {/* Main Content */}
      <div className="ml-60 w-full">
        {/* Dashboard Navigation */}
        <div className="bg-white w-full h-[128px]">
          <DashboardNav params={params.id} />
        </div>

        {/* Content */}
        <motion.div
          className="p-8"
          initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotate: 30 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            type: "spring",
            stiffness: 300,
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <p className="text-black font-bold text-[32px]">
              Enter your questions
            </p>

            <form className="gap-7 w-[691px]">
              <div className="flex flex-col gap-1">
                <label className="text-[18px] font-bold">Question 1</label>
                <textarea
                  placeholder="e.g.. what is"
                  type="text"
                  id="question"
                  className="w-[691px] h-[137px] border-black border-[1px] p-3 flex flex-start justify-start"
                />
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <label className="text-[18px] font-bold">Choice A</label>
                <input
                  placeholder="e.g.. doll"
                  type="text"
                  id="question"
                  className="w-[691px] h-[62px] border-black border-[1px] p-3"
                />
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <label className="text-[18px] font-bold">Choice B</label>
                <input
                  placeholder="e.g.. girl"
                  type="text"
                  id="question"
                  className="w-[691px] h-[62px] border-black border-[1px] p-3"
                />
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <label className="text-[18px] font-bold">Choice C</label>
                <input
                  placeholder="e.g.. male"
                  type="text"
                  id="question"
                  className="w-[691px] h-[62px] border-black border-[1px] p-3"
                />
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <label className="text-[18px] font-bold">Choice D</label>
                <input
                  placeholder="e.g.. dad"
                  type="text"
                  id="question"
                  className="w-[691px] h-[62px] border-black border-[1px] p-3"
                />
              </div>

              <div className="flex flex-row justify-between items-center mt-7">
                <button className="w-[337.5px] h-[60px] border-[1px] border-primary rounded-full text-black font-normal flex justify-center items-center text-[20px]">
                  Previous
                </button>

                <button className="w-[337.5px] h-[60px] bg-primary text-white rounded-full font-normal flex justify-center items-center text-[20px]">
                  Next
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default page;
