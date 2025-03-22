"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderEid from "@/components/header-eid";
import Button from "@/components/button";

const EID = () => {
  const router = useRouter();
  const [eid, setEID] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const [activated, setActivated] = useState(false);
  const [errorActivating] = useState<string | null>(null);

  useEffect(() => {
    document.title = "EmrgMobile";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center text-center bg-gray-100">
      <HeaderEid />
      {errorActivating && (
        <p className="text-red-500 mt-2">{errorActivating}</p>
      )}

      <div className="bg-white p-6 h-full rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-medium text-left text-[#212121]">
          Thanks for your order!
        </h1>

        <h1 className="text-2xl mt-1 font-medium text-left text-[#212121] leading-[100%]">
          Just one little thing...
        </h1>
        <h2 className="mt-4 text-base text-left font-normal  leading-6">
          To install your eSIM you’ll need to complete the quick steps below
        </h2>
        <ol className="text-left mt-4 space-y-2">
          <li className="text-base leading-7 text-[#212121]">
            1. Go to your phone <b>Settings</b>
          </li>
          <li className="text-base leading-7 text-[#212121]">
            2. Select <b>General</b>, then <b>About</b>
          </li>
          <li className="text-base leading-7 text-[#212121]">
            3. Scroll down and select <b>EID</b>
          </li>
          <li className="text-base leading-7 text-[#212121]">
            4. Copy the EID (long hold to copy)
          </li>
          <li className="text-base leading-7 text-[#212121]">
            5. Paste it below
          </li>
        </ol>
        <form
          className="mt-4 flex flex-col space-y-4"
          onSubmit={(ev) => {
            ev.preventDefault();

            if (!isActivating) {
              setIsActivating(true);
              setTimeout(() => {
                setActivated(true);
                setIsActivating(false);
              }, 1000);
            }
          }}
        >
          <input
            type="text"
            className="px-6 py-3 rounded-md text-base w-full border-2 border-[#DADADA]"
            placeholder="Enter EID"
            value={eid}
            onChange={(ev) => setEID(ev.target.value.trim())}
          />
          <div className="flex items-center justify-center">
            {!activated && (
              <Button
                text="Continue"
                disabled={eid.length === 0}
                onClick={() => router.push("/thanks")}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EID;
