import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedTextLines = ({ text, className, useScrollTrigger = true }) => {
    const containerRef = useRef(null);
    const lineRefs = useRef([]);
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    // Cleanup on unmount para evitar memory leaks
    useEffect(() => {
        return () => {
            gsap.killTweensOf(lineRefs.current);
            // Limpiar ScrollTriggers si se usaron
            if (useScrollTrigger) {
                ScrollTrigger.getAll().forEach(trigger => {
                    if (trigger.vars.trigger === containerRef.current) {
                        trigger.kill();
                    }
                });
            }
        };
    }, [useScrollTrigger]);

    useGSAP(() => {
        if (lineRefs.current.length > 0) {
            const animationProps = {
                y: 80,
                opacity: 0,
                duration: 1.2,
                stagger: {
                    amount: 0.4,
                    from: "start",
                },
                ease: "power3.out",
                onStart: () => {
                    lineRefs.current.forEach(line => {
                        if (line) line.style.willChange = 'transform, opacity';
                    });
                },
                onComplete: () => {
                    lineRefs.current.forEach(line => {
                        if (line) line.style.willChange = 'auto';
                    });
                }
            };

            if (useScrollTrigger) {
                gsap.from(lineRefs.current, {
                    ...animationProps,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse",
                        once: false,
                    }
                });
            }
            // Eliminado el bloque else con gsap.set para evitar que el texto se oculte 
            // antes de que el padre pueda animarlo.
        }
    }, [lines.length, useScrollTrigger]);

    return (
        <div ref={containerRef} className={className}>
            {lines.map((line, index) => (
                <span
                    key={index}
                    ref={(el) => (lineRefs.current[index] = el)}
                    className="block leading-relaxed tracking-wide md:text-justify"
                >
                    {line}
                </span>
            ))}
        </div>
    );
};