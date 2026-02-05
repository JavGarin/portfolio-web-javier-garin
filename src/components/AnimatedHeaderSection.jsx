import React from "react";
import { useRef, useEffect } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimatedHeaderSection = ({
    subTitle,
    title,
    text,
    textColor,
    withScrollTrigger = false,
}) => {
    const contextRef = useRef(null);
    const headerRef = useRef(null);
    const subtitleRef = useRef(null);
    const titleRef = useRef(null);
    const wordsRef = useRef([]);
    
    const shouldSplitTitle = title.includes(" ");
    const titleParts = shouldSplitTitle ? title.split(" ") : [title];

    // Cleanup on unmount para evitar memory leaks
    useEffect(() => {
        return () => {
            gsap.killTweensOf([contextRef.current, headerRef.current, subtitleRef.current, titleRef.current, wordsRef.current]);
        };
    }, []);

    useGSAP(() => {
        // Timeline principal con configuraciones optimizadas
        const tl = gsap.timeline({
            scrollTrigger: withScrollTrigger
                ? {
                    trigger: contextRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
                : undefined,
            defaults: {
                ease: "power3.out", // Ease más suave y performante
            }
        });

        // Animación del contenedor principal
        tl.from(contextRef.current, {
            y: "50vh",
            duration: 1.2,
            ease: "circ.out",
        });

        // Animación del subtítulo con fade y slide
        tl.from(
            subtitleRef.current,
            {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out",
            },
            "<+0.3"
        );

        // Animación escalonada de las palabras del título
        if (wordsRef.current.length > 0) {
            tl.from(
                wordsRef.current,
                {
                    opacity: 0,
                    y: 100,
                    rotationX: -90,
                    transformOrigin: "50% 50% -50px",
                    stagger: {
                        amount: 0.5,
                        from: "start",
                    },
                    duration: 1,
                    ease: "back.out(1.2)",
                    onStart: () => {
                        // Optimización de rendimiento
                        wordsRef.current.forEach(word => {
                            if (word) word.style.willChange = 'transform, opacity';
                        });
                    },
                    onComplete: () => {
                        // Limpiar will-change después de la animación
                        wordsRef.current.forEach(word => {
                            if (word) word.style.willChange = 'auto';
                        });
                    }
                },
                "<+0.2"
            );
        }

        // Animación del header general
        tl.from(
            headerRef.current,
            {
                opacity: 0,
                y: 50,
                duration: 0.8,
            },
            "<+0.1"
        );

    }, [withScrollTrigger, titleParts.length]);

    return (
        <div ref={contextRef}>
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
                <div className="py-12 sm:py-16 text-end">
                    <AnimatedTextLines
                        text={text}
                        className={`font-light uppercase value-text-responsive ${textColor}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnimatedHeaderSection;