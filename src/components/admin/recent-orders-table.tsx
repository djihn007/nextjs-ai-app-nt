"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AdminOrderItem } from "@/types/admin"

const statusMap: Record<string, { label: string; variant: "mock" | "development" | "production" }> = {
  processing: { label: "กำลังดำเนินการ", variant: "mock" },
  received: { label: "ได้รับแล้ว", variant: "development" },
  delivered: { label: "จัดส่งแล้ว", variant: "production" },
}

interface RecentOrdersTableProps {
  orders: AdminOrderItem[]
  loading?: boolean
}

function SkeletonRow() {
  return (
    <TableRow>
      {Array.from({ length: 4 }).map((_, i) => (
        <TableCell key={i}>
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </TableCell>
      ))}
    </TableRow>
  )
}

export function RecentOrdersTable({ orders, loading }: RecentOrdersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>รหัส</TableHead>
          <TableHead>ลูกค้า</TableHead>
          <TableHead>วันที่</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead className="text-right">ยอดรวม</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
        {!loading && orders.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              ไม่มีคำสั่งซื้อ
            </TableCell>
          </TableRow>
        )}
        {!loading &&
          orders.map((order) => {
            const s = statusMap[order.status] ?? { label: order.status, variant: "development" as const }
            return (
              <TableRow key={order.id}>
                <TableCell className="font-mono">#{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>
                  {order.date
                    ? new Date(order.date).toLocaleDateString("th-TH")
                    : "-"}
                </TableCell>
                <TableCell>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("th-TH", {
                    style: "currency",
                    currency: "THB",
                  }).format(order.totalAmount)}
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
