"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/coop/dashboard", icon: "dashboard" },
    { name: "Inventory", href: "/coop/inventory", icon: "inventory_2" },
    { name: "Dispatch", href: "/coop/dispatch", icon: "local_shipping" },
    { name: "Analytics", href: "/coop/analytics", icon: "analytics" },
    { name: "Settings", href: "/coop/settings", icon: "settings" },
  ];

  return (
    <>
      <header className="md:hidden sticky top-0 z-50 flex justify-between items-center w-full px-6 h-16 bg-surface-bright border-b border-outline-variant shadow-sm">
        <div className="flex items-center gap-3">
          {/* Menu Drawer Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 hover:bg-surface-container rounded-lg transition-colors text-primary flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
          <div className="font-headline-md text-xl font-bold text-primary">
            SaveHarvest
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <Link
            href="/coop/settings"
            className="p-1 text-primary hover:opacity-80 transition-opacity flex items-center justify-center"
            aria-label="Profile Settings"
          >
            <span className="material-symbols-outlined text-[24px]">
              account_circle
            </span>
          </Link>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <nav
        className={`md:hidden fixed top-16 left-0 bottom-0 w-64 bg-surface-container-lowest border-r border-outline-variant z-40 p-4 flex flex-col gap-2 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2 px-3">
          Co-op Manager
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className="font-body-sm text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer profile area */}
        <div className="pt-4 border-t border-outline-variant flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant">
            <span className="material-symbols-outlined text-on-surface-variant text-lg">
              person
            </span>
          </div>
          <div>
            <p className="font-body-sm text-xs font-semibold text-on-surface">Jane Doe</p>
            <p className="font-body-xs text-[10px] text-on-surface-variant">Central Valley Produce</p>
          </div>
        </div>
      </nav>
    </>
  );
}
