import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import BankSphere from "@/components/sections/BankSphere";
import PlantMind from "@/components/sections/PlantMind";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { banksphere } from "@/data/content";
import { banksphereMedia } from "@/lib/media";

export default function Home() {
  const media = banksphereMedia(banksphere.features.map((f) => f.media!).filter(Boolean));
  return (
    <>
      <Hero />
      <About />
      <BankSphere media={media} />
      <PlantMind />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <Services />
      <Contact />
    </>
  );
}
