"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  statusFilter: string[]
  onStatusFilterChange: (filter: string[]) => void
}

export function FilterDialog({ open, onOpenChange, statusFilter, onStatusFilterChange }: FilterDialogProps) {
  const statusOptions = [
    { value: "ok", label: "Normal", color: "text-green-600" },
    { value: "attention", label: "Attention", color: "text-yellow-600" },
    { value: "critique", label: "Critique", color: "text-red-600" },
  ]

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      onStatusFilterChange([...statusFilter, status])
    } else {
      onStatusFilterChange(statusFilter.filter((s) => s !== status))
    }
  }

  const clearFilters = () => {
    onStatusFilterChange([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Filtres</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Statut des bassins</Label>
            <div className="space-y-3 mt-2">
              {statusOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={statusFilter.includes(option.value)}
                    onCheckedChange={(checked) => handleStatusChange(option.value, checked as boolean)}
                  />
                  <Label htmlFor={option.value} className={`cursor-pointer ${option.color}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={clearFilters} className="flex-1 bg-transparent">
              Effacer
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              Appliquer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
