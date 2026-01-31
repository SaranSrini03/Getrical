"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminUsersPage() {
  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Users</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">User management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            User list and role management will be wired here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
