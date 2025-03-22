import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick = () => {},
  disabled,
}) => {
  return (
    <button
      className="bg-[#00539B] w-10/12 text-white rounded-[16px] text-lg font-semibold px-16 py-4"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
