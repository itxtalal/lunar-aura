import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ParallaxStars } from "@/components/parallax-stars";
import { ParticlesBackground } from "@/components/particles-background";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParallaxStars />
      <ParticlesBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
      </div>
    </main>
  );
}
