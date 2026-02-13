import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const ServiceSummary = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);

    const services = [
        'architecture',
        'frontends',
        'design',
        'apis',
        'ai',
        'scalability',
        'backend'
    ];

    useGSAP(() => {
        const marquee = containerRef.current?.querySelector('.marquee-content');
        if (!marquee) return;

        let animation;

        const setupAnimation = () => {
            // Limpiamos animación anterior si existe
            if (animation) animation.kill();

            // Calculamos el ancho total del contenido
            const marqueeWidth = marquee.offsetWidth;

            // Animación infinita de derecha a izquierda
            animation = gsap.to(marquee, {
                x: -marqueeWidth / 2,
                duration: 20,
                ease: "none",
                repeat: -1,
            });
        };

        // Configuramos la animación inicial
        setupAnimation();

        // Efecto de pausa al hacer hover (solo desktop)
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            const handleMouseEnter = () => {
                gsap.to(marquee, { 
                    timeScale: 0.3,
                    duration: 0.5 
                });
            };

            const handleMouseLeave = () => {
                gsap.to(marquee, { 
                    timeScale: 1,
                    duration: 0.5 
                });
            };

            marquee.addEventListener('mouseenter', handleMouseEnter);
            marquee.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                marquee.removeEventListener('mouseenter', handleMouseEnter);
                marquee.removeEventListener('mouseleave', handleMouseLeave);
            };
        });

        // Recalcular en cambios de tamaño (debounced)
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setupAnimation();
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            mm.revert();
            window.removeEventListener('resize', handleResize);
            if (animation) animation.kill();
        };
    }, { scope: containerRef });

    return (
        <section 
            ref={containerRef}
            className="w-full py-16 overflow-hidden bg-gradient-to-r from-transparent via-[#0A0A0A] to-transparent"
        >
            <div className="marquee-wrapper">
                <div className="marquee-content">
                    {/* Duplicamos el contenido para crear el loop infinito seamless */}
                    {[...services, ...services].map((service, index) => (
                        <span key={`${service}-${index}`} className="marquee-item">
                            {t(`service_summary_${service}`)}
                            <span className="marquee-separator">|</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceSummary;
