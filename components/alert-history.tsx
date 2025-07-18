"use client"

import { AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { getBassinNameById } from "@/lib/data"

interface Alert {
  id: string
  type: string
  bassinId: string // Changed from 'bassin' to 'bassinId'
  timestamp: string
  status: "active" | "acknowledged" | "resolved"
  severity: "warning" | "critical"
}

interface AlertHistoryProps {
  alerts: Alert[]
}

export function AlertHistory({ alerts }: AlertHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Alertes en cours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`p-1 rounded-full ${
                    alert.severity === "critical"
                      ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                      : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
                  }`}
                >
                  <AlertTriangle className="h-3 w-3" />
                </div>
                <div>
                  <div className="font-medium text-sm">{alert.type}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(alert.timestamp), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </div>
                </div>
              </div>
              <Badge variant={alert.status === "active" ? "destructive" : "secondary"} className="text-xs">
                {getBassinNameById(alert.bassinId)} {/* Display basin name using helper */}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
