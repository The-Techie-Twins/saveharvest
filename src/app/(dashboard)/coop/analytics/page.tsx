"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  LabelList,
} from "recharts";

const chartData = [
  { date: "Oct 1", revenue: 4000, loss: 1000 },
  { date: "Oct 8", revenue: 6400, loss: 2000 },
  { date: "Oct 15", revenue: 11600, loss: 3600 },
  { date: "Oct 22", revenue: 13000, loss: 2600 },
  { date: "Oct 30", revenue: 17600, loss: 800 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#10b981",
  },
  loss: {
    label: "Loss",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const cropData = [
  { crop: "Tomatoes", percentage: 45 },
  { crop: "Avocados", percentage: 30 },
  { crop: "Berries", percentage: 15 },
  { crop: "Leafy Greens", percentage: 10 },
];

const cropConfig = {
  percentage: {
    label: "Success Rate",
    color: "#006c49",
  },
} satisfies ChartConfig;

export default function CoopAnalyticsPage() {
  return (
    <main className="flex-1 p-6 md:p-8 bg-background min-h-screen max-w-7xl mx-auto w-full flex flex-col gap-6">
      {/* Header */}
      <header>
        <h1 className="font-headline-lg text-3xl font-bold text-on-background tracking-tight">
          Financial &amp; Impact Analytics
        </h1>
        <p className="font-body-lg text-sm text-on-surface-variant mt-1">
          Monitor revenue recovery and food waste prevention metrics.
        </p>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-sm text-on-surface-variant font-medium">
              Total Revenue
            </span>
            <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
          </div>
          <div className="font-display text-2xl font-bold text-primary">$124,500</div>
          <div className="font-body-xs text-xs text-status-safe flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +12% from last month
          </div>
        </Card>

        {/* Prevented Loss */}
        <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-sm text-on-surface-variant font-medium">
              Prevented Loss
            </span>
            <span className="material-symbols-outlined text-primary text-[20px]">shield_with_heart</span>
          </div>
          <div className="font-display text-2xl font-bold text-primary">$42,800</div>
          <div className="font-body-xs text-xs text-status-safe flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> +5% from last month
          </div>
        </Card>

        {/* Spoiled Value */}
        <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-sm text-on-surface-variant font-medium">
              Spoiled Value
            </span>
            <span className="material-symbols-outlined text-status-critical text-[20px]">delete_forever</span>
          </div>
          <div className="font-display text-2xl font-bold text-status-critical">$8,200</div>
          <div className="font-body-xs text-xs text-status-warning flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[14px]">trending_down</span> -2% from last month
          </div>
        </Card>

        {/* KGs Saved */}
        <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-sm text-on-surface-variant font-medium">
              KGs Saved
            </span>
            <span className="material-symbols-outlined text-outline text-[20px]">scale</span>
          </div>
          <div className="font-display text-2xl font-bold text-on-background">15,400 kg</div>
          <div className="font-body-xs text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">eco</span> Impact equivalent
          </div>
        </Card>
      </div>

      {/* Charts Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Revenue vs Spoilage (Line Chart) */}
        <Card className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline-md text-base font-bold text-on-background">
              Revenue Generated vs. Spoilage Loss
            </h3>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-status-critical">
                <span className="w-2.5 h-2.5 rounded-full bg-status-critical inline-block"></span> Loss
              </span>
            </div>
          </div>

          {/* Recharts Line Chart */}
          <div className="flex-1 min-h-[300px] w-full bg-surface-container-low rounded-lg p-4 border border-outline-variant/30 flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 20,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={3}
                  activeDot={{
                    r: 6,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="loss"
                  stroke="var(--color-loss)"
                  strokeWidth={3}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </Card>

          {/* Waste Reduction by Crop (Bar Chart) */}
        <Card className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <h3 className="font-headline-md text-base font-bold text-on-background mb-1">
              Waste Reduction by Crop
            </h3>
            <p className="font-body-xs text-xs text-on-surface-variant">
              Success rates in cold-chain preservation.
            </p>
          </div>
          
          <div className="flex-1 min-h-[220px] w-full flex items-center justify-center mt-4">
            <ChartContainer config={cropConfig} className="h-[220px] w-full">
              <BarChart
                data={cropData}
                layout="vertical"
                margin={{
                  left: 0,
                  right: 25,
                  top: 5,
                  bottom: 5,
                }}
              >
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis
                  dataKey="crop"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="percentage"
                  fill="var(--color-percentage)"
                  radius={4}
                >
                  <LabelList
                    dataKey="percentage"
                    position="right"
                    offset={8}
                    className="fill-on-surface font-mono text-[10px] font-bold"
                    formatter={(value: any) => `${value}%`}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </Card>
      </div>

      {/* Operational Ledger Table */}
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
                <TableHead className="py-3 px-5 font-semibold">Crop variety</TableHead>
                <TableHead className="py-3 px-5 font-semibold">Outcome</TableHead>
                <TableHead className="py-3 px-5 font-semibold text-right">Net Saved Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-body-sm text-sm text-on-background divide-y divide-outline-variant/30">
              {/* Row 1 */}
              <TableRow className="hover:bg-surface-container-low/50 transition-colors">
                <TableCell className="py-3.5 px-5 font-mono text-on-surface-variant text-xs">2023-10-24</TableCell>
                <TableCell className="py-3.5 px-5 font-mono text-primary font-bold text-xs">B-8492</TableCell>
                <TableCell className="py-3.5 px-5 font-semibold">Roma Tomatoes</TableCell>
                <TableCell className="py-3.5 px-5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-primary-container/20 text-on-primary-container font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-safe"></span> Sold
                  </span>
                </TableCell>
                <TableCell className="py-3.5 px-5 font-mono text-right text-primary font-bold">+$1,200.00</TableCell>
              </TableRow>
              
              {/* Row 2 */}
              <TableRow className="hover:bg-surface-container-low/50 transition-colors">
                <TableCell className="py-3.5 px-5 font-mono text-on-surface-variant text-xs">2023-10-24</TableCell>
                <TableCell className="py-3.5 px-5 font-mono text-primary font-bold text-xs">B-8493</TableCell>
                <TableCell className="py-3.5 px-5 font-semibold">Hass Avocados</TableCell>
                <TableCell className="py-3.5 px-5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-surface-variant text-on-surface-variant font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-warning"></span> In-Transit
                  </span>
                </TableCell>
                <TableCell className="py-3.5 px-5 font-mono text-right text-on-surface-variant">Pending</TableCell>
              </TableRow>
              
              {/* Row 3 */}
              <TableRow className="hover:bg-surface-container-low/50 transition-colors">
                <TableCell className="py-3.5 px-5 font-mono text-on-surface-variant text-xs">2023-10-23</TableCell>
                <TableCell className="py-3.5 px-5 font-mono text-primary font-bold text-xs">B-8488</TableCell>
                <TableCell className="py-3.5 px-5 font-semibold">Berries Mix</TableCell>
                <TableCell className="py-3.5 px-5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-error-container/40 text-on-error-container font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-critical"></span> Spoiled
                  </span>
                </TableCell>
                <TableCell className="py-3.5 px-5 font-mono text-right text-status-critical font-bold">-$340.00</TableCell>
              </TableRow>
              
              {/* Row 4 */}
              <TableRow className="hover:bg-surface-container-low/50 transition-colors">
                <TableCell className="py-3.5 px-5 font-mono text-on-surface-variant text-xs">2023-10-23</TableCell>
                <TableCell className="py-3.5 px-5 font-mono text-primary font-bold text-xs">B-8485</TableCell>
                <TableCell className="py-3.5 px-5 font-semibold">Leafy Greens</TableCell>
                <TableCell className="py-3.5 px-5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-primary-container/20 text-on-primary-container font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-safe"></span> Sold
                  </span>
                </TableCell>
                <TableCell className="py-3.5 px-5 font-mono text-right text-primary font-bold">+$850.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </main>
  );
}
