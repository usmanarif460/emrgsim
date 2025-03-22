import React from "react";

export default function ChoiceButton({
  vector,
  heading,
  description,
  selected,
  onClick,
}: {
  vector: React.ReactNode;
  heading: string;
  description: string;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      className={`w-full h-[100px] pl-3 pr-12 rounded-xl border-none shadow-md flex items-center transition-all duration-300 ${
        selected ? "bg-[#ecf7f9] border-2 border-[#c0d7db]" : "bg-white"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 bg-[#d3e7eb] rounded-full flex items-center justify-center">
          {vector}
        </div>
        <div className="flex flex-col gap-.5 ml-3 flex-1">
          <h4 className="text-base font-medium  text-left leading-[1.64] text-[#212121] self-start">
            {heading}
          </h4>
          <p className="text-sm font-normal text-left leading-[1.34] text-[#212121] self-start">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
