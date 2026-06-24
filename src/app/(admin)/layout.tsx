import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "Admin Dashboard",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="font-sans">
      <body className="bg-[#F3F4F6]">
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
