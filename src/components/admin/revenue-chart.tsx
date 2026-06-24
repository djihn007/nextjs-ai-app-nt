"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface RevenuePoint {
  date: string
  revenue: number
  orders: number
}

interface RevenueChartProps {
  data: RevenuePoint[]
  loading?: boolean
}

export function RevenueChart({ data, loading }: RevenueChartProps) {
  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
        กำลังโหลดข้อมูล...
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
        ไม่มีข้อมูล
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E3E0DD" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: "#797067" }}
          axisLine={{ stroke: "#E3E0DD" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#797067" }}
          axisLine={{ stroke: "#E3E0DD" }}
          tickLine={false}
          tickFormatter={(v: number) =>
            new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
              notation: "compact",
            }).format(v)
          }
        />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #E3E0DD",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
          formatter={(value: unknown) =>
            new Intl.NumberFormat("th-TH", {
              style: "currency",
              currency: "THB",
            }).format(value as number)
          }
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#FE6E00"
          strokeWidth={2}
          dot={{ r: 3, fill: "#FE6E00" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
