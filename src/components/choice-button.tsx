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
      className={`w-full h-[100px] pl-4 pr-12 rounded-xl  shadow-[1px_1px_10px_0px_#0000001A] flex items-center transition-all duration-300 ${
        selected
          ? "bg-[#ecf7f9] border-2 border-[#c0d7db]"
          : "bg-white border-none"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="w-12 h-12 bg-[#d3e7eb] rounded-full flex items-center justify-center">
          {vector}
        </div>
        <div className="flex flex-col gap-1.5 ml-3 flex-1">
          <h4 className="text-base font-medium  text-left leading-[164%] text-primary self-start">
            {heading}
          </h4>
          <p className="text-sm font-normal text-left leading-[134%] text-primary self-start w-[83.33%]">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
