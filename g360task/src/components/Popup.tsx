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
      onClick={handleBackdropClick} // Attach the click event here
    >
      <div
        className={`bg-white p-2 rounded shadow-lg transition-all duration-300 ease-in-out transform ${
          showPopup ? "scale-100" : "scale-95"
        }`}
        style={{ width: "700px", height: "80%" }}
        ref={popupContentRef} // Use the ref here
        onClick={(e) => e.stopPropagation()} // Prevent click from propagating to the backdrop
      >
        <Carousel images={images} />
        <button
          onClick={handleClose}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
