"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BuyerDetailsFormProps {
  onBack: () => void;
  onSubmit: (data: any) => void;
}

export default function BuyerDetailsForm({
  onBack,
  onSubmit,
}: BuyerDetailsFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [capacity, setCapacity] = useState("");
  const [depotAddress, setDepotAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ companyName, taxId, capacity, depotAddress });
  };

  return (
    <main className="w-full max-w-3xl">
      {/* Main Card using clean shadcn Card */}
      <Card className="bg-surface-container-lowest rounded-xl border-outline-variant shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-surface-variant bg-surface">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-headline-lg text-2xl font-bold text-primary tracking-tight">
              SaveHarvest
            </h1>
            <span className="font-mono text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">
              Step 2 of 3
            </span>
          </div>
          <h2 className="font-headline-md text-xl font-semibold text-on-surface mb-2">
            Buyer Details
          </h2>
          <p className="font-body-lg text-sm text-on-surface-variant">
            Configure your wholesale warehouse settings to receive surplus food shipments.
          </p>
          {/* Progress Bar */}
          <div className="w-full bg-surface-container-high h-2 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 ease-in-out"
              style={{ width: "66%" }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
            <span>Account Profile</span>
            <span className="text-primary font-bold">Buyer Details</span>
            <span>Billing Setup</span>
          </div>
        </div>

        {/* Form Body */}
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <Label
                  className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2"
                  htmlFor="company_name"
                >
                  Company / Organization Name
                </Label>
                <Input
                  id="company_name"
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full h-11 border border-outline-variant bg-surface-container-lowest px-4 rounded-lg font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none"
                  placeholder="e.g., Organic Foods Co."
                />
              </div>

              {/* Tax ID */}
              <div>
                <Label
                  className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2"
                  htmlFor="tax_id"
                >
                  Business License / Tax ID
                </Label>
                <Input
                  id="tax_id"
                  type="text"
                  required
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="w-full h-11 border border-outline-variant bg-surface-container-lowest px-4 rounded-lg font-mono text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none uppercase"
                  placeholder="e.g., TAX-98765432"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Capacity */}
              <div>
                <Label
                  className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2"
                  htmlFor="capacity"
                >
                  Weekly Target Storage Volume
                </Label>
                <div className="relative">
                  <Input
                    id="capacity"
                    type="number"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full h-11 border border-outline-variant bg-surface-container-lowest pl-4 pr-16 rounded-lg font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="font-mono text-xs text-on-surface-variant font-bold">
                      KG
                    </span>
                  </div>
                </div>
              </div>

              {/* Depot Address */}
              <div>
                <Label
                  className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2"
                  htmlFor="depot_address"
                >
                  Primary Delivery Depot Address
                </Label>
                <Input
                  id="depot_address"
                  type="text"
                  required
                  value={depotAddress}
                  onChange={(e) => setDepotAddress(e.target.value)}
                  className="w-full h-11 border border-outline-variant bg-surface-container-lowest px-4 rounded-lg font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none"
                  placeholder="e.g., 500 Logistics Way, Fresno, CA"
                />
              </div>
            </div>

            {/* Verification Upload Note */}
            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 mt-6">
              <div className="flex items-start gap-4">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  info
                </span>
                <div>
                  <h3 className="font-body-sm text-sm font-semibold text-on-surface">
                    DEPOT ASSIGNMENTS
                  </h3>
                  <p className="font-body-xs text-xs text-on-surface-variant mt-1">
                    Your depot address will be verified for delivery route feasibility
                    by the local dispatch team before your first shipment.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-surface-variant bg-surface flex justify-between items-center">
              <Button
                variant="outline"
                onClick={onBack}
                className="h-11 px-5 rounded-lg border border-outline text-on-surface font-medium hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                Back
              </Button>
              <Button
                className="h-11 px-6 font-semibold bg-primary text-on-primary hover:bg-surface-tint shadow-sm transition-all flex items-center justify-center gap-2 rounded-lg"
                type="submit"
              >
                Finish Setup
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
