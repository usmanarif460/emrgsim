import React from "react";
import Image from "next/image";

const logo = () => {
  return (
    <div className=" ">
      <Image
        className="bg-transparent "
        src="/assets/saudi/logo.png"
        alt=""
        width={80}
        height={80}
      />
    </div>
  );
};

export default logo;
