import { memo, useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const { t } = useTranslation();
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
    <section id="about" className="min-h-screen bg-primary-bg rounded-b-4xl">
        <AnimatedHeaderSection
            subTitle={t('about_subtitle')}
            title={t('about_title')}
            text={t('about_text_1')}
            textColor={"text-primary-text"}
            withScrollTrigger={true}
    />
        <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-secondary-text">
        <img
            ref={imgRef}
            src="images/man.avif"
            alt="Javier Garín"
            className="w-md rounded-3xl"
        />
        <AnimatedTextLines text={t('about_text_2')} className={"w-full max-w-2xl lg:mx-auto"} />
        </div>
    </section>
);
};

export default memo(About);