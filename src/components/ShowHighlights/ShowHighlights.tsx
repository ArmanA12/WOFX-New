import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Store, Users, Globe, Map } from 'lucide-react';
import NumberAnimation from './NumberAnimation';
import { CylinderText } from '../CylinderText';

const stats = [
  { label: 'Exhibiting Brands', value: 80, suffix: '+', color: '#e41c62', accent: '#ff4e8d', icon: Store },
  { label: 'B2B Buyers', value: 10140, suffix: '', color: '#FBCA01', accent: '#ffe16b', icon: Users },
  { label: 'Countries', value: 16, suffix: '', color: '#e41c62', accent: '#ff4e8d', icon: Globe },
  { label: 'States', value: 26, suffix: '', color: '#FBCA01', accent: '#ffe16b', icon: Map },
];

const ShowHighlights = () => {
  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#f0f0f0] pt-20">
      {/* Grain Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-[10] opacity-[0.4] mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px'
        }}
      />
      {/* 1. Header Section */}
      <div className="w-[95%] mx-auto px-6 pt-8 md:px-12 bg-[#f0f0f0] flex justify-center">
        <CylinderText 
          text="2025 HIGHLIGHTS" 
          trigger="viewport"
          className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-center"
          primaryColor="#e41c62"
        />
      </div>

      {/* 2. Stats Grid Section */}
      <div className="relative z-20 w-[95%] mx-auto px-6 py-12 md:px-12 md:py-20 bg-[#f0f0f0]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const isDark = stat.color !== '#FBCA01';
            const textColor = isDark ? 'text-white' : 'text-black';
            const subTextColor = isDark ? 'text-white/40' : 'text-black/40';
            const badgeBg = isDark ? 'bg-white/5' : 'bg-black/5';
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 120, rotateZ: index % 2 === 0 ? -8 : 8, scale: 0.8 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  rotateZ: 0, 
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 60,
                    damping: 15,
                    mass: 1.2,
                    delay: index * 0.12
                  }
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative w-full"
              >
                {/* Main Card Container */}
                <motion.div 
                  whileHover={{ 
                    y: -15, 
                    rotateZ: index % 2 === 0 ? 1 : -1,
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 400, damping: 15 } 
                  }}
                  className="relative p-8 pb-10 h-[340px] rounded-[2.5rem] flex flex-col justify-between overflow-hidden"
                  style={{ backgroundColor: stat.color }}
                >
                  {/* Grain Overlay for each box */}
                  <div 
                    className="pointer-events-none absolute inset-0 z-0 opacity-[0.25] mix-blend-overlay"
                    style={{ 
                      backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
                      backgroundSize: '200px'
                    }}
                  />
                  


                  {/* Main Text */}
                  <div className="flex-grow flex flex-col items-start justify-center text-left space-y-1 -mt-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.12) + 0.5, type: "spring", stiffness: 100 }}
                      className={`text-[3rem] leading-none font-sans font-bold tracking-tighter flex items-baseline gap-1 ${textColor}`}
                    >
                      <NumberAnimation n={stat.value} />
                      {stat.suffix && <span className="text-2xl font-semibold">{stat.suffix}</span>}
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.12) + 0.6, type: "spring", stiffness: 100 }}
                      className={`text-[1rem] leading-tight font-sans font-normal ${subTextColor}`}
                    >
                      {stat.label}
                    </motion.p>
                  </div>

                  {/* Custom Cutout Corner */}
                  <div className="absolute bottom-0 right-0 w-[120px] h-[120px] pointer-events-none">
                    {/* The Notch */}
                    <div className="absolute bottom-0 right-0 w-[90px] h-[90px] bg-[#f0f0f0] rounded-tl-[2.5rem]" />
                    
                    {/* Top Connector Curve */}
                    <div className="absolute top-0 right-0 w-[30px] h-[30px] bg-[#f0f0f0]">
                      <div className="w-full h-full rounded-br-[2.5rem]" style={{ backgroundColor: stat.color }} />
                    </div>

                    {/* Left Connector Curve */}
                    <div className="absolute bottom-0 left-0 w-[30px] h-[30px]  bg-[#f0f0f0]">
                      <div className="w-full h-full rounded-br-[2.5rem]" style={{ backgroundColor: stat.color }} />
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-[2px] right-[4px] w-[80px] h-[80px] rounded-[2rem] flex items-center justify-center cursor-pointer group z-40 overflow-hidden"
                    style={{ backgroundColor: stat.color }}
                  >
                    {/* Grain Overlay for arrow box */}
                    <div 
                      className="pointer-events-none absolute inset-0 z-0 opacity-[0.25] mix-blend-overlay"
                      style={{ 
                        backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
                        backgroundSize: '200px'
                      }}
                    />
                    <Icon className={`relative z-10 w-10 h-10 transition-transform group-hover:scale-110 ${textColor}`} />
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShowHighlights;
