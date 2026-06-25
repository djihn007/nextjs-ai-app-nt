"use client"

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react"
import { RiAddLine, RiPencilLine, RiDeleteBinLine, RiSearchLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Spinner } from "@/components/ui/spinner"
import type { AdminProduct, CategoryOption, ApiResponse } from "@/types/admin"
import ProductFormModal from "./product-form-modal"
import DeleteConfirmDialog from "./delete-confirm-dialog"

export default function ProductsClient() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [inputVal, setInputVal] = useState("")
  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null)

  const totalPages = Math.max(1, Math.ceil(total / 10))

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set("search", search)
    const res = await fetch(`/api/admin/products?${params}`)
    const json: ApiResponse<{ products: AdminProduct[]; total: number }> = await res.json()
    if (json.success) {
      setProducts(json.data.products)
      setTotal(json.data.total)
    }
    setLoading(false)
  }, [page, search])

  const fetchCategories = useCallback(async () => {
    const res = await fetch("/api/admin/categories")
    const json: ApiResponse<CategoryOption[]> = await res.json()
    if (json.success) {
      setCategories(json.data)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    const t = setTimeout(() => { setSearch(inputVal); setPage(1) }, 300)
    return () => clearTimeout(t)
  }, [inputVal])

  const openCreate = () => {
    setEditProduct(null)
    setFormOpen(true)
  }

  const openEdit = (product: AdminProduct) => {
    setEditProduct(product)
    setFormOpen(true)
  }

  const openDelete = (product: AdminProduct) => {
    setDeleteTarget(product)
  }

  const priceFormat = (n: number) =>
    new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(n)

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">สินค้า</h1>
          <p className="text-sm text-muted-foreground">จัดการรายการสินค้าทั้งหมด</p>
        </div>
        <Button onClick={openCreate}>
          <RiAddLine />
          เพิ่มสินค้า
        </Button>
      </div>

      <div className="relative w-full max-w-sm">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="ค้นหาสินค้า..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="pl-9"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">#</TableHead>
            <TableHead>ชื่อสินค้า</TableHead>
            <TableHead>หมวดหมู่</TableHead>
            <TableHead className="text-right">ราคา</TableHead>
            <TableHead className="w-[120px] text-right">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                <Spinner className="mx-auto" />
              </TableCell>
            </TableRow>
          )}
          {!loading && products.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                ไม่พบสินค้า
              </TableCell>
            </TableRow>
          )}
          {!loading && products.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.categoryName || "-"}</TableCell>
              <TableCell className="text-right">{priceFormat(p.price)}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon-xs" onClick={() => openEdit(p)}>
                    <RiPencilLine className="size-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-xs" onClick={() => openDelete(p)}>
                    <RiDeleteBinLine className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            ทั้งหมด {total} รายการ — หน้า {page} / {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ก่อนหน้า
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              ถัดไป
            </Button>
          </div>
        </div>
      )}

      <ProductFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editProduct}
        categories={categories}
        onSaved={fetchProducts}
      />

      <DeleteConfirmDialog
        product={deleteTarget}
        onOpenChange={(_open: boolean) => { if (!_open) setDeleteTarget(null) }}
        onDeleted={fetchProducts}
      />
    </div>
  )
}
