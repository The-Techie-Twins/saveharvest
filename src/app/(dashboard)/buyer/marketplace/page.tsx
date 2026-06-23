"use client";

import React, { useState } from "react";
import { MarketplaceFilters } from "@/components/features/buyer/MarketplaceFilters";
import { FlashOrderGrid } from "@/components/features/buyer/FlashOrderGrid";
import { Input } from "@/components/ui/input";

interface Filters {
  categories: string[];
  maxDistance: number;
  maxPrice: number;
}

export default function BuyerMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    categories: ["Berries", "Leafy Greens"],
    maxDistance: 150,
    maxPrice: 25,
  });

  const handleFilterChange = (updatedFilters: Filters) => {
    setFilters(updatedFilters);
  };

  return (
    <div className="flex flex-col gap-6 w-full py-2">
      {/* Search Bar header for mobile / dense view */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-4">
        <div>
          <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Wholesale Flash Marketplace</h1>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Real-time cold-chain batches nearing optimal shelf life. Secured via escrow.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
            search
          </span>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-body-sm font-body-sm w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Search crop, category, or batch..."
            type="text"
          />
        </div>
      </div>

      {/* Main Layout: Filters sidebar and listings grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Filters Sidebar */}
        <MarketplaceFilters onFilterChange={handleFilterChange} />

        {/* Listings Grid */}
        <FlashOrderGrid searchQuery={searchQuery} filters={filters} />
      </div>
    </div>
  );
}
