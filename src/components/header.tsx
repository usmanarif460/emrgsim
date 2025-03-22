import React from "react";
import Logo from "@/components/svgs/logo";

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div
      className={`bg-[#00539bed] h-56 flex w-full items-center justify-center ${className}`}
    >
      <Logo />
    </div>
  );
};

export default Header;
