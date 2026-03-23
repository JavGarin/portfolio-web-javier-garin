import { memo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const subtitleRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const accentLineRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      gsap.killTweensOf([
        containerRef.current,
        subtitleRef.current,
        firstNameRef.current,
        lastNameRef.current,
        descriptionRef.current,
        accentLineRef.current,
      ]);
    };
  }, []);

  useGSAP(() => {
    // Honor prefers-reduced-motion (web-design-guidelines)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Show everything instantly with no animation
      gsap.set(
        [
          containerRef.current,
          subtitleRef.current,
          firstNameRef.current,
          lastNameRef.current,
          descriptionRef.current,
          accentLineRef.current,
        ],
        { opacity: 1, y: 0, x: 0, scaleX: 1 }
      );
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(containerRef.current, { opacity: 0, duration: 0.4 });

    tl.from(
      accentLineRef.current,
      { scaleX: 0, duration: 0.6, transformOrigin: "left center" },
      "-=0.1"
    );

    tl.from(
      subtitleRef.current,
      { opacity: 0, y: 20, duration: 0.6 },
      "-=0.3"
    );

    tl.from(
      firstNameRef.current,
      { opacity: 0, y: 60, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    tl.from(
      lastNameRef.current,
      { opacity: 0, y: 60, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    tl.from(
      descriptionRef.current,
      { opacity: 0, y: 30, duration: 0.6 },
      "-=0.3"
    );
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background video — decorative, stays in both themes */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: "transform" }}
      >
        <source src="/video/shadowSandHero.webm" type="video/webm" />
      </video>

      {/* Adaptive overlay: flat dark tint + lateral gradient for text legibility.
          Uses CSS variables so it reacts to dark/light theme automatically. */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-gradient)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto w-full"
      >
        {/* Accent line — animated indigo bar */}
        <div
          ref={accentLineRef}
          className="w-12 h-0.5 mb-6 sm:mb-8 rounded-full"
          style={{ backgroundColor: "var(--color-accent)" }}
          aria-hidden="true"
        />

        {/* Subtitle — always light text since Hero bg is always dark (video) */}
        <p
          ref={subtitleRef}
          className="text-sm sm:text-base font-light tracking-[0.3em] uppercase mb-4 sm:mb-6 drop-shadow-md"
          style={{ color: "var(--always-light-accent)" }}
        >
          {t("hero_subtitle")}
        </p>

        {/* Main name — two lines — always white over the dark video background */}
        <div className="overflow-hidden">
          <h1 className="flex flex-col leading-none" style={{ textWrap: "balance" }}>
            <span
              ref={firstNameRef}
              className="font-bold text-6xl sm:text-8xl lg:text-[10rem] xl:text-[12rem] tracking-tight uppercase drop-shadow-2xl"
              style={{ color: "var(--always-light-text)" }}
            >
              Javier
            </span>
            <span
              ref={lastNameRef}
              className="font-bold text-6xl sm:text-8xl lg:text-[10rem] xl:text-[12rem] tracking-tight uppercase -mt-2 sm:-mt-4 lg:-mt-8 drop-shadow-2xl"
              style={{ color: "var(--always-light-text)" }}
            >
              Garín
            </span>
          </h1>
        </div>

        {/* Description — always light over dark video */}
        <div
          ref={descriptionRef}
          className="mt-8 sm:mt-12 max-w-xl ml-auto text-right"
        >
          <p
            className="font-light text-sm sm:text-base uppercase tracking-wide leading-relaxed drop-shadow-lg"
            style={{ color: "var(--always-light-text-muted)" }}
          >
            {t("hero_text")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);