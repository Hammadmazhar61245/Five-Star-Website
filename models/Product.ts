import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
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
} 

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    onSale: { type: Boolean, default: false },
    images: [{ type: String }],
    category: { type: String, required: true },
    categorySlug: { type: String, required: true },
    brand: { type: String, required: true },
    specs: { type: Map, of: String },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
