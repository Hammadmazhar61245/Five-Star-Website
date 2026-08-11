'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types';
import { fetchProductById } from '@/lib/api';

export default function ProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchProductById(id).then(data => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  if (!product) return <div className="container mx-auto px-4 py-8 text-center text-gray-400">Product not found.</div>;

  const waMessage = `Hi, I want to order: ${product.name} - Price: Rs. ${product.onSale && product.salePrice ? product.salePrice : product.price} - Brand: ${product.brand}`;
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="relative aspect-square mb-4">
            <Image
              src={product.images[0] || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <div key={idx} className="w-20 h-20 relative border border-border rounded cursor-pointer">
                  <Image src={img} alt="" fill className="object-contain" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-primary font-semibold">{product.brand}</p>
          <h1 className="text-3xl font-bold text-white mt-2">{product.name}</h1>
          <div className="mt-4">
            {product.onSale && product.salePrice ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl text-white">Rs. {product.salePrice}</span>
                <span className="text-gray-400 line-through text-lg">Rs. {product.price}</span>
                <span className="bg-primary text-white text-xs px-2 py-1 rounded">SALE</span>
              </div>
            ) : (
              <span className="text-2xl text-white">Rs. {product.price}</span>
            )}
          </div>

          <div className="mt-4">
            <p className="text-gray-300">{product.description}</p>
          </div>

          {/* Specs table */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-6 border border-border rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="border-b border-border">
                      <td className="px-4 py-2 text-gray-400 font-medium">{key}</td>
                      <td className="px-4 py-2 text-white">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-primary text-white py-3 rounded text-center hover:bg-primary-bright transition"
            >
              Order via WhatsApp
            </a>
            <a
              href={`tel:03008733555`}
              className="bg-border text-white py-3 rounded text-center hover:bg-card transition"
            >
              Call to Order
            </a>
          </div>

          <p className="mt-4 text-gray-400 text-sm">
            {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
          </p>
        </div>
      </div>
    </div>
  );
}
