import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/toaster";

export const metadata: Metadata = {
  title: "Evreghen Command Center",
  description: "Security operations interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body>
        <Navbar />
        <main className="mx-auto max-w-[1400px] px-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
