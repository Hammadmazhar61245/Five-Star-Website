'use client';

import AdminNav from '@/components/AdminNav';
import ProductForm from '@/components/ProductForm';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/admin/products');
    } else {
      alert('Failed to create product');
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Add Product</h1>
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
