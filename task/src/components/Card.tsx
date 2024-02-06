"use client";
import React, { useState } from "react";
import Tooltip from "./Tooltip";

interface CardProps {
  title: string;
  imageUrl: string;
  onPreview: () => void;
  linkUrl?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  fileCount?: number;
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
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const handleVirtualTourClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onButtonClick) {
      onButtonClick();
    }
    setIsTooltipVisible(true);
    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!linkUrl) {
      e.preventDefault();
      onPreview();
    }
  };

  return (
    <div className="relative border border-gray-300 border-opacity-8 rounded-lg flex flex-col cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="relative">
        {linkUrl ? (
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-60 object-cover rounded-t-lg"
            />
          </a>
        ) : (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-60 object-cover rounded-t-lg"
            onClick={handleClick}
          />
        )}

        {(title === "Floor Plans" || title === "Stills") && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 absolute top-2 right-2 text-white rounded-lg bg-grey bg-opacity-80"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
        )}
      </div>

      <div className="flex flex-col justify-between p-5 bg-white h-full rounded-b-lg">
        <div className="flex-grow">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          {fileCount !== undefined && (
            <p className="text-xs text-greytext font-thin -mt-1 mb-3">
              {fileCount} photos
            </p>
          )}
        </div>
        {buttonLabel && onButtonClick && (
          <div className="relative flex justify-start items-center mt-4">
            <button
              onClick={
                title === "Virtual Tour"
                  ? handleVirtualTourClick
                  : onButtonClick
              }
              className="bg-secondary hover:bg-opacity-70 text-black py-2 px-8 rounded-md flex items-center mb-1"
            >
              {title === "Virtual Tour" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-size-12"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
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
