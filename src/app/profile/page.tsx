"use client";

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
      <div className="w-10/12 mx-auto max-w-md flex flex-col items-center gap-6 mt-8">
        <div className="flex w-10/12 items-start gap-4">
          <Image
            src="/assets/saudi/logo.png"
            alt="Logo"
            width={48}
            height={48}
          />
          <div>
            <p className="text-gray-700">Your current data plan:</p>
            <p className="font-bold">1GB · 3 days left</p>
          </div>
        </div>

        <div className="w-10/12 mx-auto border-2 border-[#C0D7DB] rounded-lg p-4 flex flex-col items-center">
          <div className="w-full flex justify-between">
            <div>
              <p className="font-bold">{usedData}MB</p>
              <p className="text-gray-600">used</p>
            </div>
            <div>
              <p className="font-bold">{remainingData}MB</p>
              <p className="text-gray-600">remaining</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all ease-in-out duration-400"
              style={{ width: `${usedPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 w-full flex justify-center">
        <button
          onClick={() => router.push("/data-plans")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Buy more Data
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
