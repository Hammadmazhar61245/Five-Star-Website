'use client';

import { useEffect, useState } from 'react';
import AdminNav from '@/components/AdminNav';
import Link from 'next/link';
import { Product } from '@/types';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">All Products</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-gray-400">Name</th>
                <th className="px-4 py-2 text-gray-400">Category</th>
                <th className="px-4 py-2 text-gray-400">Brand</th>
                <th className="px-4 py-2 text-gray-400">Price</th>
                <th className="px-4 py-2 text-gray-400">Stock</th>
                <th className="px-4 py-2 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b border-border">
                  <td className="px-4 py-2 text-white">{product.name}</td>
                  <td className="px-4 py-2 text-gray-400">{product.category}</td>
                  <td className="px-4 py-2 text-gray-400">{product.brand}</td>
                  <td className="px-4 py-2 text-white">Rs. {product.price}</td>
                  <td className="px-4 py-2 text-gray-400">{product.inStock ? 'In Stock' : 'Out'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      href={`/admin/products/edit?id=${product._id}`}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id!)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
