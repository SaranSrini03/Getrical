"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSellersPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Sellers</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Seller management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Seller list and approval workflow will be wired here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
