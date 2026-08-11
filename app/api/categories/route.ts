import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/models/Category';
import { generateSlug } from '@/lib/slug';

export async function GET() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const slug = generateSlug(body.name);
  const category = new Category({ ...body, slug });
  await category.save();
  return NextResponse.json(category, { status: 201 });
}
