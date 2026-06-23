"use client";

import React, { useState } from "react";

interface Warehouse {
  id: string;
  name: string;
  address: string;
  capacity: number; // percentage (0-100)
  status: "Active" | "Inactive";
}

export function AddressManager() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: "WH-NY-01",
      name: "Brooklyn Cold Storage",
      address: "142 5th Ave, Brooklyn, NY 11215",
      capacity: 85,
      status: "Active",
    },
    {
      id: "WH-NJ-04",
      name: "Newark Logistics Hub",
      address: "88 Port St, Newark, NJ 07114",
      capacity: 40,
      status: "Active",
    },
    {
      id: "WH-CT-02",
      name: "Stamford Overflow",
      address: "200 Harbor Dr, Stamford, CT 06902",
      capacity: 0,
      status: "Inactive",
    },
  ]);

  const handleAddWarehouse = () => {
    const newWarehouse: Warehouse = {
      id: `WH-OR-${Math.floor(10 + Math.random() * 90)}`,
      name: "New Portland Facility",
      address: "404 SE Salmon St, Portland, OR 97214",
      capacity: 10,
      status: "Active",
    };
    setWarehouses([...warehouses, newWarehouse]);
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:shadow-sm hover:border-primary/50 transition-all duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" data-icon="warehouse">
              warehouse
            </span>
            Warehouse Management
          </h3>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Active delivery addresses for inbound shipments.
          </p>
        </div>
        <button
          onClick={handleAddWarehouse}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-body-sm text-xs font-semibold hover:bg-surface-tint transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add New
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-lg border border-outline-variant">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-outline-variant font-body-sm text-xs text-on-surface-variant font-bold">
            <tr>
              <th className="py-3 px-4">Location ID</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Capacity Rating</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-sm text-on-surface divide-y divide-outline-variant">
            {warehouses.map((wh) => (
              <tr
                key={wh.id}
                className={`hover:bg-surface-container-low transition-colors group ${
                  wh.status === "Inactive" ? "opacity-70" : ""
                }`}
              >
                <td className="py-3 px-4 font-mono-data text-mono-data text-xs font-semibold text-primary">
                  {wh.id}
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-on-surface">{wh.name}</div>
                  <div className="text-on-surface-variant text-[11px]">{wh.address}</div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-surface-variant rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          wh.capacity > 80
                            ? "bg-status-critical"
                            : wh.capacity > 0
                            ? "bg-status-safe"
                            : "bg-surface-variant"
                        }`}
                        style={{ width: `${wh.capacity}%` }}
                      ></div>
                    </div>
                    <span className="font-mono-data text-[11px] text-secondary font-semibold">
                      {wh.capacity}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      wh.status === "Active"
                        ? "bg-status-safe/10 text-status-safe border-status-safe/20"
                        : "bg-surface-variant text-on-surface-variant border-outline-variant"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        wh.status === "Active" ? "bg-status-safe" : "bg-on-surface-variant"
                      }`}
                    ></span>
                    {wh.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-surface-container cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
