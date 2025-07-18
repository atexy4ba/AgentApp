"use client"

import { useState, useEffect } from "react"
import { Calendar, FileText, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { InterventionDialog } from "@/components/intervention-dialog"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { getInterventions, getBassinNameById, type InterventionData } from "@/lib/data"
import FormulaireInterventionAlerte from "@/components/formulaire-intervention-alerte";
import { useAlertesInterventions } from "@/contexts/alertes-interventions-context";

export default function JournalPage() {
  const [interventionOpen, setInterventionOpen] = useState(false)
  const [filterType, setFilterType] = useState<string>("all")
  const { interventions, alertes } = useAlertesInterventions();
  const loading = false;
  const { t } = useLanguage()

  const filteredInterventions = interventions.filter((intervention) => {
    if (filterType === "all") return true
    return intervention.type.toLowerCase().includes(filterType.toLowerCase())
  })

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "maintenance":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "réparation":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "ajustement ph":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "inspection":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "nettoyage":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "urgence":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "pending":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement du journal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title={t("journal.title")} />

      <div className="p-4 space-y-4">
        {/* Bouton nouvelle intervention */}
        <Button
          onClick={() => setInterventionOpen(true)}
          className={`w-full gap-2 ${alertes.length === 0 ? 'bg-gray-200 text-gray-500 border border-gray-300 cursor-not-allowed' : ''}`}
          disabled={alertes.length === 0}
        >
          <FileText className="h-4 w-4" />
          {alertes.length === 0 ? "Aucune alerte active" : t("journal.new.intervention")}
        </Button>

        {interventionOpen && (
          <FormulaireInterventionAlerte open={interventionOpen} onOpenChange={setInterventionOpen} />
        )}

        {/* Filtres */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button variant={filterType === "all" ? "default" : "outline"} size="sm" onClick={() => setFilterType("all")}>
            {t("journal.all")}
          </Button>
          <Button
            variant={filterType === "maintenance" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("maintenance")}
          >
            {t("journal.maintenance")}
          </Button>
          <Button
            variant={filterType === "réparation" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("réparation")}
          >
            {t("journal.repair")}
          </Button>
          <Button
            variant={filterType === "inspection" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("inspection")}
          >
            {t("journal.inspection")}
          </Button>
        </div>

        {/* Liste des interventions */}
        <div className="space-y-3">
          {filteredInterventions.map((intervention) => (
            <Card key={intervention.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{getBassinNameById(intervention.bassinId)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getTypeColor(intervention.type)}>{intervention.type}</Badge>
                      <Badge className={getStatusColor(intervention.status)}>
                        {intervention.status === "completed"
                          ? "Terminée"
                          : intervention.status === "in-progress"
                            ? "En cours"
                            : "En attente"}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{intervention.description}</p>

                  {intervention.notes && (
                    <div className="bg-muted p-2 rounded text-sm">
                      <strong>Notes:</strong> {intervention.notes}
                    </div>
                  )}

                  {intervention.photos.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {intervention.photos.map((photo, index) => (
                        <div key={index} className="flex-shrink-0">
                          <Image
                            src={photo || "/placeholder.svg"}
                            alt={`Photo ${index + 1}`}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(intervention.timestamp), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </span>
                      {intervention.duration && <span className="ml-2">({intervention.duration} min)</span>}
                    </div>
                    <span>Par {intervention.agent}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInterventions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">{t("journal.no.results")}</div>
        )}
      </div>

      {/* <InterventionDialog open={interventionOpen} onOpenChange={setInterventionOpen} /> */}
    </div>
  )
}
