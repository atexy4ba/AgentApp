"use client"

import { useState, useEffect } from "react"
import { Search, Filter, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertHistory } from "@/components/alert-history"
import { OverallStatusCard } from "@/components/overall-status-card"
import { Header } from "@/components/header"
import { useLanguage } from "@/contexts/language-context"
import { getBassins, getAlerts, getBassinSummary, type BassinData, type AlertData } from "@/lib/data"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [bassins, setBassins] = useState<BassinData[]>([])
  const [alerts, setAlerts] = useState<AlertData[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bassinsData, alertsData] = await Promise.all([
          getBassins(),
          getAlerts()
        ])
        setBassins(bassinsData)
        setAlerts(alertsData.filter(alert => alert.status === "active"))
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredAlerts = alerts.filter((alert) =>
    alert.bassinId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const summary = getBassinSummary(bassins)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des données...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title={t("home.title")} />

      <div className="p-4 space-y-6">
        {/* État global */}
        <OverallStatusCard
          totalBassins={bassins.length}
          criticalCount={summary.critique}
          warningCount={summary.attention}
          okCount={summary.ok}
        />

        {/* Barre de recherche pour les alertes */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher dans les alertes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Liste des alertes ou message "tout va bien" */}
        {alerts.length > 0 ? (
          <AlertHistory alerts={filteredAlerts} />
        ) : (
          <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-green-700 dark:text-green-300 mb-2">
                Tout va bien !
              </h3>
              <p className="text-green-600 dark:text-green-400">
                Aucune alerte active pour le moment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
