"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { OrderSummaryCard } from "@/components/features/buyer/OrderSummaryCard";
import { PaymentGatewayStub } from "@/components/features/buyer/PaymentGatewayStub";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const batchId = searchParams.get("batchId");

  return (
    <div className="flex flex-col gap-6 w-full py-2">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-body-sm text-on-surface-variant font-semibold">
        <a className="hover:text-primary transition-colors cursor-pointer" href="/buyer/marketplace">
          Marketplace
        </a>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-surface">Secure Checkout</span>
      </div>

      {/* Header */}
      <header className="flex flex-col gap-1 border-b border-outline-variant pb-4">
        <h1 className="font-display text-2xl font-bold text-on-surface">Secure Batch Checkout</h1>
        <p className="font-body-lg text-sm text-on-surface-variant">
          Review batch perishability constraints and secure via PodFresh cold-chain logistics.
        </p>
      </header>

      {/* 60/40 Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        {/* Left Column: Order Summary */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          <OrderSummaryCard batchId={batchId} />
          
          {/* Optimized Route Map Context */}
          <div className="rounded-xl overflow-hidden h-48 border border-outline-variant relative bg-surface-container flex items-center justify-center">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
              alt="Optimized Route Map"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3z53xKzZCHHkF0rc7Iv_Cwi4Nz-DADUPt1yQQD5GfRidMBIJ5TLxmXD2zIFxGInQE8FMSJsyG6s3nYTKFXcYDiHBjXTM-A-y98rauGTsVgN6i_p8vHQe0XwrwadlyTICbvVod6Wdy230an4CQhoXy0O82uvXg4fNfJbLcJ_DbvJULKM465ZyOEGHvbv_1y18Kgdn29inO3jqlHWU6mT2bwKwPZcDjxWdLQCFpcTGMV9BNEEgohFqznSnsC5-K0hvb85S41i28fLSz"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
            <div className="relative z-10 flex items-center gap-2 bg-surface bg-opacity-95 px-4 py-2 rounded-lg shadow-sm border border-outline-variant backdrop-blur-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">local_shipping</span>
              <span className="font-mono-data text-mono-data text-xs text-on-surface font-semibold">
                Route Optimized: I-5 North Cold Chain Corridor
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Payment & Logistics Selection */}
        <div className="lg:col-span-5 w-full">
          <PaymentGatewayStub batchId={batchId} />
        </div>
      </div>
    </div>
  );
}

export default function BuyerCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-1 items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
