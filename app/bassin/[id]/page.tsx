"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MetricCard } from "@/components/metric-card"
import { MiniChart } from "@/components/mini-chart"
import { AIAdviceCard } from "@/components/ai-advice-card"
import { InterventionDialog } from "@/components/intervention-dialog"
import { AlertHistory } from "@/components/alert-history"
import { useLanguage } from "@/contexts/language-context"
import {
  getBassinById,
  getAlertsByBassinId,
  getMetricLabel,
  getMetricUnit,
  getBassinNameById,
  type BassinData,
  type AlertData,
} from "@/lib/data"

export default function BassinDetailPage() {
  const params = useParams()
  const [interventionOpen, setInterventionOpen] = useState(false)
  const [bassin, setBassin] = useState<BassinData | null>(null)
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const loadBassinData = async () => {
      try {
        const bassinData = await getBassinById(params.id as string)
        const alertsData = await getAlertsByBassinId(params.id as string)

        setBassin(bassinData)
        setAlerts(alertsData)
      } catch (error) {
        console.error("Error loading bassin data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBassinData()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du bassin...</p>
        </div>
      </div>
    )
  }

  if (!bassin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Bassin non trouvé</h1>
          <Link href="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b p-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold">{getBassinNameById(bassin.id)}</h1>
            <Badge
              variant={bassin.statut === "ok" ? "default" : bassin.statut === "attention" ? "secondary" : "destructive"}
              className="text-xs"
            >
              {bassin.statut === "ok"
                ? t("common.ok")
                : bassin.statut === "attention"
                  ? t("common.attention")
                  : t("common.critical")}
            </Badge>
          </div>
          <Button onClick={() => setInterventionOpen(true)} size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            {t("basin.journal")}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Métriques en temps réel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t("basin.realtime.data")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(bassin.metrics).map(([key, metric]) => (
                <MetricCard
                  key={key}
                  label={getMetricLabel(key)}
                  value={metric.value}
                  unit={getMetricUnit(key)}
                  status={metric.status}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Graphiques */}
        <Card>
          <CardHeader>
            <CardTitle>{t("basin.evolution.24h")}</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniChart data={bassin.chartData} />
          </CardContent>
        </Card>

        {/* Conseils IA */}
        <AIAdviceCard advice={bassin.aiAdvice} />

        {/* Alertes */}
        {alerts.length > 0 && <AlertHistory alerts={alerts} />}
      </div>

      <InterventionDialog
        open={interventionOpen}
        onOpenChange={setInterventionOpen}
        bassinId={params.id as string}
        bassinNom={getBassinNameById(params.id as string)}
      />
    </div>
  )
}
