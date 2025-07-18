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
import { useAlertesInterventions } from "@/contexts/alertes-interventions-context";
import bassinsData from "../data/bassins.json";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [searchTerm, setSearchTerm] = useState("")
  const { alertes } = useAlertesInterventions();
  const { t } = useLanguage()

  if (!mounted) return null;

  // On ne garde que les alertes actives (déjà filtrées dans le contexte)
  const filteredAlerts = alertes.filter((alert) =>
    alert.bassinId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Plus de gestion de loading ni de bassins ici (à adapter si besoin)

  // Calcul dynamique des états des alertes actives
  const criticalCount = alertes.filter(a => a.severity === "critical").length;
  const warningCount = alertes.filter(a => a.severity === "warning").length;
  const okCount = alertes.length - criticalCount - warningCount;
  const totalBassins = criticalCount + warningCount + okCount;

  return (
    <div className="min-h-screen bg-background">
      <Header title={t("home.title")} />

      <div className="p-4 space-y-6">
        <OverallStatusCard
          totalBassins={totalBassins}
          criticalCount={criticalCount}
          warningCount={warningCount}
          okCount={okCount}
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
        {alertes.length > 0 ? (
          <AlertHistory alerts={filteredAlerts as any} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <CheckCircle2 className="h-20 w-20 text-green-500 dark:text-green-400" />
            <span className="mt-4 text-lg font-bold text-gray-900 dark:text-gray-100">Aucune alerte active</span>
          </div>
        )}
      </div>
    </div>
  )
}
