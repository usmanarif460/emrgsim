"use client";
import Logo from "@/components/svgs/logo";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Trigger fade-out effect
      setTimeout(() => {
        router.push("/create-account");
      }, 500); // Wait for fade-out animation to complete before redirecting
    }, 3000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [router]);

  return (
    <div
      className={`bg-[#00539b] h-screen flex flex-col items-center gap-2 justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        onClick={() => router.push("/create-account")}
        className="cursor-pointer"
      >
        <Logo />
      </div>
      <h1 className="text-3xl text-white font-semibold">GlobalConnect</h1>
      <p className="text-sm text-white">
        POWERED BY <strong>EMRGSIM</strong>
      </p>
    </div>
  );
};

export default Page;
