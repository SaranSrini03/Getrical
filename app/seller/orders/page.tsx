"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SellerOrdersPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Order list and fulfillment UI will be wired here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
