import React, { lazy, Suspense } from "react";
import Navbar from "./sections/Navbar";
import ThemeLanguageControls from "./components/ThemeLanguageControls";
import { ThemeProvider } from "./context/ThemeContext";
import Hero from "./sections/Hero";
import ReactLenis from "lenis/react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lazy load de secciones below-fold para reducir JavaScript inicial
const ServiceSummary = lazy(() => import("./sections/ServiceSummary"));
const Services = lazy(() => import("./sections/Services"));
const About = lazy(() => import("./sections/About"));
const Works = lazy(() => import("./sections/Works"));
const ContactSummary = lazy(() => import("./sections/ContactSummary"));
const Contact = lazy(() => import("./sections/Contact"));

// Fallback mínimo para Suspense
const SectionFallback = () => <div className="min-h-[50vh]" />;

const App = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });



  const content = (
    <>
      <ThemeLanguageControls />
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </Suspense>
    </>
  );

  return isDesktop ? (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      <ThemeProvider>{content}</ThemeProvider>
    </ReactLenis>
  ) : (
    <div className="relative w-screen min-h-screen overflow-x-auto">
      <ThemeProvider>{content}</ThemeProvider>
    </div>
  );
};

export default App;