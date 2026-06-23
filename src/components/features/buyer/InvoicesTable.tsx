"use client";

import React, { useState } from "react";

interface Invoice {
  id: string;
  date: string;
  orderRef: string;
  amount: number;
  status: "Paid" | "Pending";
}

export function InvoicesTable() {
  const [search, setSearch] = useState("");
  const invoices: Invoice[] = [
    {
      id: "INV-88392",
      date: "Oct 24, 2023",
      orderRef: "PO-2940-C",
      amount: 4250.00,
      status: "Paid",
    },
    {
      id: "INV-88391",
      date: "Oct 22, 2023",
      orderRef: "PO-2911-X",
      amount: 1120.50,
      status: "Pending",
    },
    {
      id: "INV-88385",
      date: "Oct 18, 2023",
      orderRef: "PO-2890-Y",
      amount: 8400.00,
      status: "Paid",
    },
  ];

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.orderRef.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col">
      <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-bright">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2 font-bold text-lg">
            <span aria-hidden="true" className="material-symbols-outlined text-primary">
              request_quote
            </span>
            Recent Invoices
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Download and manage your billing history.
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Filter by invoice/PO..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1.5 border border-outline-variant bg-surface-container-lowest rounded-lg font-body-sm text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48"
          />
          <button className="px-4 py-2 border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2 cursor-pointer font-semibold text-xs">
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
              filter_list
            </span>
            Filter
          </button>
          <button className="px-4 py-2 border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2 cursor-pointer font-semibold text-xs">
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
              download
            </span>
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>
              <th className="py-3 px-6 font-mono-data text-mono-data text-on-surface-variant font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap">
                Invoice #
              </th>
              <th className="py-3 px-6 font-mono-data text-mono-data text-on-surface-variant font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap">
                Date
              </th>
              <th className="py-3 px-6 font-mono-data text-mono-data text-on-surface-variant font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap">
                Order Ref
              </th>
              <th className="py-3 px-6 font-mono-data text-mono-data text-on-surface-variant font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap text-right">
                Amount
              </th>
              <th className="py-3 px-6 font-mono-data text-mono-data text-on-surface-variant font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap text-center">
                Status
              </th>
              <th className="py-3 px-6 font-mono-data text-mono-data text-on-surface-variant font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant/50">
            {filteredInvoices.map((inv) => (
              <tr key={inv.id} className="table-row-hover bg-surface-container-lowest border-l-2 border-transparent hover:bg-surface-container-low transition-colors duration-150">
                <td className="py-3 px-6 font-mono-data text-mono-data font-semibold text-primary">
                  {inv.id}
                </td>
                <td className="py-3 px-6 text-on-surface-variant">{inv.date}</td>
                <td className="py-3 px-6 font-mono-data text-mono-data text-on-surface-variant">
                  {inv.orderRef}
                </td>
                <td className="py-3 px-6 font-mono-data text-mono-data text-right font-semibold">
                  ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-6 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono-data font-bold uppercase tracking-wider border ${
                      inv.status === "Paid"
                        ? "bg-primary-container/30 text-primary border-primary/20"
                        : "bg-surface-container-high text-on-surface-variant border-outline-variant"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-right">
                  <button
                    aria-label="Download PDF"
                    onClick={() => alert(`Downloading PDF for invoice ${inv.id}`)}
                    className="text-on-surface-variant hover:text-primary transition-colors p-1.5 rounded hover:bg-surface-container-high cursor-pointer"
                  >
                    <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                      picture_as_pdf
                    </span>
                  </button>
                </td>
              </tr>
            ))}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 font-mono text-on-surface-variant text-xs">
                  No invoices found matching filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-outline-variant bg-surface-bright flex items-center justify-between">
        <span className="font-body-xs text-xs text-on-surface-variant">
          Showing 1-{filteredInvoices.length} of {invoices.length} invoices
        </span>
        <div className="flex gap-2">
          <button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors disabled:opacity-50" disabled>
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
              chevron_left
            </span>
          </button>
          <button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant transition-colors disabled:opacity-50" disabled>
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
