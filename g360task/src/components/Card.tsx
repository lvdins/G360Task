"use client";
// components/Card.tsx
import React from "react";
import Downloader from "./Downloader";

interface CardProps {
  title: string;
  imageUrl: string;
  onPreview: () => void;
  linkUrl?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  fileType?: string; // new optional prop
  downloadType?: string; // new optional prop
}

const Card: React.FC<CardProps> = ({
  title,
  imageUrl,
  onPreview,
  linkUrl,
  buttonLabel,
  onButtonClick,
  fileType,
  downloadType,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!linkUrl) {
      e.preventDefault();
      onPreview();
    }
  };

  return (
    <div className="relative border border-gray-200 shadow-md p-4 rounded-lg flex flex-col cursor-pointer">
      {linkUrl ? (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-cover rounded"
          />
        </a>
      ) : (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded"
          onClick={handleClick}
        />
      )}
      <h2 className="text-lg font-bold mt-4">{title}</h2>

      {/* Conditionally render the download button or a regular button */}
      {fileType && downloadType ? (
        <Downloader
          type={downloadType}
          label={buttonLabel || ""}
          fileType={fileType}
        />
      ) : (
        buttonLabel &&
        onButtonClick && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onPreview when clicking the button
              onButtonClick();
            }}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {buttonLabel}
          </button>
        )
      )}
    </div>
  );
};

export default Card;
