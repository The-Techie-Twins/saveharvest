"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Login
    setTimeout(() => {
      setLoading(false);
      // Redirect to onboarding
      router.push("/onboarding");
    }, 1000);
  };

  return (
    <div className="flex w-full h-screen bg-surface">
      {/* Left Side: Image (Hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative bg-surface-dim">
        <img
          alt="Cold Chain Warehouse"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUNzhMs5ylt26JjlEK6BmGPS4kpmqDGzXLUCEVa0vHlDmHuQpxHYO3dxRkexd-DnD7JAlKQNmTW6qqsk54hbkG5Fucz8RLWye-e8HuuoO2EvV-NwpmCsl1MjK5BbZ8OmHUz8BLFn4ie-6fHZmQKvn6j96f1ruel5SiD5Mk0AN0iEqcxHvFW5Sl80qTtEMwWdh5uPiWjSpY5QEX8OPHANQz__P5tPh4ckqh3olD7Bz1xN2ykyn1_-RqSYfJ6WWnOJl3JFJtUPoB83_H"
        />
        {/* Dark overlay for brand aesthetic */}
        <div className="absolute inset-0 bg-inverse-surface/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-on-primary">
          <h2 className="font-headline-lg text-3xl mb-2 font-bold">
            Zero Food Waste Logistics
          </h2>
          <p className="font-body-lg text-base text-inverse-on-surface opacity-90 max-w-md">
            Preventing crop spoilage and food waste through real-time telemetry
            and optimized dispatch routing.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form wrapped in Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-bright">
        <Card className="w-full max-w-md bg-surface-container-lowest border-outline-variant shadow-sm p-8">
          {/* Brand / Logo Area */}
          <div className="text-center lg:text-left mb-8">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <span
                className="material-symbols-outlined text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_shipping
              </span>
              <h1 className="font-display text-4xl font-bold tracking-tight text-primary">
                SaveHarvest
              </h1>
            </div>
            <h2 className="font-headline-lg text-2xl font-semibold text-on-surface mb-2">
              Welcome Back
            </h2>
            <p className="font-body-sm text-sm text-on-surface-variant">
              Enter your credentials to access the zero-waste dispatch console.
            </p>
          </div>

          {/* Form */}
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  className="font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block mb-2"
                  htmlFor="email"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 border-outline-variant bg-surface-container-lowest font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-primary/20 transition-all outline-none"
                    placeholder="operator@saveharvest.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <Label
                    className="font-body-xs text-xs font-semibold text-on-surface uppercase tracking-wider block"
                    htmlFor="password"
                  >
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="font-body-sm text-xs text-primary hover:text-surface-tint font-medium transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-xl">lock</span>
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 border-outline-variant bg-surface-container-lowest font-body-sm text-sm text-on-surface placeholder:text-outline/50 focus-visible:border-primary focus-visible:ring-primary/20 transition-all outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    className="border-outline-variant data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    className="block font-body-sm text-sm text-on-surface-variant cursor-pointer select-none"
                    htmlFor="remember-me"
                  >
                    Remember me on this device
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 font-semibold bg-primary text-on-primary hover:bg-surface-tint shadow-sm transition-all flex items-center justify-center gap-2 rounded-lg"
                >
                  {loading ? "Signing In..." : "Sign In to Operations"}
                </Button>
              </div>
            </form>
          </CardContent>

          {/* Footer / Status indicator */}
          <div className="pt-6 mt-6 border-t border-outline-variant flex items-center justify-center gap-2 text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-status-safe animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-wider">
              Systems Nominal - All Regions Online
            </span>
          </div>

          <div className="text-center pt-4">
            <p className="font-body-sm text-sm text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-semibold hover:underline decoration-primary/50"
              >
                Register here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
