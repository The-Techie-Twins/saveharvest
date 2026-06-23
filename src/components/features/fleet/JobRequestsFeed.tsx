"use client";

import React, { useState, useEffect } from "react";

interface Job {
  id: string;
  batchId: string;
  urgency: "critical" | "warning";
  urgencyLabel: string;
  origin: string;
  timeToSpoilage: number; // in seconds
  volume: string;
  payout: number;
  distance: string;
}

const INITIAL_JOBS: Job[] = [
  {
    id: "1",
    batchId: "REQ-8821",
    urgency: "critical",
    urgencyLabel: "URGENT: CHILLED",
    origin: "Distribution Hub Alpha",
    timeToSpoilage: 2712, // 45m 12s
    volume: "2.4 m³",
    payout: 145.00,
    distance: "12.4 mi",
  },
  {
    id: "2",
    batchId: "REQ-8822",
    urgency: "warning",
    urgencyLabel: "WARNING: FRESH",
    origin: "Local Farm Co-op",
    timeToSpoilage: 8100, // 2h 15m 00s
    volume: "1.8 m³",
    payout: 95.50,
    distance: "8.1 mi",
  },
];

export function JobRequestsFeed() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  // Spoilage countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setJobs((prevJobs) =>
        prevJobs
          .map((job) => ({
            ...job,
            timeToSpoilage: Math.max(0, job.timeToSpoilage - 1),
          }))
          .filter((job) => job.timeToSpoilage > 0)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAccept = (jobId: string) => {
    alert(`Accepted Job ${jobId}. Redirecting to route map...`);
    setJobs((prevJobs) => prevJobs.filter((j) => j.id !== jobId));
  };

  const handleDecline = (jobId: string) => {
    if (confirm(`Are you sure you want to decline Job ${jobId}?`)) {
      setJobs((prevJobs) => prevJobs.filter((j) => j.id !== jobId));
    }
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-headline-md text-lg font-semibold text-on-background">Incoming Requests</h3>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-mono-data text-xs font-semibold">
          {jobs.length} PENDING
        </span>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-8 text-center text-on-surface-variant text-sm">
          No pending dispatch jobs at the moment.
        </div>
      ) : (
        jobs.map((job) => (
          <article
            key={job.id}
            className={`bg-surface-container-lowest rounded-xl border-l-4 ${
              job.urgency === "critical"
                ? "border-l-status-critical"
                : "border-l-status-warning"
            } border-y border-r border-outline-variant p-5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span
                  className={`px-2 py-0.5 rounded font-mono-timer text-xs font-bold mb-2 inline-block ${
                    job.urgency === "critical"
                      ? "bg-status-critical/10 text-status-critical"
                      : "bg-status-warning/10 text-status-warning"
                  }`}
                >
                  {job.urgencyLabel}
                </span>
                <h4 className="font-headline-md text-base font-semibold text-on-background">
                  Batch {job.batchId}
                </h4>
                <p className="text-xs text-on-surface-variant">Origin: {job.origin}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-on-surface-variant">Time to Spoilage</p>
                <p
                  className={`font-mono-timer text-sm font-bold ${
                    job.urgency === "critical"
                      ? "text-status-critical"
                      : "text-status-warning"
                  }`}
                >
                  {formatTime(job.timeToSpoilage)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 bg-surface p-3 rounded-lg border border-outline-variant">
              <div>
                <p className="text-xs text-on-surface-variant">Volume</p>
                <p className="font-mono-data text-xs font-semibold text-on-background">
                  {job.volume}
                </p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant">Est. Payout</p>
                <p className="font-mono-data text-xs font-semibold text-on-background">
                  ${job.payout.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant">Distance</p>
                <p className="font-mono-data text-xs font-semibold text-on-background">
                  {job.distance}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleAccept(job.batchId)}
                className="flex-1 bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-surface-tint transition-colors"
              >
                Accept Job
              </button>
              <button
                onClick={() => handleDecline(job.batchId)}
                className="px-6 bg-surface border border-outline-variant text-on-surface-variant py-2 rounded-lg text-sm font-medium hover:bg-surface-container transition-colors"
              >
                Decline
              </button>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
