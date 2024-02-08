// CopyButton.tsx
import React, { useState } from "react";
import Tooltip from "../Tooltip";

interface CopyButtonProps {
  onClick: () => void;
  label: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick, label }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsTooltipVisible(true);
    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 2000);
    onClick();
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="bg-secondary hover:bg-opacity-70 text-black py-2 px-8 rounded-md flex items-center mb-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 mr-2"
        >
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z" />
          <path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z" />
        </svg>
        {label}
      </button>
      {isTooltipVisible && (
        <Tooltip message="Link copied!" isVisible={isTooltipVisible} />
      )}
    </div>
  );
};

export default CopyButton;
