import { memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import Marquee from "../components/Marquee";
gsap.registerPlugin(ScrollTrigger);
const ServiceSummary = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const services = [
        "Architucture",
        "Frontends",
        "Design",
        "APIs",
        "AI",
        "Scalability",
        "Backend",
    ];
useGSAP(() => {
    ScrollTrigger.matchMedia({        
        "(min-width: 768px)": function() {
        gsap.to("#title-service-1", {
            xPercent: 20,
            scrollTrigger: {
            target: "#title-service-1",
            scrub: true,
            },
        });
        gsap.to("#title-service-2", {
            xPercent: -30,
            scrollTrigger: {
            target: "#title-service-2",
            scrub: true,
            },
        });
        gsap.to("#title-service-3", {
            xPercent: 100,
            scrollTrigger: {
            target: "#title-service-3",
            scrub: true,
            },
        });
        gsap.to("#title-service-4", {
            xPercent: -100,
            scrollTrigger: {
            target: "#title-service-4",
            scrub: true,
            },
        });
        },
    });
    });
return (
    <section className="flex flex-col items-center mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive">
        {isMobile ? (
        <Marquee items={services} />
        ) : (
        <>
            <div id="title-service-1">
            <p>Architucture</p>
            </div>
            <div
            id="title-service-2"
            className="flex items-center justify-center gap-3 md:translate-x-16"
            >
            <p className="font-normal">Frontends</p>
            <div className="w-10 h-1 md:w-32 bg-gold" />
            <p>Design</p>
            </div>
            <div
            id="title-service-3"
            className="flex items-center justify-center gap-3 md:-translate-x-48"
            >
            <p>APIs</p>
            <div className="w-10 h-1 md:w-32 bg-gold" />
            <p className="italic">AI</p>
            <div className="w-10 h-1 md:w-32 bg-gold" />
            <p>Scalability</p>
            </div>
            <div id="title-service-4"  className="md:translate-x-48">
            <p className="font-normal">Backend</p>
            </div>
        </>
        )}
    </section>
    );
};

export default memo(ServiceSummary);