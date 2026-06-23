"use client";

import React from "react";
import { AddressManager } from "@/components/features/buyer/AddressManager";
import { PaymentMethodsForm } from "@/components/features/buyer/PaymentMethodsForm";

export default function BuyerSettingsPage() {
  return (
    <div className="flex flex-col gap-8 w-full py-2">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant pb-4">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Buyer Profile Settings</h1>
          <p className="font-body-lg text-sm text-on-surface-variant mt-1">
            Manage your corporate shipping facilities, payment methods, and net credit lines.
          </p>
        </div>
      </header>

      {/* Bento Grid Settings Sections */}
      <div className="flex flex-col gap-8 w-full">
        {/* Warehouse Locations Section */}
        <AddressManager />

        {/* Corporate Billing Methods Section */}
        <PaymentMethodsForm />
      </div>
    </div>
  );
}
