import { memo, useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const ContactSummary = () => {
    const { t } = useTranslation();
    const { resolvedTheme } = useTheme();
    const containerRef = useRef(null);
    const textRef = useRef(null); 

    const items = [
        "HTML5", "CSS3", "JavaScript", "React", "Node.js", "Tailwind CSS",
        "TypeScript", "GSAP", "SQL", "AI", "Git", "CI/CD", "Docker",
    ];
    const items2 = [
        "contact me", "contact me", "contact me", "contact me", "contact me",
    ];

    const phrase = t('contact_summary_phrase');

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // ── DESKTOP (≥768px) ──────────────────────────────────────────
        mm.add("(min-width: 768px)", () => {
            // Pinning largo para efecto dramático de escritorio
            gsap.to(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center center",
                    end: "+=800 center",
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                },
            });

            // Desktop: palabras entran con blur+y (efecto original)
            gsap.from(".word-animation", {
                opacity: 0,
                y: 50,
                filter: "blur(12px)",
                duration: 1.2,
                stagger: { each: 0.12, from: "start" },
                ease: "power3.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 78%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        // ── MOBILE (<768px) ───────────────────────────────────────────
        mm.add("(max-width: 767px)", () => {
            // Pinning suave en mobile
            gsap.to(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 8%",
                    end: "+=350 top",
                    scrub: 0.6,
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                },
            });

            // Mobile: cada LETRA cae desde arriba, una a una
            const chars = gsap.utils.toArray(".char-animation");
            gsap.from(chars, {
                opacity: 0,
                y: -80,           // caen desde arriba
                rotationX: 90,    // rotación 3D para dar sensación de volumen
                transformOrigin: "50% 0%",
                duration: 0.6,
                ease: "back.out(1.4)",
                stagger: {
                    each: 0.03,   // 30ms entre cada letra → muy fluido
                    from: "start",
                },
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        // ── HOVER / TOUCH SHIMMER (común en ambos) ────────────────────
        const chars = gsap.utils.toArray(".char-animation");

        const handleEnter = () => {
            gsap.to(chars, {
                duration: 0.35,
                opacity: 0.65,
                y: () => gsap.utils.random(-6, 6),
                x: () => gsap.utils.random(-5, 5),
                stagger: { each: 0.008, from: "random" },
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        const handleLeave = () => {
            gsap.to(chars, {
                duration: 0.55,
                opacity: 1,
                x: 0,
                y: 0,
                stagger: { each: 0.008, from: "random" },
                ease: "power3.inOut",
                overwrite: "auto",
            });
        };

        const el = textRef.current;
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
        el.addEventListener("touchstart", handleEnter, { passive: true });
        el.addEventListener("touchend", handleLeave, { passive: true });

        return () => {
            mm.revert();
            el.removeEventListener("mouseenter", handleEnter);
            el.removeEventListener("mouseleave", handleLeave);
            el.removeEventListener("touchstart", handleEnter);
            el.removeEventListener("touchend", handleLeave);
        };
    }, { scope: containerRef });
    
    return (
        <section
            ref={containerRef}
            className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
        >
            <Marquee items={items} />
            <div ref={textRef} className="overflow-hidden font-light text-center contact-text-responsive relative z-10 cursor-pointer px-6">
                <p 
                    className="relative z-10 text-primary-text transition-all duration-500" 
                    style={{ 
                        textShadow: resolvedTheme === 'dark' 
                            ? '0 0 20px rgba(99, 102, 241, 0.2)' 
                            : '0 0 15px rgba(0, 0, 0, 0.05)',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                    }}
                >
                    {phrase.split(" ").map((word, wordIndex) => (
                        <span key={wordIndex} className="inline-block word-animation">
                            {word.split("").map((char, charIndex) => (
                                <span key={charIndex} className="inline-block char-animation">
                                    {char}
                                </span>
                            ))}
                            {wordIndex !== phrase.split(" ").length - 1 ? '\u00A0' : ''}
                        </span>
                    ))}
                </p>
            </div>
            <Marquee
                items={items2}
                reverse={true}
                className="text-primary-text bg-transparent border-y-2 border-secondary-text"
                iconClassName="stroke-accent stroke-2 text-primary-text"
                icon="material-symbols-light:square"
            />
        </section>
    );
};

export default memo(ContactSummary);