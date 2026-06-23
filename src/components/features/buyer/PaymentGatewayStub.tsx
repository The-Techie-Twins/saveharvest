"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_LISTINGS } from "./FlashOrderGrid";

interface PaymentGatewayStubProps {
  batchId: string | null;
}

export function PaymentGatewayStub({ batchId }: PaymentGatewayStubProps) {
  const router = useRouter();
  const listing = MOCK_LISTINGS.find((l) => l.id === batchId) || MOCK_LISTINGS[0];

  const [warehouse, setWarehouse] = useState("Facility Alpha - Portland SE");
  const [paymentMethod, setPaymentMethod] = useState("escrow");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing calculations
  const subtotal = listing.volume * listing.discountedPrice;
  const logisticsFee = 85.00;
  const escrowFee = paymentMethod === "escrow" ? 15.00 : 0.00;
  const total = subtotal + logisticsFee + escrowFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment API transaction delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Route back to orders dashboard
      router.push("/buyer/orders?secured=true");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden">
      {isSubmitting && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="font-mono-data text-mono-data text-sm font-semibold text-primary">
            Securing Batch & Dispatching Fleet...
          </p>
        </div>
      )}

      {/* Logistics Selection */}
      <div className="flex flex-col gap-4">
        <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
          Logistics Destination
        </h3>
        <div className="flex flex-col gap-2">
          <label className="font-body-xs text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Select Delivery Warehouse
          </label>
          <div className="relative">
            <select
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
              className="w-full bg-surface-bright border border-outline-variant text-on-surface font-body-sm rounded-lg p-3 appearance-none focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors cursor-pointer"
            >
              <option>Facility Alpha - Portland SE</option>
              <option>Cold Storage Beta - Vancouver</option>
              <option>Hub Gamma - Hillsboro</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>

      <hr className="border-outline-variant/50" />

      {/* Payment Selection */}
      <div className="flex flex-col gap-4">
        <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">credit_card</span>
          Payment Method
        </h3>
        <div className="flex flex-col gap-3">
          {/* Option 1: Escrow */}
          <label
            onClick={() => setPaymentMethod("escrow")}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all relative overflow-hidden ${
              paymentMethod === "escrow"
                ? "border-primary bg-primary/5"
                : "border-outline-variant hover:border-outline bg-surface-bright"
            }`}
          >
            {paymentMethod === "escrow" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "escrow"}
                onChange={() => setPaymentMethod("escrow")}
                className="text-primary focus:ring-primary border-outline-variant cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                  PodFresh Escrow
                </span>
                <span className="font-body-xs text-body-xs text-on-surface-variant">
                  Funds released upon quality check
                </span>
              </div>
            </div>
            <span className={`material-symbols-outlined ${paymentMethod === "escrow" ? "text-primary" : "text-on-surface-variant"}`}>
              verified_user
            </span>
          </label>

          {/* Option 2: Line of Credit */}
          <label
            onClick={() => setPaymentMethod("credit")}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all relative overflow-hidden ${
              paymentMethod === "credit"
                ? "border-primary bg-primary/5"
                : "border-outline-variant hover:border-outline bg-surface-bright"
            }`}
          >
            {paymentMethod === "credit" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "credit"}
                onChange={() => setPaymentMethod("credit")}
                className="text-primary focus:ring-primary border-outline-variant cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                  Corporate Line of Credit
                </span>
                <span className="font-body-xs text-body-xs text-on-surface-variant">
                  Available Balance: $45,000
                </span>
              </div>
            </div>
            <span className={`material-symbols-outlined ${paymentMethod === "credit" ? "text-primary" : "text-on-surface-variant"}`}>
              account_balance
            </span>
          </label>
        </div>
      </div>

      <hr className="border-outline-variant/50" />

      {/* Order Breakdown */}
      <div className="flex flex-col gap-3 bg-surface-container-low p-4 rounded-lg">
        <div className="flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant">
          <span>Subtotal (Batch #PF-{listing.id}-STR)</span>
          <span className="font-mono-data text-mono-data text-on-surface font-semibold">
            ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant">
          <span>Cold-Chain Logistics Fee</span>
          <span className="font-mono-data text-mono-data text-on-surface font-semibold">
            ${logisticsFee.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant">
          <span>Escrow Transaction Fee</span>
          <span className="font-mono-data text-mono-data text-on-surface font-semibold">
            ${escrowFee.toFixed(2)}
          </span>
        </div>
        <div className="pt-3 mt-1 border-t border-outline-variant/60 flex justify-between items-end">
          <span className="font-headline-md text-on-surface font-semibold text-base">Total</span>
          <span className="font-headline-lg text-xl font-bold font-mono-data text-primary">
            ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-surface-tint text-on-primary font-headline-md text-base font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-2 shadow-sm cursor-pointer"
      >
        <span className="material-symbols-outlined">lock</span>
        Confirm & Secure Batch
      </button>
      <p className="text-center font-body-xs text-xs text-on-surface-variant">
        By confirming, you agree to the{" "}
        <a className="underline hover:text-primary transition-colors" href="#">
          Perishable Goods Terms of Service
        </a>
        .
      </p>
    </form>
  );
}
