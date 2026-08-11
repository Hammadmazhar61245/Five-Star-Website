export interface Product {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  onSale: boolean;
  images: string[];
  category: string;
  categorySlug: string;
  brand: string;
  specs: Record<string, string>;
  inStock: boolean;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  emoji?: string;
}

export interface AdminLogin {
  email: string;
  password: string;
}
