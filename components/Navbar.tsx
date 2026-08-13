'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { categories } from '@/data/categories';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <>
      {/* Floating, Transparent Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent text-white backdrop-blur-[2px] border-b border-white/20">
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wide">
            <span className="text-primary text-2xl drop-shadow-md">★</span> 
            <span className="drop-shadow-md">FIVE STAR</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div
              className="relative group"
              onMouseEnter={() => setHoveredCategory('CCTV Cameras')}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link href="#" className="hover:text-primary transition-colors">
                Our Products
              </Link>
              {hoveredCategory && (
                <div className="absolute top-full left-0 w-96 bg-white/95 backdrop-blur-sm border border-border p-4 shadow-xl rounded-lg mt-2 transition-all duration-300 ease-in-out text-gray-900">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      {categories.map(cat => (
                        <div
                          key={cat.name}
                          onMouseEnter={() => setHoveredCategory(cat.name)}
                          className="cursor-pointer hover:text-primary transition-colors"
                        >
                          {cat.emoji} {cat.name}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Browse all {hoveredCategory} products
                      </p>
                      <Link
                        href={`/category?slug=${categories.find(c => c.name === hoveredCategory)?.slug || ''}`}
                        className="mt-2 inline-block text-primary text-sm font-semibold hover:underline"
                      >
                        View All &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link href="/deals" className="hover:text-primary transition-colors">Deals</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            <Link href="/faqs" className="hover:text-primary transition-colors">FAQs</Link>
          </div>

          <div className="hidden md:flex">
            <motion.a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white px-5 py-2 rounded hover:bg-[#20bd5a] transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now
            </motion.a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-border p-4 fixed w-full z-40 top-20 shadow-lg text-gray-900">
          <div className="space-y-4">
            {categories.map(cat => (
              <div key={cat.name} className="flex items-center gap-2 hover:text-primary transition-colors">
                <span>{cat.emoji}</span>
                <Link href={`/category?slug=${cat.slug}`} onClick={() => setMobileMenuOpen(false)}>
                  {cat.name}
                </Link>
              </div>
            ))}
            <div className="pt-4 border-t border-border">
              <Link href="/deals" className="block hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>Deals</Link>
              <Link href="/contact" className="block hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
              <Link href="/faqs" className="block hover:text-primary py-1" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
            </div>
            <div className="pt-4">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-[#25D366] text-white text-center py-2 rounded hover:bg-[#20bd5a] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}