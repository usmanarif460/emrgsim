"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import ChoiceButton from "../../components/choice-button";
import Button from "@/components/button";
import { sendMail } from "@/lib/send-mail";
import useOTPStore from "@/stores/otpStore";
import { toast } from "sonner";

const Ad = () => {
  const [selected, setSelected] = useState<null | "selected_1" | "selected_2">(
    null
  );
  const { otp, generateOTP } = useOTPStore();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dollar = `<svg
      width="47"
      height="48"
      viewBox="0 0 47 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_662_9220)">
        <path
          d="M24.1816 45.5502C36.5474 45.5502 46.5719 35.5257 46.5719 23.1599C46.5719 10.794 36.5474 0.769531 24.1816 0.769531C11.8158 0.769531 1.79126 10.794 1.79126 23.1599C1.79126 35.5257 11.8158 45.5502 24.1816 45.5502Z"
          fill="#D3E7EB"
        />
        <path
          d="M24.1814 10.9551C17.4443 10.9551 11.9773 16.4221 11.9773 23.1592C11.9773 29.8964 17.4443 35.3633 24.1814 35.3633C30.9186 35.3633 36.3856 29.8964 36.3856 23.1592C36.3856 16.4221 30.9186 10.9551 24.1814 10.9551ZM25.9023 30.5914V31.2997C25.9023 32.1909 25.1706 32.9225 24.2795 32.9225H24.2678C23.3766 32.9225 22.6449 32.1909 22.6449 31.2997V30.568C21.0221 30.2256 19.5822 29.3359 18.972 27.8345C18.691 27.1629 19.2164 26.4195 19.948 26.4195H20.2407C20.6929 26.4195 21.0587 26.7253 21.2299 27.1512C21.584 28.0672 22.5118 28.7008 24.2926 28.7008C26.6852 28.7008 27.2222 27.5053 27.2222 26.7605C27.2222 25.7478 26.6852 24.7952 23.9634 24.1484C20.9372 23.4168 18.8622 22.1715 18.8622 19.6692C18.8622 17.5708 20.5582 16.2026 22.6581 15.7519V15.0202C22.6581 14.129 23.3898 13.3974 24.2809 13.3974H24.2926C25.1838 13.3974 25.9155 14.129 25.9155 15.0202V15.7767C27.5998 16.1923 28.6621 17.2415 29.1245 18.5351C29.3689 19.2068 28.8568 19.9136 28.1353 19.9136H27.8178C27.3656 19.9136 26.9998 19.596 26.8783 19.157C26.5974 18.2293 25.8291 17.6308 24.2912 17.6308C22.4606 17.6308 21.3616 18.4605 21.3616 19.6326C21.3616 20.6584 22.1547 21.3286 24.6204 21.9637C27.0861 22.5988 29.7216 23.6597 29.7216 26.7356C29.6967 28.9686 28.0256 30.189 25.9023 30.5914Z"
          fill="#00539B"
        />
        <g className="mix-blend-mode:multiply">
          <path
            d="M24.1814 10.9551C24.0322 10.9551 23.8844 10.9609 23.7351 10.9668C30.2659 11.2024 35.4929 16.5728 35.4929 23.1592C35.4929 29.7456 30.2645 35.1175 23.7351 35.3516C23.8829 35.3575 24.0307 35.3633 24.1814 35.3633C30.9186 35.3633 36.3856 29.8964 36.3856 23.1592C36.3856 16.4221 30.9186 10.9551 24.1814 10.9551Z"
            fill="#00539B"
          />
        </g>
        <g className="mix-blend-mode:soft-light">
          <path
            d="M12.7777 23.0987C12.7777 16.7874 17.576 11.5911 23.7205 10.959C17.197 11.2019 11.9773 16.5694 11.9773 23.1514C11.9773 29.7334 17.4443 35.3555 24.1814 35.3555C24.6073 35.3555 25.0287 35.3336 25.4428 35.2912C25.2892 35.297 25.137 35.3029 24.9819 35.3029C18.2447 35.3029 12.7777 29.8359 12.7777 23.0987Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_662_9220">
          <rect width="46.5703" height="47.062" fill="white" />
        </clipPath>
      </defs>
    </svg>`;
  const sim = `<svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9084 2.90059C17.9084 1.71384 16.9484 0.742188 15.7602 0.742188H8.02214C7.44998 0.742188 6.89977 0.969004 6.49004 1.37873L1.28791 6.58086C0.878182 6.99059 0.651367 7.5408 0.651367 8.11296V20.1678C0.651367 21.3546 1.62302 22.3262 2.80977 22.3262H15.7704C16.9572 22.3262 17.9186 21.3546 17.9186 20.1678L17.9084 2.90059ZM4.96818 19.0879C4.37407 19.0879 3.88824 18.6021 3.88824 18.008C3.88824 17.4139 4.37407 16.928 4.96818 16.928C5.56229 16.928 6.04811 17.4139 6.04811 18.008C6.04811 18.6021 5.56229 19.0879 4.96818 19.0879ZM13.6018 19.0879C13.0077 19.0879 12.5219 18.6021 12.5219 18.008C12.5219 17.4139 13.0077 16.928 13.6018 16.928C14.1959 16.928 14.6817 17.4139 14.6817 18.008C14.6817 18.6021 14.1959 19.0879 13.6018 19.0879ZM4.96818 14.7711C4.37407 14.7711 3.88824 14.2853 3.88824 13.6912V11.5327C3.88824 10.9386 4.37407 10.4528 4.96818 10.4528C5.56229 10.4528 6.04811 10.9386 6.04811 11.5327V13.6912C6.04811 14.2853 5.56229 14.7711 4.96818 14.7711ZM9.28499 19.0879C8.69088 19.0879 8.20505 18.6021 8.20505 18.008V15.8496C8.20505 15.2554 8.69088 14.7696 9.28499 14.7696C9.8791 14.7696 10.3649 15.2554 10.3649 15.8496V18.008C10.3649 18.6021 9.8791 19.0879 9.28499 19.0879ZM9.28499 12.6127C8.69088 12.6127 8.20505 12.1269 8.20505 11.5327C8.20505 10.9386 8.69088 10.4528 9.28499 10.4528C9.8791 10.4528 10.3649 10.9386 10.3649 11.5327C10.3649 12.1269 9.8791 12.6127 9.28499 12.6127ZM13.6018 14.7711C13.0077 14.7711 12.5219 14.2853 12.5219 13.6912V11.5327C12.5219 10.9386 13.0077 10.4528 13.6018 10.4528C14.1959 10.4528 14.6817 10.9386 14.6817 11.5327V13.6912C14.6817 14.2853 14.1959 14.7711 13.6018 14.7711Z" fill="#00539B"/>
</svg>
`;
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    generateOTP();

    try {
      await sendMail({
        email: "usmanarif460@gmail.com",
        sendTo: email,
        text: `Your verification code is ${otp}`,
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
        <p class="otp">${otp}</p>
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
      <div className="content py-[32px] px-[24px] h-auto">
        <h1 className="text-3xl font-medium mb-4">
          Cheap data bundles in minutes
        </h1>
        <p className="text-base mb-6">
          Get quick access to affordable data bundles and save on roaming!
        </p>
        <div className="buttons flex flex-col gap-[12px] mb-8">
          <ChoiceButton
            vector={sim}
            heading="Get a new EmrgSIM"
            description="I’m new here and I’d like to get connected"
            onClick={() => setSelected("selected_1")}
            selected={selected === "selected_1"}
          />
          <ChoiceButton
            vector={dollar}
            heading="Top up data"
            description="I’m a regular and I need a little top up on my data"
            onClick={() => setSelected("selected_2")}
            selected={selected === "selected_2"}
          />
        </div>
        {selected && (
          <form onSubmit={handleSubmit}>
            <p className="description mb-4">
              Enter your email address below and we’ll send you a link to top up
              your data
            </p>
            <div className="mb-10">
              <div className=" grid pt-[24px]">
                <label
                  htmlFor="firstName"
                  className="font-bold text-sm leading-[26px] text-[#00539b]"
                >
                  First Name
                </label>

                <input
                  name="first-name"
                  className="py-[8px] font-normal outline-none text-base leading-[26px]  border-b border-[#e6e6e6]"
                  id="firstName"
                  required
                />
              </div>
              <div className="grid w-full pt-[24px]">
                <label
                  htmlFor="lastName"
                  className="font-bold text-sm leading-[26px] text-[#00539b]"
                >
                  Last Name
                </label>
                <input
                  name="last-name"
                  id="lastName"
                  className="py-[8px] font-normal outline-none text-base leading-[26px]  border-b border-[#e6e6e6]"
                  required
                />
              </div>
              <div className="grid w-full pt-[24px]">
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
                  className="py-[8px] font-normal outline-none text-base leading-[26px]  border-b border-[#e6e6e6]"
                  placeholder=""
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid w-full pt-[24px]">
                <label
                  htmlFor="eVisaNumber"
                  className="font-bold text-sm leading-[26px] text-[#00539b]"
                >
                  eVisa Application Number
                </label>
                <input
                  name="eVisaNumber"
                  id="eVisaNumber"
                  className="py-[8px] font-normal outline-none text-base leading-[26px]  border-b border-[#e6e6e6]"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button text="Done" disabled={loading} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Ad;
