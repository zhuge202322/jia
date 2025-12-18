"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/images/02.png",
    title: "Modern Essence",
    subtitle: "Redefining Spaces"
  },
  {
    id: 2,
    image: "/images/03.png",
    title: "Natural Harmony",
    subtitle: "Organic Materials"
  },
  {
    id: 3,
    image: "/images/04.png",
    title: "Timeless Comfort",
    subtitle: "Italian Craftsmanship"
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track if it's the very first render to force static layout
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFirstRender(false); // Enable animations after first switch
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-stone-900">
      {/* 
         Remove mode="wait" to allow cross-fading (slides overlap during transition).
         This prevents the "flash to black" issue.
      */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          // IMPORTANT: Explicitly disable animation for the first slide on initial load
          // This ensures the image is rock-solid when the gates open.
          initial={isFirstRender && currentIndex === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} // Use easeInOut for smoother blend
          className="absolute inset-0 z-0" // Ensure z-index is lower than text
        >
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            fill
            className="object-cover"
            priority
            unoptimized // FIX: Bypass optimization to prevent layout shift/flicker
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-8">
        <motion.div
          key={`text-${currentIndex}`}
          // Same logic for text: stay static on first load
          initial={isFirstRender && currentIndex === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: isFirstRender ? 0 : 0.5 }}
          className="space-y-4"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-white tracking-wide">
            {slides[currentIndex].title}
          </h2>
          <p className="font-sans text-sm md:text-base text-stone-200 tracking-[0.2em] uppercase">
            {slides[currentIndex].subtitle}
          </p>
        </motion.div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsFirstRender(false);
              setCurrentIndex(index);
            }}
            className="group relative h-1 w-12 overflow-hidden bg-white/20 rounded-full transition-all hover:h-2"
          >
            {index === currentIndex && (
              <motion.div
                layoutId="slider-progress"
                className="absolute inset-0 bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
