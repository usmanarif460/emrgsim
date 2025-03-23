"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import ChoiceButton from "../../components/choice-button";
import Button from "@/components/button";
import { sendMail } from "@/lib/send-mail";
import useOTPStore from "@/stores/otpStore";
import { toast } from "sonner";
import Dollar from "@/components/svgs/dollar";
import Sim from "@/components/svgs/sim";

const Ad = () => {
  const [selected, setSelected] = useState<null | "selected_1" | "selected_2">(
    null
  );
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Generate the OTP and get the updated value
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    useOTPStore.setState({ otp: newOTP }); // Manually update Zustand store
    useOTPStore.setState({ email: email }); // Manually update Zustand store
    try {
      await sendMail({
        email: "usmanarif460@gmail.com",
        sendTo: `${email}`,
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

  return (
    <div className="container w-full h-screen bg-white overflow-y-auto">
      <Header />
      <div className="content py-8 px-6 h-auto">
        <h1 className="text-3xl font-medium leading-[100%] mb-4 text-balance">
          Cheap data bundles in minutes
        </h1>
        <p className="text-base mb-6 leading-6 font-normal tracking-normal">
          Get quick access to affordable data bundles and save on roaming!
        </p>
        <div className="buttons flex flex-col gap-[12px] mb-8">
          <ChoiceButton
            vector={<Sim />}
            heading="Get a new EmrgSIM"
            description="I’m new here and I’d like to get connected"
            onClick={() => setSelected("selected_1")}
            selected={selected === "selected_1"}
          />
          <ChoiceButton
            vector={<Dollar />}
            heading="Top up data"
            description="I’m a regular and I need a little top up on my data"
            onClick={() => setSelected("selected_2")}
            selected={selected === "selected_2"}
          />
        </div>
        {selected && (
          <form onSubmit={handleSubmit}>
            <p className="mb-4 leading-6 text-base font-normal tracking-normal">
              Enter your email address below and we’ll send you a link to top up
              your data
            </p>
            <div className="mb-10">
              <div className="grid pt-6">
                <label
                  htmlFor="firstName"
                  className="font-bold text-sm leading-[26px] text-[#00539b]"
                >
                  First Name
                </label>

                <input
                  name="first-name"
                  className="py-[8px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6]"
                  id="firstName"
                  required
                />
              </div>
              <div className="grid w-full pt-6">
                <label
                  htmlFor="lastName"
                  className="font-bold text-sm leading-[26px] text-[#00539b]"
                >
                  Last Name
                </label>
                <input
                  name="last-name"
                  id="lastName"
                  className="py-[8px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6]"
                  required
                />
              </div>
              <div className="grid w-full pt-6">
                <label
                  htmlFor="email"
                  className="font-bold text-sm leading-[26px] text-[#00539b]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="py-[8px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6]"
                  placeholder=""
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid w-full pt-6">
                <label
                  htmlFor="eVisaNumber"
                  className="font-bold text-sm leading-[26px] text-[#00539b]"
                >
                  eVisa Application Number
                </label>
                <input
                  name="eVisaNumber"
                  id="eVisaNumber"
                  className="py-[8px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6]"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-8 mb-8">
              <Button text="Done" disabled={loading} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Ad;
