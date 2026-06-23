"use client";

import React, { useState } from "react";

interface Filters {
  categories: string[];
  maxDistance: number;
  maxPrice: number;
}

interface MarketplaceFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export function MarketplaceFilters({ onFilterChange }: MarketplaceFiltersProps) {
  const [categories, setCategories] = useState<string[]>(["Berries", "Leafy Greens"]);
  const [maxDistance, setMaxDistance] = useState<number>(150);
  const [maxPrice, setMaxPrice] = useState<number>(25);

  const handleCategoryChange = (category: string, checked: boolean) => {
    let updatedCategories = [...categories];
    if (checked) {
      updatedCategories.push(category);
    } else {
      updatedCategories = updatedCategories.filter((c) => c !== category);
    }
    setCategories(updatedCategories);
    onFilterChange({ categories: updatedCategories, maxDistance, maxPrice });
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setMaxDistance(val);
    onFilterChange({ categories, maxDistance: val, maxPrice });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setMaxPrice(val);
    onFilterChange({ categories, maxDistance, maxPrice: val });
  };

  return (
    <aside className="w-full lg:w-64 bg-surface-container-lowest rounded-xl border border-outline-variant flex flex-col shrink-0 p-4 gap-6">
      <div className="pb-3 border-b border-outline-variant">
        <h2 className="font-headline-md text-[18px] text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">filter_list</span>
          Filters
        </h2>
      </div>
      <div className="flex flex-col gap-6">
        {/* Crop Type Filter */}
        <div>
          <h3 className="font-body-sm font-semibold text-on-surface mb-3 uppercase tracking-wider text-[11px] text-on-surface-variant">
            Crop Category
          </h3>
          <div className="flex flex-col gap-2">
            {["Berries", "Leafy Greens", "Root Vegetables", "Stone Fruit"].map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={categories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                />
                <span className="font-body-sm text-body-sm text-on-surface">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Distance Filter */}
        <div>
          <h3 className="font-body-sm font-semibold text-on-surface mb-3 uppercase tracking-wider text-[11px] text-on-surface-variant">
            Max Distance
          </h3>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min="10"
              max="500"
              value={maxDistance}
              onChange={handleDistanceChange}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between font-mono-data text-mono-data text-secondary">
              <span>10 mi</span>
              <span className="text-primary font-semibold">{maxDistance} mi</span>
            </div>
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-body-sm font-semibold text-on-surface mb-3 uppercase tracking-wider text-[11px] text-on-surface-variant">
            Price per kg
          </h3>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min="0"
              max="50"
              value={maxPrice}
              onChange={handlePriceChange}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between font-mono-data text-mono-data text-secondary">
              <span>$0</span>
              <span className="text-primary font-semibold">${maxPrice} max</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
