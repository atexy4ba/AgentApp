"use client"

import Link from "next/link"
import { Fish, Activity, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { getMetricUnit, getBassinNameById, type BassinData } from "@/lib/data"

interface BassinCardProps {
  bassin: BassinData
}

export function BassinCard({ bassin }: BassinCardProps) {
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "ok":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "attention":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "critique":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusText = (statut: string) => {
    switch (statut) {
      case "ok":
        return "Normal"
      case "attention":
        return "Attention"
      case "critique":
        return "Critique"
      default:
        return "Inconnu"
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-600"
    if (health >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Link href={`/bassin/${bassin.id}`}>
      <Card className="hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">{getBassinNameById(bassin.id)}</h3>
            <Badge className={cn(getStatusColor(bassin.statut), "shadow-sm")}>{getStatusText(bassin.statut)}</Badge>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Fish className="h-4 w-4 text-blue-500" />
              <span className="text-sm">
                {bassin.metrics.fish_count.value} {getMetricUnit("fish_count")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4 text-purple-500" />
              <span className="text-sm">
                pH {bassin.metrics.ph.value} {getMetricUnit("ph")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className={`h-4 w-4 ${getHealthColor(bassin.metrics.health.value)}`} />
              <span className={`text-sm ${getHealthColor(bassin.metrics.health.value)}`}>
                {bassin.metrics.health.value}
                {getMetricUnit("health")}
              </span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            Dernière mesure:{" "}
            {formatDistanceToNow(new Date(bassin.derniereMesure), {
              addSuffix: true,
              locale: fr,
            })}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
