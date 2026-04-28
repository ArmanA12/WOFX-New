import React from 'react';
import Marquee from 'react-fast-marquee';
import AnimatedButton from './AnimatedButton';

const logoFilenames = [
  "1.png", "2.png", "3.png", "4.png", "5.png", "5a.png", "5b.png", "6.png", "7.png", "8.png", "9.png", "10.png", "10a.png",
  "11.png", "12.png", "13.png", "14.png", "14a.png", "14b.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png", '22a.png',
  "21.png", "23.png", "24.png", "25.png", "26.png", "27.png", "28.png", "29.png", "30.png",
  "31.png", "32.png", "33.png", "34.png", "35.png", "35a.png", "36.png", "37.png", "38.png", "39.png", "64.png", "62.png", "63.png", "65.png", "40.png",
  "41.png", "42.png", "43.png", "44.png", "46.png", "47.png", "48.png", "49.png", "50.png",
  "51.png", "52.png", "53.png", "53a.png", "61.png", "54.png", "Logo-wofx-201.png", "55.png", "56.png", "57.png", "58.png", "59.png", "60.png", "66.png",
];

export default function BrandsMarquee() {
  const baseUrl = "https://www.wofxworldexpo.com";

  return (
    <section className="relative w-full bg-[#f0f0f0] font-sans text-black overflow-hidden py-24">
      {/* Cinematic Grain Overlay (Matching AboutUs) */}
      <div 
        className="pointer-events-none absolute inset-0 z-[10] opacity-[0.4] mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://cdn.prod.website-files.com/6630e0a2908a500ca06793bb/689c7c08a1f59a833ae519e1_Grain.gif')`,
          backgroundSize: '200px'
        }}
      />

      <div className="w-[95%] mx-auto px-6 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 uppercase tracking-tighter text-[#e41c62] leading-none">
          Brands Connect @WOFX
        </h2>
        <div className="max-w-3xl mx-auto pt-2">
          <p className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed">
            Connecting global furniture brands with India's leading retailers, distributors, and interior designers. A premier platform for international collaboration.
          </p>
        </div>
      </div>

      <div className="relative py-8">
        <Marquee direction="left" pauseOnHover speed={80} gradient={false}>
          {logoFilenames.map((filename, index) => {
            const imgSrc = filename.includes("Logo-wofx")
              ? `${baseUrl}/assests/countyLogo/2025/${filename}`
              : `${baseUrl}/assests/countyLogo/2026/${filename}`;
            
            return (
              <div className="mx-7" key={index}>
                <img
                  src={imgSrc}
                  alt={`Brand Logo ${index}`}
                  className="h-16 md:h-24 w-auto object-contain brightness-100 contrast-125"
                  referrerPolicy="no-referrer"
                />
              </div>
            );
          })}
        </Marquee>
      </div>

      <div className="flex justify-center mt-12">
        <AnimatedButton 
          initialText="VIEW ALL BRANDS" 
          primaryColor="#e41c62"
          secondaryColor="#FFCC29"
          initialTextColor="white"
          hoverTextColor="black"
          padding="px-12 py-5"
          className="text-sm font-black"
        />
      </div>
    </section>
  );
}
