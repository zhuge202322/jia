"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Footer from "./Footer";

// Helper Component for Parallax Image (used in Act 1)
function ParallaxImage({ src, alt, className, yOffset = 50 }: { src: string, alt: string, className?: string, yOffset?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

// Data for Horizontal Scroll Section
const scrollProducts = [
  {
    id: 1,
    name: "RUTH | 鲁思",
    model: "DC-S66",
    size: "2250*2350*760mm",
    material: "Leather / Marble",
    image: "/images/bo/1.png", 
    collection: "The Living Collection",
    tagline: "Timeless Comfort"
  },
  {
    id: 2,
    name: "ONDA | 昂达",
    model: "DC-B20",
    size: "1800*2000*1100mm",
    material: "Velvet / Oak",
    image: "/images/bo/2.png",
    collection: "The Sleeping Collection",
    tagline: "Dreamy Serenity"
  },
  {
    id: 3,
    name: "SIENA | 锡耶纳",
    model: "DC-C15",
    size: "600*650*850mm",
    material: "Fabric / Steel",
    image: "/images/bo/3.png",
    collection: "The Dining Collection",
    tagline: "Modern Gathering"
  },
  {
    id: 4,
    name: "LUNA | 露娜",
    model: "DC-L88",
    size: "1200*1200*450mm",
    material: "Glass / Brass",
    image: "/images/bo/4.png",
    collection: "The Lighting Collection",
    tagline: "Radiant Glow"
  },
  {
    id: 5,
    name: "MATTEO | 马泰奥",
    model: "DC-M42",
    size: "900*950*900mm",
    material: "Leather / Walnut",
    image: "/images/bo/5.png",
    collection: "The Lounge Collection",
    tagline: "Classic Relax"
  },
  {
    id: 6,
    name: "VITA | 维塔",
    model: "DC-V01",
    size: "2400*1000*750mm",
    material: "Solid Wood",
    image: "/images/bo/6.png",
    collection: "The Office Collection",
    tagline: "Focused Elegance"
  }
];

// Designer Data
const designers = [
  { id: 1, name: "Alessandro Mendini", title: "Lead Architect", image: "/images/renwu/001.png" },
  { id: 2, name: "Patricia Urquiola", title: "Creative Director", image: "/images/renwu/002.png" },
  { id: 3, name: "Piero Lissoni", title: "Product Design", image: "/images/renwu/003.png" },
  { id: 4, name: "Antonio Citterio", title: "Industrial Design", image: "/images/renwu/004.png" },
  { id: 5, name: "Rodolfo Dordoni", title: "Art Director", image: "/images/renwu/005.png" },
  { id: 6, name: "Mario Bellini", title: "Furniture Design", image: "/images/renwu/006.png" },
  { id: 7, name: "Gaetano Pesce", title: "Concept Design", image: "/images/renwu/007.png" },
  { id: 8, name: "Gio Ponti", title: "Master Craftsman", image: "/images/renwu/008.png" },
];

export default function ParallaxShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  
  // Track scroll for the first section background text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Team Section Parallax (Spiral Staircase Logic)
  const { scrollYProgress: teamScroll } = useScroll({
    target: teamRef,
    offset: ["start start", "end end"]
  });
  
  // Rotate exactly so the last item (7 * 45deg = 315deg) comes to front (-315deg)
  const spiralRotate = useTransform(teamScroll, [0, 1], [0, -315]);
  // Move up exactly so the last item (7 * 250px = 1750px) comes to center (-1750px)
  const spiralY = useTransform(teamScroll, [0, 1], ["0px", "-1750px"]);

  // Click Carousel Logic
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % scrollProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + scrollProducts.length) % scrollProducts.length);
  };

  return (
    <>
      {/* 
        =============================================
        ACT 1: THE OVERTURE (Parallax Intro)
        =============================================
      */}
      <section ref={containerRef} className="bg-[#f8f8f6] overflow-hidden relative py-24 md:py-40 min-h-screen flex items-center w-full max-w-full">
        <motion.div 
          style={{ y: yText }}
          className="absolute top-20 left-0 w-full pointer-events-none z-0 opacity-10"
        >
          <h2 className="text-[18vw] font-serif leading-none text-stone-900 whitespace-nowrap pl-4">
            ESTETICA
          </h2>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 md:col-start-1">
              <motion.div 
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group"
              >
                 <Image 
                   src="/images/02.png" 
                   alt="Velluto Rosso"
                   fill
                   className="object-cover transition-transform duration-1000 group-hover:scale-105"
                 />
                 <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-6 max-w-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p className="font-serif text-xl mb-1">Velluto Rosso</p>
                    <p className="text-xs text-stone-500 uppercase tracking-widest">Armchair Series</p>
                 </div>
              </motion.div>
            </div>

            <div className="md:col-span-5 md:col-start-8 mt-12 md:mt-0">
               <motion.div 
                 initial={{ opacity: 0, x: 100 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                 viewport={{ once: true }}
                 className="mb-16"
               >
                 <h2 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6">
                   Sculpting Silence
                 </h2>
                 <p className="font-sans text-stone-600 leading-relaxed text-lg">
                   Every curve is a deliberate choice, every material tells a story of the earth. We design spaces for contemplation.
                 </p>
               </motion.div>
               
               <motion.div
                 initial={{ opacity: 0, y: 100 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                 viewport={{ once: true }}
               >
                 <ParallaxImage 
                   src="/images/03.png" 
                   alt="Detail" 
                   className="w-full aspect-square grayscale hover:grayscale-0 transition-all duration-700" 
                   yOffset={-50}
                 />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        ACT 2: IMMERSION (Click Carousel Gallery)
        =============================================
        Replaced horizontal scroll with click-based carousel
      */}
      <section className="relative h-[80vh] bg-[#f8f8f6] flex items-center justify-center py-20">
        <div className="w-full h-full bg-[#e5e5e5] overflow-hidden relative">
            
            {/* Carousel Container */}
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                    >
                         {/* Centered Image Container with Max Width - Creates whitespace for floating elements */}
                         <div className="relative w-full max-w-[70vw] h-[80%]">
                            <Image 
                              src={scrollProducts[currentIndex].image} 
                              alt={scrollProducts[currentIndex].name} 
                              fill 
                              className="object-contain drop-shadow-2xl bg-white" 
                              priority
                            />
                            

                            {/* Overlay: Left Specs (Responsive Positioning) */}
                            <div className="absolute top-auto bottom-[-180px] left-0 right-0 lg:top-12 lg:bottom-auto lg:-left-12 lg:right-auto z-20 w-full lg:w-64 p-6 lg:p-8 bg-white shadow-xl rounded-sm border border-stone-50">
                               <div>
                                  <h3 className="font-serif text-2xl md:text-3xl text-stone-900 mb-2 leading-tight">{scrollProducts[currentIndex].name}</h3>
                                  <p className="font-bold text-[10px] tracking-widest text-stone-400 uppercase">Model: {scrollProducts[currentIndex].model}</p>
                               </div>
                               <div className="space-y-4 text-xs text-stone-600 font-sans mt-6 md:mt-8 border-t border-stone-100 pt-4 md:pt-6">
                                  <div>
                                     <span className="font-bold text-stone-400 uppercase text-[10px] tracking-wider block mb-1">Dimensions</span> 
                                     {scrollProducts[currentIndex].size}
                                  </div>
                                  <div>
                                     <span className="font-bold text-stone-400 uppercase text-[10px] tracking-wider block mb-1">Material</span> 
                                     {scrollProducts[currentIndex].material}
                                  </div>
                               </div>
                            </div>

                            {/* Overlay: Right Collection Info */}
                            <div className="absolute top-1/2 -translate-y-1/2 -right-12 lg:-right-32 z-10 text-right hidden lg:block pointer-events-none select-none">
                               <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-4">{scrollProducts[currentIndex].collection}</p>
                               <h2 className="font-serif text-6xl md:text-7xl text-stone-900/10 mix-blend-multiply leading-none whitespace-nowrap">
                                 {scrollProducts[currentIndex].tagline.split(" ")[0]} <br/> {scrollProducts[currentIndex].tagline.split(" ")[1]}
                               </h2>
                            </div>

                            {/* Floating CTA Button (Responsive) */}
                            <div className="absolute -bottom-24 lg:bottom-8 right-0 lg:right-8 z-20 w-full lg:w-auto text-center lg:text-right">
                               <button className="border border-stone-900 bg-white/80 backdrop-blur px-8 py-3 text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors w-full lg:w-auto">
                                 View Lookbook
                               </button>
                            </div>
                         </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons (Floating Arrows) */}
            <button 
                onClick={prevSlide}
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-stone-400 text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all"
            >
                ←
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full border border-stone-400 text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all"
            >
                →
            </button>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {scrollProducts.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-stone-900 w-8" : "bg-stone-400 hover:bg-stone-600"}`}
                    />
                ))}
            </div>

        </div>
      </section>

      {/* 
        =============================================
        ACT 3: RHYTHM (Staggered Grid)
        =============================================
      */}
      <section className="bg-[#f8f8f6] pt-20 pb-32 container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-24">
          <div className="flex-1 flex flex-col gap-16 md:gap-32 md:pt-32">
             <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <Image src="/images/02.png" alt="Item 1" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h4 className="font-serif text-2xl">Luna Chair</h4>
                <p className="text-sm text-stone-500 mt-1">$ 1,200</p>
             </div>
             <div className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden mb-4">
                  <Image src="/images/03.png" alt="Item 2" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h4 className="font-serif text-2xl">Marble Side Table</h4>
                <p className="text-sm text-stone-500 mt-1">$ 850</p>
             </div>
          </div>
          <div className="flex-1 flex flex-col gap-16 md:gap-32">
             <div className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden mb-4">
                  <Image src="/images/04.png" alt="Item 3" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h4 className="font-serif text-2xl">Cloud Sofa</h4>
                <p className="text-sm text-stone-500 mt-1">$ 3,400</p>
             </div>
             <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <Image src="/images/02.png" alt="Item 4" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h4 className="font-serif text-2xl">Noir Lamp</h4>
                <p className="text-sm text-stone-500 mt-1">$ 420</p>
             </div>
             <div className="flex justify-center md:justify-start pt-12">
               <a href="#" className="text-4xl md:text-5xl font-serif text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-4">
                 View All <span className="text-2xl">→</span>
               </a>
             </div>
          </div>
        </div>
      </section>

      {/* 
        =============================================
        ACT 4: THE VISIONARIES (3D Spiral Staircase)
        =============================================
      */}
      <section ref={teamRef} className="relative h-[400vh] bg-[#f8f8f6]">
         <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center perspective-1000">
            
            <div className="absolute top-12 md:top-24 z-20 text-center w-full px-6">
                <h2 className="font-serif text-5xl md:text-6xl text-stone-900 mb-4">The Visionaries</h2>
                <p className="font-sans text-stone-500 max-w-lg mx-auto">
                   Ascend the spiral of creativity. Meet the masters behind the masterpieces.
                </p>
            </div>

            {/* 3D Scene Container */}
            <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1500px" }}>
               <motion.div 
                 style={{ 
                    rotateY: spiralRotate, 
                    y: spiralY,
                    transformStyle: "preserve-3d" // Critical for 3D children
                 }}
                 className="relative w-full h-full"
               >
                 {designers.map((designer, index) => {
                    // Calculate position for each step of the spiral
                    const angle = index * 45; // 360 / 8 designers = 45 degrees per step
                    const yOffset = index * 250; // Vertical distance between steps
                    const radius = 500; // Radius of the spiral

                    return (
                       <div 
                         key={designer.id}
                         className="absolute top-1/2 left-1/2 w-[300px] md:w-[400px] aspect-[3/4] -ml-[150px] md:-ml-[200px] -mt-[200px]"
                         style={{
                            transform: `translateY(${yOffset}px) rotateY(${angle}deg) translateZ(${radius}px)`,
                            backfaceVisibility: "hidden" // Optional: hide back face for performance
                         }}
                       >
                          <div className="relative w-full h-full bg-white p-4 shadow-2xl border border-stone-100 transform transition-transform hover:scale-105 duration-500">
                             <div className="relative w-full h-[85%] overflow-hidden bg-stone-100">
                                <Image src={designer.image} alt={designer.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                             </div>
                             <div className="pt-4 text-center">
                                <h4 className="font-serif text-xl text-stone-900">{designer.name}</h4>
                                <p className="text-[10px] tracking-widest uppercase text-stone-500 mt-1">{designer.title}</p>
                             </div>
                          </div>
                       </div>
                    );
                 })}
               </motion.div>
            </div>
         </div>
      </section>

      {/* 
        =============================================
        ACT 5: FOOTER (The Finale)
        =============================================
      */}
      <Footer />
    </>
  );
}
