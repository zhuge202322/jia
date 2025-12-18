"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as const 
    } 
  }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

// Counter Component for Number Animation
function Counter({ value, unit, label }: { value: number, unit: string, label: string }) {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });
  
    useEffect(() => {
      if (isInView) {
        motionValue.set(value);
      }
    }, [isInView, value, motionValue]);
  
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(Math.floor(latest));
        });
        return unsubscribe;
    }, [springValue]);
  
    return (
      <div ref={ref} className="text-[#c5a47e]"> {/* Champagne Gold Color */}
        <div className="flex items-baseline justify-center mb-4">
            <span className="font-sans font-bold text-6xl md:text-8xl tracking-tight">
                {displayValue}
            </span>
            <span className="font-serif text-2xl md:text-3xl ml-1">{unit}</span>
        </div>
        <p className="font-serif text-xl md:text-2xl text-[#c5a47e]/80 tracking-widest">
            {label}
        </p>
      </div>
    );
  }

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#f8f8f6] text-stone-900 selection:bg-stone-900 selection:text-white">
      
      {/* 1. HERO SECTION: The Philosophy */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
        >
            <Image 
                src="/images/01.png" // Using the grand opening image for impact
                alt="Studio Atmosphere"
                fill
                className="object-contain md:object-cover"
                priority
            />
             {/* Removed overlay to show the image's own typography */}
        </motion.div>

        {/* Text content removed as requested */}
      </section>

      {/* 2. NARRATIVE SECTION: Heritage */}
      <section className="py-16 md:py-32 px-6 md:px-12 lg:px-24 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-8xl lg:text-9xl mb-8 leading-none">
                    Sculpting <br /> <span className="italic font-light">Silence</span>
                </motion.h1>
                <div className="w-12 h-0.5 bg-stone-900 mb-8" />
                <p className="text-stone-600 leading-loose mb-6">
                    Founded in the heart of the Brera Design District, Casa Italia began as a small workshop dedicated to restoring mid-century classics. This intimacy with the masters taught us that true luxury lies not in ornamentation, but in the honesty of materials and the purity of form.
                </p>
                <p className="text-stone-600 leading-loose">
                    Today, we collaborate with the world's most visionary designers to carry this legacy forward, blending traditional Italian craftsmanship with contemporary minimalism.
                </p>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative aspect-[4/5] bg-stone-200 overflow-hidden"
            >
                 <Image 
                    src="/images/03.png" // Marble texture image
                    alt="Craftsmanship"
                    fill
                    className="object-cover"
                />
            </motion.div>
        </div>
      </section>

      {/* 3. BRAND HONORS: Sticky Stacked Cards */}
      <section className="bg-white text-stone-600">
        <div className="py-32 px-6 container mx-auto text-center">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400">Brand Honors</span>
            <h2 className="font-serif text-4xl md:text-6xl text-stone-900 mt-4">Glorious Course</h2>
        </div>

        <div className="w-full pb-32">
            {[
                "/images/about/a01.png",
                "/images/about/a02.png",
                "/images/about/a03.png"
            ].map((img, i) => (
                <div 
                    key={i}
                    className="sticky top-0 h-screen flex items-center justify-center px-6 bg-white" 
                >
                    {/* Card Container - Dark Background to blend with posters */}
                    <motion.div 
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative w-[90vw] h-[60vh] md:w-[85vw] md:h-[75vh] bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
                    >
                         <Image 
                            src={img}  
                            alt={`Honor ${i+1}`}
                            fill
                            className="object-contain lg:object-cover"
                        />
                    </motion.div>
                </div>
            ))}
        </div>
      </section>

      {/* 4. STATISTICS: Dynamic Counters */}
      <section className="py-16 md:py-32 border-b border-stone-200 bg-[#fbf9f6]"> {/* Subtle warm background */}
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {[
                    { value: 2, unit: "亿", label: "年产值" },
                    { value: 180, unit: "家", label: "专卖店" },
                    { value: 30000, unit: "平", label: "厂房面积" }
                ].map((stat, i) => (
                    <Counter 
                        key={i} 
                        value={stat.value} 
                        unit={stat.unit} 
                        label={stat.label} 
                    />
                ))}
            </div>
        </div>
      </section>

      {/* FOOTER: Minimal */}
      <footer className="py-12 text-center">
         <Image 
            src="/images/01.png" 
            alt="Logo Icon" 
            width={30} 
            height={30} 
            className="mx-auto mb-6 opacity-20"
         />
         <p className="text-[10px] tracking-widest uppercase text-stone-400">
            © 2024 Casa Italia · Milan · Shanghai · New York
         </p>
      </footer>

    </main>
  );
}
