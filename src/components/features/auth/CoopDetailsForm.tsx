"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CoopDetailsFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export default function CoopDetailsForm({
  onBack,
  onSubmit,
}: CoopDetailsFormProps) {
  const [coopName, setCoopName] = useState("");
  const [lat, setLat] = useState("36.7378");
  const [lng, setLng] = useState("119.7871");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ coopName, lat, lng });
  };

  return (
    <Card className="w-full max-w-[768px] bg-surface-container-lowest border-outline-variant shadow-sm flex flex-col overflow-hidden">
      {/* Progress Bar Header */}
      <div className="px-8 pt-8 pb-6 bg-surface">
        <div className="flex items-center justify-between relative">
          {/* Line behind steps */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-surface-variant z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-0.5 bg-primary z-0 transition-all duration-500"></div>

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="font-body-xs text-xs text-on-surface-variant font-medium">
              Account
            </span>
          </div>

          {/* Step 2 (Active) */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest border-2 border-primary text-primary flex items-center justify-center shadow-sm">
              <span className="font-mono text-xs font-semibold">2</span>
            </div>
            <span className="font-body-xs text-xs text-primary font-bold">
              Co-op Details
            </span>
          </div>

          {/* Step 3 (Pending) */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest border border-outline-variant text-outline flex items-center justify-center bg-surface-bright">
              <span className="font-mono text-xs">3</span>
            </div>
            <span className="font-body-xs text-xs text-outline font-medium">
              Verification
            </span>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-outline-variant opacity-50"></div>

      {/* Form Content */}
      <CardContent className="p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-headline-md text-2xl font-semibold text-on-surface">
            Co-op Details
          </h2>
          <p className="font-body-sm text-sm text-on-surface-variant">
            Pin your aggregation point to enable logistics routing and minimize shelf-life deterioration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Co-op Name Input */}
          <div className="flex flex-col gap-2">
            <Label
              className="font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block"
              htmlFor="coop-name"
            >
              Co-op Name
            </Label>
            <Input
              id="coop-name"
              type="text"
              required
              value={coopName}
              onChange={(e) => setCoopName(e.target.value)}
              className="w-full h-11 border border-outline-variant bg-surface-container-lowest px-4 rounded-lg font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none"
              placeholder="e.g., Central Valley Produce"
            />
          </div>

          {/* Location Picker Map */}
          <div className="flex flex-col gap-2">
            <Label className="font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2">
              Aggregation Point
            </Label>
            {/* Map Interactive Area */}
            <div className="relative w-full h-[280px] bg-surface-container rounded-lg border border-outline-variant overflow-hidden group cursor-crosshair">
              {/* Map Visuals */}
              <img
                alt="Map showing agricultural region"
                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity grayscale-[20%] transition-transform duration-700 group-hover:scale-[1.02]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU7y0pKnU1Iwtn1DPpuX3lMa8xpQOE1GzpLxMiB4otwKPws7AjravYotRuFo3AVgeloQeQqr3ipwj2oetRJF_Qy0kEHy5dttimxpPpMcpLEZKpZvxpDJax_NA1p-bE4G4awWPh2zGj-jDJzF6xPouyxEGFfyUCyxM5RNvzV6NK-KERwDqyGTCM-ciDtgR_T_eVYOrM6G-mTd7bNkMSGtoeIOK5_Ml-t5ksseB8zvLgHnW9fJNi8AfRmFzJmllrY8UTVUYSsmoda9NX"
              />
              {/* Tonal Overlay for branding */}
              <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-multiply"></div>
              {/* The Pin */}
              <div className="absolute top-[45%] left-[55%] transform -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center drop-shadow-md transition-transform duration-300 hover:-translate-y-[110%]">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-on-primary shadow-lg border-2 border-surface-container-lowest">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                </div>
                {/* Pin stem */}
                <div className="w-1 h-3 bg-primary"></div>
                {/* Pin shadow */}
                <div className="w-3 h-1 bg-black/30 rounded-full blur-[2px] mt-0.5"></div>
              </div>
              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-20">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-8 h-8 bg-surface-container-lowest rounded border border-outline-variant flex items-center justify-center text-on-surface shadow-sm p-0"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    add
                  </span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-8 h-8 bg-surface-container-lowest rounded border border-outline-variant flex items-center justify-center text-on-surface shadow-sm p-0"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    remove
                  </span>
                </Button>
              </div>
              {/* Crosshair guides */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20 pointer-events-none mix-blend-multiply hidden group-hover:block"></div>
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-primary/20 pointer-events-none mix-blend-multiply hidden group-hover:block"></div>
            </div>
            {/* GPS Readout */}
            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <div className="flex-1 bg-surface-bright px-3 py-2 rounded border border-outline-variant flex justify-between items-center group/lat hover:border-primary/50 transition-colors">
                <span className="font-body-xs text-xs text-on-surface-variant font-medium">
                  LAT
                </span>
                <Input
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="bg-transparent border-none text-right font-mono text-sm text-on-surface focus-visible:ring-0 p-0 w-24 h-6 outline-none"
                />
              </div>
              <div className="flex-1 bg-surface-bright px-3 py-2 rounded border border-outline-variant flex justify-between items-center group/lng hover:border-primary/50 transition-colors">
                <span className="font-body-xs text-xs text-on-surface-variant font-medium">
                  LNG
                </span>
                <Input
                  type="text"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="bg-transparent border-none text-right font-mono text-sm text-on-surface focus-visible:ring-0 p-0 w-24 h-6 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
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
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
