"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { DesignerAccordion } from "@/components/DesignerAccordion";

// --- Mock Data ---
const categories = ["All", "Living", "Dining", "Bedroom", "Lighting", "Decor"];

const products = [
  {
    id: 1,
    name: "Velluto Rosso",
    category: "Living",
    collection: "Velvet Series",
    image: "/images/02.png",
    designer: "Mario Bellini"
  },
  {
    id: 2,
    name: "Marble Silence",
    category: "Dining",
    collection: "Stone Edition",
    image: "/images/03.png",
    designer: "Piero Lissoni"
  },
  {
    id: 3,
    name: "Cloud Sofa",
    category: "Living",
    collection: "Soft Form",
    image: "/images/04.png",
    designer: "Patricia Urquiola"
  },
  {
    id: 4,
    name: "Noir Lamp",
    category: "Lighting",
    collection: "Dark Light",
    image: "/images/bo/1.png",
    designer: "Achille Castiglioni"
  },
  {
    id: 5,
    name: "Onda Bed",
    category: "Bedroom",
    collection: "Sleep System",
    image: "/images/bo/2.png",
    designer: "Antonio Citterio"
  },
  {
    id: 6,
    name: "Siena Chair",
    category: "Dining",
    collection: "Classic Wood",
    image: "/images/bo/3.png",
    designer: "Gio Ponti"
  },
  {
    id: 7,
    name: "Luna Pendant",
    category: "Lighting",
    collection: "Moon Series",
    image: "/images/bo/4.png",
    designer: "Vico Magistretti"
  },
  {
    id: 8,
    name: "Matteo Armchair",
    category: "Living",
    collection: "Lounge 2024",
    image: "/images/bo/5.png",
    designer: "Rodolfo Dordoni"
  },
  {
    id: 9,
    name: "Vita Desk",
    category: "Decor",
    collection: "Work Space",
    image: "/images/bo/6.png",
    designer: "Mario Bellini"
  }
];

// Helper to get unique designers with images
// In a real app, this would come from a database. Here we map manually or cycle images.
const getDesigners = () => {
  const uniqueNames = Array.from(new Set(products.map(p => p.designer)));
  return uniqueNames.map((name, index) => ({
    id: `designer-${index}`,
    name,
    // Cycle through available images 001-008
    image: `/images/renwu/${String((index % 8) + 1).padStart(3, '0')}.png`
  }));
};

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDesigner, setActiveDesigner] = useState<string | null>(null);

  const designers = useMemo(() => getDesigners(), []);

  // Filter Logic: Mutually exclusive (Last interaction wins)
  const filteredProducts = useMemo(() => {
    if (activeDesigner) {
      return products.filter(p => p.designer === activeDesigner);
    }
    if (activeCategory === "All") {
      return products;
    }
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, activeDesigner]);

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setActiveDesigner(null); // Clear designer filter
  };

  const handleDesignerSelect = (designerName: string) => {
    // If clicking the same designer, toggle off? Or just select. 
    // Let's implement toggle off for better UX
    if (activeDesigner === designerName) {
        setActiveDesigner(null);
        setActiveCategory("All");
    } else {
        setActiveDesigner(designerName);
        setActiveCategory("All"); // Reset category visual state to 'All' or just ignore it?
        // Let's keep category as 'All' to show we are in Designer mode
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
              // Determine if this category is 'active' visually
              // If we are in designer mode, no category should look active except maybe 'All' if we treated it as reset?
              // Better: If activeDesigner is set, no category is active.
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
