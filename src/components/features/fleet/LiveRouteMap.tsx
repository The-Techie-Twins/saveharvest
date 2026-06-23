"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Locate } from "lucide-react";

interface LiveRouteMapProps {
  isMiniMap?: boolean;
}

export function LiveRouteMap({ isMiniMap = false }: LiveRouteMapProps) {
  const [isCentered, setIsCentered] = useState(true);

  if (isMiniMap) {
    return (
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden h-64 relative group">
        <img
          className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          alt="A clean, minimalist vector-style map of a dense urban logistics hub, rendered in a light-mode aesthetic with very subtle off-white and pale grey tones. The route is highlighted in a vibrant emerald green line, standing out sharply against the neutral background. Soft, ambient lighting gives the map a polished, functional SaaS dashboard appearance."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTeqnRuc3WC6WpIMQloKIM1QbWSXdz_flslUyLlCv-5xbvqOr7YADHqF--H8zAzMRdwa0TODuhF2qfNEVOpsqR9-79HON1Ss4MC5Wtc5eRCa5m9KdAQQ7Y2SYUMCjIbmpGaUPtwbU1N0qpdoecbkbGqXKUYlr-nG_dhWGNZK8SkhlHdlEcRRsL1tE5JIptDxz4eSqKGYOAyq6gPJfI0mBHniefO_-SN0ixUvlzaZCDiowch77tPSRHMyTj775bXM1ddhxGWEi_A15d"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent flex items-end p-4 pointer-events-none">
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-full border border-outline-variant shadow-sm pointer-events-auto">
            <MapPin className="text-primary w-4 h-4" />
            <span className="font-mono-data text-xs font-semibold text-on-background">
              Zone A Active
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="flex-1 relative min-h-[400px] w-full bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden shadow-sm">
      {/* Simulated Map Image */}
      <img
        alt="Map view showing delivery route"
        className={`w-full h-full min-h-[400px] object-cover opacity-80 grayscale transition-transform duration-500 ${
          isCentered ? "scale-100" : "scale-105"
        }`}
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJD7ml0GwQwYzLRp_y8I8_CpTqpSPpU7If2--ms6cjx4YPoSFkKdYBMPjgAAcO4UMsTlcq0MzJM_JgolJkw89JdSeCLxKzgFAV8O2k222KeyhmqpWgUV63-XYMrleaNMJJ6gz7wgUyZL5khvIsjJmLPahx_f61qfOGKFCxJVYBmHnbXTr4IDIGxfFI_ObUpjp7C47HS4owp0QbRd0ZzhjmMSxvztaiPJjn7-UHErS51dpBRCSekZNcc4wLXYec5N5RHtIEnrZAG-LN"
      />

      {/* Map Overlay UI */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
        {/* Route Info Badge */}
        <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur border border-outline-variant rounded-lg p-3 shadow-sm self-start pointer-events-auto max-w-[240px]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-primary border-2 border-white"></div>
            <span className="text-xs font-semibold truncate text-on-surface">Farmer Market</span>
          </div>
          <div className="flex items-center gap-2 mb-2 ml-1">
            <div className="w-0.5 h-6 bg-outline-variant rounded-full"></div>
            <span className="font-mono-data text-xs text-on-surface-variant">45 mi transit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-secondary border-2 border-white"></div>
            <span className="text-xs font-semibold truncate text-on-surface">Central Hub</span>
          </div>
        </div>

        {/* Truck Marker (Simulated) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex flex-col items-center">
          <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
            <Navigation className="w-5 h-5 fill-current transform rotate-45" />
          </div>
          <div className="w-6 h-6 bg-primary/30 rounded-full animate-ping absolute -z-10 top-2"></div>
        </div>

        {/* Recenter Button */}
        <button
          type="button"
          onClick={() => setIsCentered(true)}
          className={`bg-white dark:bg-zinc-800 border border-outline-variant text-on-surface p-2.5 rounded-full shadow-md self-end pointer-events-auto hover:bg-surface-container transition-all hover:scale-105 active:scale-95 ${
            isCentered ? "text-primary" : "text-on-surface-variant"
          }`}
          title="Recenter Map"
        >
          <Locate className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
