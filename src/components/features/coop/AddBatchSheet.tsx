"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddBatchSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (batch: {
    crop: string;
    weight: number;
    origin: string;
    harvestTime: string;
    grade: string;
  }) => void;
}

export function AddBatchSheet({
  isOpen,
  onOpenChange,
  onSubmit,
}: AddBatchSheetProps) {
  const [formCrop, setFormCrop] = useState("Roma Tomatoes");
  const [formWeight, setFormWeight] = useState("");
  const [formHarvestTime, setFormHarvestTime] = useState("");
  const [formOrigin, setFormOrigin] = useState("Central Valley Farms");
  const [formGrade, setFormGrade] = useState("A");

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formWeight) return;

    onSubmit({
      crop: formCrop,
      weight: parseFloat(formWeight),
      origin: formOrigin,
      harvestTime: formHarvestTime,
      grade: formGrade,
    });

    // Reset Form
    setFormWeight("");
    setFormHarvestTime("");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full md:max-w-[420px] p-0 flex flex-col h-full bg-surface-container-lowest border-l border-outline-variant shadow-lg">
        {/* Sheet Header */}
        <SheetHeader className="px-6 py-5 border-b border-outline-variant flex flex-col bg-surface-bright gap-0.5">
          <SheetTitle className="font-headline-md text-xl font-bold text-on-background">Log New Batch</SheetTitle>
          <SheetDescription className="font-body-xs text-xs text-on-surface-variant mt-0.5">
            Enter harvest details to initiate cold-chain perishability clock.
          </SheetDescription>
        </SheetHeader>

        {/* Sheet Form Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-background">
          <form onSubmit={handleSubmitForm} className="flex flex-col gap-5">
            {/* Crop Type Select */}
            <div className="flex flex-col gap-1.5">
              <Label className="font-body-xs text-xs font-semibold uppercase tracking-wider text-on-surface">
                Crop Variety *
              </Label>
              <Select value={formCrop} onValueChange={(val) => setFormCrop(val ?? "")}>
                <SelectTrigger className="w-full h-11 border border-outline-variant rounded-lg bg-surface-container-lowest px-3 py-2 font-body-sm text-sm text-on-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <SelectValue placeholder="Select crop variety" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground border border-outline-variant rounded-lg shadow-md max-h-60 overflow-y-auto z-[100]">
                  <SelectItem value="Roma Tomatoes">Roma Tomatoes</SelectItem>
                  <SelectItem value="Cassava Root">Cassava Root</SelectItem>
                  <SelectItem value="Hass Avocados">Hass Avocados</SelectItem>
                  <SelectItem value="Mangoes (Kent)">Mangoes (Kent)</SelectItem>
                  <SelectItem value="Red Onions">Red Onions</SelectItem>
                  <SelectItem value="Fuji Apples">Fuji Apples</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Weight Input */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="weight_input"
                className="font-body-xs text-xs font-semibold uppercase tracking-wider text-on-surface"
              >
                Total Weight (KG) *
              </Label>
              <div className="relative">
                <Input
                  id="weight_input"
                  required
                  type="number"
                  step="0.1"
                  placeholder="0.00"
                  value={formWeight}
                  onChange={(e) => setFormWeight(e.target.value)}
                  className="w-full h-11 border border-outline-variant bg-surface-container-lowest pl-4 pr-16 rounded-lg font-mono text-sm text-on-background focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-on-surface-variant font-bold">
                  KG
                </span>
              </div>
            </div>

            {/* Harvest Time Input */}
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="harvest_time"
                className="font-body-xs text-xs font-semibold uppercase tracking-wider text-on-surface"
              >
                Harvest Date & Time *
              </Label>
              <Input
                id="harvest_time"
                required
                type="datetime-local"
                value={formHarvestTime}
                onChange={(e) => setFormHarvestTime(e.target.value)}
                className="w-full h-11 border border-outline-variant bg-surface-container-lowest px-4 rounded-lg font-body-sm text-sm text-on-background focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary outline-none"
              />
              <p className="font-body-xs text-xs text-on-surface-variant">
                Used to calculate base perishability decay curves.
              </p>
            </div>

            {/* Origin Co-op Select */}
            <div className="flex flex-col gap-1.5">
              <Label className="font-body-xs text-xs font-semibold uppercase tracking-wider text-on-surface">
                Origin Co-op
              </Label>
              <Select value={formOrigin} onValueChange={(val) => setFormOrigin(val ?? "")}>
                <SelectTrigger className="w-full h-11 border border-outline-variant rounded-lg bg-surface-container-lowest px-3 py-2 font-body-sm text-sm text-on-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <SelectValue placeholder="Select origin co-op" />
                </SelectTrigger>
                <SelectContent className="bg-popover text-popover-foreground border border-outline-variant rounded-lg shadow-md max-h-60 overflow-y-auto z-[100]">
                  <SelectItem value="Central Valley Farms">Central Valley Farms</SelectItem>
                  <SelectItem value="Nyeri Valley Farms">Nyeri Valley Farms</SelectItem>
                  <SelectItem value="Mombasa Agro Co-op">Mombasa Agro Co-op</SelectItem>
                  <SelectItem value="Rift Valley Orchards">Rift Valley Orchards</SelectItem>
                  <SelectItem value="Coastal Fruit Growers">Coastal Fruit Growers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Initial Quality Grading */}
            <div className="flex flex-col gap-3 mt-2 border-t border-outline-variant pt-4">
              <Label className="font-body-sm text-sm font-semibold text-on-background">
                Initial Quality Grading
              </Label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container bg-surface transition-all">
                  <input
                    type="radio"
                    name="grade"
                    value="A"
                    checked={formGrade === "A"}
                    onChange={() => setFormGrade("A")}
                    className="text-primary focus:ring-primary w-4 h-4 border-outline cursor-pointer"
                  />
                  <div>
                    <div className="font-body-sm text-sm font-semibold text-on-background">
                      Grade A (Premium)
                    </div>
                    <div className="font-body-xs text-xs text-on-surface-variant mt-0.5">
                      Standard shelf life calculation applied.
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container bg-surface transition-all">
                  <input
                    type="radio"
                    name="radio-grade"
                    value="B"
                    checked={formGrade === "B"}
                    onChange={() => setFormGrade("B")}
                    className="text-primary focus:ring-primary w-4 h-4 border-outline cursor-pointer"
                  />
                  <div>
                    <div className="font-body-sm text-sm font-semibold text-on-background">
                      Grade B (Standard)
                    </div>
                    <div className="font-body-xs text-xs text-on-surface-variant mt-0.5">
                      -10% shelf life penalty applied.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Sheet Actions */}
            <div className="mt-6 pt-4 border-t border-outline-variant flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-11 px-5 border-outline-variant text-on-surface-variant hover:bg-surface-container font-semibold rounded-lg text-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-on-primary hover:bg-surface-tint font-semibold h-11 px-5 rounded-lg text-sm shadow-sm flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                Log Batch
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
