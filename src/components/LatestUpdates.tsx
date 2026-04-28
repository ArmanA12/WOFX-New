import React from 'react';
import { motion } from 'motion/react';
import { CylinderText } from './CylinderText';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const UPDATE_CARDS = [
  {
    category: "Publication",
    image: "https://www.wofxworldexpo.com/_next/image?url=%2Fassests%2FFurniture%20Bizz_Page_01.jpg&w=640&q=75&dpl=dpl_9BfkvFNe1ZFS3BeT9g7W2Wx3trvb",
    text: "Exclusive WOFX Design Publication For Industry Leaders"
  },
  {
    category: "Latest Updates",
    image: "https://www.wofxworldexpo.com/_next/image?url=%2Fassests%2FlatestupdateImage%2Fafmtmou.png&w=640&q=75&dpl=dpl_9BfkvFNe1ZFS3BeT9g7W2Wx3trvb",
    text: "Innovative Furniture Trends Reshaping The Global Market"
  },
  {
    category: "Highlights 2025",
    image: "https://www.wofxworldexpo.com/_next/image?url=%2Fassests%2Fpostshow2025.jpg&w=640&q=75&dpl=dpl_9BfkvFNe1ZFS3BeT9g7W2Wx3trvb",
    text: "Unveiling The Masterpieces From Our Upcoming 2025 Expo"
  }
];

export const LatestUpdates = () => {
  return (
    <section className="relative w-full bg-[#f0f0f0] font-sans text-black overflow-hidden border-t-[1.5px] border-[#DFDFDF]">
      {/* Grain Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-[10] opacity-[0.4] mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px'
        }}
      />
      {/* Header Section */}
      <div className="w-[95%] mx-auto px-6 py-16 md:px-12 flex flex-col items-center justify-center border-x-[1.5px] border-[#DFDFDF] gap-6">
        {/* Breaking News Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center select-none"
        >
          <div className="flex flex-col">
            <div className="bg-[#e41c62] px-6 py-1 -skew-x-12 transform">
              <span className="text-white text-2xl md:text-3xl font-black italic tracking-tighter uppercase block skew-x-12">
                Breaking
              </span>
            </div>
            <div className="bg-white px-4 py-0 border-[1.5px] border-[#DFDFDF] -skew-x-12 transform -translate-y-1 ml-auto mr-1">
              <span className="text-black text-lg md:text-xl font-black italic tracking-tighter uppercase block skew-x-12">
                News
              </span>
            </div>
          </div>
        </motion.div>

        <CylinderText 
          text="Latest Updates & Publication" 
          trigger="viewport"
          className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-center"
          primaryColor="#000000"
        />
        <p className="mt-6 text-sm md:text-base font-semibold text-[#888] capitalize max-w-2xl text-center">
          Stay Informed with the most recent developments, market insights, and exclusive industry publications.
        </p>
      </div>

      {/* 3-Column Grid */}
      <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-[28%_44%_28%] border-x-[1.5px] border-y-[1.5px] border-[#DFDFDF]">
        {UPDATE_CARDS.map((card, idx) => (
          <div key={idx} className="flex flex-col border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-[#DFDFDF] last:border-r-0">
            {/* Column Label */}
            <div className="px-6 py-6 border-b-[1.5px] border-[#DFDFDF] flex justify-center items-center">
              <span className="text-xl md:text-2xl font-semibold tracking-tight">{card.category}</span>
            </div>

            {/* Image Content */}
            <div className="relative group overflow-hidden h-[500px] bg-[#f0f0f0] p-1">
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 2.4, ease: [0.19, 1, 0.22, 1], delay: 0.2 + idx * 0.1 }}
                className="w-full h-full"
              >
                <img 
                  src={card.image} 
                  alt={card.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              {/* Overlay Text */}
              <div className="absolute inset-x-0 bottom-0 p-4 z-20">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/30 backdrop-blur-xl p-4 rounded-2xl relative overflow-hidden border border-white/10"
                >
                  {/* Localized Grainy Texture */}
                  <div 
                    className="pointer-events-none absolute inset-0 z-0 opacity-[0.2]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter-update-${idx}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter-update-${idx})'/%3E%3C/svg%3E")`
                    }}
                  />
                  <p className="relative z-10 text-white text-base md:text-lg font-normal leading-tight tracking-tight capitalize">
                    {card.text}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="grid grid-cols-2 divide-x-[1.5px] divide-[#DFDFDF] border-t-[1.5px] border-[#DFDFDF]">
              <motion.button 
                whileHover={{ backgroundColor: '#e41c62', color: '#fff' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-6 gap-2 text-xs font-black uppercase tracking-widest transition-colors duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </motion.button>
              <motion.button 
                whileHover={{ backgroundColor: '#e41c62', color: '#fff' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-6 gap-2 text-xs font-black uppercase tracking-widest transition-colors duration-300"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative Padding Bottom */}
      <div className="w-[95%] mx-auto h-24 border-x-[1.5px] border-[#DFDFDF]" />
    </section>
  );
};
