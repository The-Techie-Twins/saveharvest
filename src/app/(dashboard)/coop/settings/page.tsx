"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/features/coop/ProfileForm";
import { LocationUpdater } from "@/components/features/coop/LocationUpdater";
import { NotificationPreferences } from "@/components/features/coop/NotificationPreferences";

export default function CoopSettingsPage() {
  // Form and Toast Notification states
  const [fullName, setFullName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane.doe@saveharvest.co");
  const [latitude, setLatitude] = useState("36.6777");
  const [longitude, setLongitude] = useState("-121.6555");
  
  // Custom switch toggles
  const [spoilageSMS, setSpoilageSMS] = useState(true);
  const [spoilageEmail, setSpoilageEmail] = useState(true);
  const [dispatchSMS, setDispatchSMS] = useState(false);
  const [dispatchEmail, setDispatchEmail] = useState(true);
  const [salesSMS, setSalesSMS] = useState(false);
  const [salesEmail, setSalesEmail] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile settings saved successfully.");
  };

  const handleLocationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Co-op Aggregation point updated to ${latitude}, ${longitude}`);
  };

  const handleSaveAll = () => {
    showToast("All workspace configurations synchronized successfully.");
  };

  return (
    <main className="flex-1 p-6 md:p-8 bg-surface min-h-screen relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 font-semibold text-sm animate-fade-in">
          <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
          {toastMessage}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-outline-variant pb-6">
          <h1 className="font-headline-lg text-3xl font-bold text-on-surface mb-2">
            Workspace Settings
          </h1>
          <p className="font-body-lg text-sm text-on-surface-variant">
            Manage your personal profile, GPS aggregation location, and notifications.
          </p>
        </div>

        {/* 1. Profile Settings Bento Card */}
        <section>
          <ProfileForm
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            onSubmit={handleProfileSave}
          />
        </section>

        {/* 2. Co-op Location Bento Card */}
        <section>
          <LocationUpdater
            latitude={latitude}
            setLatitude={setLatitude}
            longitude={longitude}
            setLongitude={setLongitude}
            onSubmit={handleLocationUpdate}
          />
        </section>

        {/* 3. Notification Preferences Bento Card */}
        <section>
          <NotificationPreferences
            spoilageSMS={spoilageSMS}
            setSpoilageSMS={setSpoilageSMS}
            spoilageEmail={spoilageEmail}
            setSpoilageEmail={setSpoilageEmail}
            dispatchSMS={dispatchSMS}
            setDispatchSMS={setDispatchSMS}
            dispatchEmail={dispatchEmail}
            setDispatchEmail={setDispatchEmail}
            salesSMS={salesSMS}
            setSalesSMS={setSalesSMS}
            salesEmail={salesEmail}
            setSalesEmail={setSalesEmail}
          />
        </section>

        {/* Global Save Button */}
        <div className="pt-2 pb-10 flex justify-end">
          <Button
            onClick={handleSaveAll}
            className="w-full sm:w-auto h-12 px-6 bg-primary text-on-primary hover:bg-surface-tint font-semibold rounded-lg text-sm shadow-md flex justify-center items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">save</span>
            Save All Settings
          </Button>
        </div>
      </div>
    </main>
  );
}
