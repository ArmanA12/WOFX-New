import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { PaperFold } from '../PaperFold';
import { CylinderText } from '../CylinderText';
import { useScroll, useTransform } from 'motion/react';

interface AboutUsProps {
  ready?: boolean;
}

const VALUES = [
  { title: "Furniture First", desc: "B2B Trade Show", color: "#e41c62" },
  { title: "Converge", desc: "At an Industry-led Trade Show dedicated exclusively for furniture brands and manufacturers", color: "#5CC6D0" },
  { title: "Expand", desc: "Your Buyer Network with pan-India distributors, dealers, retailers, franchisees", color: "#BAD94A" },
  { title: "Connect", desc: "With B2B Professional Buyers across various categories", color: "#FFCC29" },
  { title: "Collaborate", desc: "And Scale to achieve high-growth", color: "#e41c62" },
  { title: "Accentuate", desc: "Your Brand to the entire Industry", color: "#5CC6D0" },
  { title: "Network", desc: "Opportunities with industry stakeholders at seminars, networking and award events", color: "#BAD94A" },
  { title: "Extended", desc: "Online participation to facilitate Business Matchmaking", color: "#FFCC29" }
];

const AboutUs: React.FC<AboutUsProps> = ({ ready = true }) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#f0f0f0] font-sans text-black overflow-hidden border-b-[1.5px] border-[#DFDFDF]">
      {/* Cinematic Grain Overlay (Section-Specific) */}
      <div
        className="pointer-events-none absolute inset-0 z-[10] opacity-[0.4] mix-blend-overlay"
        style={{
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px'
        }}
      />

      {/* 1. Header Section: Animated via PaperFold */}
      <div className="w-[95%] mx-auto px-6 pt-8 md:px-12 border-x-[1.5px] border-[#DFDFDF]">
        <CylinderText
          text="ABOUT WOFX"
          trigger="viewport"
          className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-left"
          primaryColor="#e41c62"
        />
      </div>

      {/* 2. Narrative Content: Animated via PaperFold */}
      <div className="w-[95%] mx-auto bg-[#f0f0f0] px-6 py-12 md:px-12 md:py-16 border-t-[1.5px] border-x-[1.5px] border-[#DFDFDF]">
        <div className="w-full flex flex-col gap-4">
          <PaperFold
            text="Wofx Is Well-Positioned And Accepted As An Industry Trade Platform Wherein The Entire Furniture Industry Converges To Interact, Collaborate, Demonstrate Innovations And Do Business. After Successive Successful Shows, Wofx Has Become The Most Sought-After Trade Event Providing A Spring Board To Brands And Manufacturers To Expand Their Market Presence In The High-Growth Indian Furniture Market."
            type="words"
            className="text-sm font-normal leading-relaxed md:text-base lg:text-lg text-left"
            containerClassName="w-full h-auto flex p-0 overflow-hidden bg-transparent"
          />
          <div className="h-4 md:h-8" />
          <PaperFold
            text="Wofx Is An Established International Trade Show In India Dedicated To Only Furniture Brands And Manufacturers Of All Categories Attracting Very Focused B2B Professional Buyers From The Furniture Industry."
            type="words"
            className="text-sm font-normal leading-relaxed md:text-base lg:text-lg text-left"
            containerClassName="w-full h-auto flex p-0 overflow-hidden bg-transparent"
          />
        </div>
      </div>

      {/* 3. Bottom Section: Two Columns (Values & Video) */}
      <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 divide-y-[1.5px] md:divide-y-0 md:divide-x-[1.5px] divide-[#DFDFDF] border-x-[1.5px] border-t-[1.5px] border-[#DFDFDF]">
        {/* Left Column: Values List (Animated via PaperFold) */}
        <div className="flex flex-col gap-10 px-6 py-12 md:px-12 md:py-16">
          {VALUES.map((value, idx) => (
            <div key={value.title} className="flex flex-col">
              <PaperFold
                text={value.title}
                type="chars"
                className="text-xl font-sans font-black md:text-2xl lg:text-4xl leading-none"
                style={{ color: value.color }}
                containerClassName="w-full h-auto flex p-0 overflow-hidden bg-transparent"
              />
              <div className="mt-2">
                <PaperFold
                  text={value.desc}
                  type="words"
                  className="text-xs font-semibold tracking-wide text-[#888] leading-none"
                  containerClassName="w-full h-auto flex p-0 overflow-hidden bg-transparent"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Video/Image Container */}
        <div className="relative flex min-h-[400px] w-full overflow-hidden  md:min-h-full p-2">
          {/* Background Image Container */}
          <div className="absolute inset-0 group cursor-pointer p-2">
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="w-full h-full"
              style={{ y: imgY }}
            >
              <img
                src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=2070&auto=format&fit=crop"
                alt="Furniture Expo Visual"
                className="w-full h-full object-cover transition-all duration-1000 ease-[0.19,1,0.22,1] shadow-2xl scale-125 contrast-[1.4] brightness-[0.9] mix-blend-luminosity group-hover:scale-150 group-hover:brightness-[0.4] group-hover:grayscale-0 group-hover:contrast-125"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Subtle Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Centered Play Button Interface */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-transparent text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <Play className="h-10 w-10 fill-current translate-x-1" />
                </motion.div>
                <div className="bg-black px-4 py-1">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-white">
                    Experience WOFX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
