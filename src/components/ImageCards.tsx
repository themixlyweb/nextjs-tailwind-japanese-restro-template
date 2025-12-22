"use client";
import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useAnimation, Variants } from "framer-motion";

interface CardDecoration {
  src: StaticImageData;
  className: string; 
}

interface CardItem {
  id: number | string;
  name: string;
  description: string;
  image: StaticImageData;
  accentColor?: string;
  decorations?: CardDecoration[];
}

interface ImageCardsProps {
  heading?: string;
  items: CardItem[];
  headingClassName?: string;
  cardClassName?: string;
}

export default function ImageCards({
  heading = "Fan Favorites",
  items,
  headingClassName = "text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-marker leading-none font-grace text-white mb-20",
  cardClassName = "",
}: ImageCardsProps) {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Responsive grid
  const getGridCols = () => {
    if (items.length === 1) return "grid-cols-1 justify-items-center";
    if (items.length === 2)
      return "grid-cols-1 sm:grid-cols-2 justify-items-center";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center";
  };

  // Card animation variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(2px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.08, // faster stagger for smoother effect
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        scale: { type: "spring", stiffness: 120, damping: 18 },
      },
    }),
  };

  // Trigger animation immediately on mount
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <section ref={sectionRef} className="w-full py-30 relative px-6 sm:px-10">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className={headingClassName}>{heading}</h2> 

        {/* Grid */}
        <div
          className={`grid ${getGridCols()} gap-30 sm:gap-20 md:gap-26 lg:gap-36 pt-12 relative`}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              style={{ willChange: "opacity, transform" }}
              className={`relative bg-[#283334] text-center px-6 sm:px-8 
              pt-20 sm:pt-24 pb-10 flex flex-col items-center rounded-sm 
              hover:scale-105 transition-transform duration-300 w-full relative${cardClassName}`}
            >
              {/* Decorations (no layout impact) */}
{item.decorations?.map((decoration, index) => (
  <Image
    key={index}
    src={decoration.src}
    alt=""
    className={`
      absolute
      z-10
      pointer-events-none
      select-none
      ${decoration.className}
    `}
  />
))}
              {/* Floating Circular Image */}
              <div
                className="
              absolute 
              -top-16 sm:-top-20 md:-top-24 
              left-1/2 -translate-x-1/2
              w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48
              rounded-full overflow-hidden
            "
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-full"
                  sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 200px"
                />
              </div>

              {/* Name */}
              <h3 className="text-white text-lxl md:text-2xl lg:text-3xl font-semibold mb-3 mt-4">
                {item.name}
              </h3>

              {/* Description */}
              <p className="text-[#C7C7C7] leading-relaxed text-base sm:text-lg mb-6 font-poppins font-light tracking-wider px-2 mb-6">
                {item.description}
              </p>

              {/* Accent Bar */}
              <div
                className={`h-2 w-40 ${item.accentColor || "bg-[#9FB43B]"} 
              absolute left-1/2 -translate-x-1/2 -bottom-2`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
