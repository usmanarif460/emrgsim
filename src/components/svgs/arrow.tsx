import React from "react";

type ArrowProps = {
  className?: string;
  onClick?: () => void;
};

const ArrowBack: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <svg
        className={className}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_402_5775)">
          <path
            d="M25.3333 14.667L10.44 14.667L16.9467 8.16029C17.4667 7.64029 17.4667 6.78695 16.9467 6.26695C16.4267 5.74695 15.5867 5.74695 15.0667 6.26695L6.27999 15.0536C5.75999 15.5736 5.75999 16.4136 6.27999 16.9336L15.0667 25.7203C15.5867 26.2403 16.4267 26.2403 16.9467 25.7203C17.4667 25.2003 17.4667 24.3603 16.9467 23.8403L10.44 17.3336H25.3333C26.0667 17.3336 26.6667 16.7336 26.6667 16.0003C26.6667 15.267 26.0667 14.667 25.3333 14.667Z"
            fill="#212121"
          />
        </g>
        <defs>
          <clipPath id="clip0_402_5775">
            <rect
              width="32"
              height="32"
              fill="white"
              transform="matrix(0 1 -1 0 32 0)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default ArrowBack;
