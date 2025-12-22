"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Menu, X } from "lucide-react";
import { motion, useAnimation, Variants } from "framer-motion";

/* ===================== TYPES ===================== */

interface HeroDecoration {
  src: StaticImageData;
  className: string;
}

interface HeroProps {
  title: string;
  subtitle: string;
  buttonLabel?: string;
  buttonLink?: string;
  image?: StaticImageData;
  decorations?: HeroDecoration[];
}

/* ===================== DATA ===================== */

const navItems = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/our-story" },
  { name: "Menu", href: "/menu" },
  { name: "Our Ingredients", href: "/ingredients" },
  { name: "Gallery", href: "/gallery" },
  { name: "Franchise", href: "/franchise" },
  { name: "Contact Us", href: "/contact-us" },
];

/* ===================== VARIANTS ===================== */

const leftNavVariant: Variants = {
  hidden: { opacity: 0, x: -22 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

const stickyNavVariant: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: "easeOut" },
  },
};

const mobileDrawerVariant: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};

/* ===================== COMPONENT ===================== */

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  image,
  decorations,
}) => {
  const heroRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);

  const leftNavControls = useAnimation();
  const contentControls = useAnimation();
  const imageControls = useAnimation();
  const stickyControls = useAnimation();
  const mobileDrawerControls = useAnimation();

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===================== REPLAY (FIXED) ===================== */

  const replay = useCallback(async () => {
    if (prefersReducedMotion) {
      await Promise.all([
        leftNavControls.set("visible"),
        contentControls.set("visible"),
        imageControls.set({ opacity: 1, y: 0 }),
        stickyControls.set("visible"),
        mobileDrawerControls.set("visible"),
      ]);
      return;
    }

    await Promise.all([
      leftNavControls.set("hidden"),
      contentControls.set("hidden"),
      imageControls.set({ opacity: 0, y: 40 }),
      stickyControls.set("hidden"),
      mobileDrawerControls.set("hidden"),
    ]);

    leftNavControls.start("visible");
    setTimeout(() => contentControls.start("visible"), 100);

    if (image) {
      setTimeout(() => {
        imageControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.88, ease: [0.22, 1, 0.36, 1] },
        });

        setTimeout(() => {
          imageControls.start({
            y: [0, -10, 0],
            transition: {
              duration: 6.8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: [0.42, 0, 0.58, 1],
            },
          });
        }, 420);
      }, 260);
    }

    setTimeout(() => {
      if (showStickyNav) stickyControls.start("visible");
      if (isOpen) mobileDrawerControls.start("visible");
    }, 320);
  }, [
    prefersReducedMotion,
    image,
    showStickyNav,
    isOpen,
    leftNavControls,
    contentControls,
    imageControls,
    stickyControls,
    mobileDrawerControls,
  ]);

  /* ===================== HERO OBSERVER ===================== */

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) replay();
          else {
            leftNavControls.set("hidden");
            contentControls.set("hidden");
            imageControls.set({ opacity: 0, y: 40 });
            stickyControls.set("hidden");
            mobileDrawerControls.set("hidden");
          }
        });
      },
      { threshold: 0.16 }
    );

    io.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => replay(), 60);
    }

    return () => io.disconnect();
  }, [
    replay,
    leftNavControls,
    contentControls,
    imageControls,
    stickyControls,
    mobileDrawerControls,
  ]);

  /* ===================== STICKY NAV OBSERVER ===================== */

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting;
          setShowStickyNav(!visible);
          stickyControls.start(visible ? "hidden" : "visible");
        });
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stickyControls]);

  /* ===================== MOBILE DRAWER ===================== */

  useEffect(() => {
    mobileDrawerControls.start(isOpen ? "visible" : "hidden");
  }, [isOpen, mobileDrawerControls]);

  // ---------------------- Render ----------------------
  return (
    <>
      {showStickyNav && (
        <motion.div
          initial="hidden"
          animate={stickyControls}
          variants={stickyNavVariant}
          className="fixed top-0 left-0 w-full bg-[#000] text-white shadow-md z-50 hidden md:flex"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="container mx-auto flex items-center justify-between py-3 px-6 sm:px-10">
            <h1 className="font-marker font-bold text-xl">Ramen Junction</h1>
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="text-base hover:text-black transition">
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </motion.div>
      )}

      <section
        ref={heroRef}
        className="relative text-white overflow-x-clip bg-[#263230] md:bg-transparent h-[580px] xs:h-[600px] md:h-auto z-999"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center relative px-6 sm:px-10">
          {/* Desktop Left Nav */}
          <motion.div
            initial="hidden"
            animate={leftNavControls}
            variants={leftNavVariant}
            className="hidden md:flex flex-col items-center justify-end absolute left-8 -top-30 h-[100%] w-60 bg-white shadow-lg z-20 md:pt-20"
            style={{ willChange: "transform, opacity" }}
          >
            <nav className="flex flex-col space-y-4 items-center mb-6">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="text-[#263230] text-base hover:text-black transition">
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Mobile Navbar */}
          <div className="w-full flex md:hidden justify-between items-center px-6 py-4 bg-black text-[#263230] shadow-lg fixed top-0 left-0 z-30">
            <h3 className="text-2xl text-white">Ramen Junction</h3>
            <button onClick={() => setIsOpen((s) => !s)} aria-expanded={isOpen}>
              {isOpen ? <X size={24} className="text-white"/> : <Menu size={24} className="text-white"/>}
            </button>
          </div>

          {/* Mobile Drawer */}
          <motion.div
            initial="hidden"
            animate={mobileDrawerControls}
            variants={mobileDrawerVariant}
            className="fixed top-[64px] left-0 w-full bg-white shadow-md z-20 md:hidden"
            style={{ willChange: "transform, opacity", zIndex:'999' }}
          >
            {isOpen && (
              <nav className="flex flex-col items-center space-y-4 py-6 text-[#263230]">
                {navItems.map((item) => (
                  <a key={item.name} href={item.href} className="text-base hover:text-black transition" onClick={() => setIsOpen(false)}>
                    {item.name}
                  </a>
                ))}
              </nav>
            )}
          </motion.div>

          {/* Hero Main Content */}
          <div className="flex-1 flex flex-col md:flex-row items-center md:items-start relative px-6 sm:px-10 pt-24 md:pt-10 md:pb-30 mt-10 lg:mt-20 w-full">
            <div className="absolute right-0 md:-right-10 xl:right-40 top-0 bottom-0 w-full bg-[#263230] -z-10 hidden md:block" />

            {/* Text Section */}
            <motion.div
              initial="hidden"
              animate={contentControls}
              variants={containerStagger}
              className="text-center md:text-left md:ml-64 relative z-10"
              style={{ willChange: "transform, opacity" }}
            >
              <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-marker leading-none font-grace lg:max-w-2xl">
                {title}
              </motion.h1>

              <motion.p variants={fadeUp} className="max-w-lg mx-auto md:mx-0 text-[#C7C7C7] text-base sm:text-lg leading-relaxed mb-6 font-poppins font-light tracking-wider">
                {subtitle}
              </motion.p>

              {buttonLabel && (
                <motion.a variants={fadeUp} href={buttonLink} className="inline-block border border-gray-300 text-[#C7C7C7] hover:bg-gray-200 hover:text-black transition px-6 py-2 rounded-full text-sm md:text-base">
                  {buttonLabel}
                </motion.a>
              )}
            </motion.div>

            {/* Optional Image + Decorations */}
            {image && (
              <motion.div
                className="
                  w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[780px] 2xl:w-[800px]
                  z-0 md:z-20
                  relative md:absolute
                  -bottom-10 sm:bottom-0
                  md:-bottom-36 md:-right-40
                  lg:-bottom-40 lg:-right-32
                  xl:-bottom-36 xl:-right-32
                  2xl:-bottom-12 2xl:-right-32
                  flex justify-center
                "
                style={{ willChange: "transform, opacity" }}
                animate={imageControls}
                initial={{ opacity: 0, y: 40 }}
              >
                {decorations?.map((item, index) => (
                  <Image key={index} src={item.src} alt="" className={`absolute pointer-events-none select-none ${item.className}`} />
                ))}
                <Image src={image} alt="Hero image" className="object-contain pointer-events-none select-none" priority />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
