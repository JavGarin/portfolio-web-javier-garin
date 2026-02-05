import React, { useEffect, useRef, useState, memo } from "react";
import { socials, email } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full px-10 uppercase py-16 gap-y-8 md:w-1/2 md:left-1/2 h-auto rounded-b-3xl backdrop-blur-xl bg-primary-bg/80 [.dark-section-active_&]:bg-black/70"
      >
        <div className="flex flex-col text-4xl gap-y-2 md:text-5xl lg:text-7xl text-primary-text/80">
          {["home", "services", "about", "work", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="transition-all duration-300 cursor-pointer hover:text-accent [.dark-section-active_&]:text-white [.dark-section-active_&]:[text-shadow:0_0_5px_rgba(255,255,255,0.5)]"
                  to={`${section}`}
                  href={`#${section}`}
                  smooth
                  offset={0}
                  duration={500}
                  onClick={toggleMenu}
                >
                  {t(`nav_${section}`)}
                </Link>
              </div>
            )
          )}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-secondary-text/50 [.dark-section-active_&]:text-white/60">{t('nav_email')}</p>
            <div onClick={handleCopy} className="cursor-pointer">
              <p className="text-xl tracking-widest lowercase text-pretty text-primary-text [.dark-section-active_&]:text-white">
                {copied ? t('nav_copied') : email}
              </p>
            </div>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-secondary-text/50 [.dark-section-active_&]:text-white/60">{t('nav_social_media')}</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-loose tracking-widest uppercase transition-colors duration-300 text-primary-text hover:text-accent [.dark-section-active_&]:text-white"
                >
                  {" { "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-secondary-text/50 [.dark-section-active_&]:text-white/60">{t('nav_language')}</p>
            <div className="flex gap-x-4 text-xl tracking-widest uppercase text-primary-text [.dark-section-active_&]:text-white">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`transition-colors duration-200 cursor-pointer ${i18n.language === 'en' ? 'text-accent' : 'hover:text-accent/80'}`}
              >
                EN
              </button>
              <span>/</span>
              <button
                onClick={() => i18n.changeLanguage('es')}
                className={`transition-colors duration-200 cursor-pointer ${i18n.language === 'es' ? 'text-accent' : 'hover:text-accent/80'}`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-primary-bg [.dark-section-active_&]:bg-neutral-800 rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10 ${
          isScrolled ? "opacity-50" : "opacity-100"
        }`}
        onClick={toggleMenu}
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-black rounded-full origin-center transition-all [.dark-section-active_&]:bg-white [.dark-section-active_&]:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.7))]"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-black rounded-full origin-center transition-all [.dark-section-active_&]:bg-white [.dark-section-active_&]:[filter:drop-shadow(0_0_2px_rgba(255,255,255,0.7))]"
        ></span>
      </div>
    </> 
  );
};

export default memo(Navbar);