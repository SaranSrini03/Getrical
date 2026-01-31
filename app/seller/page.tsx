"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SellerDashboardPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Seller dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">My products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage your product listings.
            </p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/seller/products">View products</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View and fulfill orders.
            </p>
            <Button asChild className="mt-4" size="sm" variant="outline">
              <Link href="/seller/orders">View orders</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Store</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Go to customer storefront.
            </p>
            <Button asChild className="mt-4" size="sm" variant="outline">
              <Link href="/">Open store</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
