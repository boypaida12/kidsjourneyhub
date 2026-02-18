import type { Metadata } from "next";
import { Sour_Gummy, Varela_Round } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/session-provider";
import { CartProvider } from "@/lib/cart-context";
import { TooltipProvider } from "@/components/ui/tooltip";

// Sour Gummy for headings
const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Varela Round for body text
const varelaRound = Varela_Round({
  weight: "400", // Varela Round only has one weight
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kids Journey Hub",
  description: "Your trusted haven for baby and mum essentials. Curated with love for expectant mums, new parents, and thoughtful gift buyers. Premium quality, easy ordering online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourGummy.variable} ${varelaRound.variable} antialiased`}
      >
        <TooltipProvider>
          <AuthSessionProvider>
            <CartProvider>{children}</CartProvider>
          </AuthSessionProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
