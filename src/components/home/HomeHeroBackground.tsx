"use client";

import { useState, useEffect } from "react";

interface HomeHeroBackgroundProps {
  images: string[];
}

export function HomeHeroBackground({ images }: HomeHeroBackgroundProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden={index !== currentImageIndex}
          />
        </div>
      ))}
    </>
  );
}
