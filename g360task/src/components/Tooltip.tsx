// components/Tooltip.tsx
import React from "react";

interface TooltipProps {
  message: string;
  isVisible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute -top-10 px-4 py-2 bg-black text-white text-sm rounded shadow-md">
      {message}
    </div>
  );
};

export default Tooltip;
