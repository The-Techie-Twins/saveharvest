"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ActiveOrdersList } from "@/components/features/buyer/ActiveOrdersList";
import { InvoicesTable } from "@/components/features/buyer/InvoicesTable";

function OrdersContent() {
  const searchParams = useSearchParams();
  const showSecuredBanner = searchParams.get("secured") === "true";

  return (
    <div className="flex flex-col gap-6 w-full py-2">
      {/* Dynamic Success Notification */}
      {showSecuredBanner && (
        <div className="bg-primary/10 border border-primary text-primary px-4 py-3 rounded-xl flex items-center justify-between animate-fade-in shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">check_circle</span>
            <span className="font-body-sm text-sm font-semibold">
              Batch successfully secured! Escrow funds locked and transit fleet dispatched.
            </span>
          </div>
          <button
            onClick={() => {
              // Simply clear search query param visual by refreshing URL or state (alert/alert close is fine too)
              window.history.replaceState({}, document.title, window.location.pathname);
            }}
            className="text-primary hover:text-surface-tint font-bold text-xs"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant pb-4">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Active Orders Overview</h1>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Monitor real-time cold-chain logistics telemetry and past invoices.
          </p>
        </div>
      </header>

      {/* Active In-flight Telemetry Section */}
      <section className="flex flex-col gap-3">
        <h2 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-status-warning">bolt</span>
          In-Flight Logistics Telemetry
        </h2>
        <ActiveOrdersList />
      </section>

      {/* Invoices and Billing section */}
      <InvoicesTable />
    </div>
  );
}

export default function BuyerOrdersPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}
