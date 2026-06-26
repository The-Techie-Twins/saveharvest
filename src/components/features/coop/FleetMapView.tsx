"use client";

import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface FleetMapViewProps {
  selectedTruck: string | null;
  setSelectedTruck: (truckId: string | null) => void;
  children?: ReactNode;
}

export function FleetMapView({
  selectedTruck,
  setSelectedTruck,
  children,
}: FleetMapViewProps) {
  return (
    <div className="flex-1 relative bg-surface-dim overflow-hidden flex flex-col justify-between">
      {/* Map Background grid */}
      <div
        className="absolute inset-0 bg-surface-variant opacity-50 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#d8dadc 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>
      <img
        alt="Aerial view map of California agricultural sector"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq3JAeo3dWJaYO9dDwaLlSoO-w_gnWucmieAMDef7WvBBdq-VHmnFV7CxoQV2RrMjreN9F4M_vuwasXgw9n0nNt1-qpOjJpAno9rIA2Fkb1Gf_mgzOyY1_jxi1SRvNJxFDHhMekI9yRGjYwrFu-Vg_oHr3D2nEDAr4usoCQXp8qyKFSXQ5i58bfrbEBaPD9llfln6di9VBBZFLBogDNU4_zJz2zJw6zskYu_nQ7V9RUQE35AHM4ZvncSq5Eq_PUE5XgN5dqeWC9ZCm"
      />

      {/* Map UI Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          size="sm"
          variant="outline"
          className="w-10 h-10 bg-surface-container-lowest rounded-lg border border-outline-variant flex items-center justify-center shadow-sm hover:bg-surface-container p-0 text-on-surface-variant"
        >
          <span className="material-symbols-outlined">add</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-10 h-10 bg-surface-container-lowest rounded-lg border border-outline-variant flex items-center justify-center shadow-sm hover:bg-surface-container p-0 text-on-surface-variant"
        >
          <span className="material-symbols-outlined">remove</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-10 h-10 bg-surface-container-lowest rounded-lg border border-outline-variant flex items-center justify-center shadow-sm hover:bg-surface-container p-0 text-on-surface-variant mt-2"
        >
          <span className="material-symbols-outlined">my_location</span>
        </Button>
      </div>

      {/* Active Truck Markers */}

      {/* Truck 1 Marker (Selected state initially) */}
      <div
        onClick={() => setSelectedTruck("TRK-492")}
        className="absolute top-[32%] left-[28%] cursor-pointer group z-20"
      >
        <div className="relative flex items-center justify-center w-12 h-12">
          <div className="absolute inset-0 bg-primary opacity-25 rounded-full animate-ping"></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-md z-10 transition-colors ${
              selectedTruck === "TRK-492"
                ? "bg-primary border-surface-container-lowest text-on-primary"
                : "bg-surface-container-lowest border-primary text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              local_shipping
            </span>
          </div>
        </div>
      </div>

      {/* Truck 2 Marker (Idle state) */}
      <div
        onClick={() => setSelectedTruck("TRK-105")}
        className="absolute top-[68%] left-[64%] cursor-pointer group z-20"
      >
        <div className="relative flex items-center justify-center w-10 h-10">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-sm z-10 transition-colors ${
              selectedTruck === "TRK-105"
                ? "bg-primary border-surface-container-lowest text-on-primary"
                : "bg-surface-container-lowest border-outline text-outline"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              local_shipping
            </span>
          </div>
        </div>
      </div>

      {/* Overlay child components like TruckDetailsPopover */}
      {children}

      {/* Bottom Data Bar */}
      <div className="bg-surface-container-lowest border-t border-outline-variant p-3 px-6 flex justify-between items-center text-on-surface-variant font-mono text-xs z-10">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 font-bold">
            <div className="w-2.5 h-2.5 rounded-full bg-status-safe"></div>{" "}
            Active Fleet: 24
          </span>
          <span className="flex items-center gap-1.5 font-bold">
            <div className="w-2.5 h-2.5 rounded-full bg-status-warning"></div>{" "}
            En Route: 18
          </span>
          <span className="flex items-center gap-1.5 font-bold">
            <div className="w-2.5 h-2.5 rounded-full bg-outline"></div> Idle: 6
          </span>
        </div>
        <div>Last Synced: 14:02:33 PST</div>
      </div>
    </div>
  );
}
