import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import { useProgress } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";

const About = lazy(() => import("./sections/About"));
const Works = lazy(() => import("./sections/Works"));
const ContactSummary = lazy(() => import("./sections/ContactSummary"));
const Contact = lazy(() => import("./sections/Contact"));

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const contactRef = useRef(null);
  const isDesktop = useMediaQuery({ minWidth: 1024 }); // lg breakpoint

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  const content = (
    <>
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-primary-bg text-primary-text transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <Suspense fallback={<div>Loading...</div>}>
          <About />
          <Works />
          <ContactSummary />
          <Contact ref={contactRef} />
        </Suspense>
      </div>
    </>
  );

  return isDesktop ? (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      {content}
    </ReactLenis>
  ) : (
    <div className="relative w-screen min-h-screen overflow-x-auto">
      {content}
    </div>
  );
};

export default App;