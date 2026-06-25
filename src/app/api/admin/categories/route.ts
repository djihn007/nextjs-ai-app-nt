import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const categories = await prisma.categories.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  })

  return NextResponse.json({
    success: true,
    data: categories.map((c) => ({ id: String(c.id), name: c.name ?? "" })),
  })
}
