"use client";

import React from "react";
import { StatusToggleCard } from "@/components/features/fleet/StatusToggleCard";
import { JobRequestsFeed } from "@/components/features/fleet/JobRequestsFeed";
import { LiveRouteMap } from "@/components/features/fleet/LiveRouteMap";

export default function FleetDashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full py-2">
      {/* Page Header */}
      <header className="flex justify-between items-center border-b border-outline-variant pb-4">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Operator Console</h1>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Live Dispatch &amp; Routing
          </p>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        {/* Left Column: Status & Mini-Map */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          <StatusToggleCard />
          <LiveRouteMap isMiniMap />
        </div>

        {/* Right Column: Incoming Job Requests Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          <JobRequestsFeed />
        </div>
      </div>
    </div>
  );
}
