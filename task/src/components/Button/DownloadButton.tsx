import React from "react";

interface DownloadButtonProps {
  onClick: () => void;
  label: string;
  isVisible: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  label,
  isVisible,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-secondary hover:bg-opacity-70 text-black py-2 px-9 rounded-md flex items-center mb-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 mr-2"
      >
        <path
          fillRule="evenodd"
          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25a.75.75 0 0 0-1.5 0v4.69L6.03 8.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L8.75 9.44V4.75Z"
          clipRule="evenodd"
        />
      </svg>

      {label}
    </button>
  );
};

export default DownloadButton;
