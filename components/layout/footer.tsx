"use client";

import Link from "next/link";
import { CATEGORIES } from "@/types";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 font-semibold">Store</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for electronics, clothing, home, and more.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Contact</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
