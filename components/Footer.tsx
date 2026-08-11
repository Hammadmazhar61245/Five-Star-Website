import Link from 'next/link';
import { categories } from '@/data/categories';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-border mt-12 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl text-primary">★</span>
            <span className="font-bold text-primary text-lg">FIVE STAR</span>
            <span className="text-gray-500 text-sm">ELECTRONICS PLUS</span>
          </div>
          <p className="text-gray-600 text-sm">Safety • Security • Telecommunications</p>
          <p className="text-gray-600 text-sm mt-2">1-Babar Commercial Center, Kutchery Road, Multan</p>
          <p className="text-gray-600 text-sm">0300-8733555 | 03006773555</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-bright transition-colors"
          >
            WhatsApp
          </a>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-gray-600">
            {categories.map(cat => (
              <li key={cat.slug}>
                <Link href={`/category?slug=${cat.slug}`} className="hover:text-primary transition-colors">
                  {cat.emoji} {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/deals" className="hover:text-primary transition-colors">Deals</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
          </ul>
        </div>

        {/* Brands */}
        <div>
          <h4 className="text-gray-900 font-semibold mb-4">Authorized Brands</h4>
          <div className="flex flex-wrap gap-2">
            {['Hikvision', 'Dahua', 'IMOU', 'Botslab', 'Panasonic', 'HiLook', 'TVT', 'Pollo'].map(brand => (
              <span key={brand} className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full border border-border">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t border-border text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Five Star Electronics Plus. All rights reserved.
      </div>
    </footer>
  );
}