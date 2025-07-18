"use client"

import { useState } from "react"
import { Camera, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { getBassinNameById } from "@/lib/data" // Import the helper

interface InterventionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bassinId?: string
  bassinNom?: string // This prop is now optional as it can be derived
}

export function InterventionDialog({ open, onOpenChange, bassinId, bassinNom }: InterventionDialogProps) {
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [status, setStatus] = useState("completed")
  const [photos, setPhotos] = useState<string[]>([])

  const displayBassinName = bassinNom || (bassinId ? getBassinNameById(bassinId) : "")

  const handleSave = () => {
    // Logique pour sauvegarder l'intervention
    console.log("Intervention sauvegardée:", {
      bassinId,
      description,
      type,
      status,
      photos,
      timestamp: new Date().toISOString(),
    })

    // Reset form
    setDescription("")
    setType("")
    setStatus("completed")
    setPhotos([])
    onOpenChange(false)
  }

  const handlePhotoCapture = () => {
    // Simulation de prise de photo
    const newPhoto = `/placeholder.svg?height=100&width=100&text=Photo${photos.length + 1}`
    setPhotos([...photos, newPhoto])
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Nouvelle intervention</DialogTitle>
          {displayBassinName && (
            <Badge variant="outline" className="w-fit">
              {displayBassinName}
            </Badge>
          )}
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="type">Type d'intervention</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="reparation">Réparation</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="ajustement">Ajustement paramètres</SelectItem>
                <SelectItem value="nettoyage">Nettoyage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Décrivez l'intervention effectuée..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="status">Statut</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Terminée</SelectItem>
                <SelectItem value="in-progress">En cours</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Photos</Label>
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={handlePhotoCapture}
                className="w-full gap-2 bg-transparent"
              >
                <Camera className="h-4 w-4" />
                Prendre une photo
              </Button>

              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={!description || !type} className="flex-1 gap-2">
              <Save className="h-4 w-4" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
