"use client";

import React, { useEffect, useState } from "react";
import Card from "./Card";
import Popup from "./Popup";

interface ImageData {
  thumbnail: string;
  original: string;
}

interface ApartmentData {
  stills: ImageData[];
  floor_plans: ImageData[];
  name: string;
}

const CardGrid: React.FC = () => {
  const [data, setData] = useState<ApartmentData | null>(null);
  const [previewImages, setPreviewImages] = useState<ImageData[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://giraffe360.com/gapi/share/Av7eeG1/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: ApartmentData = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch apartment data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePreview = (images: ImageData[]) => {
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
      .then(() => {
        console.log("Link copied to clipboard!");
        setIsTooltipVisible(true); // Show the tooltip
        setTimeout(() => {
          setIsTooltipVisible(false);
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy link:", err));
  };

  if (!data) {
    return <div></div>;
  }

  return (
    <div className="container mx-auto p-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {/* Card for Virtual Tour */}
        <Card
          title="Virtual Tour"
          imageUrl={data.stills[1]?.thumbnail}
          linkUrl={"https://tour.giraffe360.com/jules-crosnier/"}
          buttonLabel="Copy Link"
          onButtonClick={handleVirtualTourClick}
          onPreview={() => handlePreview(data.stills)}
        />

        {/* Card for Floor Plans */}
        <Card
          title="Floor Plans"
          imageUrl={data.floor_plans[0].thumbnail}
          buttonLabel="Download"
          onPreview={() => handlePreview(data.floor_plans)}
          onButtonClick={() => handleDownload("floor_plans")}
          fileCount={data.floor_plans.length}
        />

        {/* Card for Stills */}
        <Card
          title="Stills"
          imageUrl={data.stills[0]?.thumbnail}
          buttonLabel="Download"
          onPreview={() => handlePreview(data.stills)}
          onButtonClick={() => handleDownload("stills")}
          fileCount={data.stills.length}
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
