"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useProduct } from "@/hooks/use-product";
import { useProductsList } from "@/hooks/use-products";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function RelatedProducts({ product }: { product: Product }) {
  const { data: allProducts } = useProductsList();
  const related =
    allProducts?.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4) ?? [];

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xl font-semibold">Related products</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default function ProductDetailsPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : null;
  const { data: product, isLoading, error } = useProduct(id);
  const { addItem, getItemByProductId } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const inCart = product ? getItemByProductId(product.id) : undefined;

  const handleAddToCart = () => {
    if (!product || !isAuthenticated) return;
    addItem(product.id, quantity, product.price);
  };

  if (error || (id && !isLoading && !product)) {
    return (
      <div className="container px-4 py-12 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Button asChild className="mt-4">
          <Link href="/products">Back to products</Link>
        </Button>
      </div>
    );
  }

  if (isLoading || !product) {
    return (
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-xl bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-20 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = product.images[activeImage] ?? product.images[0] ?? "";

  return (
    <div className="container px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="grid gap-8 md:grid-cols-2"
      >
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={imageUrl.startsWith("http")}
            />
            {product.originalPrice > product.price && (
              <Badge
                variant="destructive"
                className="absolute left-4 top-4"
              >
                Sale
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                    activeImage === i
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground/50"
                  )}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized={img.startsWith("http")}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <Badge variant="secondary" className="mb-2 w-fit">
            {product.category}
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-yellow-600 dark:text-yellow-500">
              {product.rating.toFixed(1)}
            </span>
            <span>({product.reviewCount} reviews)</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex rounded-md border border-input">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </Button>
                <span className="flex h-9 w-9 items-center justify-center border-x border-input text-sm">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <Button
              className="min-w-[140px]"
              disabled={!product.inStock || !isAuthenticated}
              onClick={handleAddToCart}
            >
              {!isAuthenticated
                ? "Sign in to add to cart"
                : inCart
                  ? `In cart (${inCart.quantity})`
                  : "Add to cart"}
            </Button>
          </div>
          {!product.inStock && (
            <p className="mt-2 text-sm text-muted-foreground">
              This item is currently out of stock.
            </p>
          )}
        </div>
      </motion.div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              {product.specifications.length > 0 ? (
                <dl className="grid gap-2 sm:grid-cols-2">
                  {product.specifications.map((spec) => (
                    <div key={spec.key} className="flex gap-2">
                      <dt className="font-medium">{spec.key}</dt>
                      <dd className="text-muted-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-muted-foreground">
                  No specifications available.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {product.reviewCount} reviews. Average rating{" "}
                {product.rating.toFixed(1)}. Review content can be wired to a
                backend later.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <RelatedProducts product={product} />
    </div>
  );
}
