import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Grain } from "./Grain";
import { CartDrawer } from "./CartDrawer";
import { Toaster } from "@/components/ui/sonner";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Grain />
      <Nav />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <Toaster />
    </div>
  );
}
