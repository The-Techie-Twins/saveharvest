"use client";

import React from "react";
import { FinancialKPIGrid } from "@/components/features/coop/FinancialKPIGrid";
import { RevenueChart } from "@/components/features/coop/RevenueChart";
import { LedgerTable } from "@/components/features/coop/LedgerTable";

export default function CoopAnalyticsPage() {
  return (
    <main className="flex-1 p-6 md:p-8 bg-background min-h-screen max-w-7xl mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <header>
        <h1 className="font-headline-lg text-3xl font-bold text-on-background tracking-tight">
          Financial &amp; Impact Analytics
        </h1>
        <p className="font-body-lg text-sm text-on-surface-variant mt-1">
          Monitor revenue recovery and food waste prevention metrics.
        </p>
      </header>

      {/* KPI Grid */}
      <FinancialKPIGrid />

      {/* Charts Bento Grid Layout */}
      <RevenueChart />

      {/* Operational Ledger Table */}
      <LedgerTable />
    </main>
  );
}
