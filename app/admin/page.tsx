"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Admin dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage customer and seller accounts.
            </p>
            <Button asChild className="mt-4" size="sm">
              <Link href="/admin/users">View users</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sellers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Approve and manage sellers.
            </p>
            <Button asChild className="mt-4" size="sm" variant="outline">
              <Link href="/admin/sellers">View sellers</Link>
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
