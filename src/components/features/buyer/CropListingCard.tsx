"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface CropListing {
  id: string;
  category: string;
  title: string;
  status: "Critical" | "Urgent" | "Stable";
  volume: number; // in kg
  distance: number; // in miles
  clockSeconds: number; // base seconds remaining
  originalPrice: number; // per kg
  discountedPrice: number; // per kg
  imageUrl: string;
}

interface CropListingCardProps {
  listing: CropListing;
}

export function CropListingCard({ listing }: CropListingCardProps) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState<number>(listing.clockSeconds);

  // Countdown timer logic
  useEffect(() => {
    if (listing.status === "Stable") return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [listing.status]);

  const formatClock = (sec: number) => {
    if (listing.status === "Stable") return "24:00:00+";
    const h = Math.floor(sec / 3600).toString().padStart(2, "0");
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const getStatusBadgeStyles = () => {
    switch (listing.status) {
      case "Critical":
        return "bg-error-container text-on-error-container";
      case "Urgent":
        return "bg-surface-variant text-status-warning border border-status-warning/30";
      case "Stable":
      default:
        return "bg-surface-variant text-status-safe border border-status-safe/30";
    }
  };

  const getStatusDotColor = () => {
    switch (listing.status) {
      case "Critical":
        return "bg-status-critical animate-pulse";
      case "Urgent":
        return "bg-status-warning";
      case "Stable":
      default:
        return "bg-status-safe";
    }
  };

  const getCardBorder = () => {
    switch (listing.status) {
      case "Critical":
        return "border-l-[3px] border-l-status-critical";
      case "Urgent":
        return "border-l-[3px] border-l-status-warning";
      case "Stable":
      default:
        return "border-l-[3px] border-l-status-safe";
    }
  };

  const getClockTextColor = () => {
    switch (listing.status) {
      case "Critical":
        return "text-status-critical";
      case "Urgent":
        return "text-status-warning";
      case "Stable":
      default:
        return "text-status-safe";
    }
  };

  const handleBuy = () => {
    router.push(`/buyer/checkout?batchId=${listing.id}`);
  };

  return (
    <div
      className={`marketplace-card bg-surface-container-lowest border border-outline-variant rounded-lg p-4 transition-all duration-200 ${getCardBorder()} flex flex-col gap-3 group relative overflow-hidden`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded bg-surface-container overflow-hidden shrink-0">
            <img
              alt={listing.title}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all"
              src={listing.imageUrl}
            />
          </div>
          <div>
            <div className="font-body-xs text-body-xs text-secondary uppercase tracking-wider mb-0.5">
              {listing.category} - Batch {listing.id}
            </div>
            <h3 className="font-headline-md text-[16px] leading-tight text-on-surface font-semibold">
              {listing.title}
            </h3>
          </div>
        </div>

        <div className={`flex items-center gap-1.5 px-2 py-1 rounded font-mono-data text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeStyles()}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor()}`}></span>
          {listing.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2 py-3 border-y border-outline-variant/50">
        <div>
          <div className="font-body-xs text-[10px] text-secondary uppercase">Volume available</div>
          <div className="font-mono-data text-mono-data text-on-surface font-semibold">
            {listing.volume.toLocaleString()} kg
          </div>
        </div>
        <div>
          <div className="font-body-xs text-[10px] text-secondary uppercase">Distance</div>
          <div className="font-mono-data text-mono-data text-on-surface">
            {listing.distance.toFixed(1)} mi
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-surface-bright p-3 rounded border border-outline-variant/30">
        <div className="flex justify-between items-center mb-1">
          <span className="font-body-xs text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider">
            {listing.status === "Stable" ? "Optimal Window" : "Perishability Clock"}
          </span>
          <span className={`material-symbols-outlined text-[16px] ${getClockTextColor()}`}>
            {listing.status === "Stable" ? "hourglass_top" : "timer"}
          </span>
        </div>
        <div className={`font-mono-timer text-mono-timer ${getClockTextColor()} text-center text-[18px]`}>
          {formatClock(secondsLeft)}
        </div>
      </div>

      <div className="flex justify-between items-end mt-2">
        <div>
          <div className="font-body-xs text-secondary line-through text-[11px]">
            Orig: ${listing.originalPrice.toFixed(2)}/kg
          </div>
          <div className="font-headline-md text-[22px] text-primary font-bold leading-none">
            ${listing.discountedPrice.toFixed(2)}
            <span className="text-[12px] font-normal text-secondary">/kg</span>
          </div>
        </div>
        <button
          onClick={handleBuy}
          className={`px-4 py-2 rounded font-body-sm font-semibold transition-all shadow-sm ${
            listing.status === "Critical"
              ? "bg-primary text-on-primary hover:bg-surface-tint"
              : "bg-surface-container border border-outline-variant text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary"
          }`}
        >
          {listing.status === "Critical" ? "Buy Now" : "Review Offer"}
        </button>
      </div>
    </div>
  );
}
