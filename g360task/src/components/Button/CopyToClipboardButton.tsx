"use client";

import React from "react";

interface CopyToClipboardButtonProps {
  children: React.ReactNode;
  link?: string; // Optional link prop
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  children,
  link,
}) => {
  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (link) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          console.log("Link copied to clipboard:", link); // Log the copied link
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    } else {
      console.log("No link to copy"); // Log if the link is undefined
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};

export default CopyToClipboardButton;
