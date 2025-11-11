import { memo, useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSummary = () => {
    const containerRef = useRef(null);
    const items = [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React",
        "Node.js",
        "Tailwind CSS",
        "Next.js",
        "TypeScript",
        "GSAP",
        "Three.js",
        "Vercel",
        "Supabase",
        "Figma",
];
    const items2 = [
        "contact me",
        "contact me",
        "contact me",
        "contact me",
        "contact me",
];

    useGSAP(() => {
        ScrollTrigger.matchMedia({
          "(min-width: 768px)": function() {
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
      },
    });
}, []);
    return (
        <section
            ref={containerRef}
            className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
    >
        <Marquee items={items} />
    <div className="overflow-hidden font-light text-center contact-text-responsive relative z-10">
        <p className="relative z-10">
            “ Let's design a <br />
            <span className="font-normal">powerful</span> &{" "}
            <span className="italic">visionary</span> <br />
            digital product <span className="text-accent">together</span> “
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