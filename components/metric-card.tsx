"use client"

import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: number
  unit: string
  status: "ok" | "attention" | "critique"
}

export function MetricCard({ label, value, unit, status }: MetricCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50 shadow-sm shadow-green-100 dark:shadow-green-900/20"
      case "attention":
        return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/50 shadow-sm shadow-yellow-100 dark:shadow-yellow-900/20"
      case "critique":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50 shadow-sm shadow-red-100 dark:shadow-red-900/20"
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/50 shadow-sm shadow-gray-100 dark:shadow-gray-900/20"
    }
  }

  const getValueColor = (status: string) => {
    switch (status) {
      case "ok":
        return "text-green-700 dark:text-green-300"
      case "attention":
        return "text-yellow-700 dark:text-yellow-300"
      case "critique":
        return "text-red-700 dark:text-red-300"
      default:
        return "text-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className={cn("p-3 rounded-lg border", getStatusColor(status))}>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={cn("text-lg font-semibold", getValueColor(status))}>
        {value} {unit}
      </div>
    </div>
  )
}
