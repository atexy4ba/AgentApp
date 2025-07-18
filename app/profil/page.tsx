"use client"

import { useState } from "react"
import { Bell, Globe, Moon, Sun, User, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

export default function ProfilPage() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [notifications, setNotifications] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header title={t("profile.title")} />

      <div className="p-4 space-y-4">
        {/* Informations utilisateur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t("profile.information")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                JD
              </div>
              <div>
                <h3 className="font-medium">Jean Dupont</h3>
                <p className="text-sm text-muted-foreground">Agent de terrain</p>
                <Badge variant="outline" className="text-xs mt-1">
                  Ferme Aqua-Marine
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Paramètres d'affichage */}
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.display")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span>{t("profile.dark.mode")}</span>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{t("profile.language")}</span>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              {t("profile.notifications")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>{t("profile.push.notifications")}</span>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="text-sm text-muted-foreground">
              Recevez des alertes en temps réel pour les événements critiques
            </div>
          </CardContent>
        </Card>

        {/* Mode hors ligne */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {offlineMode ? <WifiOff className="h-5 w-5" /> : <Wifi className="h-5 w-5" />}
              {t("profile.connectivity")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>{t("profile.offline.mode")}</span>
              <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
            </div>

            <div className="text-sm text-muted-foreground">
              {offlineMode
                ? "Les données sont stockées localement et seront synchronisées lors de la reconnexion"
                : "Synchronisation en temps réel activée"}
            </div>

            {offlineMode && (
              <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Mode hors ligne activé. Certaines fonctionnalités peuvent être limitées.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistiques */}
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.statistics")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">24</div>
                <div className="text-xs text-muted-foreground">Interventions ce mois</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-xs text-muted-foreground">Alertes résolues</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full bg-transparent text-center flex items-center justify-center">
            <span className="w-full text-center">{t("profile.sync.data")}</span>
          </Button>
          <Button variant="outline" className="w-full bg-transparent text-center flex items-center justify-center">
            <span className="w-full text-center">{t("profile.export.journal")}</span>
          </Button>
          <Button variant="destructive" className="w-full text-center flex items-center justify-center">
            <span className="w-full text-center">{t("profile.logout")}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
