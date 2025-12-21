import { memo, useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const ContactSummary = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const textRef = useRef(null); 

    const items = [
        "HTML5", "CSS3", "JavaScript", "React", "Node.js", "Tailwind CSS",
        "Next.js", "TypeScript", "GSAP", "Three.js", "Vercel", "Supabase", "Figma",
    ];
    const items2 = [
        "contact me", "contact me", "contact me", "contact me", "contact me",
    ];

    const phrase = t('contact_summary_phrase');

    useGSAP(() => {
        // 1. responsive animation setup with gsap.matchMedia()
        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Desktop pinning animation
            gsap.to(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center center",
                    end: "+=800 center",
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true,
                    markers: false,
                },
            });
        });

        // 2. Word entrance animation
        const words = gsap.utils.toArray('.word-animation');
        gsap.from(words, {
            opacity: 0,
            y: 30,
            filter: 'blur(8px)',
            duration: 2.5,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });

        // 3. Character-level hover animation ("Quantum Shimmer")
        const chars = gsap.utils.toArray('.char-animation');
        textRef.current.addEventListener('mouseenter', () => {
            gsap.to(chars, {
                duration: 0.3,
                opacity: 0.8,
                x: () => gsap.utils.random(-10, 10),
                y: () => gsap.utils.random(-10, 10),
                rotate: () => gsap.utils.random(-20, 20),
                stagger: { each: 0.015, from: "random" },
                ease: 'power2.out'
            });
        });

        textRef.current.addEventListener('mouseleave', () => {
            gsap.to(chars, {
                duration: 0.5,
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                stagger: { each: 0.015, from: "random" },
                ease: 'power3.inOut'
            });
        });

    }, { scope: containerRef });
    
    return (
        <section
            ref={containerRef}
            className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
        >
            <Marquee items={items} />
            <div ref={textRef} className="overflow-hidden font-light text-center contact-text-responsive relative z-10 cursor-pointer">
                <p className="relative z-10 text-primary-text" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)' }}>
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