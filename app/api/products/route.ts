import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { generateSlug } from '@/lib/slug';

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get('category');
  const featured = searchParams.get('featured');

  let query: any = {};
  if (categorySlug) query.categorySlug = categorySlug;
  if (featured === 'true') query.featured = true;

  const products = await Product.find(query).sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const slug = generateSlug(body.name);
  const product = new Product({ ...body, slug });
  await product.save();
  return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const body = await req.json();
  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const product = await Product.findByIdAndDelete(id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
