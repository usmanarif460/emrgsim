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
          {!activated && (
            <Button
              text="Next"
              disabled={eid.length === 0}
              onClick={() => eid}
            />
          )}
          {
            <button
              className="bg-gray-700 text-white py-2 px-4 rounded-md"
              onClick={() => router.push("/thanks")}
            >
              Continue
            </button>
          }
        </form>
      </div>
    </div>
  );
};

export default EID;
