"use client";

import Button from "@/components/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TermsAndConditions = () => {
  const totalData = 1000; // 1GB in MB
  const usedData = 500; // Used data in MB
  const remainingData = totalData - usedData;
  const usedPercentage = (usedData / totalData) * 100;
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen flex flex-col items-center ">
      <div className="bg-[#00539b] flex items-center justify-center">
        <Image
          className="cell"
          src="/assets/saudi/profile-group.png"
          width={48000}
          height={48000}
          alt=""
        />
      </div>
      <div className="w-11/12 mx-auto max-w-md flex flex-col items-center gap-6 mt-8">
        <div className="flex w-11/12 items-start gap-4">
          <Image
            src="/assets/saudi/logo.png"
            alt="Logo"
            width={48}
            height={48}
          />
          <div>
            <p className="text-primary text-base leading-6">
              Your current data plan:
            </p>
            <p className="font-medium">1GB · 3 days left</p>
          </div>
        </div>

        <div className="w-11/12 mx-auto border-2 border-[#C0D7DB] rounded-xl px-8 py-6 flex flex-col items-center">
          <div className="w-full flex justify-between">
            <div>
              <p className="font-normal text-[22px] leading-[26px]">
                {usedData}MB
              </p>
              <p className="text-primary text-base leading-[26px] ">used</p>
            </div>
            <div>
              <p className="font-medium text-[22px] leading-[26px]">
                {remainingData}MB
              </p>
              <p className="text-primary text-base leading-[26px]">remaining</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-[#FED762] transition-all ease-in-out duration-400"
              style={{ width: `${usedPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 w-full flex justify-center">
        <Button
          text=" Buy more Data"
          onClick={() => router.push("/data-plans")}
        />
      </div>
    </div>
  );
};

export default TermsAndConditions;
