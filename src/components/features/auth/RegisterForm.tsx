"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Registration API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to onboarding
      router.push("/onboarding");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface md:p-8 antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Main Container using clean shadcn Card */}
      <Card className="w-full max-w-[420px] bg-surface-container-lowest border-outline-variant shadow-sm overflow-hidden relative">
        {/* Header Section */}
        <CardHeader className="p-6 border-b border-outline-variant bg-surface-bright flex flex-col items-center text-center gap-2">
          {/* Brand Mark */}
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2 ring-1 ring-primary/20">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              inventory_2
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl font-bold text-primary">SaveHarvest</h1>
          <p className="font-body-sm text-sm text-on-surface-variant">
            Join the zero food waste logistics network
          </p>
        </CardHeader>

        {/* Form Section */}
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name Input */}
            <div className="flex flex-col gap-2">
              <Label
                className="font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block"
                htmlFor="fullName"
              >
                Full Name
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </span>
                <Input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 h-11 border-outline-variant bg-surface-container-lowest font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-primary/20 transition-all outline-none"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <Label
                className="font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block"
                htmlFor="email"
              >
                Work Email
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </span>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 border-outline-variant bg-surface-container-lowest font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-primary/20 transition-all outline-none"
                  placeholder="jane.doe@company.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <Label
                className="font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block"
                htmlFor="password"
              >
                Password
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 border-outline-variant bg-surface-container-lowest font-mono text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-primary/20 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary focus:outline-none flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              <p className="font-body-xs text-xs text-on-surface-variant mt-1">
                Must be at least 8 characters.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 font-semibold bg-primary text-on-primary hover:bg-surface-tint shadow-sm transition-all flex items-center justify-center gap-2 rounded-lg mt-4"
            >
              {loading ? "Creating Account..." : "Create Account"}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Button>
          </form>
        </CardContent>

        {/* Footer Actions */}
        <CardFooter className="p-4 border-t border-outline-variant bg-surface-container-low flex justify-center items-center">
          <p className="font-body-sm text-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link
              className="text-primary font-semibold hover:underline underline-offset-4 decoration-primary/50 transition-all"
              href="/login"
            >
              Log in instead
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
