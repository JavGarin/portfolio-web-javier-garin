import React from "react";
import { useRef, useEffect } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedHeaderSection = ({
    subTitle,
    title,
    text,
    textColor,
    withScrollTrigger = false,
}) => {
    const triggerRef = useRef(null);
    const contentRef = useRef(null);
    const headerRef = useRef(null);
    const subtitleRef = useRef(null);
    const titleRef = useRef(null);
    const wordsRef = useRef([]);
    const textRef = useRef(null);
    
    const shouldSplitTitle = title.includes(" ");
    const titleParts = shouldSplitTitle ? title.split(" ") : [title];

    // Cleanup on unmount para evitar memory leaks
    useEffect(() => {
        return () => {
            gsap.killTweensOf([contentRef.current, headerRef.current, subtitleRef.current, titleRef.current, wordsRef.current, textRef.current]);
            ScrollTrigger.getAll().forEach(t => {
                if (t.vars.trigger === triggerRef.current) t.kill();
            });
        };
    }, []);

    useGSAP(() => {
        // Timeline principal con configuraciones optimizadas
        const tl = gsap.timeline({
            scrollTrigger: withScrollTrigger
                ? {
                    trigger: triggerRef.current,
                    start: "top 85%", // Un poco más tarde para asegurar visibilidad
                    end: "bottom 15%",
                    toggleActions: "play pause resume reverse", // Comportamiento más fluido
                }
                : undefined,
            defaults: {
                ease: "power3.out",
                duration: 1,
            }
        });

        // Animación de entrada suave del contenido
        tl.from(contentRef.current, {
            opacity: 0,
            y: 50,
            duration: 1.2,
        });

        // Subtítulo
        tl.from(
            subtitleRef.current,
            {
                opacity: 0,
                y: 20,
                duration: 0.8,
            },
            "-=0.8"
        );

        // Título (palabras)
        if (wordsRef.current.length > 0) {
            tl.from(
                wordsRef.current,
                {
                    opacity: 0,
                    y: 40,
                    rotationX: -15,
                    stagger: 0.1,
                    duration: 1,
                    onStart: () => {
                        wordsRef.current.forEach(word => {
                            if (word) word.style.willChange = 'transform, opacity';
                        });
                    },
                    onComplete: () => {
                        wordsRef.current.forEach(word => {
                            if (word) word.style.willChange = 'auto';
                        });
                    }
                },
                "-=0.6"
            );
        }

        // Animación de las líneas de texto integradas (sin su propio ScrollTrigger)
        const lines = textRef.current?.querySelectorAll('span');
        if (lines && lines.length > 0) {
            tl.from(
                lines,
                {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    onStart: () => {
                        lines.forEach(line => {
                            if (line) line.style.willChange = 'transform, opacity';
                        });
                    },
                    onComplete: () => {
                        lines.forEach(line => {
                            if (line) line.style.willChange = 'auto';
                        });
                    }
                },
                "-=0.5"
            );
        }

    }, [withScrollTrigger, titleParts.length]);

    return (
        <div ref={triggerRef}>
            <div ref={contentRef}>
                <div
                    ref={headerRef}
                    className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
                >
                    <p
                        ref={subtitleRef}
                        className={`text-sm font-light tracking-[0.5rem] uppercase px-10 ${textColor}`}
                    >
                        {subTitle.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < subTitle.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </p>
                    <div className="px-10">
                        <h1
                            ref={titleRef}
                            className={`flex flex-col gap-2 uppercase banner-text-responsive sm:gap-16 md:block ${textColor}`}
                            style={{ perspective: '1000px' }}
                        >
                            {titleParts.map((part, index) => (
                                <span 
                                    key={index}
                                    ref={(el) => (wordsRef.current[index] = el)}
                                    className="inline-block"
                                >
                                    {part}{' '}
                                </span>
                            ))}
                        </h1>
                    </div>
                </div>
                <div className={`relative px-10 ${textColor}`}>
                    <div ref={textRef} className="py-12 sm:py-16 text-end">
                        <AnimatedTextLines
                            text={text}
                            useScrollTrigger={false}
                            className={`font-light uppercase value-text-responsive ${textColor}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedHeaderSection;