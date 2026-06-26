"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileFormProps {
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProfileForm({
  fullName,
  setFullName,
  email,
  setEmail,
  onSubmit,
}: ProfileFormProps) {
  return (
    <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:border-primary hover:shadow-md transition-all">
      <h3 className="font-headline-md text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">person</span>
        Profile Settings
      </h3>

      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-8 items-start">
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
          <button
            type="button"
            className="font-body-xs text-xs text-primary font-bold hover:underline"
          >
            Change Avatar
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex-1 w-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="fullname_input"
                className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider"
              >
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
              <Label
                htmlFor="role_input"
                className="block font-body-xs text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
              >
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
            <Label
              htmlFor="email_input"
              className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider"
            >
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
            <Button
              type="submit"
              className="h-10 px-5 bg-primary text-on-primary hover:bg-surface-tint font-semibold rounded-lg text-xs shadow-sm"
            >
              Save Profile Changes
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
