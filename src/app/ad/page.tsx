import Logo from "@/components/svgs/logo";
import React from "react";

const page = () => {
  return (
    <div className="bg-[#00539B] h-screen flex flex-col items-center gap-2 justify-center">
      <Logo />
      <h1 className="text-3xl text-white">GlobalConnect</h1>
      <p className="text-sm text-white">
        POWERED BY <strong>EMRGSIM</strong>
      </p>
    </div>
  );
};

export default page;
