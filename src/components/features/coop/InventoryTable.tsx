"use client";

import React from "react";
import { Card } from "@/components/ui/card";
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

interface BatchItem {
  id: string;
  crop: string;
  weight: number;
  origin: string;
  clockSeconds: number;
  status: "Optimal" | "Warning" | "Critical";
  statusText: string;
}

interface InventoryTableProps {
  filteredBatches: BatchItem[];
  batches: BatchItem[];
  formatClock: (seconds: number) => string;
}

export function InventoryTable({
  filteredBatches,
  batches,
  formatClock,
}: InventoryTableProps) {
  return (
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
  );
}
