"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface RoleSelectorProps {
  selectedRole: string;
  onSelectRole: (role: string) => void;
  onNext: () => void;
}

export default function RoleSelector({
  selectedRole,
  onSelectRole,
  onNext,
}: RoleSelectorProps) {
  return (
    <Card className="w-full max-w-[1024px] bg-surface-container-lowest border-outline-variant shadow-sm flex flex-col overflow-hidden">
      {/* Header & Progress */}
      <CardHeader className="px-8 pt-8 pb-6 border-b border-surface-container">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
            Step 01 / 03
          </span>
          <span className="font-body-sm text-sm text-primary font-semibold">
            Role Selection
          </span>
        </div>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
          <div className="h-full bg-primary w-1/3 rounded-full transition-all duration-500 ease-out"></div>
        </div>
      </CardHeader>

      {/* Content Area */}
      <CardContent className="px-8 py-10 flex-1">
        <div className="max-w-2xl mb-8">
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface mb-3">
            Select your operational role
          </h1>
          <p className="font-body-lg text-base text-on-surface-variant">
            Choose your primary function within the SaveHarvest cold-chain network.
            This configuration dictates your default data views, predictive
            modeling tools, and dispatch permissions to minimize food waste.
          </p>
        </div>

        {/* Role Selector RadioGroup */}
        <RadioGroup
          value={selectedRole}
          onValueChange={onSelectRole}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Co-op Manager */}
          <label className="relative cursor-pointer group flex flex-col">
            <div
              className={`flex-1 p-6 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-primary ${
                selectedRole === "manager"
                  ? "border-primary bg-surface-bright shadow-md"
                  : "border-outline-variant bg-surface-container-lowest"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      selectedRole === "manager"
                        ? "bg-surface-container text-primary"
                        : "bg-surface-container-low text-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      warehouse
                    </span>
                  </div>
                  {/* shadcn RadioGroupItem */}
                  <RadioGroupItem
                    value="manager"
                    id="role-manager"
                    className="border-outline-variant text-primary focus-visible:ring-primary/20"
                  />
                </div>
                <h3 className="font-headline-md text-xl font-semibold text-on-surface mb-2">
                  Co-op Manager
                </h3>
                <p className="font-body-sm text-sm text-on-surface-variant">
                  Oversee aggregate inventory intake, manage supplier yields, and
                  monitor facility-wide perishability clocks to prevent crop loss.
                </p>
              </div>
            </div>
          </label>

          {/* Fleet Operator */}
          <label className="relative cursor-pointer group flex flex-col">
            <div
              className={`flex-1 p-6 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-primary ${
                selectedRole === "fleet"
                  ? "border-primary bg-surface-bright shadow-md"
                  : "border-outline-variant bg-surface-container-lowest"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      selectedRole === "fleet"
                        ? "bg-surface-container text-primary"
                        : "bg-surface-container-low text-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      local_shipping
                    </span>
                  </div>
                  {/* shadcn RadioGroupItem */}
                  <RadioGroupItem
                    value="fleet"
                    id="role-fleet"
                    className="border-outline-variant text-primary focus-visible:ring-primary/20"
                  />
                </div>
                <h3 className="font-headline-md text-xl font-semibold text-on-surface mb-2">
                  Fleet Operator
                </h3>
                <p className="font-body-sm text-sm text-on-surface-variant">
                  Manage active dispatch routes, monitor real-time telematics,
                  and optimize cold-chain transit constraints to avoid transport-related spoilage.
                </p>
              </div>
            </div>
          </label>

          {/* Wholesale Buyer */}
          <label className="relative cursor-pointer group flex flex-col">
            <div
              className={`flex-1 p-6 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-primary ${
                selectedRole === "buyer"
                  ? "border-primary bg-surface-bright shadow-md"
                  : "border-outline-variant bg-surface-container-lowest"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      selectedRole === "buyer"
                        ? "bg-surface-container text-primary"
                        : "bg-surface-container-low text-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      storefront
                    </span>
                  </div>
                  {/* shadcn RadioGroupItem */}
                  <RadioGroupItem
                    value="buyer"
                    id="role-buyer"
                    className="border-outline-variant text-primary focus-visible:ring-primary/20"
                  />
                </div>
                <h3 className="font-headline-md text-xl font-semibold text-on-surface mb-2">
                  Wholesale Buyer
                </h3>
                <p className="font-body-sm text-sm text-on-surface-variant">
                  Access marketplace listings, negotiate bulk acquisitions, and
                  track inbound deliveries directly to your depot to secure fresh surplus crops.
                </p>
              </div>
            </div>
          </label>
        </RadioGroup>
      </CardContent>

      {/* Footer Actions */}
      <footer className="px-8 py-5 bg-surface border-t border-surface-container flex justify-between items-center">
        <Button
          variant="outline"
          className="h-11 px-5 rounded-lg border border-outline text-on-surface font-medium hover:bg-surface-container-low transition-colors"
          disabled
          type="button"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedRole}
          className="h-11 px-6 font-semibold bg-primary text-on-primary hover:bg-surface-tint shadow-sm transition-all flex items-center justify-center gap-2 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
          type="button"
        >
          Next Step
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </Button>
      </footer>
    </Card>
  );
}
