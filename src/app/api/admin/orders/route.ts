import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const limit = Math.min(Number(searchParams.get("limit")) || 5, 50)

  const [orders, total] = await Promise.all([
    prisma.orders.findMany({
      take: limit,
      orderBy: { date: "desc" },
      include: { customers: { select: { name: true } } },
    }),
    prisma.orders.count(),
  ])

  const serialized = orders.map((o) => ({
    id: o.id,
    date: o.date?.toISOString() ?? "",
    customerName: o.customers?.name ?? "-",
    status: o.status ?? "processing",
    totalAmount: Number(o.total_amount ?? 0),
  }))

  return NextResponse.json({ orders: serialized, total })
}
