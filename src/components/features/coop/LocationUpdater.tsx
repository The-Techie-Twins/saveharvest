"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LocationUpdaterProps {
  latitude: string;
  setLatitude: (val: string) => void;
  longitude: string;
  setLongitude: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LocationUpdater({
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  onSubmit,
}: LocationUpdaterProps) {
  return (
    <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:border-primary hover:shadow-md transition-all">
      <div className="p-6 border-b border-outline-variant bg-surface-bright">
        <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            location_on
          </span>
          Co-op Aggregation Point
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Satellite Map Area */}
        <div className="md:col-span-2 relative h-56 md:h-auto bg-surface-variant">
          <img
            alt="Minimalist Satellite Map View"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJGZRlxWTBWumcqBgqH_zNFdKyFtLbh-O0jm1K36fNazA2N4jj9X4BBN2XcODgNymGOSbfs8vF80J7D47WNYq-5IM3xneZ9ebORuxxydShr-4bIVZqnQey6KkV1yGFx8UpxhjdIFTRv64656bV6uFedRsiMJMJ_qI3dgy4RAD8Q5viPMUJ7uwctBfC2cNZSet_6YofAavGGdfuRwb9LuolpOmbfa849m3HMra1BSGIy99k9W9VX_9cVQUpchIzTUd3446P3xQKL5NT"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-lowest/10 md:to-surface-container-lowest/70 pointer-events-none"></div>
        </div>

        {/* Location inputs */}
        <form
          onSubmit={onSubmit}
          className="p-6 bg-surface-container-lowest md:border-l border-outline-variant flex flex-col justify-between gap-4"
        >
          <p className="font-body-xs text-xs text-on-surface-variant leading-relaxed">
            Update active GPS coordinates to optimize commercial carrier routing and
            distance computations.
          </p>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label
                htmlFor="latitude_input"
                className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider"
              >
                Latitude
              </Label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">
                  my_location
                </span>
                <Input
                  id="latitude_input"
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 bg-surface-bright border border-outline-variant rounded-lg font-mono text-xs text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="longitude_input"
                className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider"
              >
                Longitude
              </Label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">
                  my_location
                </span>
                <Input
                  id="longitude_input"
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 bg-surface-bright border border-outline-variant rounded-lg font-mono text-xs text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-10 bg-primary text-on-primary hover:bg-surface-tint font-semibold rounded-lg text-xs flex justify-center items-center gap-2 mt-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">update</span>
            Update Location
          </Button>
        </form>
      </div>
    </Card>
  );
}
