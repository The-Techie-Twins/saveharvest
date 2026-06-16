"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Batches */}
        <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col hover:border-primary hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <span className="font-body-xs text-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              Active Batches
            </span>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              inventory_2
            </span>
          </div>
          <div className="font-display text-4xl font-bold text-on-background mt-auto">42</div>
          <div className="flex items-center gap-1 mt-2 text-status-safe font-mono text-xs">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            <span>+3 since yesterday</span>
          </div>
        </Card>

        {/* Pending Pickups */}
        <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col hover:border-primary hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <span className="font-body-xs text-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              Pending Pickups
            </span>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              local_shipping
            </span>
          </div>
          <div className="font-display text-4xl font-bold text-on-background mt-auto">12</div>
          <div className="flex items-center gap-1 mt-2 text-status-warning font-mono text-xs">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>4 requiring urgent dispatch</span>
          </div>
        </Card>

        {/* Today's Revenue */}
        <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col hover:border-primary hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <span className="font-body-xs text-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              Today&apos;s Revenue
            </span>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              payments
            </span>
          </div>
          <div className="font-display text-4xl font-bold text-on-background mt-auto">$4,250</div>
          <div className="flex items-center gap-1 mt-2 text-status-safe font-mono text-xs">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>+12% vs avg Tuesday</span>
          </div>
        </Card>
      </section>

      {/* Main Layout Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Critical Alerts (2/3 width) */}
        <section className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-status-critical text-2xl">warning</span>
            <h2 className="font-headline-md text-xl font-bold text-on-background">
              Critical Perishability Alerts
            </h2>
          </div>

          {/* Alert Card 1 - Strawberries */}
          <div className="bg-error-container/40 border border-error/20 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors hover:bg-error-container/60">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center shrink-0 border border-error/15">
                <span className="material-symbols-outlined text-error">device_thermostat</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-body-lg text-base font-bold text-on-error-container">
                    Batch #PF-8890 (Organic Strawberries)
                  </h3>
                  <span className="bg-error text-on-primary px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold tracking-wider">
                    Critical
                  </span>
                </div>
                <p className="font-body-sm text-sm text-on-surface-variant mt-1 leading-relaxed">
                  Temperature anomaly detected in storage unit B4. Immediate dispatch required to salvage cold-chain value.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 w-full md:w-auto shrink-0">
              <div className="font-mono text-sm text-error font-bold flex items-center gap-1.5 bg-error/15 px-3 py-1 rounded-lg">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>{formatTime(strawSeconds)}</span>
              </div>
              <Link href="/coop/dispatch" className="w-full md:w-auto">
                <Button className="w-full md:w-auto h-10 bg-error text-on-primary hover:bg-error/90 font-semibold rounded-lg text-xs">
                  Dispatch Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Alert Card 2 - Leafy Greens */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-primary hover:shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-status-warning/10 flex items-center justify-center shrink-0 border border-status-warning/20">
                <span className="material-symbols-outlined text-status-warning">hourglass_bottom</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-body-lg text-base font-bold text-on-surface">
                    Batch #PF-8912 (Leafy Greens)
                  </h3>
                </div>
                <p className="font-body-sm text-sm text-on-surface-variant mt-1 leading-relaxed">
                  Approaching primary freshness window. Recommend marketplace discount activation.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 w-full md:w-auto shrink-0">
              <div className="font-mono text-sm text-status-warning font-bold flex items-center gap-1.5 bg-status-warning/10 px-3 py-1 rounded-lg">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>{formatTime(greensSeconds)}</span>
              </div>
              <Button variant="outline" className="w-full md:w-auto h-10 border-status-warning text-status-warning hover:bg-status-warning/5 font-semibold rounded-lg text-xs">
                Discount -10%
              </Button>
            </div>
          </div>

          {/* Alert Card 3 - Tomatoes */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-primary hover:shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-status-warning/10 flex items-center justify-center shrink-0 border border-status-warning/20">
                <span className="material-symbols-outlined text-status-warning">hourglass_bottom</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-body-lg text-base font-bold text-on-surface">
                    Batch #PF-8905 (Heirloom Tomatoes)
                  </h3>
                </div>
                <p className="font-body-sm text-sm text-on-surface-variant mt-1 leading-relaxed">
                  Standard degradation curve. Scheduled for afternoon regional dispatch route.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 w-full md:w-auto shrink-0">
              <div className="font-mono text-sm text-status-warning font-bold flex items-center gap-1.5 bg-status-warning/10 px-3 py-1 rounded-lg">
                <span className="material-symbols-outlined text-[16px]">timer</span>
                <span>11:20:05</span>
              </div>
              <Link href="/coop/dispatch" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto h-10 border-outline-variant text-on-surface-variant hover:bg-surface-container font-semibold rounded-lg text-xs">
                  View Route
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Right Column: Recent Activity (1/3 width) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-on-surface-variant">history</span>
            <h2 className="font-headline-md text-xl font-bold text-on-background">
              Recent Activity
            </h2>
          </div>

          <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-container-low border-b border-outline-variant hover:bg-surface-container-low">
                  <TableHead className="p-3.5 font-bold font-mono text-[10px] text-on-surface-variant uppercase tracking-wider h-auto">Event</TableHead>
                  <TableHead className="p-3.5 font-bold font-mono text-[10px] text-on-surface-variant uppercase tracking-wider text-right h-auto">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-body-sm text-sm text-on-background divide-y divide-outline-variant/30">
                <TableRow className="hover:bg-surface-container-low border-b border-outline-variant/30">
                  <TableCell className="p-3.5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-status-safe shrink-0"></div>
                    <span className="truncate">Batch #PF-8821 Sold (Wholesale)</span>
                  </TableCell>
                  <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                    10:42 AM
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-surface-container-low border-b border-outline-variant/30">
                  <TableCell className="p-3.5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                    <span className="truncate">Truck #TRK-492 Arrived at Dock A</span>
                  </TableCell>
                  <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                    10:15 AM
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-surface-container-low border-b border-outline-variant/30">
                  <TableCell className="p-3.5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-outline-variant shrink-0"></div>
                    <span className="truncate">New Batch Logged: Apples (Fuji)</span>
                  </TableCell>
                  <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                    09:30 AM
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-surface-container-low border-b border-outline-variant/30">
                  <TableCell className="p-3.5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-status-safe shrink-0"></div>
                    <span className="truncate">Payment Cleared: Invoice #INV-299</span>
                  </TableCell>
                  <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                    09:05 AM
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-surface-container-low border-b border-outline-variant/30">
                  <TableCell className="p-3.5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                    <span className="truncate">Truck #TRK-118 Dispatched</span>
                  </TableCell>
                  <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                    08:45 AM
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-surface-container-low border-0">
                  <TableCell className="p-3.5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-status-warning shrink-0"></div>
                    <span className="truncate">Quality Check: Batch #PF-8800</span>
                  </TableCell>
                  <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                    08:10 AM
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="p-3 border-t border-outline-variant bg-surface-container-lowest text-center">
              <a href="#" className="font-body-sm text-xs text-primary hover:underline font-semibold">
                View Full Audit Log
              </a>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
