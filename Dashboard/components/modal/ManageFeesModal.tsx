"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface ManageFeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMonthlyFee?: number;
  defaultYearlyFee?: number;
  onUpdate?: (fees: { monthlyFee: number; yearlyFee: number }) => void;
}

export default function ManageFeesModal({
  isOpen,
  onClose,
  defaultMonthlyFee = 75,
  defaultYearlyFee = 405,
  onUpdate,
}: ManageFeesModalProps) {
  const [monthlyFee, setMonthlyFee] = useState(defaultMonthlyFee);
  const [yearlyFee, setYearlyFee] = useState(defaultYearlyFee);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-85 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-main py-4 text-center">
          <h1 className="text-3xl font-medium tracking-wide text-white">
            Manage Fees
          </h1>
        </div>

        <div className="p-8">
          <h2 className="mb-8 text-center text-2xl font-semibold text-[#2d3748]">
            Subscriptions Fees
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 p-4 text-center">
              <p className="mb-3 font-medium text-gray-700">
                Monthly Plans: ${monthlyFee}
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setMonthlyFee((prev) => Math.max(0, prev - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300"
                >
                  <Minus size={18} strokeWidth={3} />
                </button>
                <span className="w-8 text-lg font-medium text-gray-700">
                  {monthlyFee}
                </span>
                <button
                  onClick={() => setMonthlyFee((prev) => prev + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-main/10 text-main transition-colors hover:bg-main/20"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4 text-center">
              <p className="mb-3 font-medium text-gray-700">
                Yearly Plan: ${yearlyFee}
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setYearlyFee((prev) => Math.max(0, prev - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300"
                >
                  <Minus size={18} strokeWidth={3} />
                </button>
                <span className="w-12 text-lg font-medium text-gray-700">
                  {yearlyFee}
                </span>
                <button
                  onClick={() => setYearlyFee((prev) => prev + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-main/10 text-main transition-colors hover:bg-main/20"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => {
                onUpdate?.({ monthlyFee, yearlyFee });
                onClose();
              }}
              className="flex-1 rounded-lg border-2 border-main px-2 py-3 text-sm font-semibold text-main transition-colors hover:bg-main/10"
            >
              Update fee
            </button>
            <button
              onClick={() => {
                setMonthlyFee(defaultMonthlyFee);
                setYearlyFee(defaultYearlyFee);
              }}
              className="flex-1 rounded-lg bg-main px-2 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#d94e1c]"
            >
              Reset to default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
