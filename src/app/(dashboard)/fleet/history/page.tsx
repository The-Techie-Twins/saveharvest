"use client";

import React from "react";
import { EarningsChart } from "@/components/features/fleet/EarningsChart";
import { TripsTable } from "@/components/features/fleet/TripsTable";

export default function FleetHistoryPage() {
  return (
    <div className="flex flex-col gap-6 w-full py-2">
      {/* Page Header */}
      <header className="border-b border-outline-variant pb-4">
        <h1 className="font-headline-lg text-2xl font-bold text-on-surface">My History</h1>
        <p className="font-body-sm text-sm text-on-surface-variant mt-1">
          Review past routes and earnings.
        </p>
      </header>

      {/* Dashboard Summary Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col hover:border-l-2 hover:border-l-primary hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] transition-all">
          <span className="text-[10px] md:text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
            Weekly Earnings
          </span>
          <span className="text-xl md:text-2xl font-bold text-status-safe font-mono-data">$1,245.50</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col hover:border-l-2 hover:border-l-primary hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] transition-all">
          <span className="text-[10px] md:text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
            Completed Trips
          </span>
          <span className="text-xl md:text-2xl font-bold text-on-surface font-mono-data">32</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col hover:border-l-2 hover:border-l-primary hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] transition-all">
          <span className="text-[10px] md:text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
            Distance Driven
          </span>
          <span className="text-xl md:text-2xl font-bold text-on-surface font-mono-data">
            412 <span className="text-xs text-on-surface-variant font-normal">mi</span>
          </span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col hover:border-l-2 hover:border-l-primary hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] transition-all">
          <span className="text-[10px] md:text-xs text-on-surface-variant uppercase tracking-wider mb-2 font-semibold">
            On-Time Rate
          </span>
          <span className="text-xl md:text-2xl font-bold text-status-safe font-mono-data">98%</span>
        </div>
      </section>

      {/* Main Charts & Tables */}
      <div className="grid grid-cols-1 gap-6 w-full">
        {/* Earnings Chart */}
        <EarningsChart />

        {/* Trips Table */}
        <TripsTable />
      </div>
    </div>
  );
}
