"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState<"Weak" | "Medium" | "Strong">("Weak");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!password) {
      setStrength("Weak");
    } else if (password.length > 10) {
      setStrength("Strong");
    } else {
      setStrength("Medium");
    }
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Password updated successfully!");
      router.push("/login");
    }, 1000);
  };

  const getStrengthBarClasses = () => {
    switch (strength) {
      case "Weak":
        return {
          bar1: "bg-status-critical",
          bar2: "bg-surface-container-high",
          bar3: "bg-surface-container-high",
          text: "text-status-critical",
        };
      case "Medium":
        return {
          bar1: "bg-status-warning",
          bar2: "bg-status-warning",
          bar3: "bg-surface-container-high",
          text: "text-status-warning",
        };
      case "Strong":
        return {
          bar1: "bg-status-safe",
          bar2: "bg-status-safe",
          bar3: "bg-status-safe",
          text: "text-status-safe",
        };
    }
  };

  const barClasses = getStrengthBarClasses();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface md:p-8 antialiased">
      {/* Transactional Page using clean shadcn Card */}
      <Card className="w-full max-w-md bg-surface-container-lowest border-outline-variant shadow-sm p-8 relative overflow-hidden">
        {/* Subtle Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

        {/* Header */}
        <CardHeader className="text-center mb-8 p-0">
          <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-2">
            Reset Password
          </h1>
          <p className="font-body-sm text-sm text-on-surface-variant">
            Please enter your new password below.
          </p>
        </CardHeader>

        {/* Form */}
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Input */}
            <div className="space-y-2">
              <Label
                className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2"
                htmlFor="new-password"
              >
                New Password
              </Label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                  data-icon="lock"
                >
                  lock
                </span>
                <Input
                  id="new-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 border border-outline-variant bg-surface-container-lowest pl-10 pr-4 rounded-lg font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Strength Indicator */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-body-xs text-xs text-on-surface-variant">
                  Password Strength
                </span>
                <span className={`font-mono text-xs font-bold ${barClasses.text}`}>
                  {strength}
                </span>
              </div>
              <div className="flex gap-1 h-1 w-full rounded-full overflow-hidden bg-surface-container-highest">
                <div className={`h-full w-1/3 transition-all duration-300 ${barClasses.bar1}`}></div>
                <div className={`h-full w-1/3 transition-all duration-300 ${barClasses.bar2}`}></div>
                <div className={`h-full w-1/3 transition-all duration-300 ${barClasses.bar3}`}></div>
              </div>
              <p className="font-body-xs text-xs text-on-surface-variant mt-1">
                Must be at least 8 characters long.
              </p>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <Label
                className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2"
                htmlFor="confirm-password"
              >
                Confirm New Password
              </Label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                  data-icon="lock_reset"
                >
                  lock_reset
                </span>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-11 border border-outline-variant bg-surface-container-lowest pl-10 pr-4 rounded-lg font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 font-semibold bg-primary text-on-primary hover:bg-surface-tint shadow-sm transition-all flex items-center justify-center gap-2 rounded-lg"
              >
                <span>{loading ? "Updating..." : "Update Password"}</span>
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </Button>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="font-body-sm text-sm text-primary hover:text-surface-tint transition-colors font-medium"
              >
                Return to Login
              </Link>
            </div>
          </form>
        </CardContent>

        {/* Brand Footer */}
        <div className="mt-8 pt-4 border-t border-outline-variant text-center">
          <span className="font-headline-md text-xl font-bold text-primary tracking-tight">
            SaveHarvest
          </span>
          <p className="font-body-xs text-xs text-on-surface-variant mt-1">
            Logistics &amp; Operational View
          </p>
        </div>
      </Card>
    </div>
  );
}
