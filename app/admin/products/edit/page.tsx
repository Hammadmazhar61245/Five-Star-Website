'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types';

export default function EditProduct() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products?id=${id}`).then(res => res.json()).then(setProduct);
  }, [id]);

  const handleSubmit = async (data: any) => {
    const res = await fetch(`/api/products?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/admin/products');
    } else {
      alert('Failed to update product');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Edit Product</h1>
        <ProductForm initialData={product} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
