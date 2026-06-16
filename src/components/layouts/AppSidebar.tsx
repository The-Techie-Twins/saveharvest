"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/coop/dashboard", icon: "dashboard" },
    { name: "Inventory", href: "/coop/inventory", icon: "inventory_2" },
    { name: "Dispatch", href: "/coop/dispatch", icon: "local_shipping" },
    { name: "Analytics", href: "/coop/analytics", icon: "analytics" },
    { name: "Settings", href: "/coop/settings", icon: "settings" },
  ];

  return (
    <nav className="hidden md:flex flex-col h-screen p-6 gap-6 bg-surface-container-low border-r border-outline-variant w-64 fixed left-0 top-0 z-40">
      {/* Header Brand */}
      <div className="flex items-center gap-3 px-4 py-4 mb-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-lg">
          S
        </div>
        <div>
          <h1 className="font-headline-md text-lg font-extrabold text-primary leading-tight">
            SaveHarvest
          </h1>
          <p className="font-body-xs text-xs text-on-surface-variant font-medium">Logistics Console</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-primary text-on-primary shadow-sm scale-98"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-colors ${
                  isActive ? "text-on-primary" : "text-on-surface-variant group-hover:text-on-surface"
                }`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-body-sm text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="mt-auto pt-4 border-t border-outline-variant">
        <div className="flex items-center gap-3 px-2 py-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant shadow-inner">
            <span className="material-symbols-outlined text-on-surface-variant text-2xl">
              person
            </span>
          </div>
          <div>
            <p className="font-body-sm text-sm font-semibold text-on-surface">Jane Doe</p>
            <p className="font-body-xs text-xs text-on-surface-variant">Co-op Manager</p>
          </div>
        </div>

        {/* Global Action Button */}
        <Link
          href="/coop/inventory"
          className="w-full bg-primary text-on-primary h-11 px-4 rounded-lg font-body-sm text-sm font-semibold hover:bg-surface-tint transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Log Batch
        </Link>
      </div>
    </nav>
  );
}
