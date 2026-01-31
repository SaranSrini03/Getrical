import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar mode="customer" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
