"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categoryImages: Record<Category, string> = {
  Electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
  Clothing:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
  Home: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
  Books: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
  Sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
  Beauty: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
  Toys: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400",
  Grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
};

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const imageUrl = categoryImages[category] ?? categoryImages.Electronics;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(className)}
    >
      <Link href={`/products?category=${encodeURIComponent(category)}`}>
        <Card className="overflow-hidden transition-shadow hover:shadow-md">
          <div className="relative aspect-[4/3] bg-muted">
            <Image
              src={imageUrl}
              alt={category}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/20" />
            <CardContent className="absolute inset-0 flex items-center justify-center p-4">
              <h3 className="text-center text-lg font-semibold text-white drop-shadow-md">
                {category}
              </h3>
            </CardContent>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
