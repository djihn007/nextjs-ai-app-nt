import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const [todayOrdersResult, totalProducts, totalUsers] = await Promise.all([
    prisma.orders.findMany({
      where: { date: { gte: todayStart } },
      select: { total_amount: true, status: true },
    }),
    prisma.products.count(),
    prisma.user.count(),
  ])

  const todayOrders = todayOrdersResult.length
  const todaySales = todayOrdersResult.reduce(
    (sum, o) => sum + Number(o.total_amount ?? 0),
    0
  )
  const pendingOrders = todayOrdersResult.filter(
    (o) => o.status === "processing"
  ).length

  return NextResponse.json({
    todaySales,
    todayOrders,
    pendingOrders,
    totalProducts,
    totalUsers,
  })
}
