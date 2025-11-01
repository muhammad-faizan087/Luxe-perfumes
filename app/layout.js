import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ClerkProvider } from "@clerk/nextjs";
import { currUser } from "@/lib/getCurrUser";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Luxe Perfume - Premium Fragrances",
  description: "Discover our exclusive collection of luxury perfumes",
  generator: "v0.app",
};

export default async function RootLayout({ children }) {
  const user = await currUser();

  return (
    <html lang="en">
      <body className="font-sans antialiased bg-black text-white">
        <ClerkProvider>
          <CartProvider>
            {children}
            <Analytics />
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
