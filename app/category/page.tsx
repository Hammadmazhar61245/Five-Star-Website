import { fetchProductsByCategory, fetchCategories } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: { slug?: string };
}) {
  const slug = searchParams.slug;
  if (!slug) {
    return <div className="container mx-auto px-4 py-8 text-center text-gray-400">Please select a category.</div>;
  }

  const products = await fetchProductsByCategory(slug);
  const categories = await fetchCategories();
  const category = categories.find((c: any) => c.slug === slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">{category?.name || slug}</h1>
      <p className="text-gray-400 mb-8">{products.length} products found</p>
      {products.length === 0 ? (
        <p className="text-gray-400 text-center">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
