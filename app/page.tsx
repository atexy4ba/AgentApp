"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BassinCard } from "@/components/bassin-card"
import { FilterDialog } from "@/components/filter-dialog"
import { Header } from "@/components/header"
import { useLanguage } from "@/contexts/language-context"
import { getBassins, getBassinSummary, type BassinData } from "@/lib/data"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [bassins, setBassins] = useState<BassinData[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const loadBassins = async () => {
      try {
        const data = await getBassins()
        setBassins(data)
      } catch (error) {
        console.error("Error loading bassins:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBassins()
  }, [])

  const filteredBassins = bassins.filter((bassin) => {
    const matchesSearch = bassin.id.toLowerCase().includes(searchTerm.toLowerCase()) // Search by ID now
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(bassin.statut)
    return matchesSearch && matchesStatus
  })

  const summary = getBassinSummary(bassins)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des bassins...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title={t("home.title")} />

      <div className="p-4 space-y-4">
        {/* Barre de recherche et filtres */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t("home.search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => setFilterOpen(true)}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{summary.ok}</div>
            <div className="text-xs text-green-600">OK</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{summary.attention}</div>
            <div className="text-xs text-yellow-600">Attention</div>
          </div>
          <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{summary.critique}</div>
            <div className="text-xs text-red-600">Critique</div>
          </div>
        </div>

        {/* Liste des bassins */}
        <div className="space-y-3">
          {filteredBassins.map((bassin) => (
            <BassinCard key={bassin.id} bassin={bassin} />
          ))}
        </div>

        {filteredBassins.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">{t("home.no.results")}</div>
        )}
      </div>

      <FilterDialog
        open={filterOpen}
        onOpenChange={setFilterOpen}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
    </div>
  )
}
