"use client"

import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { AdminProduct, ApiResponse } from "@/types/admin"
import { useState } from "react"

interface Props {
  product: AdminProduct | null
  onOpenChange: (open: boolean) => void
  onDeleted: () => void
}

export default function DeleteConfirmDialog({ product, onOpenChange, onDeleted }: Props) {
  const [deleting, setDeleting] = useState(false)
  const open = !!product

  const handleDelete = async () => {
    if (!product) return
    setDeleting(true)
    const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" })
    const json: ApiResponse<null> = await res.json()

    if (json.success) {
      toast.success("ลบสินค้าแล้ว")
      onOpenChange(false)
      onDeleted()
    } else {
      toast.error(json.error || "เกิดข้อผิดพลาด")
    }
    setDeleting(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
          <AlertDialogDescription>
            คุณต้องการลบ <strong>{product?.name}</strong> ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting && <Spinner />}
            ลบสินค้า
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
