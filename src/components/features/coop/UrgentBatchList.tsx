"use client";

import React from "react";
import { Card } from "@/components/ui/card";

interface UrgentBatchListProps {
  selectedTruck: string | null;
  setSelectedTruck: (truckId: string | null) => void;
  strawSeconds: number;
  greensSeconds: number;
  formatClock: (seconds: number) => string;
}

export function UrgentBatchList({
  selectedTruck,
  setSelectedTruck,
  strawSeconds,
  greensSeconds,
  formatClock,
}: UrgentBatchListProps) {
  return (
    <div className="w-[320px] lg:w-[380px] flex-shrink-0 bg-surface-bright border-r border-outline-variant flex flex-col z-10 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-20">
        <h2 className="font-headline-md text-xl font-bold text-on-surface mb-1">
          Urgent Batches
        </h2>
        <p className="font-body-xs text-xs text-on-surface-variant font-medium">
          High priority cold-chain transport needed.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Batch Card 1 - Strawberries */}
        <Card
          onClick={() => setSelectedTruck("TRK-492")}
          className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-md hover:border-primary transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-body-lg text-sm font-bold text-on-surface">
                Organic Strawberries
              </h3>
              <p className="font-mono text-[10px] text-on-surface-variant mt-1 font-bold">
                BATCH-84A9
              </p>
            </div>
            <div className="flex items-center gap-1 bg-error-container text-on-error-container px-2 py-0.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-status-critical"></div>
              <span className="font-mono text-[11px] font-bold">
                {formatClock(strawSeconds)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-surface-container-low p-2 rounded-lg text-center">
              <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">
                Volume
              </span>
              <span className="font-mono text-xs font-bold text-on-surface">
                450 kg
              </span>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg text-center">
              <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">
                Temp Req
              </span>
              <span className="font-mono text-xs font-bold text-primary">
                2°C - 4°C
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-on-surface-variant">
            <div className="flex items-center gap-1 font-body-xs text-xs font-medium">
              <span className="material-symbols-outlined text-[16px] text-primary">
                location_on
              </span>
              <span>Sector 4 Hub</span>
            </div>
            <span className="text-primary font-body-sm text-xs font-bold transition-all flex items-center gap-0.5 group-hover:translate-x-0.5">
              Match Fleet{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </span>
          </div>
        </Card>

        {/* Batch Card 2 - Leafy Greens */}
        <Card
          onClick={() => setSelectedTruck("TRK-105")}
          className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-md hover:border-primary transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-body-lg text-sm font-bold text-on-surface">
                Leafy Greens Mix
              </h3>
              <p className="font-mono text-[10px] text-on-surface-variant mt-1 font-bold">
                BATCH-92B1
              </p>
            </div>
            <div className="flex items-center gap-1 bg-[#fef3c7] text-[#92400e] px-2 py-0.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-status-warning"></div>
              <span className="font-mono text-[11px] font-bold">
                {formatClock(greensSeconds)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-surface-container-low p-2 rounded-lg text-center">
              <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">
                Volume
              </span>
              <span className="font-mono text-xs font-bold text-on-surface">
                280 kg
              </span>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg text-center">
              <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">
                Temp Req
              </span>
              <span className="font-mono text-xs font-bold text-primary">
                4°C - 8°C
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-on-surface-variant">
            <div className="flex items-center gap-1 font-body-xs text-xs font-medium">
              <span className="material-symbols-outlined text-[16px] text-primary">
                location_on
              </span>
              <span>North Valley Farm</span>
            </div>
            <span className="text-primary font-body-sm text-xs font-bold transition-all flex items-center gap-0.5 group-hover:translate-x-0.5">
              Match Fleet{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </span>
          </div>
        </Card>

        {/* Batch Card 3 - Tomatoes */}
        <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-md hover:border-primary transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-body-lg text-sm font-bold text-on-surface">
                Heirloom Tomatoes
              </h3>
              <p className="font-mono text-[10px] text-on-surface-variant mt-1 font-bold">
                BATCH-11C4
              </p>
            </div>
            <div className="flex items-center gap-1 bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-status-safe"></div>
              <span className="font-mono text-[11px] font-bold">12:00:00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-surface-container-low p-2 rounded-lg text-center">
              <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">
                Volume
              </span>
              <span className="font-mono text-xs font-bold text-on-surface">
                800 kg
              </span>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg text-center">
              <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">
                Temp Req
              </span>
              <span className="font-mono text-xs font-bold text-primary">
                12°C - 15°C
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-on-surface-variant">
            <div className="flex items-center gap-1 font-body-xs text-xs font-medium">
              <span className="material-symbols-outlined text-[16px] text-primary">
                location_on
              </span>
              <span>East Plains Depot</span>
            </div>
            <span className="text-primary font-body-sm text-xs font-bold transition-all flex items-center gap-0.5 group-hover:translate-x-0.5">
              Match Fleet{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
