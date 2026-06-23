"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, Thermometer } from "lucide-react";
import { Input } from "@/components/ui/input";

export function VehicleDetailsForm() {
  const [licensePlate, setLicensePlate] = useState("XYZ-9876");
  const [maxCapacity, setMaxCapacity] = useState("12.5");
  const [refrigerationActive, setRefrigerationActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Vehicle settings saved successfully.");
    }, 1000);
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-shadow relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <ShieldCheck className="w-16 h-16 text-primary" />
      </div>

      <h2 className="font-headline-md text-base font-semibold text-on-surface mb-1 flex items-center gap-2">
        Vehicle Details
        <span className="w-2 h-2 rounded-full bg-status-safe inline-block"></span>
      </h2>
      <p className="text-xs text-on-surface-variant mb-6">
        Ensure these details are accurate before accepting dispatch orders.
      </p>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* License Plate Input */}
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1" htmlFor="license-plate">
            License Plate Number
          </label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <div className="w-6 h-4 bg-outline rounded-sm flex items-center justify-center text-[8px] font-bold text-white bg-slate-500">
                USA
              </div>
            </div>
            <Input
              id="license-plate"
              className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg pl-12 pr-4 py-4 font-mono-data text-base uppercase tracking-widest font-bold"
              placeholder="AAA-0000"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              type="text"
            />
          </div>
          <p className="text-[10px] text-on-surface-variant mt-1">
            Format: XXX-0000. Used for automated warehouse gate access.
          </p>
        </div>

        {/* Max Capacity Input */}
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1" htmlFor="max-capacity">
            Maximum Capacity (Tons)
          </label>
          <div className="flex items-center gap-4">
            <Input
              id="max-capacity"
              className="w-32 bg-surface text-on-surface border border-outline-variant rounded-lg px-4 py-4 font-mono-data text-base font-semibold text-right"
              placeholder="0.0"
              step="0.1"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              type="number"
            />
            <span className="text-sm font-semibold text-on-surface-variant">Tons Payload</span>
          </div>
        </div>

        <hr className="border-outline-variant my-2" />

        {/* Refrigeration Status Toggle */}
        <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-outline-variant">
          <div className="flex gap-3 items-start pr-4">
            <div className="bg-primary/10 p-2 rounded-lg text-primary mt-0.5">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-on-surface">Refrigeration Active</h4>
              <p className="text-xs text-on-surface-variant">
                Required for temperature-sensitive 'Cold Chain' batches.
              </p>
            </div>
          </div>
          {/* Custom Toggle Switch */}
          <label className="flex items-center cursor-pointer relative" htmlFor="refrigeration-toggle">
            <div className="relative">
              <input
                id="refrigeration-toggle"
                type="checkbox"
                checked={refrigerationActive}
                onChange={() => setRefrigerationActive(!refrigerationActive)}
                className="sr-only"
              />
              <div
                className={`block w-14 h-8 rounded-full border-2 border-outline-variant transition-colors duration-200 ${
                  refrigerationActive ? "bg-primary border-primary" : "bg-surface-dim"
                }`}
              ></div>
              <div
                className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 shadow-sm flex items-center justify-center ${
                  refrigerationActive ? "transform translate-x-6" : ""
                }`}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    refrigerationActive ? "bg-primary" : "bg-surface-dim"
                  }`}
                ></div>
              </div>
            </div>
          </label>
        </div>

        {/* Desktop Save Action */}
        <div className="hidden md:flex justify-end mt-4 pt-4 border-t border-outline-variant">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-primary text-white font-body-lg text-sm font-bold py-3 px-8 rounded-lg shadow-sm hover:bg-surface-tint hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Vehicle Settings"}
          </button>
        </div>

        {/* Mobile Save Action (Sticky simulation helper) */}
        <div className="md:hidden mt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-primary text-white font-body-lg text-sm font-bold py-3 rounded-lg shadow-sm hover:bg-surface-tint flex items-center justify-center gap-2 transition-all"
          >
            <Check className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
