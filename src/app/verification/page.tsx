"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  setVerificationNumber: (num: number) => void;
  enableBack: () => void;
};

const Verification = ({}: Props) => {
  const router = useRouter();
  const inputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verification, setVerification] = useState<Array<number | string>>(
    Array(6).fill("")
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    inputs[0]?.current?.focus();
  }, []);

  useEffect(() => {
    if (!verification.includes("")) {
      return;
    }
    inputs[verification.indexOf("")]?.current?.focus();
  }, [verification]);

  const handleChange = (index: number, value: string) => {
    if (value === "" || /^[0-9]$/.test(value)) {
      setVerification((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
    }
  };

  const handleKeyDown = (
    index: number,
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ((ev.key === "Backspace" || ev.key === "Delete") && index > 0) {
      setVerification((prev) => {
        const updated = [...prev];
        for (let i = index; i < updated.length; i++) {
          updated[i] = "";
        }
        return updated;
      });
    }
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    // setVerificationNumber(parseInt(verification.join("")));
    router.push("/terms-and-conditions"); // Replace with the actual route you want to navigate to
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00539B] text-white p-6">
      <h2 className="text-2xl font-semibold">Identity Verification</h2>
      <p className="text-center mt-4 text-gray-300">
        A verification code was sent to your email. Enter your OTP code below.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
        <div className="flex justify-center space-x-2">
          {inputs.map((ref, i) => (
            <input
              key={i}
              ref={ref}
              type="text"
              maxLength={1}
              className="w-12 h-14 text-center text-lg bg-[#00539B] border-b-2 border-white focus:outline-none focus:border-blue-500"
              value={verification[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 w-full py-3 bg-[#086dc6] text-white text-lg font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-600"
          disabled={verification.includes("")}
        >
          Verify
        </button>
      </form>

      <p className="mt-4 text-gray-100">
        Didn’t receive a code?{" "}
        <button className="text-white font-semibold hover:underline">
          Resend
        </button>
      </p>
    </div>
  );
};

export default Verification;
