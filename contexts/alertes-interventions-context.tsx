"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import alertesData from '../data/alerts.json';
import interventionsData from '../data/interventions.json';

export type Alerte = {
  id: string;
  type: string;
  bassinId: string;
  timestamp: string;
  status: string;
  severity: 'critical' | 'warning' | string;
  description: string;
  recommendation: string;
  metric: string;
  value: number;
  threshold: number;
};

export type Intervention = {
  id: string;
  bassinId: string;
  type: string;
  description: string;
  timestamp: string;
  status: string;
  photos: string[];
  agent: string;
  duration: number | null;
  alertIds: string[];
  notes: string;
};

interface AlertesInterventionsContextType {
  alertes: Alerte[];
  interventions: Intervention[];
  creerInterventionDepuisAlerte: (alerteId: string, remarque: string) => void;
  ajouterAlerte: (alerte: Alerte) => void;
  supprimerAlerte: (id: string) => void;
  majAlerte: (alerte: Alerte) => void;
  ajouterIntervention: (intervention: Intervention) => void;
  supprimerIntervention: (id: string) => void;
  majIntervention: (intervention: Intervention) => void;
}

const AlertesInterventionsContext = createContext<AlertesInterventionsContextType | undefined>(undefined);

export const useAlertesInterventions = () => {
  const context = useContext(AlertesInterventionsContext);
  if (!context) {
    throw new Error('useAlertesInterventions doit être utilisé dans un AlertesInterventionsProvider');
  }
  return context;
};

export const AlertesInterventionsProvider = ({ children }: { children: ReactNode }) => {
  const [alertes, setAlertes] = useState<Alerte[]>(alertesData as Alerte[]);
  const [interventions, setInterventions] = useState<Intervention[]>(interventionsData as Intervention[]);

  const creerInterventionDepuisAlerte = (alerteId: string, remarque: string) => {
    const alerte = alertes.find(a => a.id === alerteId);
    if (!alerte) return;
    const nouvelleIntervention: Intervention = {
      id: Math.random().toString(36).slice(2),
      bassinId: alerte.bassinId,
      type: `Intervention sur alerte: ${alerte.type}`,
      description: alerte.description,
      timestamp: new Date().toISOString(),
      status: 'completed',
      photos: [],
      agent: 'Démo',
      duration: null,
      alertIds: [alerte.id],
      notes: remarque,
    };
    setInterventions((prev) => [...prev, nouvelleIntervention]);
    setAlertes((prev) => prev.filter((a) => a.id !== alerte.id));
  };

  const ajouterAlerte = (alerte: Alerte) => setAlertes((prev) => [...prev, alerte]);
  const supprimerAlerte = (id: string) => setAlertes((prev) => prev.filter((a) => a.id !== id));
  const majAlerte = (alerte: Alerte) => setAlertes((prev) => prev.map((a) => (a.id === alerte.id ? alerte : a)));

  const ajouterIntervention = (intervention: Intervention) => setInterventions((prev) => [...prev, intervention]);
  const supprimerIntervention = (id: string) => setInterventions((prev) => prev.filter((i) => i.id !== id));
  const majIntervention = (intervention: Intervention) => setInterventions((prev) => prev.map((i) => (i.id === intervention.id ? intervention : i)));

  return (
    <AlertesInterventionsContext.Provider
      value={{
        alertes,
        interventions,
        creerInterventionDepuisAlerte,
        ajouterAlerte,
        supprimerAlerte,
        majAlerte,
        ajouterIntervention,
        supprimerIntervention,
        majIntervention,
      }}
    >
      {children}
    </AlertesInterventionsContext.Provider>
  );
}; 