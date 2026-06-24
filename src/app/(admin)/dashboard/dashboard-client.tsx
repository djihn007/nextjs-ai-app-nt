"use client"

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { RiMoneyDollarCircleLine, RiShoppingBag3Line, RiTimerLine, RiDatabase2Line, RiUserLine } from "@remixicon/react"
import { KpiCard } from "@/components/admin/kpi-card"
import { PeriodSelector } from "@/components/admin/period-selector"
import { RecentOrdersTable } from "@/components/admin/recent-orders-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { AdminStats, RevenuePoint, AdminOrderItem } from "@/types/admin"

const RevenueChart = dynamic(
  () => import("@/components/admin/revenue-chart").then((m) => ({ default: m.RevenueChart })),
  { ssr: false, loading: () => <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">กำลังโหลดแผนภูมิ...</div> }
)

type Period = "7d" | "30d" | "90d"

export default function DashboardClient() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)

  const [revenue, setRevenue] = useState<RevenuePoint[]>([])
  const [revenueLoading, setRevenueLoading] = useState(true)
  const [period, setPeriod] = useState<Period>("30d")

  const [orders, setOrders] = useState<AdminOrderItem[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    setStatsError(null)
    try {
      const res = await fetch("/api/admin/stats")
      if (!res.ok) throw new Error("Failed to fetch stats")
      const data: AdminStats = await res.json()
      setStats(data)
    } catch {
      setStatsError("ไม่สามารถโหลดข้อมูลสถิติได้")
    } finally {
      setStatsLoading(false)
    }
  }, [])

  const fetchRevenue = useCallback(async (p: Period) => {
    setRevenueLoading(true)
    try {
      const res = await fetch(`/api/admin/revenue?period=${p}`)
      if (res.ok) {
        const data: RevenuePoint[] = await res.json()
        setRevenue(data)
      }
    } finally {
      setRevenueLoading(false)
    }
  }, [])

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true)
    try {
      const res = await fetch("/api/admin/orders?limit=5")
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders)
      }
    } finally {
      setOrdersLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    fetchOrders()
  }, [fetchStats, fetchOrders])

  useEffect(() => {
    fetchRevenue(period)
  }, [period, fetchRevenue])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchStats()
      fetchOrders()
    }, 30_000)
    return () => clearInterval(interval)
  }, [fetchStats, fetchOrders])

  const priceFormat = (n: number) =>
    new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" }).format(n)

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">แดชบอร์ด</h1>
        <p className="text-sm text-muted-foreground">ภาพรวมของระบบ</p>
      </div>

      {statsError && (
        <div className="flex items-center gap-3 rounded-lg border border-[#FECDD3] bg-[#FFF1F2] p-4 text-sm text-[#BE123C]">
          <span>{statsError}</span>
          <Button size="sm" variant="destructive" onClick={() => { setStatsLoading(true); fetchStats(); }}>
            ลองใหม่
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          title="ยอดขายวันนี้"
          value={stats ? priceFormat(stats.todaySales) : "-"}
          loading={statsLoading}
          icon={<RiMoneyDollarCircleLine className="size-6" />}
        />
        <KpiCard
          title="คำสั่งซื้อวันนี้"
          value={stats ? stats.todayOrders : "-"}
          sub={stats ? `${stats.pendingOrders} รายการรอดำเนินการ` : undefined}
          loading={statsLoading}
          icon={<RiShoppingBag3Line className="size-6" />}
        />
        <KpiCard
          title="รอดำเนินการ"
          value={stats ? stats.pendingOrders : "-"}
          loading={statsLoading}
          icon={<RiTimerLine className="size-6" />}
        />
        <KpiCard
          title="สินค้า"
          value={stats ? stats.totalProducts : "-"}
          loading={statsLoading}
          icon={<RiDatabase2Line className="size-6" />}
        />
        <KpiCard
          title="ผู้ใช้งาน"
          value={stats ? stats.totalUsers : "-"}
          loading={statsLoading}
          icon={<RiUserLine className="size-6" />}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>รายได้</CardTitle>
          <PeriodSelector value={period} onChange={setPeriod} />
        </CardHeader>
        <CardContent>
          <RevenueChart data={revenue} loading={revenueLoading} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentOrdersTable orders={orders} loading={ordersLoading} />
        </CardContent>
      </Card>
    </div>
  )
}
