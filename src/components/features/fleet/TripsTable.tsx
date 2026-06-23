"use client";

import React from "react";
import { ArrowRight, MapPin, Calendar, Clock, Navigation } from "lucide-react";

interface Trip {
  id: string;
  date: string;
  time: string;
  origin: string;
  destination: string;
  distance: string;
  status: "completed" | "delayed" | "cancelled";
  statusLabel: string;
  earnings: number;
}

const TRIPS: Trip[] = [
  {
    id: "t1",
    date: "Oct 24, 2023",
    time: "08:15 AM",
    origin: "Central Hub",
    destination: "Northside Retailers",
    distance: "14.2 mi",
    status: "completed",
    statusLabel: "Completed",
    earnings: 42.50,
  },
  {
    id: "t2",
    date: "Oct 23, 2023",
    time: "14:30 PM",
    origin: "West Port Terminal",
    destination: "Downtown Storage",
    distance: "8.7 mi",
    status: "completed",
    statusLabel: "Completed",
    earnings: 28.00,
  },
  {
    id: "t3",
    date: "Oct 23, 2023",
    time: "09:00 AM",
    origin: "Central Hub",
    destination: "Eastside Market (Delayed)",
    distance: "22.4 mi",
    status: "delayed",
    statusLabel: "Delayed",
    earnings: 65.20,
  },
];

export function TripsTable() {
  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col hover:shadow-[0_4px_15px_rgba(0,0,0,0.01)] transition-all">
      <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
        <h3 className="font-headline-md text-base font-semibold text-on-surface">Recent Trips</h3>
        <button className="text-primary hover:text-surface-tint font-body-sm text-xs font-semibold transition-colors flex items-center gap-1">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface border-b border-outline-variant">
              <th className="py-3 px-4 font-body-xs text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Date &amp; Time
              </th>
              <th className="py-3 px-4 font-body-xs text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Route
              </th>
              <th className="py-3 px-4 font-body-xs text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                Distance
              </th>
              <th className="py-3 px-4 font-body-xs text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                Status
              </th>
              <th className="py-3 px-4 font-body-xs text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold text-right">
                Earnings
              </th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-xs">
            {TRIPS.map((trip) => (
              <tr
                key={trip.id}
                className="border-b border-outline-variant hover:bg-surface-bright hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all group cursor-pointer"
              >
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="text-on-surface font-semibold">{trip.date}</span>
                    <span className="font-mono-data text-[10px] text-on-surface-variant mt-0.5">
                      {trip.time}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center gap-0.5 w-4 shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                      <div className="w-0.5 h-3.5 bg-outline-variant"></div>
                      <div className="w-1.5 h-1.5 rounded-full border border-primary"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-on-surface font-medium text-[13px]">{trip.origin}</span>
                      <span className="text-on-surface-variant text-[11px] mt-0.5">
                        {trip.destination}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right font-mono-data text-on-surface">
                  {trip.distance}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono-timer text-[10px] ${
                      trip.status === "completed"
                        ? "bg-status-safe/10 text-status-safe"
                        : "bg-status-warning/10 text-status-warning"
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${
                        trip.status === "completed" ? "bg-status-safe" : "bg-status-warning"
                      }`}
                    ></span>
                    {trip.statusLabel}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-mono-data text-status-safe font-bold text-sm">
                  ${trip.earnings.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List View */}
      <div className="md:hidden flex flex-col">
        {TRIPS.map((trip) => (
          <div
            key={trip.id}
            className="p-4 border-b border-outline-variant hover:bg-surface-bright active:bg-surface-container transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col">
                <span className="font-body-sm text-sm text-on-surface font-semibold">
                  {trip.date}
                </span>
                <span className="font-mono-data text-xs text-on-surface-variant">{trip.time}</span>
              </div>
              <span className="font-mono-data text-status-safe font-bold text-base">
                ${trip.earnings.toFixed(2)}
              </span>
            </div>

            <div className="flex items-start gap-3 bg-surface-container-low p-3 rounded-lg mb-3 border border-outline-variant/30">
              <div className="flex flex-col items-center gap-1 mt-1 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-outline"></div>
                <div className="w-0.5 h-6 bg-outline-variant"></div>
                <div className="w-1.5 h-1.5 rounded-full border border-primary"></div>
              </div>
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Pickup
                  </span>
                  <span className="text-xs font-semibold text-on-surface truncate">
                    {trip.origin}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                    Dropoff
                  </span>
                  <span className="text-xs font-semibold text-on-surface truncate">
                    {trip.destination}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="font-mono-data text-on-surface-variant">{trip.distance}</span>
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono-timer text-[10px] ${
                  trip.status === "completed"
                    ? "bg-status-safe/10 text-status-safe"
                    : "bg-status-warning/10 text-status-warning"
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full ${
                    trip.status === "completed" ? "bg-status-safe" : "bg-status-warning"
                  }`}
                ></span>
                {trip.statusLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
