'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// Added slide3 and slide4 to the array!
const images = [
  '/slide3.png', '/slide4.png', '/slide5.png', '/slide6.png', 
  '/slide7.png', '/slide8.png', '/slide9.png', '/slide10.png', '/slide11.png'
];

export default function BottomGallery() {
  // Duplicate array for the infinite seamless loop
  const duplicatedSlides = [...images, ...images];

  return (
    <section className="mt-16 py-8 bg-white border-t border-border overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Our Latest Security Solutions
      </h2>
      
      {/* Netflix-Style Infinite Scroller */}
      <div className="w-full flex overflow-hidden relative px-2">
        <motion.div
          className="flex gap-6 flex-nowrap"
          animate={{
            x: ["0%", "-50%"] // Moves halfway across the duplicated array
          }}
          transition={{
            duration: 25, // Adjust this number to speed up/slow down the scrolling
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {duplicatedSlides.map((src, index) => (
            <div 
              key={index} 
              className="relative w-[260px] h-[170px] md:w-[320px] md:h-[200px] flex-shrink-0 rounded-xl overflow-hidden border border-border shadow-sm bg-gray-100 hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={src}
                alt={`Security solution ${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}