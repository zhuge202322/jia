"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

interface ProductData {
    id: string;
    name: string;
    category: string;
    collection: string;
    image: string;
    designer: string;
    description: string;
    content?: string;
}

interface ProductArticleClientProps {
    product: ProductData;
    relatedProducts: ProductData[];
}

// Sub-component for the actual product content with animations
function ProductContent({ product, relatedProducts }: { product: ProductData, relatedProducts: ProductData[] }) {
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
                            {/* If we have full content HTML, we could render it here, otherwise keep static text structure or use description */}
                            <div 
                                className="font-sans text-stone-500 leading-loose text-sm md:text-base max-w-2xl prose prose-stone"
                                dangerouslySetInnerHTML={{ __html: product.content || "" }} 
                            />
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
                            {relatedProducts.map((p, index) => (
                                <Link 
                                    key={p.id} 
                                    href={`/product/${p.id}`}
                                    className={`group relative flex-shrink-0 w-[200px] md:w-[280px] transition-transform duration-500 hover:opacity-80 ${index % 2 === 1 ? 'mt-16' : ''}`}
                                >
                                    <div className="aspect-[3/4] relative overflow-hidden bg-stone-200 mb-4">
                                        <Image
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

export default function ProductArticleClient({ product, relatedProducts }: ProductArticleClientProps) {
    // If no product, render Simple Error UI - NO HOOKS HERE
    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-900 font-serif p-10">
                <div className="text-center max-w-lg">
                    <h1 className="text-4xl mb-4 font-bold">CLIENT DEBUG: Product is NULL</h1>
                    <p className="mb-4 text-sm">The Client Component received no product data from the server.</p>
                    <p className="mb-4 text-xs font-mono bg-white p-4 rounded border border-red-200 text-left">
                        Check server console for "Product not found for slug: ..." logs.
                    </p>
                    <Link href="/collection" className="text-xs uppercase tracking-widest border-b border-red-900 pb-1 font-bold">Return to Collection</Link>
                </div>
            </div>
        );
    }

    // If product exists, render the complex content component
    return <ProductContent product={product} relatedProducts={relatedProducts} />;
}
