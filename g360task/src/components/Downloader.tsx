// src/components/Downloader.tsx
import React from "react";

interface DownloaderProps {
  type: string; // The type of file to download ('stills' or 'floor_plans')
}

const Downloader: React.FC<DownloaderProps> = ({ type }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/download?type=${type}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${type}.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download files:", error);
    }
  };

  return (
    <button onClick={handleDownload}>
      Download {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  );
};

export default Downloader;
