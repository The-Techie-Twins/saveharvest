"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TruckDetails {
  id: string;
  driver: string;
  distance: string;
  capacity: number;
  loadPercent: number;
  temp: string;
}

export default function CoopDispatchPage() {
  // Active marker selection state
  const [selectedTruck, setSelectedTruck] = useState<string | null>("TRK-492");
  
  // Real-time ticking timers for the urgent batch cards
  const [strawSeconds, setStrawSeconds] = useState(2 * 3600 + 14 * 60 + 59);
  const [greensSeconds, setGreensSeconds] = useState(5 * 3600 + 42 * 60 + 10);

  useEffect(() => {
    const interval = setInterval(() => {
      setStrawSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      setGreensSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatClock = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const trucks: Record<string, TruckDetails> = {
    "TRK-492": {
      id: "TRK-492",
      driver: "J. Miller",
      distance: "12 km",
      capacity: 1200,
      loadPercent: 30,
      temp: "3.2°C",
    },
    "TRK-105": {
      id: "TRK-105",
      driver: "A. Vance",
      distance: "3.5 km",
      capacity: 800,
      loadPercent: 0,
      temp: "4.0°C",
    },
  };

  return (
    <main className="flex-1 flex h-[calc(100vh-64px)] relative bg-background overflow-hidden">
      {/* Urgent Batches Sidebar (30% width) */}
      <div className="w-full md:w-[320px] lg:w-[380px] h-full bg-surface-bright border-r border-outline-variant flex flex-col z-10 shadow-sm shrink-0">
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
                <p className="font-mono text-[10px] text-on-surface-variant mt-1 font-bold">BATCH-84A9</p>
              </div>
              <div className="flex items-center gap-1 bg-error-container text-on-error-container px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-status-critical"></div>
                <span className="font-mono text-[11px] font-bold">{formatClock(strawSeconds)}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-surface-container-low p-2 rounded-lg text-center">
                <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">Volume</span>
                <span className="font-mono text-xs font-bold text-on-surface">450 kg</span>
              </div>
              <div className="bg-surface-container-low p-2 rounded-lg text-center">
                <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">Temp Req</span>
                <span className="font-mono text-xs font-bold text-primary">2°C - 4°C</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-on-surface-variant">
              <div className="flex items-center gap-1 font-body-xs text-xs font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                <span>Sector 4 Hub</span>
              </div>
              <span className="text-primary font-body-sm text-xs font-bold transition-all flex items-center gap-0.5 group-hover:translate-x-0.5">
                Match Fleet 
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
                <p className="font-mono text-[10px] text-on-surface-variant mt-1 font-bold">BATCH-92B1</p>
              </div>
              <div className="flex items-center gap-1 bg-[#fef3c7] text-[#92400e] px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-status-warning"></div>
                <span className="font-mono text-[11px] font-bold">{formatClock(greensSeconds)}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-surface-container-low p-2 rounded-lg text-center">
                <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">Volume</span>
                <span className="font-mono text-xs font-bold text-on-surface">280 kg</span>
              </div>
              <div className="bg-surface-container-low p-2 rounded-lg text-center">
                <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">Temp Req</span>
                <span className="font-mono text-xs font-bold text-primary">4°C - 8°C</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-on-surface-variant">
              <div className="flex items-center gap-1 font-body-xs text-xs font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                <span>North Valley Farm</span>
              </div>
              <span className="text-primary font-body-sm text-xs font-bold transition-all flex items-center gap-0.5 group-hover:translate-x-0.5">
                Match Fleet 
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </Card>

          {/* Batch Card 3 - Tomatoes */}
          <Card 
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-md hover:border-primary transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-body-lg text-sm font-bold text-on-surface">
                  Heirloom Tomatoes
                </h3>
                <p className="font-mono text-[10px] text-on-surface-variant mt-1 font-bold">BATCH-11C4</p>
              </div>
              <div className="flex items-center gap-1 bg-[#dcfce7] text-[#166534] px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-status-safe"></div>
                <span className="font-mono text-[11px] font-bold">12:00:00</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-surface-container-low p-2 rounded-lg text-center">
                <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">Volume</span>
                <span className="font-mono text-xs font-bold text-on-surface">800 kg</span>
              </div>
              <div className="bg-surface-container-low p-2 rounded-lg text-center">
                <span className="font-body-xs text-[10px] text-on-surface-variant block mb-0.5">Temp Req</span>
                <span className="font-mono text-xs font-bold text-primary">12°C - 15°C</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-on-surface-variant">
              <div className="flex items-center gap-1 font-body-xs text-xs font-medium">
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                <span>East Plains Depot</span>
              </div>
              <span className="text-primary font-body-sm text-xs font-bold transition-all flex items-center gap-0.5 group-hover:translate-x-0.5">
                Match Fleet 
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Geospatial Map Area (70% width) */}
      <div className="flex-1 relative bg-surface-dim overflow-hidden h-full flex flex-col justify-between">
        
        {/* Map Background grid */}
        <div className="absolute inset-0 bg-surface-variant opacity-50 pointer-events-none" style={{ backgroundImage: "radial-gradient(#d8dadc 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-md z-10 transition-colors ${
              selectedTruck === "TRK-492" ? "bg-primary border-surface-container-lowest text-on-primary" : "bg-surface-container-lowest border-primary text-primary"
            }`}>
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            </div>
          </div>
        </div>

        {/* Truck 2 Marker (Idle state) */}
        <div 
          onClick={() => setSelectedTruck("TRK-105")}
          className="absolute top-[68%] left-[64%] cursor-pointer group z-20"
        >
          <div className="relative flex items-center justify-center w-10 h-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-sm z-10 transition-colors ${
              selectedTruck === "TRK-105" ? "bg-primary border-surface-container-lowest text-on-primary" : "bg-surface-container-lowest border-outline text-outline"
            }`}>
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            </div>
          </div>
        </div>

        {/* Truck Details Popover Overlay */}
        {selectedTruck && (
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 md:left-6 md:translate-x-0 w-80 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant overflow-hidden z-30">
            <div className="bg-surface-bright p-3.5 border-b border-outline-variant flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${trucks[selectedTruck].loadPercent > 0 ? "bg-status-safe" : "bg-outline"}`}></span>
                <span className="font-mono text-sm font-bold text-on-surface">
                  {trucks[selectedTruck].id} ({trucks[selectedTruck].loadPercent > 0 ? "Active" : "Idle"})
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
                  <p className="font-body-xs text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Driver</p>
                  <p className="font-body-sm text-sm font-semibold text-on-surface">{trucks[selectedTruck].driver}</p>
                </div>
                <div>
                  <p className="font-body-xs text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Distance</p>
                  <p className="font-mono text-xs font-bold text-primary">{trucks[selectedTruck].distance}</p>
                </div>
                <div>
                  <p className="font-body-xs text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Max Capacity</p>
                  <p className="font-mono text-xs font-bold text-on-surface">{trucks[selectedTruck].capacity} kg</p>
                </div>
                <div>
                  <p className="font-body-xs text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">Current Payload</p>
                  <p className="font-mono text-xs font-bold text-on-surface">
                    {trucks[selectedTruck].loadPercent}% ({ (trucks[selectedTruck].capacity * trucks[selectedTruck].loadPercent / 100).toFixed(0) } kg)
                  </p>
                </div>
              </div>

              {trucks[selectedTruck].loadPercent > 0 ? (
                <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-body-xs text-xs font-medium text-on-surface-variant">Cold Chain Status</span>
                    <span className="font-mono text-xs font-bold text-status-safe">OK: {trucks[selectedTruck].temp}</span>
                  </div>
                  <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                    <div className="bg-status-safe h-full rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant mb-4 text-center">
                  <span className="font-body-xs text-xs font-medium text-on-surface-variant">Vehicle Available for Immediate Dispatch</span>
                </div>
              )}
              
              <Button className="w-full bg-primary text-on-primary font-semibold h-11 rounded-lg text-sm hover:bg-surface-tint transition-all flex justify-center items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">send</span>
                Request Dispatch Route
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Data Bar */}
        <div className="bg-surface-container-lowest border-t border-outline-variant p-3 px-6 flex justify-between items-center text-on-surface-variant font-mono text-xs z-10">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 font-bold">
              <div className="w-2.5 h-2.5 rounded-full bg-status-safe"></div> Active Fleet: 24
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <div className="w-2.5 h-2.5 rounded-full bg-status-warning"></div> En Route: 18
            </span>
            <span className="flex items-center gap-1.5 font-bold">
              <div className="w-2.5 h-2.5 rounded-full bg-outline"></div> Idle: 6
            </span>
          </div>
          <div>
            Last Synced: 14:02:33 PST
          </div>
        </div>
      </div>
    </main>
  );
}
