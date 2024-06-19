import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ShopStoreProvider } from "@/providers/store-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Teeldinho Store",
  description: "Your one-stop shop for all things Teeldinho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <ShopStoreProvider>
            {children}
            <Toaster richColors position="top-center" />
          </ShopStoreProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
