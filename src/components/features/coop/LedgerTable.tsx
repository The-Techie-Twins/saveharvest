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

export function LedgerTable() {
  return (
    <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="p-5 border-b border-outline-variant bg-surface-bright">
        <h3 className="font-headline-md text-base font-bold text-on-background">
          Operational Ledger
        </h3>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full text-left border-collapse">
          <TableHeader className="bg-surface-container-low font-bold text-xs text-on-surface-variant border-b border-outline-variant uppercase tracking-wider">
            <TableRow>
              <TableHead className="py-3 px-5 font-semibold">Date</TableHead>
              <TableHead className="py-3 px-5 font-semibold">Batch ID</TableHead>
              <TableHead className="py-3 px-5 font-semibold">
                Crop variety
              </TableHead>
              <TableHead className="py-3 px-5 font-semibold">Outcome</TableHead>
              <TableHead className="py-3 px-5 font-semibold text-right">
                Net Saved Value
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-body-sm text-sm text-on-background divide-y divide-outline-variant/30">
            {/* Row 1 */}
            <TableRow className="hover:bg-surface-container-low/50 transition-colors">
              <TableCell className="py-3.5 px-5 font-mono text-on-surface-variant text-xs">
                2023-10-24
              </TableCell>
              <TableCell className="py-3.5 px-5 font-mono text-primary font-bold text-xs">
                B-8492
              </TableCell>
              <TableCell className="py-3.5 px-5 font-semibold">
                Roma Tomatoes
              </TableCell>
              <TableCell className="py-3.5 px-5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-primary-container/20 text-on-primary-container font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-safe"></span>{" "}
                  Sold
                </span>
              </TableCell>
              <TableCell className="py-3.5 px-5 font-mono text-right text-primary font-bold">
                +$1,200.00
              </TableCell>
            </TableRow>

            {/* Row 2 */}
            <TableRow className="hover:bg-surface-container-low/50 transition-colors">
              <TableCell className="py-3.5 px-5 font-mono text-on-surface-variant text-xs">
                2023-10-24
              </TableCell>
              <TableCell className="py-3.5 px-5 font-mono text-primary font-bold text-xs">
                B-8493
              </TableCell>
              <TableCell className="py-3.5 px-5 font-semibold">
                Hass Avocados
              </TableCell>
              <TableCell className="py-3.5 px-5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-surface-variant text-on-surface-variant font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-warning"></span>{" "}
                  In-Transit
                </span>
              </TableCell>
              <TableCell className="py-3.5 px-5 font-mono text-right text-on-surface-variant">
                Pending
              </TableCell>
            </TableRow>

            {/* Row 3 */}
            <TableRow className="hover:bg-surface-container-low/50 transition-colors">
              <TableCell className="py-3.5 px-5 font-mono text-on-surface-variant text-xs">
                2023-10-23
              </TableCell>
              <TableCell className="py-3.5 px-5 font-mono text-primary font-bold text-xs">
                B-8488
              </TableCell>
              <TableCell className="py-3.5 px-5 font-semibold">
                Berries Mix
              </TableCell>
              <TableCell className="py-3.5 px-5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-error-container/40 text-on-error-container font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-critical"></span>{" "}
                  Spoiled
                </span>
              </TableCell>
              <TableCell className="py-3.5 px-5 font-mono text-right text-status-critical font-bold">
                -$340.00
              </TableCell>
            </TableRow>

            {/* Row 4 */}
            <TableRow className="hover:bg-surface-container-low/50 transition-colors">
              <TableCell className="py-3.5 px-5 font-mono text-on-surface-variant text-xs">
                2023-10-23
              </TableCell>
              <TableCell className="py-3.5 px-5 font-mono text-primary font-bold text-xs">
                B-8485
              </TableCell>
              <TableCell className="py-3.5 px-5 font-semibold">
                Leafy Greens
              </TableCell>
              <TableCell className="py-3.5 px-5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-primary-container/20 text-on-primary-container font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-safe"></span>{" "}
                  Sold
                </span>
              </TableCell>
              <TableCell className="py-3.5 px-5 font-mono text-right text-primary font-bold">
                +$850.00
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
