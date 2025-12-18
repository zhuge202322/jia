"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // 1. Force Load Fallback & Body Scroll Locking
  useEffect(() => {
    // Lock scroll during animation
    document.body.style.overflow = "hidden";
    
    // Fallback: If image load event fails, force open after 1.5s
    const timer = setTimeout(() => setIsLoaded(true), 1500);

    return () => {
      // Cleanup
      document.body.style.overflow = "unset";
      clearTimeout(timer);
    };
  }, []);

  // 2. Unlock Scroll Only After Animation Completes
  useEffect(() => {
    if (animationComplete) {
      document.body.style.overflow = "unset";
    }
  }, [animationComplete]);

  // If animation is done, we return null to unmount the overlay entirely
  if (animationComplete) return null;

  return (
    // Fixed Overlay Layer (z-50)
    <div className="fixed inset-0 z-50 flex h-dvh w-full pointer-events-none">
      {/* Left Gate */}
      <motion.div
        className="relative h-full w-1/2 overflow-hidden bg-stone-100"
        initial={{ x: 0 }}
        animate={isLoaded ? { x: "-100%" } : { x: 0 }}
        transition={{
          duration: 1.5,
          delay: 0.5, // Matches Navbar delay
          ease: [0.76, 0, 0.24, 1],
        }}
        onAnimationComplete={() => {
          if (isLoaded) setAnimationComplete(true);
        }}
      >
        <div className="absolute inset-0 w-[200%] h-full bg-black">
          <Image
            src="/images/01.png"
            alt="Opening Left"
            fill
            className="object-contain 2xl:object-cover object-left"
            priority
            sizes="100vw"
            onLoad={() => setIsLoaded(true)}
            unoptimized
          />
        </div>
      </motion.div>

      {/* Right Gate */}
      <motion.div
        className="relative h-full w-1/2 overflow-hidden bg-stone-100"
        initial={{ x: 0 }}
        animate={isLoaded ? { x: "100%" } : { x: 0 }}
        transition={{
          duration: 1.5,
          delay: 0.5, // Matches Navbar delay
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <div className="absolute inset-0 w-[200%] h-full -translate-x-1/2 bg-black">
          <Image
            src="/images/01.png"
            alt="Opening Right"
            fill
            className="object-contain 2xl:object-cover object-right"
            priority
            sizes="100vw"
            unoptimized
          />
        </div>
      </motion.div>
    </div>
  );
}
