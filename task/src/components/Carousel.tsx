import React, { useState, useEffect } from "react";
import downloadImage from "@/utils/downloadImage";

interface CarouselProps {
  images: { original: string; thumbnail: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [preloaded, setPreloaded] = useState(false);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleDownload = async () => {
    const response = await fetch(
      `/api/download?url=${images[current].original}`
    );

    if (!response.ok) {
      throw new Error("Failed to download image");
    }

    await downloadImage(response);
  };

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.thumbnail;
    });
    setPreloaded(true);
  }, [images]);

  if (!Array.isArray(images) || images.length <= 0 || !preloaded) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative overflow-hidden rounded-lg">
      <div className="flex justify-center items-center">
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 text-black hover:text-secondary text-6xl z-10 cursor-pointer select-none flex items-center justify-center"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-black hover:text-secondary text-6xl z-10 cursor-pointer select-none flex items-center justify-center"
        >
          &gt;
        </button>
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.thumbnail}
              alt={`Slide ${index}`}
              className="w-full h-full flex-shrink-0"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center w-full py-4 bg-primary">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-secondary bg-opacity-100 hover:brightness-105 text-black rounded"
        >
          Download
        </button>
      </div>
    </section>
  );
};

export default Carousel;
