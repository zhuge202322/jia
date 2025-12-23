"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
    <div className="w-full overflow-x-hidden">
    <main className="min-h-screen bg-[#f8f8f6] text-stone-900 pt-32 pb-24 px-6 md:px-12 lg:px-24">
      
      {/* 1. Header Section */}
      <section className="mb-24 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 block mb-6">
            Get in Touch
          </span>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl leading-none">
            Start a <br /> <span className="italic text-stone-500 font-light">Dialogue</span>
          </h1>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* 2. Left Column: Contact Info */}
        <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
        >
            <div className="mb-16">
                <h3 className="font-serif text-3xl mb-8">Global Services</h3>
                <p className="font-sans text-stone-500 leading-relaxed mb-6 text-lg">
                    HC Furniture Supply provides professional custom furniture solutions for Luxury Hotels, Modern Offices, and Luxury Residential projects. Global supply chain expert based in China.
                </p>
                <div className="space-y-2">
                    <a href="mailto:mahoch1996@outlook.com" className="block text-stone-900 hover:text-stone-500 transition-colors border-b border-stone-300 pb-1 w-fit">mahoch1996@outlook.com</a>
                    <a href="tel:+8615989611582" className="block text-stone-900 hover:text-stone-500 transition-colors border-b border-stone-300 pb-1 w-fit">86+15989611582</a>
                </div>
            </div>

            <div className="mb-16">
                <h3 className="font-serif text-3xl mb-8">Global Supply Chain</h3>
                <p className="font-sans text-stone-500 leading-relaxed mb-6 text-lg">
                    HC Furniture Supply provides professional custom furniture solutions for Luxury Hotels, Modern Offices, and Luxury Residential projects. Global supply chain expert based in China.
                </p>
                <div className="space-y-2">
                    <a href="mailto:mahoch1996@outlook.com" className="block text-stone-900 hover:text-stone-500 transition-colors border-b border-stone-300 pb-1 w-fit">mahoch1996@outlook.com</a>
                    <a href="tel:+8615989611582" className="block text-stone-900 hover:text-stone-500 transition-colors border-b border-stone-300 pb-1 w-fit">86+15989611582</a>
                </div>
            </div>

             <div className="pt-12 border-t border-stone-200">
                <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-stone-400 mb-8">Follow Us</h4>
                <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
                    <a href="#" className="hover:text-stone-500 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-stone-500 transition-colors">Pinterest</a>
                    <a href="#" className="hover:text-stone-500 transition-colors">WeChat</a>
                </div>
            </div>
        </motion.div>

        {/* 3. Right Column: Minimalist Form */}
        <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
        >
            <div className="bg-white p-6 md:p-16 shadow-sm border border-stone-100">
                <h3 className="font-serif text-2xl mb-12">Send an Inquiry</h3>
                <form className="space-y-12">
                    <div className="grid grid-cols-1 gap-12">
                        <div className="group relative">
                            <input type="text" id="name" required className="peer w-full bg-transparent border-b border-stone-200 py-3 text-lg font-serif text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder-transparent" placeholder="Name" />
                            <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-900 peer-focus:text-xs uppercase">Name</label>
                        </div>
                        <div className="group relative">
                            <input type="email" id="email" required className="peer w-full bg-transparent border-b border-stone-200 py-3 text-lg font-serif text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder-transparent" placeholder="Email" />
                            <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-900 peer-focus:text-xs uppercase">Email</label>
                        </div>
                    </div>
                    
                    <div className="group relative">
                        <input type="text" id="subject" className="peer w-full bg-transparent border-b border-stone-200 py-3 text-lg font-serif text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder-transparent" placeholder="Subject" />
                        <label htmlFor="subject" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-900 peer-focus:text-xs uppercase">Subject</label>
                    </div>

                    <div className="group relative">
                        <textarea id="message" rows={4} required className="peer w-full bg-transparent border-b border-stone-200 py-3 text-lg font-serif text-stone-900 focus:outline-none focus:border-stone-900 transition-colors placeholder-transparent resize-none" placeholder="Message"></textarea>
                        <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs font-bold tracking-widest text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-stone-900 peer-focus:text-xs uppercase">Message</label>
                    </div>
                    
                    <div className="pt-6">
                        <button type="submit" className="group flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-stone-900 hover:text-stone-500 transition-colors">
                            <span>Send Message</span>
                            <span className="w-8 h-[1px] bg-stone-900 group-hover:w-16 group-hover:bg-stone-500 transition-all" />
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
      </div>
    </main>
    <Footer />
    </div>
    </>
  );
}
