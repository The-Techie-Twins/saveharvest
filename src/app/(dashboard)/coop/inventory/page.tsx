"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BatchItem {
  id: string;
  crop: string;
  weight: number;
  origin: string;
  clockSeconds: number;
  status: "Optimal" | "Warning" | "Critical";
  statusText: string;
}

export default function CoopInventoryPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [formCrop, setFormCrop] = useState("Roma Tomatoes");
  const [formWeight, setFormWeight] = useState("");
  const [formHarvestTime, setFormHarvestTime] = useState("");
  const [formOrigin, setFormOrigin] = useState("Central Valley Farms");
  const [formGrade, setFormGrade] = useState("A");

  // Initial Mock Batches data
  const [batches, setBatches] = useState<BatchItem[]>([
    {
      id: "#PF-T-8821",
      crop: "Roma Tomatoes",
      weight: 1250.0,
      origin: "Nyeri Valley Farms",
      clockSeconds: 4 * 3600 + 12 * 60 + 45, // 04:12:45
      status: "Critical",
      statusText: "Urgent Sale",
    },
    {
      id: "#PF-C-8822",
      crop: "Cassava Root",
      weight: 3400.5,
      origin: "Mombasa Agro Co-op",
      clockSeconds: 22 * 3600 + 45 * 60 + 10, // 22:45:10
      status: "Warning",
      statusText: "Monitor",
    },
    {
      id: "#PF-A-8823",
      crop: "Hass Avocados",
      weight: 850.0,
      origin: "Rift Valley Orchards",
      clockSeconds: 72 * 3600, // 72:00:00
      status: "Optimal",
      statusText: "Optimal",
    },
    {
      id: "#PF-O-8824",
      crop: "Red Onions",
      weight: 2100.0,
      origin: "Central Province Co-op",
      clockSeconds: 144 * 3600 + 30 * 60, // 144:30:00
      status: "Optimal",
      statusText: "Optimal",
    },
    {
      id: "#PF-M-8825",
      crop: "Mangoes (Kent)",
      weight: 920.5,
      origin: "Coastal Fruit Growers",
      clockSeconds: 86 * 3600 + 15 * 60 + 22, // 86:15:22
      status: "Optimal",
      statusText: "Optimal",
    },
  ]);

  // Live countdown timer ticking for clocks
  useEffect(() => {
    const interval = setInterval(() => {
      setBatches((prev) =>
        prev.map((b) => ({
          ...b,
          clockSeconds: b.clockSeconds > 0 ? b.clockSeconds - 1 : 0,
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatClock = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleLogBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formWeight) return;

    const newId = `#PF-X-${Math.floor(1000 + Math.random() * 9000)}`;
    const weightNum = parseFloat(formWeight);
    const calculatedClock = formGrade === "A" ? 72 * 3600 : 64 * 3600; // standard vs penalty

    const newBatch: BatchItem = {
      id: newId,
      crop: formCrop,
      weight: weightNum,
      origin: formOrigin,
      clockSeconds: calculatedClock,
      status: "Optimal",
      statusText: "Optimal",
    };

    setBatches([newBatch, ...batches]);
    setIsSheetOpen(false);

    // Reset Form
    setFormWeight("");
    setFormHarvestTime("");
  };

  const filteredBatches = batches.filter(
    (b) =>
      b.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dynamic KPI Metrics
  const totalWeight = batches.reduce((acc, curr) => acc + curr.weight, 0);
  const criticalCount = batches.filter((b) => b.clockSeconds < 12 * 3600).length;

  return (
    <main className="flex-1 flex flex-col h-screen relative bg-background overflow-hidden">
      {/* Page Header */}
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant bg-surface-container-lowest z-20">
        <div>
          <h2 className="font-headline-lg text-2xl font-bold text-on-background">
            Active Inventory
          </h2>
          <p className="font-body-sm text-sm text-on-surface-variant mt-1">
            Manage current batches and monitor perishability clocks to prevent waste.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <Input
              className="pl-9 pr-4 h-10 w-full sm:w-64 border border-outline-variant bg-surface-container-lowest font-body-sm text-sm text-on-background focus-visible:ring-1 focus-visible:ring-primary rounded-lg"
              placeholder="Search batch ID or crop..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={() => setIsSheetOpen(true)}
            className="bg-primary text-on-primary hover:bg-surface-tint font-semibold h-10 px-4 flex items-center gap-2 rounded-lg whitespace-nowrap shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Log New Batch
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-background relative flex flex-col gap-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-sm text-on-surface-variant font-medium">
                Total Active Weight
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">scale</span>
            </div>
            <div className="font-display text-2xl font-bold text-on-background">
              {totalWeight.toLocaleString()}{" "}
              <span className="font-mono text-sm text-on-surface-variant">KG</span>
            </div>
            <div className="font-body-xs text-xs text-status-safe flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +5% vs yesterday
            </div>
          </Card>

          <Card className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-sm text-on-surface-variant font-medium">
                Batches In Transit
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">
                local_shipping
              </span>
            </div>
            <div className="font-display text-2xl font-bold text-on-background">
              {batches.length * 8}
            </div>
            <div className="font-body-xs text-xs text-on-surface-variant">
              18 expecting delivery today
            </div>
          </Card>

          <Card className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-sm text-on-surface-variant font-medium">
                Critical Spoilage Risk
              </span>
              <span className="material-symbols-outlined text-status-critical text-[20px]">
                warning
              </span>
            </div>
            <div className="font-display text-2xl font-bold text-on-background">
              {criticalCount}{" "}
              <span className="font-body-sm text-sm text-on-surface-variant font-normal">
                batches
              </span>
            </div>
            <div className="font-body-xs text-xs text-status-critical flex items-center gap-1 font-semibold">
              &lt; 12 hours remaining
            </div>
          </Card>

          <Card className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-body-sm text-sm text-on-surface-variant font-medium">
                Storage Capacity
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">warehouse</span>
            </div>
            <div className="font-display text-2xl font-bold text-on-background">78%</div>
            <div className="w-full bg-surface-variant rounded-full h-1.5 mt-1 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "78%" }}></div>
            </div>
          </Card>
        </div>

        {/* Data Table Section */}
        <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-[400px]">
          {/* Table Actions/Filters */}
          <div className="px-4 py-3 border-b border-outline-variant flex flex-wrap items-center justify-between gap-3 bg-surface-bright">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-outline-variant text-on-surface-variant flex items-center gap-1 text-xs"
              >
                <span className="material-symbols-outlined text-[16px]">filter_list</span>
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-outline-variant text-on-surface-variant flex items-center gap-1 text-xs"
              >
                <span className="material-symbols-outlined text-[16px]">sort</span>
                Sort
              </Button>
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant font-body-xs text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-status-safe"></span> Optimal
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-status-warning"></span> Warning
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-status-critical"></span> Critical
              </div>
            </div>
          </div>

          {/* Scrollable Table */}
          <div className="flex-1 overflow-auto">
            <Table className="w-full text-left border-collapse">
              <TableHeader className="sticky top-0 bg-surface-container-lowest z-10 border-b border-outline-variant shadow-sm">
                <TableRow className="text-on-surface-variant font-bold text-xs uppercase tracking-wider bg-surface-bright/50">
                  <TableHead className="px-6 py-3.5 w-12 text-center">
                    <Checkbox className="border-outline-variant" />
                  </TableHead>
                  <TableHead className="px-6 py-3.5">Batch ID</TableHead>
                  <TableHead className="px-6 py-3.5">Crop Type</TableHead>
                  <TableHead className="px-6 py-3.5 text-right">Weight (KG)</TableHead>
                  <TableHead className="px-6 py-3.5">Origin Co-op</TableHead>
                  <TableHead className="px-6 py-3.5">Perishability Clock</TableHead>
                  <TableHead className="px-6 py-3.5 text-center">Status</TableHead>
                  <TableHead className="px-6 py-3.5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-body-sm text-sm text-on-background divide-y divide-outline-variant/30">
                {filteredBatches.length > 0 ? (
                  filteredBatches.map((batch) => {
                    const isCritical = batch.status === "Critical";
                    const isWarning = batch.status === "Warning";
                    const badgeColor = isCritical
                      ? "border-status-critical text-status-critical bg-status-critical/10"
                      : isWarning
                      ? "border-status-warning text-status-warning bg-status-warning/10"
                      : "border-status-safe text-status-safe bg-status-safe/10";

                    const clockBg = isCritical
                      ? "bg-error-container text-on-error-container"
                      : isWarning
                      ? "bg-[#fef3c7] text-[#92400e]"
                      : "bg-[#dcfce7] text-[#166534]";

                    return (
                      <TableRow
                        key={batch.id}
                        className="hover:bg-surface-container-low transition-colors duration-150 cursor-pointer"
                      >
                        <TableCell className="px-6 py-4 text-center">
                          <Checkbox className="border-outline-variant" />
                        </TableCell>
                        <TableCell className="px-6 py-4 font-mono font-bold text-primary">
                          {batch.id}
                        </TableCell>
                        <TableCell className="px-6 py-4 font-semibold">{batch.crop}</TableCell>
                        <TableCell className="px-6 py-4 font-mono text-right">
                          {batch.weight.toLocaleString(undefined, { minimumFractionDigits: 1 })}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-on-surface-variant">{batch.origin}</TableCell>
                        <TableCell className="px-6 py-4">
                          <div
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-xs ${clockBg}`}
                          >
                            <span className="material-symbols-outlined text-sm">timer</span>
                            {formatClock(batch.clockSeconds)}
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border font-semibold text-xs ${badgeColor}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isCritical
                                  ? "bg-status-critical"
                                  : isWarning
                                  ? "bg-status-warning"
                                  : "bg-status-safe"
                              }`}
                            ></span>
                            {batch.statusText}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-right text-on-surface-variant">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-8 w-8 hover:bg-surface-container rounded-md"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              more_vert
                            </span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-on-surface-variant font-mono">
                      No inventory batches match search query.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Table Pagination */}
          <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-bright">
            <div className="font-body-xs text-xs text-on-surface-variant">
              Showing <span className="font-bold text-on-background">1</span> to{" "}
              <span className="font-bold text-on-background">{filteredBatches.length}</span> of{" "}
              <span className="font-bold text-on-background">{batches.length}</span> batches
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="p-1 h-8 w-8 border-outline-variant text-on-surface-variant hover:bg-surface-container"
                disabled
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="p-1 h-8 w-8 border-outline-variant text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Log New Batch Slide-over Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full md:max-w-[420px] p-0 flex flex-col h-full bg-surface-container-lowest border-l border-outline-variant shadow-lg">
          {/* Sheet Header */}
          <SheetHeader className="px-6 py-5 border-b border-outline-variant flex flex-col bg-surface-bright gap-0.5">
            <SheetTitle className="font-headline-md text-xl font-bold text-on-background">Log New Batch</SheetTitle>
            <SheetDescription className="font-body-xs text-xs text-on-surface-variant mt-0.5">
              Enter harvest details to initiate cold-chain perishability clock.
            </SheetDescription>
          </SheetHeader>

          {/* Sheet Form Body */}
          <div className="flex-1 overflow-y-auto p-6 bg-background">
            <form onSubmit={handleLogBatch} className="flex flex-col gap-5">
              {/* Crop Type Select */}
              <div className="flex flex-col gap-1.5">
                <Label className="font-body-xs text-xs font-semibold uppercase tracking-wider text-on-surface">
                  Crop Variety *
                </Label>
                <Select value={formCrop} onValueChange={(val) => setFormCrop(val ?? "")}>
                  <SelectTrigger className="w-full h-11 border border-outline-variant rounded-lg bg-surface-container-lowest px-3 py-2 font-body-sm text-sm text-on-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                    <SelectValue placeholder="Select crop variety" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border border-outline-variant rounded-lg shadow-md max-h-60 overflow-y-auto z-[100]">
                    <SelectItem value="Roma Tomatoes">Roma Tomatoes</SelectItem>
                    <SelectItem value="Cassava Root">Cassava Root</SelectItem>
                    <SelectItem value="Hass Avocados">Hass Avocados</SelectItem>
                    <SelectItem value="Mangoes (Kent)">Mangoes (Kent)</SelectItem>
                    <SelectItem value="Red Onions">Red Onions</SelectItem>
                    <SelectItem value="Fuji Apples">Fuji Apples</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Weight Input */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="weight_input"
                  className="font-body-xs text-xs font-semibold uppercase tracking-wider text-on-surface"
                >
                  Total Weight (KG) *
                </Label>
                <div className="relative">
                  <Input
                    id="weight_input"
                    required
                    type="number"
                    step="0.1"
                    placeholder="0.00"
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    className="w-full h-11 border border-outline-variant bg-surface-container-lowest pl-4 pr-16 rounded-lg font-mono text-sm text-on-background focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-on-surface-variant font-bold">
                    KG
                  </span>
                </div>
              </div>

              {/* Harvest Time Input */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="harvest_time"
                  className="font-body-xs text-xs font-semibold uppercase tracking-wider text-on-surface"
                >
                  Harvest Date & Time *
                </Label>
                <Input
                  id="harvest_time"
                  required
                  type="datetime-local"
                  value={formHarvestTime}
                  onChange={(e) => setFormHarvestTime(e.target.value)}
                  className="w-full h-11 border border-outline-variant bg-surface-container-lowest px-4 rounded-lg font-body-sm text-sm text-on-background focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary outline-none"
                />
                <p className="font-body-xs text-xs text-on-surface-variant">
                  Used to calculate base perishability decay curves.
                </p>
              </div>

              {/* Origin Co-op Select */}
              <div className="flex flex-col gap-1.5">
                <Label className="font-body-xs text-xs font-semibold uppercase tracking-wider text-on-surface">
                  Origin Co-op
                </Label>
                <Select value={formOrigin} onValueChange={(val) => setFormOrigin(val ?? "")}>
                  <SelectTrigger className="w-full h-11 border border-outline-variant rounded-lg bg-surface-container-lowest px-3 py-2 font-body-sm text-sm text-on-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                    <SelectValue placeholder="Select origin co-op" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground border border-outline-variant rounded-lg shadow-md max-h-60 overflow-y-auto z-[100]">
                    <SelectItem value="Central Valley Farms">Central Valley Farms</SelectItem>
                    <SelectItem value="Nyeri Valley Farms">Nyeri Valley Farms</SelectItem>
                    <SelectItem value="Mombasa Agro Co-op">Mombasa Agro Co-op</SelectItem>
                    <SelectItem value="Rift Valley Orchards">Rift Valley Orchards</SelectItem>
                    <SelectItem value="Coastal Fruit Growers">Coastal Fruit Growers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Initial Quality Grading */}
              <div className="flex flex-col gap-3 mt-2 border-t border-outline-variant pt-4">
                <Label className="font-body-sm text-sm font-semibold text-on-background">
                  Initial Quality Grading
                </Label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container bg-surface transition-all">
                    <input
                      type="radio"
                      name="grade"
                      value="A"
                      checked={formGrade === "A"}
                      onChange={() => setFormGrade("A")}
                      className="text-primary focus:ring-primary w-4 h-4 border-outline cursor-pointer"
                    />
                    <div>
                      <div className="font-body-sm text-sm font-semibold text-on-background">
                        Grade A (Premium)
                      </div>
                      <div className="font-body-xs text-xs text-on-surface-variant mt-0.5">
                        Standard shelf life calculation applied.
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container bg-surface transition-all">
                    <input
                      type="radio"
                      name="grade"
                      value="B"
                      checked={formGrade === "B"}
                      onChange={() => setFormGrade("B")}
                      className="text-primary focus:ring-primary w-4 h-4 border-outline cursor-pointer"
                    />
                    <div>
                      <div className="font-body-sm text-sm font-semibold text-on-background">
                        Grade B (Standard)
                      </div>
                      <div className="font-body-xs text-xs text-on-surface-variant mt-0.5">
                        -10% shelf life penalty applied.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Sheet Actions */}
              <div className="mt-6 pt-4 border-t border-outline-variant flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSheetOpen(false)}
                  className="h-11 px-5 border-outline-variant text-on-surface-variant hover:bg-surface-container font-semibold rounded-lg text-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-on-primary hover:bg-surface-tint font-semibold h-11 px-5 rounded-lg text-sm shadow-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Log Batch
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}
