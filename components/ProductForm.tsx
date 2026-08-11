'use client';

import { useState } from 'react';
import { categories } from '@/data/categories';
import { Product } from '@/types';

export default function ProductForm({
  initialData,
  onSubmit,
}: {
  initialData?: Product;
  onSubmit: (data: any) => void;
}) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || categories[0].name,
    categorySlug: initialData?.categorySlug || categories[0].slug,
    brand: initialData?.brand || '',
    price: initialData?.price || 0,
    salePrice: initialData?.salePrice || '',
    onSale: initialData?.onSale || false,
    inStock: initialData?.inStock !== undefined ? initialData.inStock : true,
    featured: initialData?.featured || false,
    images: initialData?.images?.join('\n') || '',
    specs: initialData?.specs ? JSON.stringify(initialData.specs, null, 2) : '{}',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = () => {
    const data = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : undefined,
      images: form.images.split('\n').filter(Boolean),
      specs: JSON.parse(form.specs || '{}'),
    };
    onSubmit(data);
  };

  return (
    <div className="bg-card border border-border p-6 rounded-lg max-w-2xl">
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-1">Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-black border border-border text-white px-4 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full bg-black border border-border text-white px-4 py-2 rounded"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={(e) => {
                const cat = categories.find(c => c.name === e.target.value);
                setForm(prev => ({
                  ...prev,
                  category: e.target.value,
                  categorySlug: cat?.slug || '',
                }));
              }}
              className="w-full bg-black border border-border text-white px-4 py-2 rounded"
            >
              {categories.map(cat => (
                <option key={cat.slug} value={cat.name}>{cat.emoji} {cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Brand</label>
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full bg-black border border-border text-white px-4 py-2 rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-1">Price (Rs.)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full bg-black border border-border text-white px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Sale Price (optional)</label>
            <input
              name="salePrice"
              type="number"
              value={form.salePrice}
              onChange={handleChange}
              className="w-full bg-black border border-border text-white px-4 py-2 rounded"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-gray-400">
            <input
              type="checkbox"
              name="onSale"
              checked={form.onSale}
              onChange={handleChange}
            />
            On Sale
          </label>
          <label className="flex items-center gap-2 text-gray-400">
            <input
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>
          <label className="flex items-center gap-2 text-gray-400">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />
            Featured
          </label>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Image URLs (one per line)</label>
          <textarea
            name="images"
            value={form.images}
            onChange={handleChange}
            rows={4}
            className="w-full bg-black border border-border text-white px-4 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Specs (JSON)</label>
          <textarea
            name="specs"
            value={form.specs}
            onChange={handleChange}
            rows={4}
            className="w-full bg-black border border-border text-white px-4 py-2 rounded font-mono text-sm"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-bright"
        >
          {initialData ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </div>
  );
}
