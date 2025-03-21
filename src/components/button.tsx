import React from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="bg-[#00539B] text-white rounded-lg font-medium px-24 py-4"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
