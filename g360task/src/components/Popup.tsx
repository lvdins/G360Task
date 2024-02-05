import React, { useEffect, useState, useRef } from "react";
import Carousel from "./Carousel"; // Import the Carousel component

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  images: { original: string; thumbnail: string }[];
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, images }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupContentRef = useRef<HTMLDivElement>(null); // Ref for the popup content

  useEffect(() => {
    if (isOpen) {
      setShowPopup(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowPopup(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      popupContentRef.current &&
      !popupContentRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  };

  if (!isOpen && !showPopup) return null;

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 ${
        showPopup ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 ease-in-out`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative bg-white p-2 rounded shadow-lg transition-all duration-300 ease-in-out transform ${
          showPopup ? "scale-100" : "scale-95"
        }`}
        style={{ width: "700px", height: "80%" }}
        ref={popupContentRef}
        onClick={(e) => e.stopPropagation()}
      >
        <Carousel images={images} />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 mt-2 mr-2 bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-2 rounded-full text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Popup;
