"use client"

import { Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AIAdviceCardProps {
  advice: string
}

export function AIAdviceCard({ advice }: AIAdviceCardProps) {
  return (
    <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50 shadow-lg shadow-blue-100 dark:shadow-blue-900/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <Lightbulb className="h-5 w-5 animate-pulse" />
          Conseils IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">{advice}</p>
      </CardContent>
    </Card>
  )
}
