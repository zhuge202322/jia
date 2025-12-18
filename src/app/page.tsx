import HeroSection from "@/components/HeroSection";
import HeroSlider from "@/components/HeroSlider";
import ParallaxShowcase from "@/components/ParallaxShowcase";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      {/* Opening Animation (Fixed Overlay) */}
      <HeroSection />

      {/* Main Content: Hero Slider */}
      <HeroSlider />
      
      {/* Visual Displacement / Parallax Product Showcase */}
      <ParallaxShowcase />
    </main>
  );
}
