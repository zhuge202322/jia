"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-24 relative z-10 w-full max-w-full overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            
            {/* Brand Column */}
            <div className="md:col-span-4">
              <h2 className="font-serif text-3xl text-white mb-6">HC Furniture Supply</h2>
              <p className="font-sans text-sm leading-relaxed max-w-xs mb-8">
                Professional custom furniture manufacturer based in China. We specialize in high-end solutions for Luxury Hotels, Offices, and Residential projects with global delivery.
              </p>
              <p className="text-xs uppercase tracking-widest text-stone-600">© 2024 HC Furniture Supply. All Rights Reserved.</p>
            </div>

            {/* Links Column 1 */}
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Collections</h4>
              <ul className="space-y-4 text-sm font-sans">
                <li><Link href="/collection" className="hover:text-white transition-colors">Living</Link></li>
                <li><Link href="/collection" className="hover:text-white transition-colors">Dining</Link></li>
                <li><Link href="/collection" className="hover:text-white transition-colors">Bedroom</Link></li>
                <li><Link href="/collection" className="hover:text-white transition-colors">Lighting</Link></li>
                <li><Link href="/collection" className="hover:text-white transition-colors">Office</Link></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-sans">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Designers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Showrooms</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact / Social */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">Connect</h4>
              <p className="text-sm mb-8">Houjie Town, Dongguan City, Guangdong Province, China</p>
              
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all cursor-pointer">INS</div>
                 <div className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all cursor-pointer">FB</div>
                 <div className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all cursor-pointer">PIN</div>
              </div>
            </div>

          </div>
        </div>
      </footer>
  );
}
