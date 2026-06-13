"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface FleetDetailsFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export default function FleetDetailsForm({
  onBack,
  onSubmit,
}: FleetDetailsFormProps) {
  const [vehicleType, setVehicleType] = useState("truck");
  const [licensePlate, setLicensePlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ vehicleType, licensePlate, capacity, fileName });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <main className="w-full max-w-3xl">
      {/* Main Card using clean shadcn Card */}
      <Card className="bg-surface-container-lowest rounded-xl border-outline-variant shadow-sm overflow-hidden flex flex-col">
        {/* Header Section */}
        <div className="p-6 border-b border-surface-variant bg-surface">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
              SaveHarvest
            </h1>
            <span className="font-mono text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">
              Step 2 of 3
            </span>
          </div>
          <h2 className="font-headline-md text-xl font-semibold text-on-surface mb-2">
            Fleet Details
          </h2>
          <p className="font-body-lg text-sm text-on-surface-variant">
            Configure your transport capacity to prevent cold-chain spoilage and food waste during transit.
          </p>
          {/* Progress Bar */}
          <div className="w-full bg-surface-container-high h-2 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 ease-in-out"
              style={{ width: "66%" }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
            <span>Company Profile</span>
            <span className="text-primary font-bold">Fleet Details</span>
            <span>Service Zones</span>
          </div>
        </div>

        {/* Form Body */}
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Type RadioGroup */}
            <div>
              <Label className="block font-body-sm text-sm font-semibold text-on-surface mb-3">
                Vehicle Classification
              </Label>
              <RadioGroup
                value={vehicleType}
                onValueChange={setVehicleType}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {/* Option 1: Truck */}
                <label className="relative cursor-pointer flex flex-col">
                  <div
                    className={`p-4 border rounded-lg hover:bg-surface-container transition-colors relative flex flex-col items-center justify-between ${
                      vehicleType === "truck"
                        ? "border-primary bg-surface"
                        : "border-outline-variant bg-surface-container-lowest"
                    }`}
                  >
                    <div className="absolute top-2 right-2">
                      <RadioGroupItem value="truck" className="sr-only" />
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant peer-checked:text-primary">
                        local_shipping
                      </span>
                      <span className="font-body-sm text-sm text-on-surface font-semibold">
                        Heavy Truck
                      </span>
                      <span className="font-mono text-xs text-on-surface-variant">
                        &gt; 5 Tons
                      </span>
                    </div>
                  </div>
                </label>

                {/* Option 2: Van */}
                <label className="relative cursor-pointer flex flex-col">
                  <div
                    className={`p-4 border rounded-lg hover:bg-surface-container transition-colors relative flex flex-col items-center justify-between ${
                      vehicleType === "van"
                        ? "border-primary bg-surface"
                        : "border-outline-variant bg-surface-container-lowest"
                    }`}
                  >
                    <div className="absolute top-2 right-2">
                      <RadioGroupItem value="van" className="sr-only" />
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant peer-checked:text-primary">
                        airport_shuttle
                      </span>
                      <span className="font-body-sm text-sm text-on-surface font-semibold">
                        Cold Van
                      </span>
                      <span className="font-mono text-xs text-on-surface-variant">
                        1 - 5 Tons
                      </span>
                    </div>
                  </div>
                </label>

                {/* Option 3: Motorbike */}
                <label className="relative cursor-pointer flex flex-col">
                  <div
                    className={`p-4 border rounded-lg hover:bg-surface-container transition-colors relative flex flex-col items-center justify-between ${
                      vehicleType === "motorbike"
                        ? "border-primary bg-surface"
                        : "border-outline-variant bg-surface-container-lowest"
                    }`}
                  >
                    <div className="absolute top-2 right-2">
                      <RadioGroupItem value="motorbike" className="sr-only" />
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant peer-checked:text-primary">
                        two_wheeler
                      </span>
                      <span className="font-body-sm text-sm text-on-surface font-semibold">
                        Motorbike
                      </span>
                      <span className="font-mono text-xs text-on-surface-variant">
                        &lt; 1 Ton
                      </span>
                    </div>
                  </div>
                </label>
              </RadioGroup>
            </div>

            {/* Details Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* License Plate */}
              <div>
                <Label
                  className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2"
                  htmlFor="license_plate"
                >
                  Registration / License Plate
                </Label>
                <Input
                  id="license_plate"
                  type="text"
                  required
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  className="w-full h-11 border border-outline-variant bg-surface-container-lowest px-4 rounded-lg font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none uppercase"
                  placeholder="e.g., ABC-1234"
                />
              </div>

              {/* Capacity */}
              <div>
                <Label
                  className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2"
                  htmlFor="capacity"
                >
                  Max Cold Storage Capacity
                </Label>
                <div className="relative">
                  <Input
                    id="capacity"
                    type="number"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full h-11 border border-outline-variant bg-surface-container-lowest pl-4 pr-16 rounded-lg font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="font-mono text-xs text-on-surface-variant font-bold">
                      KG
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Upload Section */}
            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 mt-6">
              <div className="flex items-start gap-4 mb-4">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <div>
                  <h3 className="font-body-sm text-sm font-semibold text-on-surface">
                    Vehicle Verification
                  </h3>
                  <p className="font-body-xs text-xs text-on-surface-variant">
                    Upload registration and commercial insurance documents.
                  </p>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <label className="border-2 border-dashed border-outline-variant rounded bg-surface hover:bg-surface-container transition-colors flex flex-col items-center justify-center py-6 cursor-pointer group">
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary mb-2 transition-colors">
                  cloud_upload
                </span>
                <span className="font-body-sm text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {fileName ? fileName : "Click to upload or drag and drop"}
                </span>
                <span className="font-mono text-xs text-on-surface-variant mt-1">
                  PDF, JPG or PNG (max. 10MB)
                </span>
              </label>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-surface-variant bg-surface flex justify-between items-center">
              <Button
                variant="outline"
                onClick={onBack}
                className="h-11 px-5 rounded-lg border border-outline text-on-surface font-medium hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                Back
              </Button>
              <Button
                className="h-11 px-6 font-semibold bg-primary text-on-primary hover:bg-surface-tint shadow-sm transition-all flex items-center justify-center gap-2 rounded-lg"
                type="submit"
              >
                Finish Setup
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
