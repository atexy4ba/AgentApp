"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { useLanguage } from "@/contexts/language-context"
import {
  getAlerts,
  getAlertsSummary,
  acknowledgeAlert,
  resolveAlert,
  getBassinNameById,
  type AlertData,
} from "@/lib/data"

export default function AlertesPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const data = await getAlerts()
        setAlerts(data)
      } catch (error) {
        console.error("Error loading alerts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAlerts()
  }, [])

  const filteredAlertes = alerts.filter((alerte) => {
    if (statusFilter === "all") return true
    return alerte.status === statusFilter
  })

  const summary = getAlertsSummary(alerts)

  const handleAcknowledge = async (alerteId: string) => {
    try {
      await acknowledgeAlert(alerteId)
      // Update local state
      setAlerts((prev) =>
        prev.map((alert) => (alert.id === alerteId ? { ...alert, status: "acknowledged" as const } : alert)),
      )
    } catch (error) {
      console.error("Error acknowledging alert:", error)
    }
  }

  const handleResolve = async (alerteId: string) => {
    try {
      await resolveAlert(alerteId)
      // Update local state
      setAlerts((prev) =>
        prev.map((alert) => (alert.id === alerteId ? { ...alert, status: "resolved" as const } : alert)),
      )
    } catch (error) {
      console.error("Error resolving alert:", error)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50 dark:bg-red-950"
      case "warning":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950"
      default:
        return "text-blue-600 bg-blue-50 dark:bg-blue-950"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "acknowledged":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des alertes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title={t("alerts.title")} />

      <div className="p-4 space-y-4">
        {/* Filtres */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            {t("alerts.all")} ({summary.total})
          </Button>
          <Button
            variant={statusFilter === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("active")}
          >
            {t("alerts.active")} ({summary.active})
          </Button>
          <Button
            variant={statusFilter === "resolved" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("resolved")}
          >
            {t("alerts.resolved")} ({summary.resolved})
          </Button>
        </div>

        {/* Liste des alertes */}
        <div className="space-y-3">
          {filteredAlertes.map((alerte) => (
            <Card key={alerte.id} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full flex-shrink-0 ${getSeverityColor(alerte.severity)}`}>
                    {getStatusIcon(alerte.status)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-sm leading-tight">{alerte.type}</h3>
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        {getBassinNameById(alerte.bassinId)}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground break-words">{alerte.description}</p>

                    <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded text-sm">
                      <strong>{t("alerts.recommendation")}:</strong>
                      <span className="break-words ml-1">{alerte.recommendation}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-2">
                      <span className="flex-shrink-0">
                        {formatDistanceToNow(new Date(alerte.timestamp), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </span>
                      <Badge
                        variant={
                          alerte.status === "resolved"
                            ? "default"
                            : alerte.status === "acknowledged"
                              ? "secondary"
                              : "destructive"
                        }
                        className="flex-shrink-0"
                      >
                        {alerte.status === "resolved"
                          ? t("common.resolved")
                          : alerte.status === "acknowledged"
                            ? t("common.acknowledged")
                            : t("common.active")}
                      </Badge>
                    </div>

                    {(alerte.status === "active" || alerte.status === "acknowledged") && (
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        {alerte.status === "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAcknowledge(alerte.id)}
                            className="text-xs"
                          >
                            {t("alerts.acknowledge")}
                          </Button>
                        )}
                        <Button size="sm" onClick={() => handleResolve(alerte.id)} className="text-xs">
                          {t("alerts.mark.resolved")}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlertes.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">{t("alerts.no.results")}</div>
        )}
      </div>
    </div>
  )
}
