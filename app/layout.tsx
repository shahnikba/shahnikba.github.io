import type { Metadata } from "next";
import "./globals.css";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shahram Nikbakhtian",
  description:
    "Applied mathematics at the interface of financial markets and machine learning. Notes on causality, optimisation, and applied ML — plus a few projects.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Masthead />
        {children}
        <Footer />
      </body>
    </html>
  );
}
