"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export function FinancialKPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Revenue */}
      <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-body-sm text-sm text-on-surface-variant font-medium">
            Total Revenue
          </span>
          <span className="material-symbols-outlined text-primary text-[20px]">
            payments
          </span>
        </div>
        <div className="font-display text-2xl font-bold text-primary">
          $124,500
        </div>
        <div className="font-body-xs text-xs text-status-safe flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">
            trending_up
          </span>{" "}
          +12% from last month
        </div>
      </Card>

      {/* Prevented Loss */}
      <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-body-sm text-sm text-on-surface-variant font-medium">
            Prevented Loss
          </span>
          <span className="material-symbols-outlined text-primary text-[20px]">
            shield_with_heart
          </span>
        </div>
        <div className="font-display text-2xl font-bold text-primary">
          $42,800
        </div>
        <div className="font-body-xs text-xs text-status-safe flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">
            trending_up
          </span>{" "}
          +5% from last month
        </div>
      </Card>

      {/* Spoiled Value */}
      <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-body-sm text-sm text-on-surface-variant font-medium">
            Spoiled Value
          </span>
          <span className="material-symbols-outlined text-status-critical text-[20px]">
            delete_forever
          </span>
        </div>
        <div className="font-display text-2xl font-bold text-status-critical">
          $8,200
        </div>
        <div className="font-body-xs text-xs text-status-warning flex items-center gap-1 font-semibold">
          <span className="material-symbols-outlined text-[14px]">
            trending_down
          </span>{" "}
          -2% from last month
        </div>
      </Card>

      {/* KGs Saved */}
      <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-body-sm text-sm text-on-surface-variant font-medium">
            KGs Saved
          </span>
          <span className="material-symbols-outlined text-outline text-[20px]">
            scale
          </span>
        </div>
        <div className="font-display text-2xl font-bold text-on-background">
          15,400 kg
        </div>
        <div className="font-body-xs text-xs text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">eco</span>{" "}
          Impact equivalent
        </div>
      </Card>
    </div>
  );
}
