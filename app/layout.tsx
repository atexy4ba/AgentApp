import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import MobileNavigation from "@/components/mobile-navigation"
import { AlertesInterventionsProvider } from "@/contexts/alertes-interventions-context";

const font = GeistSans

export const metadata: Metadata = {
  title: "AquaFarm Agent",
  description: "Application mobile pour agents de terrain en aquaculture",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <AlertesInterventionsProvider>
              <div className="min-h-screen bg-background">
                <main className="pb-16 md:pb-0 md:pt-20">{children}</main>
                <MobileNavigation />
              </div>
            </AlertesInterventionsProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
