"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { DesignerAccordion } from "@/components/DesignerAccordion";

interface Product {
  id: string;
  name: string;
  category: string;
  collection: string;
  image: string;
  designer: string;
}

interface CollectionClientProps {
  initialProducts: Product[];
}

export default function CollectionClient({ initialProducts }: CollectionClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDesigner, setActiveDesigner] = useState<string | null>(null);

  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map(p => p.category));
    // Filter out "Uncategorized" or the main "Fenlei" category if it appears? 
    // For now just list all distinct categories found.
    // Also ensure "All" is first.
    return ["All", ...Array.from(cats).filter(c => c !== "Fenlei" && c !== "分类")];
  }, [initialProducts]);

  // Helper to get unique designers with images
  // Since we don't have real designer data from WP yet, we use a static list for visual appeal.
  // This restores the beautiful accordion layout.
  const designers = useMemo(() => [
    { id: "d1", name: "Alessandro Mendini", image: "/images/renwu/001.png" },
    { id: "d2", name: "Patricia Urquiola", image: "/images/renwu/002.png" },
    { id: "d3", name: "Piero Lissoni", image: "/images/renwu/003.png" },
    { id: "d4", name: "Antonio Citterio", image: "/images/renwu/004.png" },
    { id: "d5", name: "Rodolfo Dordoni", image: "/images/renwu/005.png" }
  ], []);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    // If we select a designer from the static list, currently it won't match "Casa Italia"
    // So for now, we can either ignore designer filter OR just show all products if designer is selected (as a "Collection" view)
    // Let's allow filtering ONLY if the product actually has that designer name.
    if (activeDesigner) {
      // Relaxed check: if product designer includes the name or is default
      return initialProducts.filter(p => p.designer === activeDesigner);
    }
    if (activeCategory === "All") {
      return initialProducts;
    }
    return initialProducts.filter(p => p.category === activeCategory);
  }, [activeCategory, activeDesigner, initialProducts]);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setActiveDesigner(null); // Clear designer filter
  };

  const handleDesignerSelect = (designerName: string) => {
    if (activeDesigner === designerName) {
        setActiveDesigner(null);
        setActiveCategory("All");
    } else {
        setActiveDesigner(designerName);
        setActiveCategory("All");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-stone-900 selection:bg-stone-900 selection:text-white">
      
      {/* Header Section */}
      <section className="pt-40 pb-12 px-6 container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-stone-400 uppercase mb-4">The Collection 2024</p>
          <h1 className="font-serif text-6xl md:text-8xl mb-8 leading-none">
            Curated <br /> <span className="italic text-stone-400">Excellence</span>
          </h1>
          <p className="font-sans text-stone-600 max-w-lg text-lg leading-relaxed">
            Objects that do not just fill a space, but define it. 
            Each piece is a dialogue between tradition and modernity.
          </p>
        </motion.div>

        {/* Designer Accordion Filter */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <DesignerAccordion 
                designers={designers} 
                activeDesigner={activeDesigner}
                onSelect={handleDesignerSelect}
            />
        </motion.div>
      </section>

      {/* Filter Bar (Sticky) */}
      <section className="sticky top-24 z-40 bg-[#f8f8f6]/80 backdrop-blur-md border-b border-stone-200 mb-12 transition-all duration-300">
        <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 h-16 whitespace-nowrap">
            {categories.map((cat) => {
              const isSelected = !activeDesigner && activeCategory === cat;
              
              return (
                <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`text-xs uppercase tracking-widest transition-colors duration-300 ${
                    isSelected 
                        ? "text-stone-900 font-bold border-b-2 border-stone-900 pb-1" 
                        : "text-stone-400 hover:text-stone-900"
                    }`}
                >
                    {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-6 pb-32">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
              >
                <Link href={`/product/${product.id}`} className="block">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 mb-6">
                    <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500" />
                    
                    {/* Quick Action (View Details) */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <span className="text-white font-serif italic text-lg tracking-wider">
                        View details →
                        </span>
                    </div>
                    </div>

                    {/* Info */}
                    <div className="flex justify-between items-end border-t border-stone-300 pt-4">
                    <div>
                        <h3 className="font-serif text-2xl text-stone-900 mb-1 group-hover:text-stone-600 transition-colors">{product.name}</h3>
                        <p className="text-[10px] tracking-widest uppercase text-stone-500">
                            <span className="text-stone-400">Designed by</span> {product.designer}
                        </p>
                    </div>
                    <span className="font-sans text-[10px] font-bold text-stone-400 uppercase tracking-widest">{product.collection}</span>
                    </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
           <div className="py-24 text-center">
              <p className="font-serif text-2xl text-stone-400 italic">No pieces found in this collection.</p>
           </div>
        )}
      </section>

      {/* Simple Footer for Collection Page */}
      <footer className="bg-white py-12 border-t border-stone-200">
         <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 uppercase tracking-widest">
            <span>© 2024 Casa Italia</span>
            <div className="flex gap-8 mt-4 md:mt-0">
               <a href="#" className="hover:text-stone-900">Instagram</a>
               <a href="#" className="hover:text-stone-900">Contact</a>
            </div>
         </div>
      </footer>
    </main>
  );
}
