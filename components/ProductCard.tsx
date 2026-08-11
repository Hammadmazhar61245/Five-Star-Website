'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const displayPrice = product.onSale && product.salePrice ? product.salePrice : product.price;

  return (
    <motion.div
      className="bg-white border border-border rounded-lg p-4 hover:border-primary transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgba(204,0,0,0.15)]"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-gray-50">
        <Image
          src={product.images[0] || '/placeholder.png'}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition duration-300"
        />
        {product.onSale && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-2 right-2 bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-primary text-sm font-medium">{product.brand}</p>
        <h3 className="text-gray-900 font-semibold text-lg line-clamp-2 mt-1">{product.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-900 font-bold">Rs. {displayPrice}</span>
          {product.onSale && product.salePrice && (
            <span className="text-gray-400 line-through text-sm">Rs. {product.price}</span>
          )}
        </div>
      </div>
      <Link
        href={`/product?id=${product._id}`}
        className="block w-full mt-3 bg-primary/10 text-primary text-center py-2 rounded border border-primary/20 hover:bg-primary hover:text-white transition-colors font-medium"
      >
        View Details
      </Link>
    </motion.div>
  );
}