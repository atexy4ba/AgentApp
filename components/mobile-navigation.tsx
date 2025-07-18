"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, AlertTriangle, FileText, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export function MobileNavigation() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navigation = [
    { name: t("nav.bassins"), href: "/", icon: Home },
    { name: t("nav.alertes"), href: "/alertes", icon: AlertTriangle },
    { name: t("nav.journal"), href: "/journal", icon: FileText },
    { name: t("nav.profil"), href: "/profil", icon: User },
  ]

  return (
    <>
      {/* Navigation Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t block md:hidden">
        <nav className="flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center py-2 px-1 text-xs",
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Navigation Desktop */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <nav className="flex items-center justify-center gap-8 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
