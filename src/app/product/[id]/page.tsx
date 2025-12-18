"use client";

import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

// --- Mock Data (Synced with Collection Page) ---
const products = [
  {
    id: 1,
    name: "Velluto Rosso",
    category: "Living",
    collection: "Velvet Series",
    image: "/images/02.png",
    designer: "Mario Bellini",
    description: "A statement of pure comfort and bold elegance. The Velluto Rosso redefines the lounge experience with its fluid lines and deep, embracing velvet texture."
  },
  {
    id: 2,
    name: "Marble Silence",
    category: "Dining",
    collection: "Stone Edition",
    image: "/images/03.png",
    designer: "Piero Lissoni",
    description: "Monolithic yet weightless. Marble Silence brings the ancient solidity of stone into the modern dining space, carved with precision and grace."
  },
  {
    id: 3,
    name: "Cloud Sofa",
    category: "Living",
    collection: "Soft Form",
    image: "/images/04.png",
    designer: "Patricia Urquiola",
    description: "Floating on air. The Cloud Sofa explores the boundary between furniture and atmosphere, offering a seating experience that feels like suspension."
  },
  {
    id: 4,
    name: "Noir Lamp",
    category: "Lighting",
    collection: "Dark Light",
    image: "/images/bo/1.png",
    designer: "Achille Castiglioni",
    description: "Light emerging from shadows. The Noir Lamp is a study in contrast, where the structure itself disappears to let the illumination take center stage."
  },
  {
    id: 5,
    name: "Onda Bed",
    category: "Bedroom",
    collection: "Sleep System",
    image: "/images/bo/2.png",
    designer: "Antonio Citterio",
    description: "Rhythmic waves of rest. Onda, meaning 'wave' in Italian, mimics the gentle motion of the sea, creating a sanctuary for deep, restorative sleep."
  },
  {
    id: 6,
    name: "Siena Chair",
    category: "Dining",
    collection: "Classic Wood",
    image: "/images/bo/3.png",
    designer: "Gio Ponti",
    description: "Timeless geometry. The Siena Chair pays homage to the architectural heritage of Tuscany, balancing structural integrity with lightweight visual appeal."
  },
  {
    id: 7,
    name: "Luna Pendant",
    category: "Lighting",
    collection: "Moon Series",
    image: "/images/bo/4.png",
    designer: "Vico Magistretti",
    description: "A celestial body in your home. The Luna Pendant captures the soft, diffused glow of moonlight, creating an intimate atmosphere in any room."
  },
  {
    id: 8,
    name: "Matteo Armchair",
    category: "Living",
    collection: "Lounge 2024",
    image: "/images/bo/5.png",
    designer: "Rodolfo Dordoni",
    description: "Structured relaxation. The Matteo Armchair combines a rigid architectural shell with a soft, inviting interior, perfect for the modern study."
  },
  {
    id: 9,
    name: "Vita Desk",
    category: "Decor",
    collection: "Work Space",
    image: "/images/bo/6.png",
    designer: "Mario Bellini",
    description: "Work as art. The Vita Desk transforms the daily routine of work into a ritual of creativity, with clean lines that clear the mind."
  }
];

