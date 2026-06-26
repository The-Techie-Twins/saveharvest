"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InventoryTable } from "@/components/features/coop/InventoryTable";
import { AddBatchSheet } from "@/components/features/coop/AddBatchSheet";

interface BatchItem {
  id: string;
  crop: string;
  weight: number;
  origin: string;
  clockSeconds: number;
  status: "Optimal" | "Warning" | "Critical";
  statusText: string;
}

export default function CoopInventoryPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Initial Mock Batches data
  const [batches, setBatches] = useState<BatchItem[]>([
    {
      id: "#PF-T-8821",
      crop: "Roma Tomatoes",
      weight: 1250.0,
      origin: "Nyeri Valley Farms",
      clockSeconds: 4 * 3600 + 12 * 60 + 45, // 04:12:45
      status: "Critical",
      statusText: "Urgent Sale",
    },
    {
      id: "#PF-C-8822",
      crop: "Cassava Root",
      weight: 3400.5,
      origin: "Mombasa Agro Co-op",
      clockSeconds: 22 * 3600 + 45 * 60 + 10, // 22:45:10
      status: "Warning",
      statusText: "Monitor",
    },
    {
      id: "#PF-A-8823",
      crop: "Hass Avocados",
      weight: 850.0,
      origin: "Rift Valley Orchards",
      clockSeconds: 72 * 3600, // 72:00:00
      status: "Optimal",
      statusText: "Optimal",
    },
    {
      id: "#PF-O-8824",
      crop: "Red Onions",
      weight: 2100.0,
      origin: "Central Province Co-op",
      clockSeconds: 144 * 3600 + 30 * 60, // 144:30:00
      status: "Optimal",
      statusText: "Optimal",
    },
    {
      id: "#PF-M-8825",
      crop: "Mangoes (Kent)",
      weight: 920.5,
      origin: "Coastal Fruit Growers",
      clockSeconds: 86 * 3600 + 15 * 60 + 22, // 86:15:22
      status: "Optimal",
      statusText: "Optimal",
    },
  ]);

  // Live countdown timer ticking for clocks
  useEffect(() => {
    const interval = setInterval(() => {
      setBatches((prev) =>
        prev.map((b) => ({
          ...b,
          clockSeconds: b.clockSeconds > 0 ? b.clockSeconds - 1 : 0,
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatClock = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleAddBatchSubmit = (data: {
    crop: string;
    weight: number;
    origin: string;
    harvestTime: string;
    grade: string;
  }) => {
    const newId = `#PF-X-${Math.floor(1000 + Math.random() * 9000)}`;
    const calculatedClock = data.grade === "A" ? 72 * 3600 : 64 * 3600; // standard vs penalty

    const newBatch: BatchItem = {
      id: newId,
      crop: data.crop,
      weight: data.weight,
      origin: data.origin,
      clockSeconds: calculatedClock,
      status: "Optimal",
      statusText: "Optimal",
    };

    setBatches([newBatch, ...batches]);
    setIsSheetOpen(false);
  };

  const filteredBatches = batches.filter(
    (b) =>
      b.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dynamic KPI Metrics
  const totalWeight = batches.reduce((acc, curr) => acc + curr.weight, 0);
  const criticalCount = batches.filter((b) => b.clockSeconds < 12 * 3600).length;

  return (
    <main className="flex-1 flex flex-col h-screen relative bg-background overflow-hidden">
      {/* Page Header */}
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant bg-surface-container-lowest z-20">
        <div>
          <h2 className="font-headline-lg text-2xl font-bold text-on-background">
            Active Inventory
          </h2>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Manage current batches and monitor perishability clocks to prevent waste.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <Input
              className="pl-9 pr-4 h-10 w-full sm:w-64 border border-outline-variant bg-surface-container-lowest font-body-sm text-sm text-on-background focus-visible:ring-1 focus-visible:ring-primary rounded-lg"
              placeholder="Search batch ID or crop..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setIsSheetOpen(true)}
            className="bg-primary text-on-primary hover:bg-surface-tint font-semibold h-10 px-4 flex items-center gap-2 rounded-lg whitespace-nowrap shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Log New Batch
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-background relative flex flex-col gap-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-sm text-on-surface-variant font-medium">
                Total Active Weight
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">scale</span>
            </div>
            <div className="font-display text-2xl font-bold text-on-background">
              {totalWeight.toLocaleString()}{" "}
              <span className="font-mono text-sm text-on-surface-variant">KG</span>
            </div>
            <div className="font-body-xs text-xs text-status-safe flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +5% vs yesterday
            </div>
          </Card>

          <Card className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-sm text-on-surface-variant font-medium">
                Batches In Transit
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">
                local_shipping
              </span>
            </div>
            <div className="font-display text-2xl font-bold text-on-background">
              {batches.length * 8}
            </div>
            <div className="font-body-xs text-xs text-on-surface-variant">
              18 expecting delivery today
            </div>
          </Card>

          <Card className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-sm text-on-surface-variant font-medium">
                Critical Spoilage Risk
              </span>
              <span className="material-symbols-outlined text-status-critical text-[20px]">
                warning
              </span>
            </div>
            <div className="font-display text-2xl font-bold text-on-background">
              {criticalCount}{" "}
              <span className="font-body-sm text-sm text-on-surface-variant font-normal">
                batches
              </span>
            </div>
            <div className="font-body-xs text-xs text-status-critical flex items-center gap-1 font-semibold">
              &lt; 12 hours remaining
            </div>
          </Card>

          <Card className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-sm text-on-surface-variant font-medium">
                Storage Capacity
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">warehouse</span>
            </div>
            <div className="font-display text-2xl font-bold text-on-background">78%</div>
            <div className="w-full bg-surface-variant rounded-full h-1.5 mt-1 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "78%" }}></div>
            </div>
          </Card>
        </div>

        {/* Data Table Section */}
        <InventoryTable
          filteredBatches={filteredBatches}
          batches={batches}
          formatClock={formatClock}
        />
      </div>

      {/* Log New Batch Slide-over Sheet */}
      <AddBatchSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSubmit={handleAddBatchSubmit}
      />
    </main>
  );
}
