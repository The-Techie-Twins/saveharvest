"use client";

import React, { useState, useEffect } from "react";
import { UrgentBatchList } from "@/components/features/coop/UrgentBatchList";
import { FleetMapView } from "@/components/features/coop/FleetMapView";
import { TruckDetailsPopover, TruckDetails } from "@/components/features/coop/TruckDetailsPopover";

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
    <main className="flex flex-1 w-full overflow-hidden bg-background">
      {/* Urgent Batches Sidebar */}
      <UrgentBatchList
        selectedTruck={selectedTruck}
        setSelectedTruck={setSelectedTruck}
        strawSeconds={strawSeconds}
        greensSeconds={greensSeconds}
        formatClock={formatClock}
      />

      {/* Geospatial Map Area */}
      <FleetMapView selectedTruck={selectedTruck} setSelectedTruck={setSelectedTruck}>
        {selectedTruck && (
          <TruckDetailsPopover
            selectedTruck={selectedTruck}
            setSelectedTruck={setSelectedTruck}
            trucks={trucks}
          />
        )}
      </FleetMapView>
    </main>
  );
}
