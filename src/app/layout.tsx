import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emrgsim Global",
  description: "Powered by Emrgsim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
