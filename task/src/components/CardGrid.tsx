"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Popup from "./Popup";
import JSZip from "jszip";
import { saveAs } from "file-saver";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStills, setIsLoadingStills] = useState(false);

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
  //
  const handleDownloadStills = async () => {
    setIsLoadingStills(true);
    if (data) {
      await downloadImages(data.stills, "stills");
    }
    setIsLoadingStills(false);
  };

  const handleDownloadFloorPlans = async () => {
    setIsLoading(true);
    if (data) {
      await downloadImages(data.floor_plans, "floor_plans");
    }
    setIsLoading(false);
  };

  const downloadImages = async (images: ImageData[], prefix: string) => {
    const zip = new JSZip();

    const filePromises = images.map(async (image, index) => {
      const response = await fetch(
        `/api/download?url=${encodeURIComponent(image.original)}`
      );

      if (!response.ok) {
        throw new Error("Failed to download image");
      }

      const blob = await response.blob();
      zip.file(`${prefix}${index + 1}.jpg`, blob);
    });

    await Promise.all(filePromises);

    const content = await zip.generateAsync({ type: "blob" });

    saveAs(content, `${prefix}.zip`);
  };

  //
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
      })
      .catch((err) => console.error("Failed to copy link:", err));
  };

  if (!data) {
    return (
      <div className="flex justify-center items-top h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-400 mt-20"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        <Card
          title="Virtual Tour"
          imageUrl={data.stills[1]?.thumbnail}
          linkUrl={"https://tour.giraffe360.com/jules-crosnier/"}
          buttonLabel="Copy Link"
          onButtonClick={handleVirtualTourClick}
          onPreview={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        <Card
          title="Stills"
          imageUrl={data.stills[0]?.thumbnail}
          buttonLabel={isLoadingStills ? "Downloading..." : "Download"}
          onPreview={() => handlePreview(data.stills)}
          onButtonClick={handleDownloadStills}
          fileCount={data.stills.length}
        />

        <Card
          title="Floor Plans"
          imageUrl={data.floor_plans[0]?.thumbnail}
          buttonLabel={isLoading ? "Downloading..." : "Download"}
          onPreview={() => handlePreview(data.floor_plans)}
          onButtonClick={handleDownloadFloorPlans}
          fileCount={data.floor_plans.length}
        />
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        images={previewImages || []}
      />
    </div>
  );
};

export default CardGrid;
