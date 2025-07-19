"use client"
import React, { useState } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAlertesInterventions } from "../contexts/alertes-interventions-context";
import { getBassinNameById } from "@/lib/data";

// ✅ CORRECTION : Ajout d'une signature de type pour autoriser l'indexation par une chaîne de caractères
const PRIORITY_ORDER: { [key: string]: number } = { critical: 1, warning: 2 };

export default function FormulaireInterventionAlerte({ open = true, onOpenChange }: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const { alertes, creerInterventionDepuisAlerte } = useAlertesInterventions();
  const [alerteId, setAlerteId] = useState("");
  const [remarque, setRemarque] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Tri des alertes par priorité
  const alertesTriees = [...alertes].sort((a, b) => {
    const pa = PRIORITY_ORDER[a.severity] || 99;
    const pb = PRIORITY_ORDER[b.severity] || 99;
    return pa - pb;
  });

  const alerte = alertesTriees.find(a => a.id === alerteId);
  const bassinNom = alerte ? getBassinNameById(alerte.bassinId) : "";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alerteId) return;
    setSubmitting(true);
    creerInterventionDepuisAlerte(alerteId, remarque);
    setAlerteId("");
    setRemarque("");
    setSubmitting(false);
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Nouvelle intervention sur alerte</DialogTitle>
          {bassinNom && (
            <Badge variant="outline" className="w-fit">{bassinNom}</Badge>
          )}
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <Label htmlFor="alerte">Alerte à traiter</Label>
            <Select value={alerteId} onValueChange={setAlerteId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une alerte" />
              </SelectTrigger>
              <SelectContent>
                {alertesTriees.map(alerte => (
                  <SelectItem key={alerte.id} value={alerte.id}>
                    <span className="flex items-center gap-2">
                      <span className={alerte.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'}>
                        {alerte.severity === 'critical' ? '⚠️ Critique' : '⚠️ Avertissement'}
                      </span>
                      <span>{alerte.type} — {alerte.description}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="remarque">Remarque</Label>
            <Textarea
              id="remarque"
              placeholder="Ajouter une remarque (optionnel)"
              value={remarque}
              onChange={e => setRemarque(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button variant="outline" type="button" onClick={() => onOpenChange && onOpenChange(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" disabled={!alerteId || submitting} className="flex-1 gap-2">
              <Save className="h-4 w-4" />
              Effectuer l'intervention
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}