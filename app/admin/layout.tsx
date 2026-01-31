import { Navbar } from "@/components/layout/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar mode="admin" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
