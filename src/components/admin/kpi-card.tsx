import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  title: string
  value: string | number
  sub?: string
  icon: React.ReactNode
  loading?: boolean
}

export function KpiCard({ title, value, sub, icon, loading }: KpiCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#FE6E00]/10 text-[#FE6E00]">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-sm text-muted-foreground">{title}</div>
          {loading ? (
            <KpiCardSkeleton />
          ) : (
            <>
              <div className="text-2xl font-bold text-foreground">{value}</div>
              {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function KpiCardSkeleton() {
  return (
    <div className={cn("mt-1 space-y-1.5")}>
      <div className="h-7 w-20 animate-pulse rounded bg-muted" />
      <div className="h-3 w-16 animate-pulse rounded bg-muted" />
    </div>
  )
}
