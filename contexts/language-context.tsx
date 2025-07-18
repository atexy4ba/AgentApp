"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    // Navigation
    "nav.bassins": "Bassins",
    "nav.alertes": "Alertes",
    "nav.journal": "Journal",
    "nav.profil": "Profil",

    // Common
    "common.search": "Rechercher...",
    "common.filter": "Filtrer",
    "common.save": "Sauvegarder",
    "common.cancel": "Annuler",
    "common.ok": "Normal",
    "common.attention": "Attention",
    "common.critical": "Critique",
    "common.active": "Active",
    "common.resolved": "Résolue",
    "common.acknowledged": "Accusée",

    // Home page
    "home.title": "Mes Bassins",
    "home.search.placeholder": "Rechercher un bassin...",
    "home.no.results": "Aucun bassin trouvé",
    "home.last.measure": "Dernière mesure",

    // Basin detail
    "basin.realtime.data": "Données en temps réel",
    "basin.evolution.24h": "Évolution 24h",
    "basin.ai.advice": "Conseils IA",
    "basin.journal": "Journal",
    "basin.temperature": "Température",
    "basin.ph": "pH",
    "basin.salinity": "Salinité",
    "basin.oxygen": "Oxygène",
    "basin.turbidity": "Turbidité",

    // Alerts page
    "alerts.title": "Alertes",
    "alerts.all": "Toutes",
    "alerts.active": "Actives",
    "alerts.acknowledged": "Accusées",
    "alerts.resolved": "Résolues",
    "alerts.acknowledge": "Accuser réception",
    "alerts.mark.resolved": "Marquer résolue",
    "alerts.recommendation": "Recommandation",
    "alerts.no.results": "Aucune alerte trouvée",

    // Journal page
    "journal.title": "Journal d'interventions",
    "journal.new.intervention": "Nouvelle intervention",
    "journal.all": "Toutes",
    "journal.maintenance": "Maintenance",
    "journal.repair": "Réparations",
    "journal.inspection": "Inspections",
    "journal.no.results": "Aucune intervention trouvée",

    // Profile page
    "profile.title": "Profil",
    "profile.information": "Informations",
    "profile.display": "Affichage",
    "profile.dark.mode": "Mode sombre",
    "profile.language": "Langue",
    "profile.notifications": "Notifications",
    "profile.push.notifications": "Notifications push",
    "profile.connectivity": "Connectivité",
    "profile.offline.mode": "Mode hors ligne",
    "profile.statistics": "Statistiques",
    "profile.sync.data": "Synchroniser les données",
    "profile.export.journal": "Exporter le journal",
    "profile.logout": "Se déconnecter",

    // Intervention dialog
    "intervention.title": "Nouvelle intervention",
    "intervention.type": "Type d'intervention",
    "intervention.description": "Description",
    "intervention.status": "Statut",
    "intervention.photos": "Photos",
    "intervention.take.photo": "Prendre une photo",
    "intervention.completed": "Terminée",
    "intervention.in.progress": "En cours",
    "intervention.pending": "En attente",
  },
  ar: {
    // Navigation
    "nav.bassins": "الأحواض",
    "nav.alertes": "التنبيهات",
    "nav.journal": "السجل",
    "nav.profil": "الملف الشخصي",

    // Common
    "common.search": "بحث...",
    "common.filter": "تصفية",
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.ok": "طبيعي",
    "common.attention": "انتباه",
    "common.critical": "حرج",
    "common.active": "نشط",
    "common.resolved": "محلول",
    "common.acknowledged": "مؤكد",

    // Home page
    "home.title": "أحواضي",
    "home.search.placeholder": "البحث عن حوض...",
    "home.no.results": "لم يتم العثور على أحواض",
    "home.last.measure": "آخر قياس",

    // Basin detail
    "basin.realtime.data": "البيانات في الوقت الفعلي",
    "basin.evolution.24h": "التطور خلال 24 ساعة",
    "basin.ai.advice": "نصائح الذكاء الاصطناعي",
    "basin.journal": "السجل",
    "basin.temperature": "درجة الحرارة",
    "basin.ph": "الحموضة",
    "basin.salinity": "الملوحة",
    "basin.oxygen": "الأكسجين",
    "basin.turbidity": "العكارة",

    // Alerts page
    "alerts.title": "التنبيهات",
    "alerts.all": "الكل",
    "alerts.active": "النشطة",
    "alerts.acknowledged": "المؤكدة",
    "alerts.resolved": "المحلولة",
    "alerts.acknowledge": "تأكيد الاستلام",
    "alerts.mark.resolved": "وضع علامة كمحلول",
    "alerts.recommendation": "التوصية",
    "alerts.no.results": "لم يتم العثور على تنبيهات",

    // Journal page
    "journal.title": "سجل التدخلات",
    "journal.new.intervention": "تدخل جديد",
    "journal.all": "الكل",
    "journal.maintenance": "الصيانة",
    "journal.repair": "الإصلاحات",
    "journal.inspection": "التفتيش",
    "journal.no.results": "لم يتم العثور على تدخلات",

    // Profile page
    "profile.title": "الملف الشخصي",
    "profile.information": "المعلومات",
    "profile.display": "العرض",
    "profile.dark.mode": "الوضع المظلم",
    "profile.language": "اللغة",
    "profile.notifications": "الإشعارات",
    "profile.push.notifications": "الإشعارات الفورية",
    "profile.connectivity": "الاتصال",
    "profile.offline.mode": "وضع عدم الاتصال",
    "profile.statistics": "الإحصائيات",
    "profile.sync.data": "مزامنة البيانات",
    "profile.export.journal": "تصدير السجل",
    "profile.logout": "تسجيل الخروج",

    // Intervention dialog
    "intervention.title": "تدخل جديد",
    "intervention.type": "نوع التدخل",
    "intervention.description": "الوصف",
    "intervention.status": "الحالة",
    "intervention.photos": "الصور",
    "intervention.take.photo": "التقاط صورة",
    "intervention.completed": "مكتمل",
    "intervention.in.progress": "قيد التنفيذ",
    "intervention.pending": "في الانتظار",
  },
  en: {
    // Navigation
    "nav.bassins": "Basins",
    "nav.alertes": "Alerts",
    "nav.journal": "Journal",
    "nav.profil": "Profile",

    // Common
    "common.search": "Search...",
    "common.filter": "Filter",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.ok": "Normal",
    "common.attention": "Warning",
    "common.critical": "Critical",
    "common.active": "Active",
    "common.resolved": "Resolved",
    "common.acknowledged": "Acknowledged",

    // Home page
    "home.title": "My Basins",
    "home.search.placeholder": "Search for a basin...",
    "home.no.results": "No basins found",
    "home.last.measure": "Last measurement",

    // Basin detail
    "basin.realtime.data": "Real-time Data",
    "basin.evolution.24h": "24h Evolution",
    "basin.ai.advice": "AI Advice",
    "basin.journal": "Journal",
    "basin.temperature": "Temperature",
    "basin.ph": "pH",
    "basin.salinity": "Salinity",
    "basin.oxygen": "Oxygen",
    "basin.turbidity": "Turbidity",

    // Alerts page
    "alerts.title": "Alerts",
    "alerts.all": "All",
    "alerts.active": "Active",
    "alerts.acknowledged": "Acknowledged",
    "alerts.resolved": "Resolved",
    "alerts.acknowledge": "Acknowledge",
    "alerts.mark.resolved": "Mark as resolved",
    "alerts.recommendation": "Recommendation",
    "alerts.no.results": "No alerts found",

    // Journal page
    "journal.title": "Intervention Journal",
    "journal.new.intervention": "New Intervention",
    "journal.all": "All",
    "journal.maintenance": "Maintenance",
    "journal.repair": "Repairs",
    "journal.inspection": "Inspections",
    "journal.no.results": "No interventions found",

    // Profile page
    "profile.title": "Profile",
    "profile.information": "Information",
    "profile.display": "Display",
    "profile.dark.mode": "Dark mode",
    "profile.language": "Language",
    "profile.notifications": "Notifications",
    "profile.push.notifications": "Push notifications",
    "profile.connectivity": "Connectivity",
    "profile.offline.mode": "Offline mode",
    "profile.statistics": "Statistics",
    "profile.sync.data": "Sync data",
    "profile.export.journal": "Export journal",
    "profile.logout": "Logout",

    // Intervention dialog
    "intervention.title": "New Intervention",
    "intervention.type": "Intervention type",
    "intervention.description": "Description",
    "intervention.status": "Status",
    "intervention.photos": "Photos",
    "intervention.take.photo": "Take photo",
    "intervention.completed": "Completed",
    "intervention.in.progress": "In progress",
    "intervention.pending": "Pending",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["fr", "ar", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)

    // Apply RTL for Arabic
    if (lang === "ar") {
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    } else {
      document.documentElement.dir = "ltr"
      document.documentElement.lang = lang
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
