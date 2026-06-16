"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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
          <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:border-primary hover:shadow-md transition-all">
            <h3 className="font-headline-md text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              Profile Settings
            </h3>
            
            <form onSubmit={handleProfileSave} className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-surface-container-high border-2 border-dashed border-outline-variant flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-primary group-hover:bg-surface-container">
                    <img
                      alt="Jane Doe headshot avatar"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-50 transition-opacity"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkYZANPzIg-Af4WduPkqI-BeNcKrZWWGyHZN8hmDHF6krIW-NIJL8Tpruz2P5QxceriLBsBW6jjx6n34ve3rGH7_K7Kw9YHcMiBZEKuK8yAkIVOtP6ZsAUx4Dx-lv2Z2J6XjQySWRYUsYTQS1nuLPxM2WaxBSAAb-ilL2oUOv7xAmiQBIhz21yaCiovwplvQ3pkfPCEJZRHai5zfDK2WPWWLHiZVgeGluGoUuCiwwwoJH8tXIRrPqJtPBic5LLGjHXoPrgzjyvpX94"
                    />
                    <span className="material-symbols-outlined absolute text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity text-[28px] pointer-events-none">
                      photo_camera
                    </span>
                  </div>
                </div>
                <button type="button" className="font-body-xs text-xs text-primary font-bold hover:underline">
                  Change Avatar
                </button>
              </div>

              {/* Form Fields */}
              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullname_input" className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider">
                      Full Name
                    </Label>
                    <Input
                      id="fullname_input"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-11 px-3 bg-surface-bright border border-outline-variant rounded-lg font-body-sm text-sm text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="role_input" className="block font-body-xs text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                      Operational Role
                    </Label>
                    <Input
                      id="role_input"
                      disabled
                      type="text"
                      value="Co-op Manager"
                      className="w-full h-11 px-3 bg-surface-container border border-outline-variant rounded-lg font-body-sm text-sm text-on-surface-variant cursor-not-allowed opacity-70"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email_input" className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider">
                    Email Address
                  </Label>
                  <Input
                    id="email_input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3 bg-surface-bright border border-outline-variant rounded-lg font-body-sm text-sm text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" className="h-10 px-5 bg-primary text-on-primary hover:bg-surface-tint font-semibold rounded-lg text-xs shadow-sm">
                    Save Profile Changes
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </section>

        {/* 2. Co-op Location Bento Card */}
        <section>
          <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:border-primary hover:shadow-md transition-all">
            <div className="p-6 border-b border-outline-variant bg-surface-bright">
              <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                Co-op Aggregation Point
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Satellite Map Area */}
              <div className="md:col-span-2 relative h-56 md:h-auto bg-surface-variant">
                <img
                  alt="Minimalist Satellite Map View"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJGZRlxWTBWumcqBgqH_zNFdKyFtLbh-O0jm1K36fNazA2N4jj9X4BBN2XcODgNymGOSbfs8vF80J7D47WNYq-5IM3xneZ9ebORuxxydShr-4bIVZqnQey6KkV1yGFx8UpxhjdIFTRv64656bV6uFedRsiMJMJ_qI3dgy4RAD8Q5viPMUJ7uwctBfC2cNZSet_6YofAavGGdfuRwb9LuolpOmbfa849m3HMra1BSGIy99k9W9VX_9cVQUpchIzTUd3446P3xQKL5NT"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-lowest/10 md:to-surface-container-lowest/70 pointer-events-none"></div>
              </div>
              
              {/* Location inputs */}
              <form onSubmit={handleLocationUpdate} className="p-6 bg-surface-container-lowest md:border-l border-outline-variant flex flex-col justify-between gap-4">
                <p className="font-body-xs text-xs text-on-surface-variant leading-relaxed">
                  Update active GPS coordinates to optimize commercial carrier routing and distance computations.
                </p>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="latitude_input" className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider">
                      Latitude
                    </Label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">
                        my_location
                      </span>
                      <Input
                        id="latitude_input"
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 bg-surface-bright border border-outline-variant rounded-lg font-mono text-xs text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="longitude_input" className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider">
                      Longitude
                    </Label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">
                        my_location
                      </span>
                      <Input
                        id="longitude_input"
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 bg-surface-bright border border-outline-variant rounded-lg font-mono text-xs text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <Button type="submit" className="w-full h-10 bg-primary text-on-primary hover:bg-surface-tint font-semibold rounded-lg text-xs flex justify-center items-center gap-2 mt-2 shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">update</span>
                  Update Location
                </Button>
              </form>
            </div>
          </Card>
        </section>

        {/* 3. Notification Preferences Bento Card */}
        <section>
          <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:border-primary hover:shadow-md transition-all">
            <h3 className="font-headline-md text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">campaign</span>
              Notification Preferences
            </h3>
            
            <div className="space-y-0 divide-y divide-outline-variant/30">
              {/* Alert 1 */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-body-sm text-sm font-semibold text-on-surface">Critical Spoilage Warnings</p>
                  <p className="font-body-xs text-xs text-on-surface-variant mt-0.5">Immediate notifications when batches approach perishability clock thresholds.</p>
                </div>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="font-body-xs text-xs text-on-surface-variant font-medium">SMS</span>
                    <Checkbox
                      checked={spoilageSMS}
                      onCheckedChange={(checked) => setSpoilageSMS(!!checked)}
                      className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="font-body-xs text-xs text-on-surface-variant font-medium">Email</span>
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
                  <p className="font-body-sm text-sm font-semibold text-on-surface">New Dispatch Assignments</p>
                  <p className="font-body-xs text-xs text-on-surface-variant mt-0.5">Alerts when carriers accept routes and start heading to your aggregation depot.</p>
                </div>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="font-body-xs text-xs text-on-surface-variant font-medium">SMS</span>
                    <Checkbox
                      checked={dispatchSMS}
                      onCheckedChange={(checked) => setDispatchSMS(!!checked)}
                      className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="font-body-xs text-xs text-on-surface-variant font-medium">Email</span>
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
                  <p className="font-body-sm text-sm font-semibold text-on-surface">Marketplace Sales</p>
                  <p className="font-body-xs text-xs text-on-surface-variant mt-0.5">Receipts and sales summaries when wholesale buyers purchase your crops.</p>
                </div>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="font-body-xs text-xs text-on-surface-variant font-medium">SMS</span>
                    <Checkbox
                      checked={salesSMS}
                      onCheckedChange={(checked) => setSalesSMS(!!checked)}
                      className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="font-body-xs text-xs text-on-surface-variant font-medium">Email</span>
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
