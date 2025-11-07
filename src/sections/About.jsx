import { memo, useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const text = `Full-Stack Developer & Designer`;
    const aboutText = `Chilean-born full-stack developer with a background in design and illustration, blending technical precision with creative vision to craft exceptional user experiences.
Focus: Scalable full-stack solutions, clean architecture, and efficient code that aligns with business goals.
Values: Collaboration, independence, and a passion for continuous learning.
Beyond code: Cycling, team sports, and exploring indie games to inspire new UX ideas.`;
    const imgRef = useRef(null);
    useGSAP(() => {
    ScrollTrigger.matchMedia({
        "(min-width: 768px)": function() {
        gsap.to("#about", {
            scale: 0.90,
            scrollTrigger: {
            trigger: "#about",
            start: "bottom 80%",
            end: "bottom 20%",
            scrub: true,
            markers: false,
        },
            ease: "power1.inOut",
        });
        },
    });

    gsap.set(imgRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
        ease: "power4.out",
        scrollTrigger: { trigger: imgRef.current },
    });
});
    return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
        <AnimatedHeaderSection
            subTitle={"Cod with purpose, Built to scale"}
            title={"About"}
            text={text}
            textColor={"text-white"}
            withScrollTrigger={true}
    />
        <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <img
            ref={imgRef}
            src="images/man.avif"
            alt="Javier Garín"
            className="w-md rounded-3xl"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
        </div>
    </section>
);
};

export default memo(About);