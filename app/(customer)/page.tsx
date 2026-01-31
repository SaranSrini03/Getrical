"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useFeaturedProducts } from "@/hooks/use-featured-products";
import { useProductsList } from "@/hooks/use-products";
import { CategoryCard } from "@/components/product/category-card";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/types";

const heroSlides = [
  {
    title: "New arrivals",
    subtitle: "Discover the latest products across all categories.",
    cta: "Shop now",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200",
  },
  {
    title: "Electronics",
    subtitle: "Headphones, smart watches, and more.",
    cta: "Browse electronics",
    href: "/products?category=Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200",
  },
];

export default function HomePage() {
  const { data: featured, isLoading: featuredLoading } = useFeaturedProducts();
  const { data: allProducts, isLoading: listLoading } = useProductsList();
  const latest =
    allProducts?.slice().sort(() => Math.random() - 0.5).slice(0, 4) ?? [];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-muted">
        <div className="container px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {heroSlides[0].title}
            </h1>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              {heroSlides[0].subtitle}
            </p>
            <Button asChild className="mt-4">
              <Link href={heroSlides[0].href}>{heroSlides[0].cta}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="container px-4 py-8">
        <h2 className="mb-4 text-xl font-semibold">Categories</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat} category={cat} />
          ))}
        </div>
      </section>

      <section className="container px-4 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured</h2>
          <Button variant="link" asChild>
            <Link href="/products?featured=1">View all</Link>
          </Button>
        </div>
        {featuredLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-xl bg-muted"
                aria-hidden
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured?.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="container px-4 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Latest</h2>
          <Button variant="link" asChild>
            <Link href="/products">View all</Link>
          </Button>
        </div>
        {listLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-xl bg-muted"
                aria-hidden
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t bg-muted/30">
        <div className="container px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold">Ready to shop?</h2>
            <p className="mt-2 text-muted-foreground">
              Browse thousands of products. Free shipping on orders over $50.
            </p>
            <Button asChild className="mt-4">
              <Link href="/products">Go to products</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
