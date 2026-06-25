import { Suspense } from "react"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import ProductsClient from "./products-client"

async function AuthGate() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session || session.user.role !== "admin") {
    redirect("/")
  }

  return <ProductsClient />
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-sm text-muted-foreground">กำลังโหลด...</div>}>
      <AuthGate />
    </Suspense>
  )
}
