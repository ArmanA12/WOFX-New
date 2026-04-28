import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CylinderText } from './CylinderText';

const PhilosophyGrid: React.FC = () => {
  const borderColor = "border-[#DFDFDF]";
  
  return (
    <section className="relative w-full bg-[#f0f0f0] overflow-hidden border-t-[1.5px] border-[#DFDFDF]">
      {/* Grain Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-[10] opacity-[0.4] mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px'
        }}
      />
      <div className="w-[95%] mx-auto border-x-[1.5px] border-[#DFDFDF] bg-white relative z-20">
        {/* Row 1: Blog Post / Philosophy (Moved Up) */}
        <div className="grid grid-cols-4 min-h-[240px] md:min-h-[350px]">
          {/* Left Empty */}
          <div className={`border-r-[1.5px] border-b-[1.5px] ${borderColor}`} />
          
          {/* Center Text */}
          <div className={`col-span-2 border-r-[1.5px] border-b-[1.5px] ${borderColor} flex flex-col items-center justify-center p-12 text-center`}>
            {/* Blog Post Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center select-none mb-6"
            >
              <div className="flex flex-col">
                <div className="bg-[#e41c62] px-6 py-1 -skew-x-12 transform">
                  <span className="text-white text-xl md:text-2xl font-black italic tracking-tighter uppercase block skew-x-12">
                    Blog
                  </span>
                </div>
                <div className="bg-white px-4 py-0 border-[1.5px] border-[#DFDFDF] -skew-x-12 transform -translate-y-1 ml-auto mr-1">
                  <span className="text-black text-sm md:text-base font-black italic tracking-tighter uppercase block skew-x-12">
                    Post
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col items-center gap-2">
              <CylinderText 
                text="We Give the People" 
                trigger="viewport"
                className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-center"
                primaryColor="#000000"
              />
              <CylinderText 
                text="What They Desire" 
                trigger="viewport"
                className="text-3xl md:text-5xl font-bold tracking-tight uppercase text-center"
                primaryColor="#000000"
                delay={0.4}
              />
            </div>
          </div>
          
          {/* Right Empty */}
          <div className={`border-b-[1.5px] ${borderColor}`} />
        </div>

        {/* Row 2: Images & Details (Moved Down) */}
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[400px] md:min-h-[500px]">
          {/* Box 1: Image */}
          <div className={`border-r-[1.5px] border-b-[1.5px] p-1 ${borderColor} relative overflow-hidden group`}>
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
              className="w-full h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000&auto=format&fit=crop" 
                alt="Curated Design"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          
          {/* Box 2: Details */}
          <div className={`border-r-[1.5px] border-b-[1.5px] ${borderColor} flex flex-col items-start justify-end p-8 md:p-12 bg-white text-black transition-colors duration-500 group`}>
            <span className="text-sm font-medium uppercase tracking-[0.2em] mb-4 text-[#666]">01</span>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Curated<br />Exhibits</h3>
            <p className="text-sm text-[#333] mb-8 leading-relaxed">Discover handpicked collections from global leaders in furniture and interior innovation.</p>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all duration-300 group/btn">
              READ FULL ARTICLE <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
          
          {/* Box 3: Image */}
          <div className={`border-r-[1.5px] border-b-[1.5px] p-1 ${borderColor} relative overflow-hidden group`}>
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
              className="w-full h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000&auto=format&fit=crop" 
                alt="Global Sourcing"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          
          {/* Box 4: Details */}
          <div className={`border-b-[1.5px] ${borderColor} flex flex-col items-start justify-end p-8 md:p-12 bg-white text-black transition-colors duration-500 group`}>
            <span className="text-sm font-medium uppercase tracking-[0.2em] mb-4 text-[#666]">02</span>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Global<br />Sourcing</h3>
            <p className="text-sm text-[#333] mb-8 leading-relaxed">Connect with over 400+ international brands across various categories of the supply chain.</p>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all duration-300 group/btn">
              READ FULL ARTICLE <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Row 3: Empty Bottom Boxes (h-20) */}
        <div className="grid grid-cols-4 h-20">
          <div className={`border-r-[1.5px] border-b-[1.5px] ${borderColor}`} />
          <div className={`col-span-2 border-r-[1.5px] border-b-[1.5px] ${borderColor}`} />
          <div className={`border-b-[1.5px] ${borderColor}`} />
        </div>
      </div>
    </section>
  );
};

export default PhilosophyGrid;
