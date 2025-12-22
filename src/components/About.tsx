"use client";
import React, { useEffect, useRef, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useAnimation, Variants } from "framer-motion";

interface AboutDecoration {
  src: StaticImageData;
  className: string; 
}

interface AboutProps {
  heading: string;
  content: string;
  buttonText?: string;
  buttonLink?: string;
  image: StaticImageData;
  imgPosition?: "left" | "right";
  decorations?: AboutDecoration[];
}

/**
 * About component with Framer Motion animations that replay each time the
 * section enters the viewport. Does not change layout or content.
 */
const About: React.FC<AboutProps> = ({
  heading,
  content,
  buttonText,
  buttonLink,
  image,
  imgPosition = "left",
  decorations
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgControls = useAnimation();
  const imageControls = useAnimation();
  const textControls = useAnimation();

  // Respect user's reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Variants (GPU-friendly transforms + opacity)
  const bgVariant: Variants = {
    hidden: (dir: "left" | "right") => ({
      x: dir === "left" ? "-10%" : "10%",
      opacity: 0,
    }),
    visible: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.8, 0.25, 1], // soft ease-out
      },
    },
  };  

  const imageVariant: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.96,
      rotate: 0.4,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 0.95, 0.25, 1], // soft, luxurious easing
        type: "spring",
        stiffness: 80,   // ↓ softer
        damping: 16,     // ↓ smoother
        mass: 1.2,       // ↓ natural bounce
      },
    },
  };
  
  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(3px)",  // subtle cinematic softening
    },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: custom,
        ease: [0.25, 0.8, 0.25, 1], // smooth ease-out
      },
    }),
  };
  
  // Replay routine: set to hidden before starting visible so animation fully replays.
  const replayAnimations = useCallback(async () => {
    if (prefersReducedMotion) {
      // If user prefers reduced motion, ensure everything is visible without animations.
      await Promise.all([
        bgControls.set("visible"),
        imageControls.set("visible"),
        textControls.set("visible"),
      ]);
      return;
    }

    // reset states quickly and then animate to visible
    await Promise.all([
      bgControls.set("hidden"),
      imageControls.set("hidden"),
      textControls.set("hidden"),
    ]);

    // orchestrate sequence: background -> image -> text stagger
    // Slight stagger with async awaits for crisp sequencing
    bgControls.start("visible");
    // small delay for perception
    setTimeout(() => {
      imageControls.start("visible");
    }, 110);

    // stagger text children: heading, paragraph, button
    // We call start with custom delays for children
    setTimeout(() => {
      textControls.start("visible"); // i will be used in elements via custom
    }, 260);
  }, [bgControls, imageControls, textControls, prefersReducedMotion]);

  // IntersectionObserver that replays every time the section becomes visible.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // replay each time it enters
            replayAnimations();
          }
        });
      },
      {
        threshold: 0.18, // fire when ~18% visible (feels natural for section)
      }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [replayAnimations]);

  return (
    <div className="relative" ref={containerRef} >
      {/* Background Green Bar (animated) */}
      <motion.div
        custom={imgPosition === "left" ? "left" : "right"}
        initial="hidden"
        animate={bgControls}
        variants={bgVariant}
        style={{ willChange: "transform, opacity" }}
        className={`z-1 absolute top-1/3 -translate-y-1/3 lg:top-1/2 lg:-translate-y-1/2 ${
          imgPosition === "left" ? "right-0" : "left-0"
        } w-[80%] lg:w-[70%] xl:w-[60%] h-[450px] sm:h-[380px] md:h-[300px] lg:h-[350px] bg-[#9FB43B] -z-10`}
      />

      {/* Main Content Wrapper */}
      <div
        className={`container z-2 mx-auto relative flex flex-col lg:flex-row items-center lg:items-stretch ${
          imgPosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* Image Section */}
        <div className="relative z-10 flex justify-center items-end order-2 lg:order-1">
            {decorations?.map((item, index) => (
              <Image
                key={index}
                src={item.src}
                alt=""
                className={`
                  absolute 
                  pointer-events-none 
                  select-none 
                  z-0
                  ${item.className}
                `}
              />
            ))}
          <motion.div
            initial="hidden"
            animate={imageControls}
            variants={imageVariant}
            style={{ willChange: "transform, opacity" }}
            className={`relative ${
              imgPosition === "left"
                ? "lg:-right-28 lg:bottom-26 xl:-right-40 xl:bottom-10 2xl:-right-40 2xl:-bottom-10"
                : "lg:-left-20 lg:bottom-20 xl:-left-30 xl:-bottom-20 2xl:-left-30 2xl:-bottom-10"
            } w-[100%] md:w-[500px] lg:w-[500px] xl:w-[650px] 2xl:w-[700px] max-w-full overflow-hidden`}
          >
            <Image
              src={image}
              alt={heading}
              className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>

        {/* Text Box Section */}
        <motion.div
          initial="hidden"
          animate={textControls}
          className={`relative bg-[#263230] shadow-2xl p-8 sm:p-10 md:p-12 flex flex-col justify-center order-1 lg:order-2 ${
            imgPosition === "left" ? "md:ml-auto" : "md:mr-auto"
          }`}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex justify-between items-center mb-4">
            <motion.h2
              custom={0}
              variants={textVariants}
              style={{ willChange: "transform, opacity" }}
              className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold font-[ 'Rock Salt', cursive ]"
            >
              {heading}
            </motion.h2>

            {buttonText && (
              <motion.a
                custom={0.18}
                variants={textVariants}
                style={{ willChange: "transform, opacity" }}
                href={buttonLink}
                className="border border-gray-300 text-[#C7C7C7] hover:bg-gray-200 hover:text-black transition-all px-6 py-2 rounded-full text-sm md:text-base hidden sm:block"
              >
                {buttonText}
              </motion.a>
            )}
          </div>

          <motion.p
            custom={0.32}
            variants={textVariants}
            style={{ willChange: "transform, opacity" }}
            className={`text-[#C7C7C7] leading-relaxed text-base sm:text-lg mb-6 font-poppins font-light tracking-wider ${
              imgPosition === "left"
                ? "lg:pl-10 xl:pl-20 2xl:pl-20"
                : "lg:pr-10 xl:pr-20 2xl:pr-30"
            }`}
          >
            {content}
          </motion.p>

          {buttonText && (
            <motion.div custom={0.46} variants={textVariants}>
              <a
                href={buttonLink}
                className="border border-gray-300 text-[#C7C7C7] hover:bg-gray-200 hover:text-black transition-all px-6 py-2 rounded-full text-sm md:text-base sm:hidden"
              >
                {buttonText}
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
