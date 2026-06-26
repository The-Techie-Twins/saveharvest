"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function RecentActivityTable() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-on-surface-variant">history</span>
        <h2 className="font-headline-md text-xl font-bold text-on-background">
          Recent Activity
        </h2>
      </div>

      <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-container-low border-b border-outline-variant hover:bg-surface-container-low">
              <TableHead className="p-3.5 font-bold font-mono text-[10px] text-on-surface-variant uppercase tracking-wider h-auto">Event</TableHead>
              <TableHead className="p-3.5 font-bold font-mono text-[10px] text-on-surface-variant uppercase tracking-wider text-right h-auto">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-body-sm text-sm text-on-background divide-y divide-outline-variant/30">
            <TableRow className="hover:bg-surface-container-low border-b border-outline-variant/30">
              <TableCell className="p-3.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-safe shrink-0"></div>
                <span className="truncate">Batch #PF-8821 Sold (Wholesale)</span>
              </TableCell>
              <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                10:42 AM
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-surface-container-low border-b border-outline-variant/30">
              <TableCell className="p-3.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                <span className="truncate">Truck #TRK-492 Arrived at Dock A</span>
              </TableCell>
              <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                10:15 AM
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-surface-container-low border-b border-outline-variant/30">
              <TableCell className="p-3.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-outline-variant shrink-0"></div>
                <span className="truncate">New Batch Logged: Apples (Fuji)</span>
              </TableCell>
              <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                09:30 AM
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-surface-container-low border-b border-outline-variant/30">
              <TableCell className="p-3.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-safe shrink-0"></div>
                <span className="truncate">Payment Cleared: Invoice #INV-299</span>
              </TableCell>
              <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                09:05 AM
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-surface-container-low border-b border-outline-variant/30">
              <TableCell className="p-3.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                <span className="truncate">Truck #TRK-118 Dispatched</span>
              </TableCell>
              <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                08:45 AM
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-surface-container-low border-0">
              <TableCell className="p-3.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-warning shrink-0"></div>
                <span className="truncate">Quality Check: Batch #PF-8800</span>
              </TableCell>
              <TableCell className="p-3.5 text-right text-on-surface-variant font-mono text-xs">
                08:10 AM
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="p-3 border-t border-outline-variant bg-surface-container-lowest text-center">
          <a href="#" className="font-body-sm text-xs text-primary hover:underline font-semibold">
            View Full Audit Log
          </a>
        </div>
      </Card>
    </section>
  );
}
