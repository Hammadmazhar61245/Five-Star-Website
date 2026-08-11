'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <nav className="bg-card border-b border-border p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-primary font-bold">Admin Panel</span>
        <Link href="/admin/dashboard" className="hover:text-primary">Dashboard</Link>
        <Link href="/admin/products" className="hover:text-primary">Products</Link>
        <Link href="/admin/products/new" className="hover:text-primary">Add Product</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-600">
        Logout
      </button>
    </nav>
  );
}
