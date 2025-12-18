import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CASA ITALIA | Luxury Furniture",
  description: "Minimalist Italian Design Furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" style={{ scrollbarGutter: "stable" }}>
      <body
        className={`${playfair.variable} ${lato.variable} font-sans antialiased bg-stone-50 text-stone-900 overflow-x-hidden`}
      ><Navbar />
        
        {children}
      </body>
    </html>
  );
}
