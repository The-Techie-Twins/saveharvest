"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface md:p-8 antialiased">
      {/* Main Container using clean shadcn Card */}
      <Card className="w-full max-w-md bg-surface-container-lowest border-outline-variant shadow-sm p-8 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container rounded-full opacity-10 blur-3xl pointer-events-none"></div>

        {/* Header / Logo */}
        <CardHeader className="text-center mb-8 relative z-10 p-0">
          <h1 className="font-headline-md text-2xl text-primary font-bold tracking-tight mb-2">
            SaveHarvest
          </h1>
          <p className="font-body-sm text-sm text-on-surface-variant">
            Logistics Operations
          </p>
        </CardHeader>

        {/* Icon / Visual Indicator */}
        <div className="flex justify-center mb-6 relative z-10">
          <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center border border-surface-variant">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock_reset
            </span>
          </div>
        </div>

        {/* Form Content */}
        <CardContent className="p-0">
          {!submitted ? (
            <>
              <div className="text-center mb-6 relative z-10">
                <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-2">
                  Reset Password
                </h2>
                <p className="font-body-sm text-sm text-on-surface-variant">
                  Enter your operational email address. We&apos;ll send instructions to reset
                  your access credentials.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label
                    className="block font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-on-surface-variant text-lg">
                        mail
                      </span>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 border border-outline-variant bg-surface-container-lowest pl-10 pr-4 rounded-lg font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all outline-none"
                      placeholder="operator@saveharvest.com"
                    />
                  </div>
                </div>
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 font-semibold bg-primary text-on-primary hover:bg-surface-tint shadow-sm transition-all flex items-center justify-center gap-2 rounded-lg"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-4 relative z-10">
              <h2 className="font-headline-lg text-2xl font-bold text-on-surface">
                Check your email
              </h2>
              <p className="font-body-sm text-sm text-on-surface-variant">
                We have sent password reset instructions to <span className="font-semibold">{email}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-primary font-semibold hover:underline text-sm"
              >
                Resend link
              </button>
            </div>
          )}
        </CardContent>

        {/* Footer Links */}
        <div className="mt-8 text-center relative z-10">
          <Link
            href="/login"
            className="font-body-sm text-sm text-primary hover:text-surface-tint transition-colors inline-flex items-center gap-1 font-medium"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Return to Dispatch Login
          </Link>
        </div>
      </Card>

      {/* IT Support Contact */}
      <div className="fixed bottom-4 text-center w-full left-0 right-0">
        <p className="font-body-xs text-xs text-on-surface-variant">
          Need urgent access?{" "}
          <a href="#" className="text-primary hover:underline font-semibold">
            Contact IT Support
          </a>
        </p>
      </div>
    </div>
  );
}
