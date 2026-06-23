"use client";

import React, { useState, useEffect } from "react";
import { MOCK_LISTINGS } from "./FlashOrderGrid";

interface OrderSummaryCardProps {
  batchId: string | null;
}

export function OrderSummaryCard({ batchId }: OrderSummaryCardProps) {
  const listing = MOCK_LISTINGS.find((l) => l.id === batchId) || MOCK_LISTINGS[0];
  const [secondsLeft, setSecondsLeft] = useState<number>(listing.clockSeconds);

  useEffect(() => {
    if (listing.status === "Stable") return;
    setSecondsLeft(listing.clockSeconds);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [listing]);

  const formatClock = (sec: number) => {
    if (listing.status === "Stable") return "24:00:00+";
    const h = Math.floor(sec / 3600).toString().padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const discountPercent = Math.round(
    ((listing.originalPrice - listing.discountedPrice) / listing.originalPrice) * 100
  );

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden group">
      {/* Visual highlight on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`w-2 h-2 rounded-full ${
                listing.status === "Critical"
                  ? "bg-status-critical animate-pulse"
                  : listing.status === "Urgent"
                  ? "bg-status-warning"
                  : "bg-status-safe"
              }`}
            ></span>
            <span
              className={`font-mono-data text-mono-data text-xs tracking-wide uppercase font-bold ${
                listing.status === "Critical"
                  ? "text-status-critical"
                  : listing.status === "Urgent"
                  ? "text-status-warning"
                  : "text-status-safe"
              }`}
            >
              {listing.status} Priority
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-on-surface mb-1">{listing.title}</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant font-mono">
            Batch ID: #PF-{listing.id}-STR
          </p>
        </div>

        {/* Perishability Clock */}
        <div className="bg-surface-container-low border border-outline-variant rounded-lg p-3 text-right shrink-0">
          <p className="font-body-xs text-body-xs text-on-surface-variant mb-1 font-semibold">
            Estimated Viability
          </p>
          <div
            className={`flex items-center gap-2 font-bold ${
              listing.status === "Critical"
                ? "text-status-critical"
                : listing.status === "Urgent"
                ? "text-status-warning"
                : "text-status-safe"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">timer</span>
            <span className="font-mono-timer text-mono-timer">{formatClock(secondsLeft)}</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-3 gap-4 py-4 border-y border-outline-variant/60">
        <div className="flex flex-col gap-1">
          <span className="font-body-xs text-body-xs text-on-surface-variant uppercase tracking-wider font-semibold text-[10px]">
            Total Weight
          </span>
          <span className="font-mono-data text-mono-data text-on-surface font-semibold text-lg">
            {listing.volume.toLocaleString()} kg
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-body-xs text-body-xs text-on-surface-variant uppercase tracking-wider font-semibold text-[10px]">
            Distance
          </span>
          <span className="font-mono-data text-mono-data text-on-surface font-semibold text-lg">
            {listing.distance.toFixed(1)} mi
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-body-xs text-body-xs text-on-surface-variant uppercase tracking-wider font-semibold text-[10px]">
            Origin Temp
          </span>
          <span className="font-mono-data text-mono-data text-status-safe font-semibold text-lg">
            2.5°C
          </span>
        </div>
      </div>

      {/* Pricing Display */}
      <div className="flex justify-between items-end mt-2">
        <div className="flex flex-col">
          <span className="font-body-sm text-body-sm text-on-surface-variant mb-1">
            Marketplace Pricing
          </span>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[32px] leading-none font-bold text-on-surface">
              ${(listing.volume * listing.discountedPrice).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="font-body-lg text-body-lg text-secondary line-through font-mono-data">
              ${(listing.volume * listing.originalPrice).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <div className="bg-primary-container text-on-primary-container px-3 py-1.5 rounded font-mono-data text-xs font-bold border border-primary/20">
          -{discountPercent}% URGENCY DISCOUNT
        </div>
      </div>
    </section>
  );
}
