"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UrgentAlertsFeedProps {
  strawSeconds: number;
  greensSeconds: number;
  formatTime: (seconds: number) => string;
}

export function UrgentAlertsFeed({
  strawSeconds,
  greensSeconds,
  formatTime,
}: UrgentAlertsFeedProps) {
  return (
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
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-body-lg text-base font-bold text-on-error-container truncate">
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
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-body-lg text-base font-bold text-on-surface truncate">
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
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-body-lg text-base font-bold text-on-surface truncate">
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
  );
}
