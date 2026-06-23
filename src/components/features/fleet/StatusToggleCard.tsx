"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export function StatusToggleCard() {
  const [isActive, setIsActive] = useState(true);
  const [capacity, setCapacity] = useState("65.0");

  return (
    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-md text-lg font-semibold text-on-background">Fleet Status</h3>
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              isActive ? "bg-status-safe animate-pulse" : "bg-status-spoiled"
            }`}
          ></span>
          <span
            className={`font-mono-timer text-xs font-semibold ${
              isActive ? "text-status-safe" : "text-on-surface-variant"
            }`}
          >
            {isActive ? "ACCEPTING LOADS" : "OFFLINE"}
          </span>
        </div>
      </div>

      {/* Slide-like toggle container */}
      <div className="bg-surface p-1 rounded-lg flex border border-outline-variant mb-6 relative">
        <div
          className={`absolute inset-y-1 w-[calc(50%-0.25rem)] bg-white dark:bg-zinc-800 rounded shadow-sm transition-all duration-300 ${
            isActive ? "left-[calc(50%+0.125rem)]" : "left-1"
          }`}
        ></div>
        <button
          type="button"
          onClick={() => setIsActive(false)}
          className={`flex-1 py-2 text-center text-sm font-medium relative z-10 rounded transition-colors ${
            !isActive ? "text-on-background font-semibold" : "text-on-surface-variant"
          }`}
        >
          Offline
        </button>
        <button
          type="button"
          onClick={() => setIsActive(true)}
          className={`flex-1 py-2 text-center text-sm font-medium relative z-10 rounded transition-colors ${
            isActive ? "text-primary font-semibold" : "text-on-surface-variant"
          }`}
        >
          Active
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-1">
            Current Capacity (%)
          </label>
          <div className="relative">
            <Input
              className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-mono-data text-right pr-8"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="0.0"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono-data text-xs text-on-surface-variant">
              %
            </span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-on-surface-variant mb-1">
            Temperature Limit
          </label>
          <Input
            className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-mono-data text-right"
            readOnly
            type="text"
            value="2°C - 4°C"
          />
        </div>
      </div>
    </section>
  );
}
