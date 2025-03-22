"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useOTPStore from "@/stores/otpStore";
import { sendMail } from "@/lib/send-mail";
type Props = {
  setVerificationNumber: (num: number) => void;
  enableBack: () => void;
};

const Verification = ({}: Props) => {
  const { otp } = useOTPStore(); // Fetch OTP from store
  const router = useRouter();
  async function resendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Generate the OTP and get the updated value
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    useOTPStore.setState({ otp: newOTP }); // Manually update Zustand store

    try {
      await sendMail({
        email: "usmanarif460@gmail.com",
        sendTo: "maroonwandie@e-record.com",
        text: `Your verification code is ${newOTP}`,
        subject: "Verification",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EMRGSim OTP Verification</title>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9; text-align: center; }
        .otp { font-size: 24px; font-weight: bold; color: #ff6600; }
        .footer { margin-top: 20px; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <h2>EMRGSim OTP Verification</h2>
        <p>Use the OTP below to verify your email:</p>
        <p class="otp">${newOTP}</p>
        <p>This OTP is valid for <strong>10 minutes</strong>.</p>
        <p>If you didn’t request this, please ignore this email.</p>
        <div class="footer">© 2024 EMRGSim. All rights reserved.</div>
    </div>
</body>
</html>`,
      });

      toast.success("OTP sent successfully!");
      router.push("/verification");
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error("An error occurred while sending OTP", error);
    } finally {
      setLoading(false);
    }
  }
  const inputs = Array.from({ length: 6 }, () => null).map(() =>
    useRef<HTMLInputElement>(null)
  );

  const [verification, setVerification] = useState<Array<number | string>>(
    Array(6).fill("")
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    inputs[0]?.current?.focus();
  }, []);

  useEffect(() => {
    if (!verification.includes("")) {
      inputs[verification.indexOf("")]?.current?.focus();
    }
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
        updated[index] = "";
        return updated;
      });
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
      <p className="text-center mt-4 text-gray-300">
        A verification code was sent to your email. Enter your OTP below.
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
