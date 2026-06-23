"use client";

import React, { useState, useEffect } from "react";
import { Timer, AlertTriangle, Thermometer } from "lucide-react";
import { LiveRouteMap } from "@/components/features/fleet/LiveRouteMap";
import { JobStatusActions } from "@/components/features/fleet/JobStatusActions";
import { EmergencyReportButton } from "@/components/features/fleet/EmergencyReportButton";

export default function ActiveJobPage() {
  const [showWarning, setShowWarning] = useState(false);
  const [temperature, setTemperature] = useState(3.2);
  const [jobStatus, setJobStatus] = useState<"assigned" | "picked_up" | "completed">("assigned");

  // Simulate cold chain warning after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWarning(true);
      setTemperature(4.1); // Rise temperature to trigger warning visual
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = (newStatus: "assigned" | "picked_up" | "completed") => {
    setJobStatus(newStatus);
    if (newStatus === "completed") {
      setShowWarning(false);
      setTemperature(3.5); // Normalize temperature on dropoff
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full py-2">
      {/* Page Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-outline-variant pb-4 gap-4">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Active Transit Control</h1>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Real-time cold-chain route monitoring & driver checkpoints
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant">
            <Thermometer className={`w-4 h-4 ${temperature > 4.0 ? "text-status-critical animate-pulse" : "text-primary"}`} />
            <span className={`font-mono-data text-xs font-bold ${temperature > 4.0 ? "text-status-critical" : "text-primary"}`}>
              {temperature.toFixed(1)}°C
            </span>
          </div>
        </div>
      </header>

      {/* Warning Banner */}
      {showWarning && jobStatus !== "completed" && (
        <div className="bg-error-container border-l-4 border-error p-4 rounded shadow-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-on-error-container">Cold Chain Deviation Alert</p>
            <p className="text-xs text-on-error-container opacity-90 mt-0.5">
              Temperature rising towards {temperature.toFixed(1)}°C. Check containment seals and refrigeration status.
            </p>
          </div>
        </div>
      )}

      {/* Main Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        {/* Left Container: Route Map */}
        <div className="lg:col-span-8 flex flex-col gap-4 w-full">
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex justify-between items-center shadow-sm">
            <div>
              <h2 className="font-headline-md text-base font-semibold text-on-surface mb-0.5">
                {jobStatus === "completed" ? "Completed Job #JOB-1234" : "Job #JOB-1234"}
              </h2>
              <p className="text-xs text-on-surface-variant">
                {jobStatus === "assigned" && "Assigned Route: Transit to pickup location"}
                {jobStatus === "picked_up" && "Active Transit: On route to Central Hub"}
                {jobStatus === "completed" && "Delivered: Unloading at Central Hub"}
              </p>
            </div>
            <div className="bg-primary-container text-on-primary-container px-2.5 py-1 rounded-lg font-mono-timer text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <Timer className="w-4 h-4" />
              <span>{jobStatus === "completed" ? "00:00:00" : "01:45:00"}</span>
            </div>
          </div>

          <LiveRouteMap />
        </div>

        {/* Right Container: Actions Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          <JobStatusActions onStatusChange={handleStatusChange} />
          <EmergencyReportButton />
        </div>
      </div>
    </div>
  );
}
