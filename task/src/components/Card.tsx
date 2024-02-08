"use client";
import React, { useState } from "react";
import { CardProps } from "@/types/types";
import CopyButton from "./Button/CopyButton";
import DownloadButton from "./Button/DownloadButton";

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
    <div className="relative border rounded-lg flex flex-col cursor-pointer appearance-none hover:scale-105 hover:shadow-lg transition-transform duration-200 ease-in-out bg-white">
      {linkUrl ? (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-52 object-cover rounded-t-lg"
          />
        </a>
      ) : (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-52 object-cover rounded-t-lg"
          onClick={handleClick}
        />
      )}

      <div className="flex flex-col justify-between p-7 bg-white h-full rounded-b-lg">
        <div className="flex-grow">
          <h2 className="text-lg font-bold ">{title}</h2>
          {fileCount !== undefined && (
            <p className="text-sm font-light text-greytext mb-7 ">{`${fileCount} photos`}</p>
          )}
        </div>
        {buttonLabel && onButtonClick && (
          <div className="flex justify-start">
            {title === "Virtual Tour" ? (
              <CopyButton onClick={onButtonClick} label={buttonLabel} />
            ) : (
              <DownloadButton
                onClick={onButtonClick}
                label={buttonLabel}
                isVisible={false}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
