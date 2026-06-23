"use client";

import React, { useState, useEffect } from "react";

interface Order {
  id: string;
  po: string;
  title: string;
  status: "In-Transit" | "Processing" | "Delivered";
  temp: number;
  tempStatus: "Critical" | "Safe";
  timeVal: number; // seconds remaining for timer (only used for In-Transit / Processing)
  timeText?: string; // fallback or fixed text (e.g. "08:30 AM" or "45m")
  driverAvatar: string;
  driverName: string;
  warehouseName?: string;
  note?: string;
}

export function ActiveOrdersList() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ord-1",
      po: "PO-2948-A",
      title: "Premium Berries Batch",
      status: "In-Transit",
      temp: 3.2,
      tempStatus: "Critical", // above optimal berry temp
      timeVal: 1 * 3600 + 14 * 60 + 22,
      driverAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcEIodPCAVt3UetD33B0RyZoZsCR6PuJxVsOzwqnaTl3-5-4NudwSyFcxRzDsmoWrPmPEBJTBnitslYO-hECAPGEmec-j0dAgUznx2JF2y_47plpn1WFdsCrICNW2ONeQFg1dq6SbrttvmqMo48k10Vey-hWpg0JHQIs7D8tT1NW9STLbc5IU1RRQO0ynrjzGYj3KoLRZdMky2YmenwL4yS4zOh4NvEkoFhfKhtSLgp4FqYASWq6T29A9sdA3hGgrxF960XMgsMjjS",
      driverName: "Sarah Connor",
    },
    {
      id: "ord-2",
      po: "PO-2955-B",
      title: "Organic Leafy Greens",
      status: "Processing",
      temp: 2.0,
      tempStatus: "Safe",
      timeVal: 45 * 60, // 45 minutes
      timeText: "45m",
      driverAvatar: "",
      driverName: "",
      warehouseName: "Facility Alpha",
    },
    {
      id: "ord-3",
      po: "PO-2940-C",
      title: "Avocado Bulk Pallets",
      status: "Delivered",
      temp: 4.1,
      tempStatus: "Safe",
      timeVal: 0,
      timeText: "08:30 AM",
      driverAvatar: "",
      driverName: "",
      note: "Signed by J. Doe",
    },
  ]);

  // Live timer ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.status === "Delivered") return o;
          return {
            ...o,
            timeVal: o.timeVal > 0 ? o.timeVal - 1 : 0,
          };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatClock = (sec: number, text?: string) => {
    if (text && sec === 0) return text;
    if (sec === 0) return "00:00:00";
    if (sec < 3600 && text) return text; // e.g. "45m"
    
    const h = Math.floor(sec / 3600).toString().padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const getStatusBadge = (order: Order) => {
    switch (order.status) {
      case "In-Transit":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container border border-error/20 font-semibold font-mono-data text-[10px] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-status-critical animate-pulse"></span>
            In-Transit
          </div>
        );
      case "Processing":
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface border border-outline-variant font-semibold font-mono-data text-[10px] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-status-warning"></span>
            Processing
          </div>
        );
      case "Delivered":
      default:
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container border border-primary/20 font-semibold font-mono-data text-[10px] uppercase">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Delivered
          </div>
        );
    }
  };

  const getCardBorder = (order: Order) => {
    switch (order.status) {
      case "In-Transit":
        return "border-t-[3px] border-t-status-critical";
      case "Processing":
        return "border-t-[3px] border-t-status-warning";
      case "Delivered":
      default:
        return "border-t-[3px] border-t-status-safe";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <article
          key={order.id}
          className={`bg-surface-container-lowest rounded-xl border border-outline-variant p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-primary/50 transition-colors ${getCardBorder(
            order
          )}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-wider text-xs font-semibold">
                {order.po}
              </span>
              <h3 className="font-body-lg text-body-lg font-bold mt-1 text-on-surface">{order.title}</h3>
            </div>
            {getStatusBadge(order)}
          </div>

          <div className="flex items-center gap-4 py-4 border-y border-outline-variant/50">
            <div className="flex-1 text-center">
              <span className="block font-body-xs text-xs text-on-surface-variant mb-1 font-semibold">
                {order.status === "Delivered" ? "Arrival Temp" : "Current Temp"}
              </span>
              <span
                className={`font-mono-timer text-mono-timer text-lg font-bold ${
                  order.tempStatus === "Critical" ? "text-status-critical" : "text-status-safe"
                }`}
              >
                {order.temp.toFixed(1)}°C
              </span>
            </div>
            <div className="w-px h-8 bg-outline-variant/50"></div>
            <div className="flex-1 text-center">
              <span className="block font-body-xs text-xs text-on-surface-variant mb-1 font-semibold">
                {order.status === "Delivered" ? "Delivered At" : order.status === "Processing" ? "Est. Dispatch" : "Time to Target"}
              </span>
              <span className="font-mono-timer text-mono-timer text-on-surface text-lg font-bold">
                {formatClock(order.timeVal, order.timeText)}
              </span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-2">
            {order.status === "In-Transit" ? (
              <div className="flex items-center gap-2">
                <img
                  alt={order.driverName}
                  className="w-8 h-8 rounded-full border-2 border-surface-container-lowest"
                  src={order.driverAvatar}
                />
                <span className="font-body-xs text-xs text-on-surface-variant font-semibold">
                  {order.driverName} (Fleet)
                </span>
              </div>
            ) : order.status === "Processing" ? (
              <div className="flex items-center gap-2 text-on-surface-variant font-body-xs text-xs font-semibold">
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                  warehouse
                </span>
                <span>{order.warehouseName}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-on-surface-variant font-body-xs text-xs font-semibold">
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                  receipt_long
                </span>
                <span>{order.note}</span>
              </div>
            )}

            <button className="text-primary font-body-sm text-body-sm font-semibold hover:underline flex items-center gap-1 transition-all cursor-pointer">
              {order.status === "Delivered" ? "View POD" : "Track"}
              <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
