import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';
import PageLoader from '@/components/ui/PageLoader';
import CustomCursor from '@/components/ui/CustomCursor';
import AudioToggle from '@/components/ui/AudioToggle';

export default function Home() {
  return (
    <>
      {/* Page Opening Animation */}
      <PageLoader />

      {/* Background Effects */}
      <ParticleBackground />
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Audio Toggle */}
      <AudioToggle />
    </>
  );
}
