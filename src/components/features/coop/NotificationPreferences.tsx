"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface NotificationPreferencesProps {
  spoilageSMS: boolean;
  setSpoilageSMS: (val: boolean) => void;
  spoilageEmail: boolean;
  setSpoilageEmail: (val: boolean) => void;
  dispatchSMS: boolean;
  setDispatchSMS: (val: boolean) => void;
  dispatchEmail: boolean;
  setDispatchEmail: (val: boolean) => void;
  salesSMS: boolean;
  setSalesSMS: (val: boolean) => void;
  salesEmail: boolean;
  setSalesEmail: (val: boolean) => void;
}

export function NotificationPreferences({
  spoilageSMS,
  setSpoilageSMS,
  spoilageEmail,
  setSpoilageEmail,
  dispatchSMS,
  setDispatchSMS,
  dispatchEmail,
  setDispatchEmail,
  salesSMS,
  setSalesSMS,
  salesEmail,
  setSalesEmail,
}: NotificationPreferencesProps) {
  return (
    <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:border-primary hover:shadow-md transition-all">
      <h3 className="font-headline-md text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">campaign</span>
        Notification Preferences
      </h3>

      <div className="space-y-0 divide-y divide-outline-variant/30">
        {/* Alert 1 */}
        <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-body-sm text-sm font-semibold text-on-surface">
              Critical Spoilage Warnings
            </p>
            <p className="font-body-xs text-xs text-on-surface-variant mt-0.5">
              Immediate notifications when batches approach perishability clock
              thresholds.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-body-xs text-xs text-on-surface-variant font-medium">
                SMS
              </span>
              <Checkbox
                checked={spoilageSMS}
                onCheckedChange={(checked) => setSpoilageSMS(!!checked)}
                className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-body-xs text-xs text-on-surface-variant font-medium">
                Email
              </span>
              <Checkbox
                checked={spoilageEmail}
                onCheckedChange={(checked) => setSpoilageEmail(!!checked)}
                className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            </label>
          </div>
        </div>

        {/* Alert 2 */}
        <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-body-sm text-sm font-semibold text-on-surface">
              New Dispatch Assignments
            </p>
            <p className="font-body-xs text-xs text-on-surface-variant mt-0.5">
              Alerts when carriers accept routes and start heading to your
              aggregation depot.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-body-xs text-xs text-on-surface-variant font-medium">
                SMS
              </span>
              <Checkbox
                checked={dispatchSMS}
                onCheckedChange={(checked) => setDispatchSMS(!!checked)}
                className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-body-xs text-xs text-on-surface-variant font-medium">
                Email
              </span>
              <Checkbox
                checked={dispatchEmail}
                onCheckedChange={(checked) => setDispatchEmail(!!checked)}
                className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            </label>
          </div>
        </div>

        {/* Alert 3 */}
        <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-body-sm text-sm font-semibold text-on-surface">
              Marketplace Sales
            </p>
            <p className="font-body-xs text-xs text-on-surface-variant mt-0.5">
              Receipts and sales summaries when wholesale buyers purchase your
              crops.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-body-xs text-xs text-on-surface-variant font-medium">
                SMS
              </span>
              <Checkbox
                checked={salesSMS}
                onCheckedChange={(checked) => setSalesSMS(!!checked)}
                className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="font-body-xs text-xs text-on-surface-variant font-medium">
                Email
              </span>
              <Checkbox
                checked={salesEmail}
                onCheckedChange={(checked) => setSalesEmail(!!checked)}
                className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
}
