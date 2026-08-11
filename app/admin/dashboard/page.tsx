import AdminNav from '@/components/AdminNav';
import Link from 'next/link';

export default function AdminDashboard() {
  // Fetch stats from API (simplified for now)
  return (
    <div>
      <AdminNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-4 rounded-lg">
            <p className="text-gray-400">Total Products</p>
            <p className="text-2xl text-white">0</p>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg">
            <p className="text-gray-400">Categories</p>
            <p className="text-2xl text-white">7</p>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg">
            <p className="text-gray-400">WhatsApp</p>
            <p className="text-2xl text-white">0300-8733555</p>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg">
            <p className="text-gray-400">Site Status</p>
            <p className="text-2xl text-green-500">Active</p>
          </div>
        </div>
        <div className="mt-8 flex gap-4">
          <Link
            href="/admin/products/new"
            className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-bright"
          >
            Add New Product
          </Link>
          <Link
            href="/admin/products"
            className="bg-border text-white px-6 py-3 rounded hover:border-primary"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
