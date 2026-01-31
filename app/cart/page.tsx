"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { useProductsList } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FREE_SHIPPING_THRESHOLD,
  TAX_RATE,
  FLAT_SHIPPING,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const { items, updateQuantity, removeItem } = useCart();
  const { data: products } = useProductsList();

  const productMap = useMemo(() => {
    const map = new Map(products?.map((p) => [p.id, p]) ?? []);
    return map;
  }, [products]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.priceSnapshot * i.quantity, 0),
    [items]
  );
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const tax = (subtotal + shipping) * TAX_RATE;
  const total = subtotal + shipping + tax;
  const freeShippingRemaining = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const progressPercent = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  if (!isAuthenticated) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md rounded-lg border bg-card p-8 text-center shadow-sm"
        >
          <h2 className="text-xl font-semibold">Sign in required</h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to view and manage your cart.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Go to home</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md rounded-lg border bg-card p-8 text-center shadow-sm"
        >
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Add items from the store to get started.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Browse products</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y">
                {items.map((item) => {
                  const product = productMap.get(item.productId);
                  if (!product) return null;
                  const imageUrl = product.images[0] ?? "";
                  return (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 p-4"
                    >
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized={imageUrl.startsWith("http")}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${product.id}`}
                          className="font-medium hover:underline"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.priceSnapshot)} each
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex rounded-md border border-input">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <span className="flex h-8 w-8 items-center justify-center border-x border-input text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      <div className="shrink-0 text-right font-medium">
                        {formatPrice(item.priceSnapshot * item.quantity)}
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0
                    ? "Free"
                    : formatPrice(shipping)}
                </span>
              </div>
              {freeShippingRemaining > 0 && (
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="font-medium">
                    Add {formatPrice(freeShippingRemaining)} for free shipping
                  </p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (est.)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="#">Checkout (placeholder)</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
