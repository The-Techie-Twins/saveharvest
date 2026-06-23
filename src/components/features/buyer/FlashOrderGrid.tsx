"use client";

import React from "react";
import { CropListingCard, CropListing } from "./CropListingCard";

// Mock B2B listings data from the design mockup + supplementary entries
export const MOCK_LISTINGS: CropListing[] = [
  {
    id: "A42",
    category: "Berries",
    title: "Organic Strawberries",
    status: "Critical",
    volume: 450,
    distance: 12.4,
    clockSeconds: 2 * 3600 + 14 * 60 + 59,
    originalPrice: 4.50,
    discountedPrice: 1.85,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3KaUYCh9-8BNv_IScXNqoKzV0J5ZWr79CCgncTnFTCzMUjKlm4ohYPPvK1129wTnsgOKza4aaUQiYcPF9YmHonNEqq41jKPU9xUvdFIio255Bx4_SZKC9RP6NmWjfK4dSZjcbCWiRpb6Sppsk1_BQFRL1EcoUKm6iVW7GkijXu4AUV4B_Z4peDfTqJs7O16JZKIkaB_g1oCjnQsp7_jdg7kxKqxWkmvvSvq80lAiBdJKixE3keEWxLoO84FXFJEM8xnGfYyTKmt-W",
  },
  {
    id: "B19",
    category: "Leafy Greens",
    title: "Baby Spinach (Bulk)",
    status: "Urgent",
    volume: 1200,
    distance: 45.0,
    clockSeconds: 8 * 3600 + 45 * 60 + 22,
    originalPrice: 2.10,
    discountedPrice: 1.20,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRmXASeRr9q0JE1b2qM4e9BKp9Eq-YaeHJpn2t3fS3IzDN9DHxI2gTLkP3rNXBBFYSaRGLIUiVFVCUISZOTYCMAU28uINP4AopRg88GMrqOhYt_nZdZu30TTLKELjv_f9fr1jCUuXL957OkTEowgAs1Mb1Diu_qe_CrQGTkM4apjlaofqM2dfwd4pgD4L5dQ308p8bprm9nssFnFYiSoxOH-I41LjU5xsKgtzR_qn2cQZxhTjQKIugffNKwiF7nRfrCsgFbKYFLy5K",
  },
  {
    id: "T88",
    category: "Root Vegetables",
    title: "Heirloom Tomatoes",
    status: "Stable",
    volume: 850,
    distance: 8.2,
    clockSeconds: 24 * 3600,
    originalPrice: 3.80,
    discountedPrice: 2.95,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZKkUCY_2gihIlyp6AB11l091UE6fn_MSXDJgp9DmURoDG5oRTIndNrA9PFEgqma8jgf9n3bJd0L0NFYv4Lg1bTvrO0y7FdK8vXAl7OUuMrSDksc1U5ZAVmJ-p6purlKL2GFkrGeL3hT1__Tqfh3p4-5hUOMIrD0Y3IwECAZuKT39SKAVY5WJ08TevQcRzeHcdpLfObbxrCv0Ai9PfMjxcFjuVCroJympkfypZCS83kiT4i5D-o0Z8M05Fwq0JusULpfXwicRb_0fM",
  },
  {
    id: "R12",
    category: "Berries",
    title: "Fresh Red Raspberries",
    status: "Critical",
    volume: 180,
    distance: 15.6,
    clockSeconds: 1 * 3600 + 5 * 60 + 12,
    originalPrice: 6.20,
    discountedPrice: 2.50,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3KaUYCh9-8BNv_IScXNqoKzV0J5ZWr79CCgncTnFTCzMUjKlm4ohYPPvK1129wTnsgOKza4aaUQiYcPF9YmHonNEqq41jKPU9xUvdFIio255Bx4_SZKC9RP6NmWjfK4dSZjcbCWiRpb6Sppsk1_BQFRL1EcoUKm6iVW7GkijXu4AUV4B_Z4peDfTqJs7O16JZKIkaB_g1oCjnQsp7_jdg7kxKqxWkmvvSvq80lAiBdJKixE3keEWxLoO84FXFJEM8xnGfYyTKmt-W",
  },
  {
    id: "L33",
    category: "Leafy Greens",
    title: "Crisp Romaine Hearts",
    status: "Urgent",
    volume: 1500,
    distance: 34.2,
    clockSeconds: 6 * 3600 + 10 * 60 + 5,
    originalPrice: 1.80,
    discountedPrice: 0.95,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRmXASeRr9q0JE1b2qM4e9BKp9Eq-YaeHJpn2t3fS3IzDN9DHxI2gTLkP3rNXBBFYSaRGLIUiVFVCUISZOTYCMAU28uINP4AopRg88GMrqOhYt_nZdZu30TTLKELjv_f9fr1jCUuXL957OkTEowgAs1Mb1Diu_qe_CrQGTkM4apjlaofqM2dfwd4pgD4L5dQ308p8bprm9nssFnFYiSoxOH-I41LjU5xsKgtzR_qn2cQZxhTjQKIugffNKwiF7nRfrCsgFbKYFLy5K",
  },
  {
    id: "S72",
    category: "Stone Fruit",
    title: "Sweet Stone Peaches",
    status: "Stable",
    volume: 620,
    distance: 110.0,
    clockSeconds: 24 * 3600,
    originalPrice: 4.20,
    discountedPrice: 3.10,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZKkUCY_2gihIlyp6AB11l091UE6fn_MSXDJgp9DmURoDG5oRTIndNrA9PFEgqma8jgf9n3bJd0L0NFYv4Lg1bTvrO0y7FdK8vXAl7OUuMrSDksc1U5ZAVmJ-p6purlKL2GFkrGeL3hT1__Tqfh3p4-5hUOMIrD0Y3IwECAZuKT39SKAVY5WJ08TevQcRzeHcdpLfObbxrCv0Ai9PfMjxcFjuVCroJympkfypZCS83kiT4i5D-o0Z8M05Fwq0JusULpfXwicRb_0fM",
  }
];

interface Filters {
  categories: string[];
  maxDistance: number;
  maxPrice: number;
}

interface FlashOrderGridProps {
  searchQuery: string;
  filters: Filters;
}

export function FlashOrderGrid({ searchQuery, filters }: FlashOrderGridProps) {
  const filteredListings = MOCK_LISTINGS.filter((item) => {
    // 1. Search Query Match
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category Match
    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(item.category);

    // 3. Distance Match
    const matchesDistance = item.distance <= filters.maxDistance;

    // 4. Price Match
    const matchesPrice = item.discountedPrice <= filters.maxPrice;

    return matchesSearch && matchesCategory && matchesDistance && matchesPrice;
  });

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline-lg text-[26px] leading-tight font-bold text-on-surface">
            Flash Offers
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            High-urgency inventory nearing optimal freshness windows.
          </p>
        </div>
        <div className="font-mono-data text-mono-data bg-surface-container px-3 py-1 rounded text-on-surface-variant border border-outline-variant text-xs">
          Showing {filteredListings.length} active listings
        </div>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <CropListingCard key={item.id} listing={item} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-outline-variant rounded-xl p-12 text-center text-on-surface-variant font-mono">
          No active listings match your filters. Try resetting the criteria.
        </div>
      )}
    </div>
  );
}
