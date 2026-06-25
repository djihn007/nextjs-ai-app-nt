"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Field, FieldContent, FieldTitle, FieldError } from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { productSchema, type ProductFormValues } from "@/lib/validations/product"
import type { AdminProduct, CategoryOption, ApiResponse } from "@/types/admin"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: AdminProduct | null
  categories: CategoryOption[]
  onSaved: () => void
}

const defaultValues: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
}

export default function ProductFormModal({ open, onOpenChange, product, categories, onSaved }: Props) {
  const form = useForm<ProductFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(productSchema) as any,
    defaultValues,
  })

  useEffect(() => {
    if (open) {
      form.reset(
        product
          ? { name: product.name, description: product.description ?? "", price: product.price, categoryId: product.categoryId }
          : defaultValues
      )
    }
  }, [open, product, form])

  const onSubmit = async (values: ProductFormValues) => {
    const isEdit = !!product
    const url = isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products"
    const method = isEdit ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const json: ApiResponse<AdminProduct> = await res.json()

    if (json.success) {
      toast.success(isEdit ? "อัปเดตสินค้าแล้ว" : "เพิ่มสินค้าแล้ว")
      onOpenChange(false)
      onSaved()
    } else {
      toast.error(json.error || "เกิดข้อผิดพลาด")
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldContent>
              <FieldTitle>ชื่อสินค้า</FieldTitle>
              <Input {...form.register("name")} placeholder="ชื่อสินค้า" />
              {form.formState.errors.name && (
                <FieldError errors={[form.formState.errors.name]} />
              )}
            </FieldContent>
          </Field>

          <Field>
            <FieldContent>
              <FieldTitle>รายละเอียด</FieldTitle>
              <Textarea
                {...form.register("description")}
                placeholder="รายละเอียดสินค้า (ไม่บังคับ)"
                rows={3}
              />
              {form.formState.errors.description && (
                <FieldError errors={[form.formState.errors.description]} />
              )}
            </FieldContent>
          </Field>

          <Field>
            <FieldContent>
              <FieldTitle>ราคา</FieldTitle>
              <Input {...form.register("price")} type="number" step="0.01" placeholder="0.00" />
              {form.formState.errors.price && (
                <FieldError errors={[form.formState.errors.price]} />
              )}
            </FieldContent>
          </Field>

          <Field>
            <FieldContent>
              <FieldTitle>หมวดหมู่</FieldTitle>
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.categoryId && (
                <FieldError errors={[form.formState.errors.categoryId]} />
              )}
            </FieldContent>
          </Field>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              ยกเลิก
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Spinner />}
              {product ? "บันทึก" : "เพิ่มสินค้า"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
