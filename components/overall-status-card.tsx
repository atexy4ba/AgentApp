"use client"

import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface OverallStatusCardProps {
  totalBassins: number
  criticalCount: number
  warningCount: number
  okCount: number
}

export function OverallStatusCard({ totalBassins, criticalCount, warningCount, okCount }: OverallStatusCardProps) {
  // Determine overall status
  const getOverallStatus = () => {
    if (criticalCount > 0) return "critique"
    if (warningCount > 0) return "attention"
    return "ok"
  }

  const status = getOverallStatus()

  const getStatusConfig = () => {
    switch (status) {
      case "critique":
        return {
          icon: AlertCircle,
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-50 dark:bg-red-950/50",
          borderColor: "border-red-200 dark:border-red-800",
          shadowColor: "shadow-red-100 dark:shadow-red-900/20",
          title: "État Critique",
          description: `${criticalCount} bassin${criticalCount > 1 ? 's nécessitent' : ' nécessite'} une attention immédiate`
        }
      case "attention":
        return {
          icon: AlertTriangle,
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-50 dark:bg-yellow-950/50",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          shadowColor: "shadow-yellow-100 dark:shadow-yellow-900/20",
          title: "Attention Requise",
          description: `${warningCount} bassin${warningCount > 1 ? 's requièrent' : ' requiert'} votre attention`
        }
      default:
        return {
          icon: CheckCircle2,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-50 dark:bg-green-950/50",
          borderColor: "border-green-200 dark:border-green-800",
          shadowColor: "shadow-green-100 dark:shadow-green-900/20",
          title: "Tout va bien",
          description: "Tous les bassins fonctionnent normalement"
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <Card className={cn(
      "shadow-lg transition-all duration-200",
      config.borderColor,
      config.bgColor,
      config.shadowColor
    )}>
      <CardHeader>
        <CardTitle className={cn("flex items-center gap-2", config.color)}>
          <Icon className="h-6 w-6" />
          {config.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className={cn("text-base", config.color)}>
          {config.description}
        </p>
        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{criticalCount}</div>
            <div className="text-sm text-muted-foreground">Critique</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{warningCount}</div>
            <div className="text-sm text-muted-foreground">Attention</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{okCount}</div>
            <div className="text-sm text-muted-foreground">Normal</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
