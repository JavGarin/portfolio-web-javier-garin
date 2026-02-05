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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      gsap.killTweensOf([containerRef.current, subtitleRef.current, firstNameRef.current, lastNameRef.current, descriptionRef.current]);
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Animación inicial del contenedor
    tl.from(containerRef.current, {
      opacity: 0,
      duration: 0.4,
    });

    // Subtítulo con fade sutil
    tl.from(subtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
    }, "-=0.2");

    // Nombre (Javier) - entrada elegante
    tl.from(firstNameRef.current, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.3");

    // Apellido (Garín) - entrada elegante con delay
    tl.from(lastNameRef.current, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.5");

    // Descripción con fade suave
    tl.from(descriptionRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
    }, "-=0.3");

  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center bg-black px-6 sm:px-12 lg:px-20"
    >
      <div ref={containerRef} className="max-w-7xl mx-auto w-full">
        {/* Subtítulo */}
        <p
          ref={subtitleRef}
          className="text-white/70 text-sm sm:text-base font-light tracking-[0.3em] uppercase mb-6 sm:mb-8"
        >
          {t('hero_subtitle')}
        </p>

        {/* Nombre principal - Separado en dos líneas */}
        <div className="overflow-hidden">
          <h1 className="flex flex-col leading-none">
            <span
              ref={firstNameRef}
              className="text-white font-bold text-6xl sm:text-8xl lg:text-[10rem] xl:text-[12rem] tracking-tight uppercase"
            >
              Javier
            </span>
            <span
              ref={lastNameRef}
              className="text-white font-bold text-6xl sm:text-8xl lg:text-[10rem] xl:text-[12rem] tracking-tight uppercase -mt-2 sm:-mt-4 lg:-mt-8"
            >
              Garín
            </span>
          </h1>
        </div>

        {/* Descripción */}
        <div ref={descriptionRef} className="mt-8 sm:mt-12 max-w-xl ml-auto text-right">
          <p className="text-white/80 text-sm sm:text-base font-light uppercase tracking-wide leading-relaxed">
            {t('hero_text')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);