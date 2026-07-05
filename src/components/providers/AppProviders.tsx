"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { NavigationProgress } from "@/components/layouts/NavigationProgress";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" switchable>
      <LanguageProvider>
        <CartProvider>
          <NavigationProgress />
          {children}
          <CartDrawer />
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
