"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export interface TruckDetails {
  id: string;
  driver: string;
  distance: string;
  capacity: number;
  loadPercent: number;
  temp: string;
}

interface TruckDetailsPopoverProps {
  selectedTruck: string;
  setSelectedTruck: (truckId: string | null) => void;
  trucks: Record<string, TruckDetails>;
}

export function TruckDetailsPopover({
  selectedTruck,
  setSelectedTruck,
  trucks,
}: TruckDetailsPopoverProps) {
  const truck = trucks[selectedTruck];
  if (!truck) return null;

  return (
    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 md:left-6 md:translate-x-0 w-80 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant overflow-hidden z-30">
      <div className="bg-surface-bright p-3.5 border-b border-outline-variant flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              truck.loadPercent > 0 ? "bg-status-safe" : "bg-outline"
            }`}
          ></span>
          <span className="font-mono text-sm font-bold text-on-surface">
            {truck.id} ({truck.loadPercent > 0 ? "Active" : "Idle"})
          </span>
        </div>
        <button
          onClick={() => setSelectedTruck(null)}
          className="text-on-surface-variant hover:text-on-surface flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-y-3 gap-x-3 mb-4">
          <div>
            <p className="font-body-xs text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
              Driver
            </p>
            <p className="font-body-sm text-sm font-semibold text-on-surface">
              {truck.driver}
            </p>
          </div>
          <div>
            <p className="font-body-xs text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
              Distance
            </p>
            <p className="font-mono text-xs font-bold text-primary">
              {truck.distance}
            </p>
          </div>
          <div>
            <p className="font-body-xs text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
              Max Capacity
            </p>
            <p className="font-mono text-xs font-bold text-on-surface">
              {truck.capacity} kg
            </p>
          </div>
          <div>
            <p className="font-body-xs text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
              Current Payload
            </p>
            <p className="font-mono text-xs font-bold text-on-surface">
              {truck.loadPercent}% (
              {((truck.capacity * truck.loadPercent) / 100).toFixed(0)} kg)
            </p>
          </div>
        </div>

        {truck.loadPercent > 0 ? (
          <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-body-xs text-xs font-medium text-on-surface-variant">
                Cold Chain Status
              </span>
              <span className="font-mono text-xs font-bold text-status-safe">
                OK: {truck.temp}
              </span>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-status-safe h-full rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant mb-4 text-center">
            <span className="font-body-xs text-xs font-medium text-on-surface-variant">
              Vehicle Available for Immediate Dispatch
            </span>
          </div>
        )}

        <Button className="w-full bg-primary text-on-primary font-semibold h-11 rounded-lg text-sm hover:bg-surface-tint transition-all flex justify-center items-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-[18px]">send</span>
          Request Dispatch Route
        </Button>
      </div>
    </div>
  );
}
