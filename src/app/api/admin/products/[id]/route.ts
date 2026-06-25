import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import prisma from "@/lib/prisma"
import { productSchema } from "@/lib/validations/product"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const result = productSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: "Validation failed", details: result.error },
      { status: 400 }
    )
  }

  const { name, description, price, categoryId } = result.data

  const product = await prisma.products.update({
    where: { id: parseInt(id) },
    data: {
      name,
      description: description || null,
      price,
      category_id: parseInt(categoryId),
    },
    include: { categories: { select: { name: true } } },
  })

  return NextResponse.json({
    success: true,
    data: {
      id: String(product.id),
      name: product.name ?? "",
      description: product.description,
      price: Number(product.price ?? 0),
      categoryId: String(product.category_id ?? ""),
      categoryName: product.categories?.name ?? "",
    },
  })
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const pid = parseInt(id)

  const count = await prisma.order_items.count({ where: { product_id: pid } })
  if (count > 0) {
    return NextResponse.json(
      { success: false, error: `ไม่สามารถลบได้ มี ${count} รายการในคำสั่งซื้อ` },
      { status: 409 }
    )
  }

  await prisma.products.delete({ where: { id: pid } })

  return NextResponse.json({ success: true, data: null })
}
