"use client";
import Logo from "@/components/svgs/logo";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="bg-[#00539bed] h-screen flex flex-col items-center gap-2 justify-center">
      <div
        onClick={() => router.push("/create-account")}
        className="cursor-pointer"
      >
        <Logo />
      </div>
      <h1 className="text-3xl text-white">GlobalConnect</h1>
      <p className="text-sm text-white">
        POWERED BY <strong>EMRGSIM</strong>
      </p>
    </div>
  );
};

export default Page;
