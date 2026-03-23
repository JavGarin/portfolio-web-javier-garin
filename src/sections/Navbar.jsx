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
        className="fixed z-50 flex flex-col justify-between w-full px-6 py-8 uppercase gap-y-6 md:px-10 md:py-16 md:gap-y-8 md:w-1/2 md:left-1/2 h-auto rounded-b-3xl backdrop-blur-xl transition-colors duration-300"
        style={{
          backgroundColor: "var(--primary-bg)",
          /* Opacity via RGB alpha overlay handled natively or via tailwind bg-opacity */
        }}
      >
        <div className="flex flex-col text-2xl gap-y-1.5 sm:text-3xl md:text-5xl md:gap-y-2 lg:text-7xl">
          {["home", "services", "about", "work", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="transition-all duration-300 cursor-pointer text-primary-text/80 hover:text-accent [.dark-section-active_&]:text-primary-text [.dark-section-active_&]:drop-shadow-sm"
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
          className="flex flex-col flex-wrap justify-between gap-4 sm:gap-6 md:gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="text-xs sm:text-sm tracking-wider text-secondary-text/80">{t('nav_email')}</p>
            <div onClick={handleCopy} className="cursor-pointer">
              <p className="text-sm sm:text-base md:text-xl tracking-widest lowercase text-pretty text-primary-text hover:text-accent transition-colors">
                {copied ? t('nav_copied') : email}
              </p>
            </div>
          </div>
          <div className="font-light">
            <p className="text-xs sm:text-sm tracking-wider text-secondary-text/80">{t('nav_social_media')}</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm leading-loose tracking-widest uppercase transition-colors duration-300 text-primary-text hover:text-accent"
                >
                  {" { "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10 border-2"
        style={{
          backgroundColor: 'var(--menu-button-bg)',
          borderColor: 'var(--border-color)',
          opacity: isScrolled ? 0.5 : 1
        }}
        onClick={toggleMenu}
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 rounded-full origin-center transition-all"
          style={{ backgroundColor: 'var(--menu-button-line)' }}
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 rounded-full origin-center transition-all"
          style={{ backgroundColor: 'var(--menu-button-line)' }}
        ></span>
      </div>
    </> 
  );
};

export default memo(Navbar);