"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface MiniChartProps {
  data: Array<{
    time: string
    ph: number
    oxygen: number
    temp: number
    health: number
  }>
}

export function MiniChart({ data }: MiniChartProps) {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis hide />
          <Line type="monotone" dataKey="ph" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="oxygen" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="health" stroke="#8b5cf6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="legend-container">
        <div className="legend-item">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>pH</span>
        </div>
        <div className="legend-item">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>O₂</span>
        </div>
        <div className="legend-item">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Temp</span>
        </div>
        <div className="legend-item">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Santé</span>
        </div>
      </div>
    </div>
  )
}
