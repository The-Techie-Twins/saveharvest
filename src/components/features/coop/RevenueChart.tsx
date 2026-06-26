"use client";

import React from "react";
import { Card } from "@/components/ui/card";
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

export function RevenueChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chart: Revenue vs Spoilage (Line Chart) */}
      <Card className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary hover:shadow-md transition-all flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-headline-md text-base font-bold text-on-background">
            Revenue Generated vs. Spoilage Loss
          </h3>
          <div className="flex gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>{" "}
              Revenue
            </span>
            <span className="flex items-center gap-1.5 text-status-critical">
              <span className="w-2.5 h-2.5 rounded-full bg-status-critical inline-block"></span>{" "}
              Loss
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
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="percentage" fill="var(--color-percentage)" radius={4}>
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
  );
}
