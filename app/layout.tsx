import { ReactNode } from "react";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className="bg-gray-900 text-white">
        <Providers>
          <LanguageProvider>
            <CartProvider>
              <Navbar />
              <main className="container mx-auto p-4">{children}</main>
            </CartProvider>
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