export default function ProductArticlePage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const containerRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
        const scrollAmount = 300;
        const targetScroll = direction === 'left' ? -scrollAmount : scrollAmount;
        carouselRef.current.scrollBy({ left: targetScroll, behavior: 'smooth' });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8f6] text-stone-900 font-serif">
        <div className="text-center">
            <h1 className="text-4xl mb-4">Product Not Found</h1>
            <Link href="/collection" className="text-xs uppercase tracking-widest border-b border-stone-900 pb-1">Return to Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <article ref={containerRef} className="min-h-screen bg-[#f8f8f6] text-stone-900 selection:bg-stone-900 selection:text-white pb-32">
      
      {/* Hero Section with Parallax */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
            <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
            />
             {/* Gradient Overlay for text readability */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
            style={{ opacity }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6"
        >
            <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6"
            >
                {product.collection}
            </motion.span>
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8"
            >
                {product.name}
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xs tracking-widest uppercase border border-white/30 px-6 py-3 rounded-full backdrop-blur-sm"
            >
                Designed by {product.designer}
            </motion.p>
        </motion.div>
      </section>

      {/* Editorial Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
        
        {/* Intro Text */}
        <section className="py-24 md:py-32 border-b border-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4">
                    <span className="block text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-2">The Concept</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
                        Design meets <br/> Function
                    </h2>
                </div>
                <div className="md:col-span-8">
                    <p className="font-serif text-2xl md:text-3xl leading-relaxed text-stone-800 indent-12 mb-8">
                        "{product.description}"
                    </p>
                    <p className="font-sans text-stone-500 leading-loose text-sm md:text-base max-w-2xl">
                        Rooted in the Italian tradition of craftsmanship, the {product.name} represents a dialogue between the past and the future. 
                        Every curve is intentional, every material selected for its tactile quality and durability. 
                        It is not merely an object, but a presence in the room that commands attention without demanding it.
                    </p>
                </div>
            </div>
        </section>

        {/* Detail Visuals (Split Layout) */}
        <section className="py-24 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center rounded-sm">
                <motion.div 
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full md:w-3/5 h-[500px] md:h-[700px] relative bg-stone-100 overflow-hidden group"
                >
                     <Image
                        src={product.image} // Reusing image for demo, in real app use detail shot
                        alt="Detail view"
                        fill
                        className="object-cover scale-110 transition-transform duration-1000 group-hover:scale-105" // Subtle zoom out on hover
                    />
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="w-full md:w-2/5 md:pl-12 flex flex-col justify-center relative"
                >
                    <span className="text-9xl font-serif text-stone-100 absolute -z-10 select-none left-0 top-0">01</span>
                    <h3 className="font-serif text-3xl mb-6 mt-8">Materiality</h3>
                    <p className="text-stone-500 leading-loose mb-8 text-sm max-w-sm">
                        Sourced from the finest regions of Italy, the materials used in the {product.collection} are treated with natural oils to preserve their inherent character. 
                        The texture invites touch, creating a sensory connection between the user and the object.
                    </p>
                    <ul className="text-xs uppercase tracking-widest text-stone-800 space-y-4 border-l border-stone-300 pl-6">
                        <li>Premium Grade A Material</li>
                        <li>Hand-finished Details</li>
                        <li>Sustainable Sourcing</li>
                    </ul>
                </motion.div>
            </div>
        </section>

        {/* Designer Quote / Story */}
        <section className="py-24 md:py-32 bg-stone-100 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 mb-24">
            <div className="max-w-4xl mx-auto text-center">
                <div className="w-16 h-1 bg-stone-900 mx-auto mb-12" />
                <blockquote className="font-serif text-3xl md:text-5xl italic leading-tight text-stone-800 mb-12">
                    "True luxury is found in the simplicity of form and the honesty of materials."
                </blockquote>
                <cite className="not-italic text-xs font-bold tracking-[0.3em] uppercase text-stone-500">
                    — {product.designer}
                </cite>
            </div>
        </section>

        {/* Specifications Table */}
        <section className="max-w-3xl mx-auto mb-32">
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-12 text-center">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500 text-sm">Category</span>
                    <span className="text-stone-900 font-serif">{product.category}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500 text-sm">Collection</span>
                    <span className="text-stone-900 font-serif">{product.collection}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500 text-sm">Dimensions</span>
                    <span className="text-stone-900 font-serif">H 85 x W 220 x D 90 cm</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500 text-sm">Weight</span>
                    <span className="text-stone-900 font-serif">45 kg</span>
                </div>
            </div>
        </section>

        {/* More Products (Carousel) */}
        <section className="mb-32 border-t border-stone-200 pt-24 relative group/carousel">
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-16 text-center">Discover More</h3>
            
            {/* Navigation Buttons */}
            <button 
                onClick={() => scrollCarousel('left')}
                className="absolute left-6 md:left-12 top-1/2 z-10 p-4 bg-white/80 backdrop-blur-md rounded-full text-stone-900 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-stone-900 hover:text-white shadow-lg"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <button 
                onClick={() => scrollCarousel('right')}
                className="absolute right-6 md:right-12 top-1/2 z-10 p-4 bg-white/80 backdrop-blur-md rounded-full text-stone-900 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-stone-900 hover:text-white shadow-lg"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            {/* Scrollable Container */}
            <div 
                ref={carouselRef}
                className="overflow-x-auto pb-20 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 no-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for Firefox/IE
            >
                <div className="flex gap-12 w-max px-12"> {/* Added padding to ensure first/last items aren't cut off */}
                    {products.filter(p => p.id !== product.id).map((p, index) => (
                        <Link 
                            key={p.id} 
                            href={`/product/${p.id}`}
                            className={`group relative flex-shrink-0 w-[200px] md:w-[280px] transition-transform duration-500 hover:opacity-80 ${index % 2 === 1 ? 'mt-16' : ''}`}
                        >
                            <div className="aspect-[3/4] relative overflow-hidden bg-stone-200 mb-4">
                                <Image
                                    src={p.image}
                                    alt={p.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <h4 className="font-serif text-lg text-stone-900 group-hover:text-stone-600 transition-colors">{p.name}</h4>
                            <p className="text-[10px] tracking-widest uppercase text-stone-400">{p.category}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-stone-200 py-6 px-12 flex justify-between items-center z-50">
         <Link href="/collection" className="text-xs font-bold tracking-widest uppercase hover:text-stone-500 transition-colors">
            ← Back to Collection
         </Link>
         <button className="bg-stone-900 text-white text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-stone-700 transition-colors">
            Inquire
         </button>
      </div>

    </article>
  );
}
