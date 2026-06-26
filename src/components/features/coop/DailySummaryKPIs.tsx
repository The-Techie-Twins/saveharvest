"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export function DailySummaryKPIs() {
  return (
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
  );
}
