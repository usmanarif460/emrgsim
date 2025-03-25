"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useOTPStore from "@/stores/otpStore";
import { sendMail } from "@/lib/send-mail";

const Verification = () => {
  const { otp, email } = useOTPStore(); // Fetch OTP from store
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState<Array<number | string>>(
    Array(6).fill("")
  );

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  async function resendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    useOTPStore.setState({ otp: newOTP });

    try {
      await sendMail({
        email: "usmanarif460@gmail.com",
        sendTo: `${email}`,
        text: `Your verification code is ${newOTP}`,
        subject: "Verification",
        html: `<p>Your verification code is <strong>${newOTP}</strong></p>`,
      });
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error("An error occurred while sending OTP", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value === "" || /^[0-9]$/.test(value)) {
      setVerification((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });

      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (ev: React.ClipboardEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const pasteData = ev.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pasteData)) {
      setVerification(pasteData.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    ev: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if ((ev.key === "Backspace" || ev.key === "Delete") && index > 0) {
      setVerification((prev) => {
        const updated = [...prev];
        updated[index] = "";
        return updated;
      });
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const enteredOTP = verification.join("");

    if (enteredOTP.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (enteredOTP === otp) {
        toast.success("OTP verified successfully!");
        router.push("/terms-and-conditions");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00539B] text-white p-6">
      <h2 className="text-2xl font-semibold">Identity Verification</h2>
      <p className="text-center mt-4 text-gray-100">
        A verification code was sent to your email. Enter your OTP below.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              maxLength={1}
              className="w-12 h-14 text-center text-lg bg-[#00539B] border-b-2 border-white focus:outline-none focus:border-blue-500"
              value={verification[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 w-full py-3 bg-[#086dc6] text-white text-lg font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-600"
          disabled={verification.includes("") || loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      <p className="mt-4 text-gray-100">
        Didn’t receive a code?{" "}
        <button
          onClick={resendOtp}
          className="text-white font-semibold hover:underline"
        >
          Resend
        </button>
      </p>
    </div>
  );
};

export default Verification;
