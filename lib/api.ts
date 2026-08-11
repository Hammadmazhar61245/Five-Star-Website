import { Product } from '@/types';

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?featured=true`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?id=${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchProductsByCategory(slug: string): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
  if (!res.ok) return [];
  return res.json();
}
