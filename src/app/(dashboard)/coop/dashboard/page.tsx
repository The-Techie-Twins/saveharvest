"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DailySummaryKPIs } from "@/components/features/coop/DailySummaryKPIs";
import { UrgentAlertsFeed } from "@/components/features/coop/UrgentAlertsFeed";
import { RecentActivityTable } from "@/components/features/coop/RecentActivityTable";

export default function CoopDashboardPage() {
  // Real-time ticking countdown for Strawberries (3h 14m 59s initial)
  const [strawSeconds, setStrawSeconds] = useState(3 * 3600 + 14 * 60 + 59);
  // Leafy greens (8h 45m 22s initial)
  const [greensSeconds, setGreensSeconds] = useState(8 * 3600 + 45 * 60 + 22);

  useEffect(() => {
    const interval = setInterval(() => {
      setStrawSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      setGreensSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <main className="flex-1 p-6 md:p-8 bg-background min-h-screen flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-3xl font-bold text-on-background tracking-tight">
            Co-op Overview
          </h1>
          <p className="font-body-lg text-sm text-on-surface-variant mt-1">
            Operational status and urgent logistics actions.
          </p>
        </div>
        <Link href="/coop/inventory">
          <Button className="h-11 px-6 font-semibold bg-primary text-on-primary hover:bg-surface-tint shadow-sm transition-all flex items-center justify-center gap-2 w-full md:w-auto rounded-lg">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Log New Batch
          </Button>
        </Link>
      </header>

      {/* KPI Bento Grid */}
      <DailySummaryKPIs />

      {/* Main Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Critical Alerts (2/3 width) */}
        <UrgentAlertsFeed
          strawSeconds={strawSeconds}
          greensSeconds={greensSeconds}
          formatTime={formatTime}
        />

        {/* Right Column: Recent Activity (1/3 width) */}
        <RecentActivityTable />
      </div>
    </main>
  );
}
