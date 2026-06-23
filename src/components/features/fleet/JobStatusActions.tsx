"use client";

import React, { useState } from "react";
import { CheckCircle, MapPin } from "lucide-react";

interface JobStatusActionsProps {
  onStatusChange?: (status: "assigned" | "picked_up" | "completed") => void;
}

export function JobStatusActions({ onStatusChange }: JobStatusActionsProps) {
  const [step, setStep] = useState<"assign" | "pickup" | "dropoff">("assign");

  const handlePickup = () => {
    setStep("pickup");
    if (onStatusChange) onStatusChange("picked_up");
  };

  const handleDropoff = () => {
    setStep("dropoff");
    if (onStatusChange) onStatusChange("completed");
  };

  const handleReset = () => {
    setStep("assign");
    if (onStatusChange) onStatusChange("assigned");
  };

  return (
    <div className="bg-white dark:bg-zinc-850 p-4 rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] border border-outline-variant z-20">
      <h2 className="font-headline-md text-base font-semibold text-on-surface mb-4">Job Actions</h2>
      <div className="flex flex-col gap-3">
        {step === "dropoff" ? (
          <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm font-semibold text-primary mb-2">Transit Completed Successfully!</p>
            <button
              onClick={handleReset}
              className="text-xs text-primary underline hover:text-surface-tint"
            >
              Reset Simulation
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handlePickup}
              disabled={step !== "assign"}
              className={`w-full font-body-lg text-sm font-semibold py-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all ${
                step === "assign"
                  ? "bg-primary text-white hover:bg-surface-tint active:scale-[0.98]"
                  : "bg-surface-container text-on-surface-variant/50 border border-outline-variant opacity-60 cursor-not-allowed"
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              {step === "assign" ? "Confirm Pickup" : "Pickup Confirmed"}
            </button>

            <button
              onClick={handleDropoff}
              disabled={step !== "pickup"}
              className={`w-full font-body-lg text-sm font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                step === "pickup"
                  ? "bg-primary text-white hover:bg-surface-tint active:scale-[0.98]"
                  : "bg-surface-container text-on-surface-variant/40 border border-outline-variant opacity-60 cursor-not-allowed"
              }`}
            >
              <MapPin className="w-5 h-5" />
              Confirm Dropoff
            </button>
          </>
        )}
      </div>
    </div>
  );
}
