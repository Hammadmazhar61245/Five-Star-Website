'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import ProductCard from '@/components/ProductCard';
import { fetchFeaturedProducts } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import ScrollyStory from '@/components/ScrollyStory';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    fetchFeaturedProducts().then(setFeatured);
  }, []);

  return (
    <div className="w-full">
      
      {/* 🟢 1. FULL WIDTH HERO (Edge-to-edge) */}
      <section className="relative text-center h-[90vh] pt-20 flex flex-col justify-center items-center w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/slide1.png"
            alt="Cinematic background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div>

        {/* Glowing Orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 relative z-20 drop-shadow-lg">
          <span className="text-primary">★</span> Five Star Electronics Plus
        </h1>
        <p className="text-xl text-gray-200 relative z-20 drop-shadow-md">Safety • Security • Telecommunications</p>
        
        <div className="mt-8 flex justify-center gap-4 relative z-20">
          <motion.a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-bright transition-colors shadow-md relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Order via WhatsApp
            <span className="absolute inset-0 rounded-full border border-primary animate-ping opacity-75"></span>
          </motion.a>
          <Link
            href="/category"
            className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded hover:bg-white/40 transition-colors shadow-sm"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* 🟢 2. SCROLLY STORY (Moved OUTSIDE container to spread edge-to-edge) */}
      <ScrollyStory />

      {/* 🟢 3. EVERYTHING ELSE (Back inside the centered container) */}
      <div className="container mx-auto px-4 mt-16">
        {/* Staggered Categories Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((cat) => (
              <motion.div key={cat.slug} variants={itemVariants}>
                <Link href={`/category?slug=${cat.slug}`} className="bg-white border-2 border-border rounded-lg p-6 text-center block hover:border-primary transition-all duration-200 hover:shadow-[0_4px_20px_rgba(204,0,0,0.1)]">
                  <div className="text-4xl mb-2">{cat.emoji}</div>
                  <div className="text-gray-900 font-semibold">{cat.name}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Featured Products */}
        {featured.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featured.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Trust / Features */}
        <section className="mt-16 bg-gray-50 border border-border rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <h4 className="text-gray-900 font-bold">Genuine Products</h4>
              <p className="text-gray-600 text-sm">100% authentic brands</p>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold">Expert Installation</h4>
              <p className="text-gray-600 text-sm">Professional support</p>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold">After Sale Support</h4>
              <p className="text-gray-600 text-sm">We&apos;re here for you</p>
            </div>
            <div>
              <h4 className="text-gray-900 font-bold">Multan Delivery</h4>
              <p className="text-gray-600 text-sm">Fast local delivery</p>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="mt-16 bg-red-50 border border-primary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Order?</h2>
          <p className="text-gray-600 mb-4">Chat with us on WhatsApp for quick ordering</p>
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`} target="_blank" rel="noreferrer" className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-bright transition-colors inline-block shadow-md">Start Order</a>
        </section>
      </div>
    </div>
  );
}