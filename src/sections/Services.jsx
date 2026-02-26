import { memo, useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px

  useGSAP(() => {
    // ScrollTrigger para activar el modo oscuro en la sección
    ScrollTrigger.create({
      trigger: "#services",
      start: "top 40%",
      end: "bottom 60%",
      toggleClass: {
        targets: "body",
        className: "dark-section-active",
      },
      scrub: true,
    });

    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);
  return (
    <section
      id="services"
      className="min-h-screen rounded-t-4xl"
      style={{ backgroundColor: "var(--services-bg)", color: "var(--services-text)" }}
    >
      <AnimatedHeaderSection
        subTitle={t('services_subtitle')}
        title={t('services_title')}
        text={t('services_text')}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky px-10 pt-6 pb-12"
          style={{
            backgroundColor: "var(--services-bg)",
            borderTop: "2px solid var(--services-border)",
            ...(isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }),
          }}
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl lg:text-5xl">
                {t(`service_${index + 1}_title`)}
              </h2>
              <p
                className="text-xl leading-relaxed tracking-widest lg:text-2xl text-pretty"
                style={{ color: "var(--services-text-muted)" }}
              >
                {t(`service_${index + 1}_desc`)}
              </p>
              <div
                className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl"
                style={{ color: "var(--services-text-muted)" }}
              >
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex">
                      <span
                        className="mr-12 text-lg"
                        style={{ color: "var(--services-number)" }}
                      >
                        0{itemIndex + 1}
                      </span>
                      {t(`service_${index + 1}_item_${itemIndex + 1}_title`)}
                    </h3>
                    {itemIndex < service.items.length - 1 && (
                      <div
                        className="w-full h-px my-2"
                        style={{ backgroundColor: "var(--services-border)" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default memo(Services);