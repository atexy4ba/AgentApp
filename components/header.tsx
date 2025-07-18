"use client"

import { useState, useEffect } from "react"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getActiveAlerts } from "@/lib/data"

interface HeaderProps {
  title: string
  showNotifications?: boolean
}

export function Header({ title, showNotifications = true }: HeaderProps) {
  const [activeAlertsCount, setActiveAlertsCount] = useState(0)

  useEffect(() => {
    const loadActiveAlerts = async () => {
      try {
        const alerts = await getActiveAlerts()
        setActiveAlertsCount(alerts.length)
      } catch (error) {
        console.error("Error loading active alerts:", error)
      }
    }

    loadActiveAlerts()

    // Refresh alerts count every 30 seconds
    const interval = setInterval(loadActiveAlerts, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="sticky top-0 z-10 bg-background border-b p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {showNotifications && (
          <div className="flex items-center gap-2 rtl:flex-row-reverse">
            <Link href="/alertes">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {activeAlertsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {activeAlertsCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/profil">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
