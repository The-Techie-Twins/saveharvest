"use client";

import React, { useState } from "react";
import { User, Phone, Mail, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { VehicleDetailsForm } from "@/components/features/fleet/VehicleDetailsForm";

export default function FleetSettingsPage() {
  const [driverName, setDriverName] = useState("John Doe");
  const [driverPhone, setDriverPhone] = useState("+1 (555) 019-2834");
  const [driverEmail, setDriverEmail] = useState("john.doe@podfresh.logistics");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      alert("Driver profile updated successfully.");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 w-full py-2">
      {/* Page Header */}
      <header className="border-b border-outline-variant pb-4">
        <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Settings</h1>
        <p className="font-body-sm text-sm text-on-surface-variant mt-1">
          Manage your driver profile and vehicle specifications.
        </p>
      </header>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full">
        {/* Left Column: Driver Profile */}
        <div className="md:col-span-5 lg:col-span-4 w-full">
          <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <UserCheck className="w-16 h-16 text-secondary" />
            </div>

            <h2 className="font-headline-md text-base font-semibold text-on-surface mb-6">
              Driver Profile
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant shrink-0">
                <User className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-body-lg text-sm font-semibold text-on-surface">{driverName}</h3>
                <p className="text-xs text-on-surface-variant font-mono-data">Fleet ID: D-4829</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1" htmlFor="driver-name">
                  Full Name
                </label>
                <Input
                  id="driver-name"
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Enter your full name"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  type="text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1" htmlFor="driver-phone">
                  Contact Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant pointer-events-none">
                    <Phone className="w-4 h-4 text-on-surface-variant" />
                  </span>
                  <Input
                    id="driver-phone"
                    className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg pl-10 pr-4 py-3 font-mono-data text-xs"
                    placeholder="+1 (___) ___-____"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    type="tel"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1" htmlFor="driver-email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant pointer-events-none">
                    <Mail className="w-4 h-4 text-on-surface-variant" />
                  </span>
                  <Input
                    id="driver-email"
                    className="w-full bg-surface text-on-surface border border-outline-variant rounded-lg pl-10 pr-4 py-3 text-sm"
                    placeholder="driver@example.com"
                    value={driverEmail}
                    onChange={(e) => setDriverEmail(e.target.value)}
                    type="email"
                  />
                </div>
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="w-full bg-secondary text-white font-body-sm text-xs font-semibold py-2.5 rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-sm"
                >
                  {isSavingProfile ? "Saving Profile..." : "Update Contact Profile"}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Right Column: Vehicle Details Form */}
        <div className="md:col-span-7 lg:col-span-8 w-full">
          <VehicleDetailsForm />
        </div>
      </div>
    </div>
  );
}
