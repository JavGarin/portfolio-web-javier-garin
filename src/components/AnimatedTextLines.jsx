import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedTextLines = ({ text, className }) => {
    const containerRef = useRef(null);
    const lineRefs = useRef([]);
    const lines = text.split("\n").filter((line) => line.trim() !== "");

    // Cleanup on unmount para evitar memory leaks
    useEffect(() => {
        return () => {
            gsap.killTweensOf(lineRefs.current);
            // Limpiar ScrollTriggers
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === containerRef.current) {
                    trigger.kill();
                }
            });
        };
    }, []);

    useGSAP(() => {
        if (lineRefs.current.length > 0) {
            gsap.from(lineRefs.current, {
                y: 80,
                opacity: 0,
                duration: 1.2,
                stagger: {
                    amount: 0.4,
                    from: "start",
                },
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse",
                    // Optimización: no recalcular constantemente
                    once: false,
                },
                onStart: () => {
                    // Optimización de rendimiento
                    lineRefs.current.forEach(line => {
                        if (line) line.style.willChange = 'transform, opacity';
                    });
                },
                onComplete: () => {
                    // Limpiar will-change después de la animación
                    lineRefs.current.forEach(line => {
                        if (line) line.style.willChange = 'auto';
                    });
                }
            });
        }
    }, [lines.length]);

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