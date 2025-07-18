import bassinsData from "@/data/bassins.json"
import alertsData from "@/data/alerts.json"
import interventionsData from "@/data/interventions.json"

export interface BassinMetric {
  value: number
  status: "ok" | "attention" | "critique"
}

export interface BassinData {
  id: string
  statut: "ok" | "attention" | "critique"
  capacity: number
  metrics: {
    [key: string]: BassinMetric
  }
  chartData: Array<{
    time: string
    ph: number
    oxygen: number
    temp: number
    health: number
  }>
  aiAdvice: string
  derniereMesure: string
}

export interface AlertData {
  id: string
  type: string
  bassinId: string
  timestamp: string
  status: "active" | "acknowledged" | "resolved"
  severity: "warning" | "critical"
  description: string
  recommendation: string
  metric: string
  value: number
  threshold: number
}

export interface InterventionData {
  id: string
  bassinId: string
  type: string
  description: string
  timestamp: string
  status: "completed" | "in-progress" | "pending"
  photos: string[]
  agent: string
  duration: number | null
  alertIds: string[]
  notes: string
}

// Simulate API calls with promises
export const getBassins = async (): Promise<BassinData[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return bassinsData as BassinData[]
}

export const getBassinById = async (id: string): Promise<BassinData | null> => {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const bassin = bassinsData.find((b) => b.id === id)
  return (bassin as BassinData) || null
}

export const getAlerts = async (): Promise<AlertData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return alertsData as AlertData[]
}

export const getActiveAlerts = async (): Promise<AlertData[]> => {
  const alerts = await getAlerts()
  return alerts.filter((alert) => alert.status === "active")
}

export const getAlertsByBassinId = async (bassinId: string): Promise<AlertData[]> => {
  const alerts = await getAlerts()
  return alerts.filter((alert) => alert.bassinId === bassinId && alert.status === "active")
}

export const getInterventions = async (): Promise<InterventionData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return interventionsData as InterventionData[]
}

export const getInterventionsByBassinId = async (bassinId: string): Promise<InterventionData[]> => {
  const interventions = await getInterventions()
  return interventions.filter((intervention) => intervention.bassinId === bassinId)
}

// Helper functions for data processing
export const getBassinSummary = (bassins: BassinData[]) => {
  return {
    total: bassins.length,
    ok: bassins.filter((b) => b.statut === "ok").length,
    attention: bassins.filter((b) => b.statut === "attention").length,
    critique: bassins.filter((b) => b.statut === "critique").length,
  }
}

export const getAlertsSummary = (alerts: AlertData[]) => {
  return {
    total: alerts.length,
    active: alerts.filter((a) => a.status === "active").length,
    acknowledged: alerts.filter((a) => a.status === "acknowledged").length,
    resolved: alerts.filter((a) => a.status === "resolved").length,
    critical: alerts.filter((a) => a.severity === "critical" && a.status === "active").length,
    warning: alerts.filter((a) => a.severity === "warning" && a.status === "active").length,
  }
}

export const getMetricLabel = (key: string): string => {
  const labels: { [key: string]: string } = {
    fish_count: "Nombre de poissons",
    ph: "pH",
    salinity: "Salinité",
    suspended_solids: "Matières en suspension",
    nitrate: "Nitrates",
    ammonia: "Ammoniaque",
    water_level: "Niveau d'eau",
    oxygen: "Oxygène",
    turbidity: "Turbidité",
    chlorophyll: "Chlorophylle",
    fish_behavior: "Comportement",
    health: "Santé",
  }
  return labels[key] || key
}

export const getMetricUnit = (key: string): string => {
  const units: { [key: string]: string } = {
    fish_count: "poissons",
    ph: "pH",
    salinity: "ppt",
    suspended_solids: "mg/L",
    nitrate: "mg/L",
    ammonia: "mg/L",
    water_level: "m",
    oxygen: "mg/L",
    turbidity: "NTU",
    chlorophyll: "μg/L",
    fish_behavior: "%",
    health: "%",
  }
  return units[key] || ""
}

export const getBassinNameById = (id: string): string => {
  const bassin = bassinsData.find((b) => b.id === id)
  return bassin ? `Bassin ${bassin.id}` : `Bassin Inconnu (${id})`
}

// Mock functions for actions (to be replaced with API calls)
export const acknowledgeAlert = async (alertId: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log(`Alert ${alertId} acknowledged`)
  return true
}

export const resolveAlert = async (alertId: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log(`Alert ${alertId} resolved`)
  return true
}

export const createIntervention = async (intervention: Partial<InterventionData>): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log("Intervention created:", intervention)
  return true
}
