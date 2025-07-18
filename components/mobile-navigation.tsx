'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, AlertTriangle, FileText, User, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export default function MobileNavigation() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: t("nav.bassins"), href: "/", icon: Home },
    { name: t("nav.alertes"), href: "/alertes", icon: AlertTriangle },
    { name: t("nav.journal"), href: "/journal", icon: FileText },
    { name: t("nav.profil"), href: "/profil", icon: User },
  ]

  return (
    <div>
      {/* Navigation Mobile */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 block md:hidden">
        <div className="flex h-14 bg-background/80 backdrop-blur-lg rounded-full shadow-xl shadow-black/10 border border-border/40">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "flex items-center justify-center w-14 relative transition-colors duration-200",
              "text-muted-foreground hover:text-foreground"
            )}
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex-1 flex items-center justify-center relative transition-colors duration-200",
                  isActive 
                    ? "text-primary after:absolute after:bottom-3 after:h-1 after:w-1 after:rounded-full after:bg-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>

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
    </div>
  )
}
