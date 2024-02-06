import React from "react";

interface TooltipProps {
  message: string;
  isVisible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-full mb-2 px-2 py-2 bg-white bg-opacity-50 text-black text-sm rounded shadow-md">
      {message}
    </div>
  );
};

export default Tooltip;
