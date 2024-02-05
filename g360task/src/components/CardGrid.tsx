"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import Popup from "./Popup"; // Import the Modal component
import Downloader from "./Downloader";

const CardGrid: React.FC = () => {
  const [data, setData] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://giraffe360.com/gapi/share/Av7eeG1/"
      );
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const handlePreview = (images: any) => {
    setPreviewImages(images);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleVirtualTourClick = () => {
    const urlToCopy = "https://tour.giraffe360.com/jules-crosnier/";
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => console.log("Link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy link:", err));
  };

  const handleDownload = async (type: string) => {
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

  if (!data) {
    return <div>Loading...</div>; // or some loading spinner
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Card for Virtual Tour */}
        <Card
          title="Virtual Tour"
          imageUrl={data && data.stills && data.stills[1]?.thumbnail}
          linkUrl={"https://tour.giraffe360.com/jules-crosnier/"}
          buttonLabel="Copy Link"
          onButtonClick={handleVirtualTourClick}
          onPreview={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        {/* Card for Floor Plans */}
        <Card
          title="Floor Plans"
          imageUrl={data.floor_plans[0].thumbnail}
          buttonLabel="Download Floor Plans"
          onPreview={() => handlePreview(data.floor_plans)}
          onButtonClick={() => handleDownload("floor_plans")}
        />

        <Card
          title="Stills"
          imageUrl={data && data.stills && data.stills[0]?.thumbnail}
          buttonLabel="Download Stills"
          onPreview={() => handlePreview(data.stills)}
          onButtonClick={() => handleDownload("stills")}
        />
      </div>

      {/* Popup for image preview */}
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        images={previewImages || []}
      />
    </div>
  );
};

export default CardGrid;
