"use client";

import React, { useState } from "react";

interface EarningDay {
  day: string;
  amount: number;
  heightClass: string;
  isComplete: boolean;
}

const DATA_SET: Record<string, EarningDay[]> = {
  this_week: [
    { day: "Mon", amount: 120, heightClass: "h-[40%]", isComplete: true },
    { day: "Tue", amount: 195, heightClass: "h-[65%]", isComplete: true },
    { day: "Wed", amount: 240, heightClass: "h-[80%]", isComplete: true },
    { day: "Thu", amount: 90, heightClass: "h-[30%]", isComplete: false },
    { day: "Fri", amount: 285, heightClass: "h-[95%]", isComplete: true },
    { day: "Sat", amount: 150, heightClass: "h-[50%]", isComplete: false },
    { day: "Sun", amount: 30, heightClass: "h-[10%]", isComplete: false },
  ],
  last_week: [
    { day: "Mon", amount: 150, heightClass: "h-[50%]", isComplete: true },
    { day: "Tue", amount: 120, heightClass: "h-[40%]", isComplete: true },
    { day: "Wed", amount: 300, heightClass: "h-[100%]", isComplete: true },
    { day: "Thu", amount: 180, heightClass: "h-[60%]", isComplete: true },
    { day: "Fri", amount: 220, heightClass: "h-[73%]", isComplete: true },
    { day: "Sat", amount: 80, heightClass: "h-[26%]", isComplete: true },
    { day: "Sun", amount: 45, heightClass: "h-[15%]", isComplete: true },
  ],
  past_month: [
    { day: "Wk 1", amount: 980, heightClass: "h-[75%]", isComplete: true },
    { day: "Wk 2", amount: 1245, heightClass: "h-[95%]", isComplete: true },
    { day: "Wk 3", amount: 810, heightClass: "h-[60%]", isComplete: true },
    { day: "Wk 4", amount: 1100, heightClass: "h-[85%]", isComplete: true },
  ],
};

export function EarningsChart() {
  const [timeframe, setTimeframe] = useState("this_week");
  const currentData = DATA_SET[timeframe] || DATA_SET.this_week;

  const totalEarnings = currentData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-headline-md text-base font-semibold text-on-surface">Weekly Earnings</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Total for selected period: <span className="font-semibold text-status-safe font-mono-data">${totalEarnings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-surface border border-outline-variant text-on-surface font-body-sm text-xs rounded-lg px-3 py-1.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
        >
          <option value="this_week">This Week</option>
          <option value="last_week">Last Week</option>
          <option value="past_month">Past Month</option>
        </select>
      </div>

      {/* Simple CSS Bar Chart Representation */}
      <div className="h-48 flex items-end justify-between gap-2 md:gap-4 mt-8 px-2 md:px-8 border-b border-outline-variant pb-2 relative">
        {/* Y-Axis Labels (Desktop only) */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-on-surface-variant font-mono-data text-[10px] pb-5 opacity-50 hidden md:flex">
          <span>
            ${timeframe === "past_month" ? "1,200" : "300"}
          </span>
          <span>
            ${timeframe === "past_month" ? "800" : "200"}
          </span>
          <span>
            ${timeframe === "past_month" ? "400" : "100"}
          </span>
        </div>

        {/* Bars */}
        {currentData.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
            <div
              className={`w-full md:w-12 rounded-t-sm ${item.heightClass} transition-all duration-500 ease-out relative cursor-pointer ${
                item.isComplete
                  ? "bg-primary-container/70 group-hover:bg-primary"
                  : "bg-surface-dim group-hover:bg-outline"
              }`}
            >
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-mono-data text-[10px] px-2 py-0.5 rounded shadow-sm whitespace-nowrap transition-opacity pointer-events-none z-10">
                ${item.amount}
              </div>
            </div>
            <span
              className={`font-body-xs text-[11px] text-on-surface-variant ${
                item.day === "Wed" ? "font-bold text-on-surface" : ""
              }`}
            >
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
