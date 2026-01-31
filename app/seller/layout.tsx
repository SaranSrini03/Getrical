import { Navbar } from "@/components/layout/navbar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar mode="seller" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
