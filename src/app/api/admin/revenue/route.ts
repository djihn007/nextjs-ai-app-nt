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
  const period = searchParams.get("period") ?? "30d"

  const days = period === "7d" ? 7 : period === "90d" ? 90 : 30
  const since = new Date()
  since.setDate(since.getDate() - days)
  since.setHours(0, 0, 0, 0)

  const orders = await prisma.orders.findMany({
    where: { date: { gte: since } },
    select: { date: true, total_amount: true },
    orderBy: { date: "asc" },
  })

  const grouped = new Map<string, { revenue: number; orders: number }>()

  for (const o of orders) {
    const d = o.date ?? new Date()
    const key = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`
    const entry = grouped.get(key) ?? { revenue: 0, orders: 0 }
    entry.revenue += Number(o.total_amount ?? 0)
    entry.orders += 1
    grouped.set(key, entry)
  }

  const data = Array.from(grouped.entries()).map(([date, val]) => ({
    date,
    revenue: val.revenue,
    orders: val.orders,
  }))

  return NextResponse.json(data)
}
