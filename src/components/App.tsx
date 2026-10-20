import { ScrollProvider } from "@/lib/scroll";
import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Healthcare from "./sections/Healthcare";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import RevealObserver from "./ui/RevealObserver";

export default function App() {
  return (
    <ScrollProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Healthcare />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <RevealObserver />
    </ScrollProvider>
  );
}
