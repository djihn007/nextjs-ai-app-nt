"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Period = "7d" | "30d" | "90d"

interface PeriodSelectorProps {
  value: Period
  onChange: (period: Period) => void
}

const periods: { value: Period; label: string }[] = [
  { value: "7d", label: "7 วัน" },
  { value: "30d", label: "30 วัน" },
  { value: "90d", label: "90 วัน" },
]

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="flex gap-1 rounded-lg bg-muted p-1">
      {periods.map((p) => (
        <Button
          key={p.value}
          size="sm"
          variant="ghost"
          onClick={() => onChange(p.value)}
          className={cn(
            "h-8 text-xs",
            value === p.value && "bg-background text-foreground shadow-sm"
          )}
        >
          {p.label}
        </Button>
      ))}
    </div>
  )
}
