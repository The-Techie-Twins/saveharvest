"use client";

import React, { useState } from "react";
import { AlertOctagon, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

export function EmergencyReportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [issueType, setIssueType] = useState("cold_chain");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setDescription("");
      alert("Emergency report sent to Co-op dispatcher and fleet coordinator.");
    }, 1500);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full bg-status-critical/10 text-status-critical hover:bg-status-critical/20 border border-status-critical/20 font-body-sm text-sm font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-150"
      >
        <AlertOctagon className="w-5 h-5 text-status-critical" />
        Report Route Incident / Alert
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-outline-variant w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex justify-between items-center bg-status-critical/10 p-4 border-b border-status-critical/20">
              <div className="flex items-center gap-2 text-status-critical">
                <AlertOctagon className="w-5 h-5" />
                <h3 className="font-headline-md text-base font-bold">Report Route Emergency</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant hover:bg-surface-container rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Incident Type
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg p-3 font-body-sm text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="cold_chain">Cold Chain (Temp rising &gt; 4°C)</option>
                  <option value="vehicle">Mechanical / Vehicle breakdown</option>
                  <option value="traffic">Extreme Transit Delay (Traffic/Roadblock)</option>
                  <option value="other">Other Incident</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Add Details
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue (e.g., cooling unit compressor failure, flat tire at Route 101)..."
                  className="w-full h-24 bg-surface border border-outline-variant rounded-lg p-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none font-body-sm"
                />
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-outline-variant text-on-surface-variant rounded-lg text-sm hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitted}
                  className="px-5 py-2 bg-status-critical text-white rounded-lg text-sm font-semibold hover:bg-red-750 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitted ? "Reporting..." : "Send Alert"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
