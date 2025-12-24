"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  
  // Only start vertical on homepage, otherwise start horizontal immediately
  const [isVertical, setIsVertical] = useState(isHomepage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Only run the transition timer if we are on the homepage
    if (isHomepage) {
        // SYNC TIMING: Matches HeroSection delay (0.5s)
        // The layout animation itself will take 1.5s, perfectly mirroring the gate opening duration
        const timer = setTimeout(() => setIsVertical(false), 500); 
        return () => clearTimeout(timer);
    } else {
        // Force horizontal on other pages (just in case)
        setIsVertical(false);
    }
  }, [isHomepage]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const menuItems = ["Home", "Collection", "About Us", "Contact"];

  return (
    <>
      {/* LOGO: Always Top-Left */}
      <motion.div
        className="fixed top-6 left-6 md:left-12 md:top-8 z-[70] mix-blend-difference"
        initial={{ opacity: 0, y: isHomepage ? -20 : 0 }} // Only animate y on homepage
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: isHomepage ? 0.5 : 0 }} // Only delay on homepage
      >
        <Link href="/">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-white uppercase cursor-pointer">
            HC Furniture Supply
            </span>
        </Link>
      </motion.div>

      {/* 
        ===========================================
        DESKTOP MENU (MD+)
        Hidden on mobile, visible on medium screens and up
        ===========================================
      */}
      <motion.nav
        layout
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className={clsx(
            "fixed z-[60] hidden lg:flex gap-4 md:gap-8",
            isVertical 
                ? "flex-col items-end right-8 top-1/2 -translate-y-1/2" // Vertical: Right center
                : "flex-row items-center lg:top-6 left-0 right-0 mx-auto w-fit px-10 py-4" // Horizontal: Adjusted top alignment
        )}
      >
        {/* Horizontal Background Pill */}
        {!isVertical && (
            <motion.div 
                layoutId="navbar-pill"
                className="absolute inset-0 bg-black/30 backdrop-blur-md border border-white/10 rounded-full shadow-lg -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
            />
        )}

        {menuItems.map((item) => {
            const isHome = item === "Home";
            const isCollection = item === "Collection";
            const isAbout = item === "About Us";
            const isContact = item === "Contact";
            
            const Content = (
                <motion.div
                    layout
                    className={clsx(
                    "uppercase tracking-widest text-[10px] md:text-xs font-bold cursor-pointer text-center whitespace-nowrap",
                    isVertical
                        ? "bg-black/30 text-white px-6 py-3 rounded-full hover:bg-black/50 w-auto text-right min-w-[120px] backdrop-blur-md border border-white/10"
                        : "bg-transparent text-white"
                    )}
                >
                    {item}
                </motion.div>
            );

            if (isHome) {
                return <Link key={item} href="/">{Content}</Link>;
            } else if (isCollection) {
                return <Link key={item} href="/collection">{Content}</Link>;
            } else if (isAbout) {
                return <Link key={item} href="/about">{Content}</Link>;
            } else if (isContact) {
                return <Link key={item} href="/contact">{Content}</Link>;
            }

            return (
                <div key={item}>{Content}</div>
            );
        })}
      </motion.nav>

      {/* 
        ===========================================
        MOBILE MENU BUTTON & OVERLAY (< MD)
        Visible only on mobile
        ===========================================
      */}
      
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-6 right-6 z-[70] lg:hidden p-2 text-white mix-blend-difference focus:outline-none"
      >
        <div className="w-6 flex flex-col items-end gap-1.5">
            <motion.span 
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
                className="w-full h-0.5 bg-white block" 
            />
            <motion.span 
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-3/4 h-0.5 bg-white block" 
            />
            <motion.span 
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0, width: isMobileMenuOpen ? "100%" : "50%" }}
                className="w-1/2 h-0.5 bg-white block" 
            />
        </div>
      </button>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed inset-0 z-[65] bg-stone-900 text-white flex flex-col justify-center px-12 lg:hidden"
            >
                <div className="flex flex-col gap-8">
                    {menuItems.map((item, i) => {
                         const href = item === "Home" ? "/" : item === "Collection" ? "/collection" : item === "About Us" ? "/about" : item === "Contact" ? "/contact" : "#";
                         return (
                            <Link key={item} href={href} onClick={() => setIsMobileMenuOpen(false)}>
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    className="text-4xl font-serif border-b border-white/10 pb-4"
                                >
                                    {item}
                                </motion.div>
                            </Link>
                         );
                    })}
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-stone-500 text-xs uppercase tracking-widest"
                >
                    Houjie Town, Dongguan City <br/> Guangdong, China
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

