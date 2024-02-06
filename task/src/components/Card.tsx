"use client";
// components/Card.tsx
import React, { useState } from "react";
import Tooltip from "./Tooltip"; // Import the Tooltip component

interface CardProps {
  title: string;
  imageUrl: string;
  onPreview: () => void;
  linkUrl?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  fileCount?: number; // Optional prop for the number of files
}

const Card: React.FC<CardProps> = ({
  title,
  imageUrl,
  onPreview,
  linkUrl,
  buttonLabel,
  onButtonClick,
  fileCount,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false); // Local state for tooltip visibility

  const handleVirtualTourClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onButtonClick) {
      onButtonClick();
    }
    setIsTooltipVisible(true); // Show the tooltip
    setTimeout(() => {
      setIsTooltipVisible(false); // Hide the tooltip after 2 seconds
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!linkUrl) {
      e.preventDefault();
      onPreview();
    }
  };

  return (
    <div className="relative border border-gray-300 shadow-xl rounded-xl flex flex-col cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      {linkUrl ? (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </a>
      ) : (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
          onClick={handleClick}
        />
      )}

      <div className="flex flex-col justify-between p-5 bg-gray-200 h-full rounded-b-lg">
        <div className="flex-grow">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          {fileCount !== undefined && (
            <p className="text-sm text-gray-600">{fileCount} photos</p>
          )}
        </div>
        {buttonLabel && onButtonClick && (
          <div className="relative flex justify-end">
            {" "}
            {/* Make this div relative */}
            <button
              onClick={
                title === "Virtual Tour"
                  ? handleVirtualTourClick
                  : onButtonClick
              }
              className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
            >
              {buttonLabel}
            </button>
            {title === "Virtual Tour" && isTooltipVisible && (
              <Tooltip message="Link copied!" isVisible={isTooltipVisible} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
