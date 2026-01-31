"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
  className?: string;
}

export function ProductCard({ product, layout = "grid", className }: ProductCardProps) {
  const { addItem, getItemByProductId } = useCart();
  const { isAuthenticated } = useAuth();
  const inCart = getItemByProductId(product.id);
  const imageUrl = product.images[0] ?? "/placeholder.svg";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    addItem(product.id, 1, product.price);
  };

  const isList = layout === "list";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(className)}
    >
      <Link href={`/products/${product.id}`}>
        <Card
          className={cn(
            "overflow-hidden transition-shadow hover:shadow-md",
            isList && "flex flex-row"
          )}
        >
          <div
            className={cn(
              "relative bg-muted",
              isList ? "h-32 w-40 shrink-0" : "aspect-square w-full"
            )}
          >
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes={isList ? "160px" : "(max-width: 768px) 100vw, 33vw"}
              unoptimized={imageUrl.startsWith("http")}
            />
            {product.originalPrice > product.price && (
              <Badge
                variant="destructive"
                className="absolute left-2 top-2 text-xs"
              >
                Sale
              </Badge>
            )}
            {!product.inStock && (
              <Badge
                variant="secondary"
                className="absolute right-2 top-2 opacity-90"
              >
                Out of stock
              </Badge>
            )}
          </div>
          <div className={cn("flex flex-1 flex-col", isList && "justify-center")}>
            <CardContent className={cn("p-4", isList && "py-2")}>
              <h3 className="font-semibold line-clamp-2">{product.name}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-yellow-600 dark:text-yellow-500">
                  {product.rating.toFixed(1)}
                </span>
                <span>({product.reviewCount})</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-semibold">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className={cn("mt-auto p-4 pt-0", isList && "pt-2")}>
              <Button
                size="sm"
                className="w-full"
                disabled={!product.inStock || !isAuthenticated}
                onClick={handleAddToCart}
              >
                {!isAuthenticated
                  ? "Sign in to add"
                  : inCart
                    ? `In cart (${inCart.quantity})`
                    : "Add to cart"}
              </Button>
            </CardFooter>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
