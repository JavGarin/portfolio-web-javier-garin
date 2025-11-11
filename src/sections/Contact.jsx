import React, { forwardRef, useState, memo } from "react";
import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials, email } from "../constants";
import gsap from "gsap";

const Contact = forwardRef((props, ref) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const text = `Ready to grow your business?
                Let's build your app together`;
  const items = [
      "build & solve",
      "code → craft", 
      "think > build",
      "design → code",
      "idea → app"
  ];
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      ref={ref}
      className="flex flex-col justify-between min-h-screen bg-primary-bg"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"Your Vision, My Code"}
          title={"Contact"}
          text={text}
          textColor={"text-primary-text"}
          withScrollTrigger={true}
        />
        <div className="flex px-10 font-light text-primary-text uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-secondary-text/30" />
              <div onClick={handleCopy} className="cursor-pointer">
                <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                  {copied ? "Copied!" : email}
                </p>
              </div>
            </div>
            {/* <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +33 7 12 12 32 12
              </p>
            </div> */}
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-secondary-text/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs leading-loose tracking-wides uppercase md:text-sm hover:text-accent transition-colors duration-200"
                  >
                    {" { "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className="text-primary-text bg-transparent" />
    </section>
  );
});

export default memo(Contact);