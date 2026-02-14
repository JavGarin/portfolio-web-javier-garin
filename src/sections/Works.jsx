import { memo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";

const Works = () => {
  const { t } = useTranslation();
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    // Animación compuesta (GPU) en lugar de clipPath
    gsap.fromTo(
      el,
      {
        scaleY: 0,
        transformOrigin: "bottom center",
      },
      {
        scaleY: 1,
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    // Animación compuesta (GPU)
    gsap.to(el, {
      scaleY: 0,
      transformOrigin: "bottom center",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={t('works_subtitle')}
        title={t('works_title')}
        text={t('works_text')}
        textColor={"text-primary-text"}
        withScrollTrigger={true}
      />
      <div
        className="relative flex flex-col font-light"
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <a
            key={project.id}
            id="project"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex flex-col py-5 cursor-pointer group"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* --- DESKTOP VIEW --- */}
            <div className="hidden md:block">
              <div
                ref={(el) => {
                  overlayRefs.current[index] = el;
                }}
                className="absolute inset-0 duration-200 bg-primary-bg -z-10 scale-y-0 origin-bottom"
              />
              <div className="flex justify-between px-10 text-primary-text transition-all duration-500 md:group-hover:px-12" style={{ '--hover-color': 'var(--color-accent-light)' }}>
                <h2 className="lg:text-[32px] text-[26px] leading-none group-hover:text-[var(--hover-color)]">
                  {t(`project_${project.id}_name`)}
                </h2>
                <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
              </div>
              <div className="w-full h-0.5 bg-secondary-text mt-1" />
              <div className="flex px-10 text-xs leading-loose uppercase transtion-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
                {project.frameworks.map((framework) => (
                  <p
                    key={framework.id}
                    className="text-secondary-text transition-colors duration-500 group-hover:text-[var(--hover-color)]"
                  >
                    {framework.name}
                  </p>
                ))}
              </div>
            </div>

            {/* --- MOBILE CARD VIEW --- */}
            <div className="flex flex-col gap-4 px-6 md:hidden">
              <img
                src={project.image}
                alt={t(`project_${project.id}_name`)}
                width={400}
                height={240}
                loading="lazy"
                decoding="async"
                className="object-contain w-full rounded-lg h-60"
              />
              <div className="flex flex-col px-2">
                <div className="flex items-center justify-between text-primary-text">
                  <h2 className="text-2xl leading-none">
                    {t(`project_${project.id}_name`)}
                  </h2>
                  <Icon icon="lucide:arrow-up-right" className="size-5" />
                </div>
                <div className="flex flex-wrap mt-2 text-xs leading-loose uppercase gap-x-3">
                  {project.frameworks.map((framework) => (
                    <p key={framework.id} className="text-secondary-text">
                      {framework.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
        {/* desktop Flaoting preview image */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-secondary-bg pointer-events-none w-[960px] md:block hidden opacity-0"
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              width={960}
              height={540}
              loading="eager"
              decoding="async"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(Works);