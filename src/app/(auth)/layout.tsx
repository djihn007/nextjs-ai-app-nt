import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Evreghen Command Center — Authentication",
  description: "Sign in to the command center",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body>
        {children}
      </body>
    </html>
  );
}
