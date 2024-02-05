import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.thumbnail;
    });
    setPreloaded(true);
  }, [images]);

  if (!Array.isArray(images) || images.length <= 0 || !preloaded) {
    return <div>Loading...</div>; // Or your custom loader here
  }

  return (
    <section className="relative flex justify-center items-center overflow-hidden">
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-yellow-400 bg-opacity-70 text-white text-2xl z-10 cursor-pointer select-none rounded-full h-12 w-12 flex items-center justify-center"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-yellow-400 bg-opacity-70 text-white text-2xl z-10 cursor-pointer select-none rounded-full h-12 w-12 flex items-center justify-center"
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
    </section>
  );
};

export default Carousel;
