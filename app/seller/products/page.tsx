"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SellerProductsPage() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My products</h1>
        <Button asChild>
          <Link href="/seller/products/new">Add product</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Product list and add/edit will be wired here. Use same Product type
            and lib/data or your API.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
