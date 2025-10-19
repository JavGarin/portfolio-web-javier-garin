import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
    const text = `Software Developer with Creative Design Background`;
    const aboutText = `Chilean-born developer with design and illustration background, creating technically robust solutions with exceptional user experience.

Professional Focus:
- Full-stack architecture and scalable applications
- Business requirements to efficient, maintainable code
- Collaborative team player with independent project ownership
- Available for international remote work and relocation

Personal Interests:
- Cycling for physical and mental balance
- Team sports developing collaboration skills
- Exploring indie games and user experience patterns`;
    const imgRef = useRef(null);
    useGSAP(() => {
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
            src="images/man.png"
            alt="man"
            className="w-md rounded-3xl"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
        </div>
    </section>
);
};

export default About;