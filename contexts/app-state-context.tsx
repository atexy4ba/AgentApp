"use client"

import { createContext, useContext, useReducer, ReactNode } from 'react'
import alertsData from '@/data/alerts.json'
import interventionsData from '@/data/interventions.json'
import { AlertData, InterventionData } from '@/lib/data'

type AppState = {
  alerts: AlertData[]
  interventions: InterventionData[]
}

type AppAction =
  | { type: 'UPDATE_ALERT'; payload: AlertData }
  | { type: 'REMOVE_ALERT'; payload: string }
  | { type: 'ADD_INTERVENTION'; payload: InterventionData }
  | { type: 'UPDATE_INTERVENTION'; payload: InterventionData }
  | { type: 'REMOVE_INTERVENTION'; payload: string }

type AppDispatch = (action: AppAction) => void

const initialState: AppState = {
  alerts: alertsData,
  interventions: interventionsData,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'UPDATE_ALERT':
      return {
        ...state,
        alerts: state.alerts.map((alert) =>
          alert.id === action.payload.id ? action.payload : alert
        ),
      }
    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      }
    case 'ADD_INTERVENTION':
      return {
        ...state,
        interventions: [...state.interventions, action.payload],
      }
    case 'UPDATE_INTERVENTION':
      return {
        ...state,
        interventions: state.interventions.map((intervention) =>
          intervention.id === action.payload.id ? action.payload : intervention
        ),
      }
    case 'REMOVE_INTERVENTION':
      return {
        ...state,
        interventions: state.interventions.filter(
          (intervention) => intervention.id !== action.payload
        ),
      }
    default:
      return state
  }
}

const AppStateContext = createContext<AppState | undefined>(undefined)
const AppDispatchContext = createContext<AppDispatch | undefined>(undefined)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider')
  }
  return context
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext)
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppStateProvider')
  }
  return context
}
