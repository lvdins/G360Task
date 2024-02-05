"use client";
// components/Card.tsx
import React from "react";

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
  const handleClick = (e: React.MouseEvent) => {
    if (!linkUrl) {
      e.preventDefault();
      onPreview();
    }
  };

  return (
    <div className="relative border border-gray-350 shadow-xl rounded-lg flex flex-col cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
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

      <div className="p-5 bg-gray-200 flex flex-col justify-between h-full rounded-b-lg">
        <div>
          <h2 className="text-lg font-bold">{title}</h2>

          {fileCount !== undefined && (
            <p className="text-sm text-gray-600 mt-2">{fileCount} photos</p>
          )}
        </div>
        {buttonLabel && onButtonClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onButtonClick();
            }}
            className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-3 rounded self-end "
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
