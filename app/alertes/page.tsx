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
import { useAlertesInterventions } from "@/contexts/alertes-interventions-context";
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
  const { alertes } = useAlertesInterventions();
  const { t } = useLanguage()

  // On ne garde que les alertes actives ou selon le filtre
  const filteredAlertes = alertes.filter((alerte) => {
    if (statusFilter === "all") return true
    return alerte.status === statusFilter
  })

  // Calcul du résumé (nombre total/actives)
  const summary = {
    total: alertes.length,
    active: alertes.filter(a => a.status === "active").length,
    resolved: 0 // plus de resolved dans le contexte, à adapter si besoin
  }

  const handleAcknowledge = async (alerteId: string) => {
    try {
      await acknowledgeAlert(alerteId)
      // Update local state
      // setAlerts((prev) =>
      //   prev.map((alert) => (alert.id === alerteId ? { ...alert, status: "acknowledged" as const } : alert)),
      // )
    } catch (error) {
      console.error("Error acknowledging alert:", error)
    }
  }

  const handleResolve = async (alerteId: string) => {
    try {
      await resolveAlert(alerteId)
      // Update local state
      // setAlerts((prev) =>
      //   prev.map((alert) => (alert.id === alerteId ? { ...alert, status: "resolved" as const } : alert)),
      // )
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
        </div>

        {/* Liste des alertes */}
        <div className="space-y-3">
          {filteredAlertes.map((alerte) => (
            <Card key={alerte.id} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full flex-shrink-0 ${alerte.severity === 'critical' ? 'text-red-600 bg-red-50 dark:bg-red-950' : 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950'}`}>
                    <AlertTriangle className="h-4 w-4" />
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
                      <Badge variant="destructive" className="flex-shrink-0">
                        {t("common.active")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlertes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <CheckCircle className="h-20 w-20 text-green-500 dark:text-green-400" />
            <span className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-100">Aucune alerte active</span>
          </div>
        )}
      </div>
    </div>
  )
}
