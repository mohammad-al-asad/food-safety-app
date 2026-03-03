"use client";

import React, { useState } from "react";
import { Eye, Download, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import TransactionDetailsModal from "@/components/modal/TransactionDetailsModal";

const stats = [
  { label: "Today", value: "1.2k" },
  { label: "This Month", value: "18.6K" },
  { label: "Total Revenue", value: "4.9M" },
];

const transactionData = Array(9).fill({
  id: "01",
  name: "Robert Fox",
  trxId: "#123456",
  plan: "Monthly",
  price: "$75",
  date: "02-24-2024",
  email: "fox@email.com",
  accountNumber: "**** **** **** *545",
});

export default function EarningsPage() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<{
    id: string;
    plan: string;
    date: string;
    userName: string;
    accountNumber: string;
    email: string;
    amount: string;
  } | null>(null);

  const handleViewTransaction = (trx: (typeof transactionData)[number]) => {
    setSelectedTransaction({
      id: trx.trxId,
      plan: `${trx.plan} Subscription`,
      date: trx.date,
      userName: trx.name,
      accountNumber: trx.accountNumber,
      email: trx.email,
      amount: trx.price,
    });
    setIsTransactionModalOpen(true);
  };

  return (
    <div className="space-y-6 min-h-screen">
      <TransactionDetailsModal
        isOpen={isTransactionModalOpen}
        onClose={() => {
          setIsTransactionModalOpen(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction || undefined}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center py-10 border-r last:border-r-0 border-gray-100"
          >
            <h2 className="text-4xl font-bold text-[#1E293B]">{stat.value}</h2>
            <p className="text-[#64748B] text-base mt-2 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-main text-white">
                <th className="p-4 font-semibold text-sm first:pl-6">S.ID</th>
                <th className="p-4 font-semibold text-sm">Full Name</th>
                <th className="p-4 font-semibold text-sm">Trx ID</th>
                <th className="p-4 font-semibold text-sm">Plans</th>
                <th className="p-4 font-semibold text-sm">Price</th>
                <th className="p-4 font-semibold text-sm">Date</th>
                <th className="p-4 font-semibold text-sm text-center last:pr-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactionData.map((trx, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-[#64748B] font-medium first:pl-6">
                    {trx.id}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden relative">
                        <Image
                          src="/appIcon.png"
                          alt="avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-[#334155]">
                        {trx.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-[#64748B]">{trx.trxId}</td>
                  <td className="p-4 text-sm text-[#64748B]">{trx.plan}</td>
                  <td className="p-4 text-sm text-[#64748B] font-semibold">
                    {trx.price}
                  </td>
                  <td className="p-4 text-sm text-[#64748B]">{trx.date}</td>
                  <td className="p-4 last:pr-6">
                    <div className="flex justify-center gap-4">
                      <button className="text-[#64748B] hover:text-main transition-colors">
                        <Download size={20} />
                      </button>
                      <button
                        className="text-main hover:opacity-80 transition-opacity"
                        onClick={() => handleViewTransaction(trx)}
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
          <p className="text-sm font-bold text-main uppercase tracking-wider">
            Showing 1-8 of 250
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#64748B] hover:text-main">
              <ChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-main text-white text-sm font-bold">
              1
            </button>
            {[2, 3].map((num) => (
              <button
                key={num}
                className="w-8 h-8 flex items-center justify-center text-sm text-[#64748B] hover:bg-gray-100 rounded"
              >
                {num}
              </button>
            ))}
            <span className="px-1 text-[#CBD5E1]">4....30</span>
            <button className="w-10 h-8 flex items-center justify-center text-sm text-[#64748B] hover:bg-gray-100 rounded">
              60
            </button>
            <button className="w-10 h-8 flex items-center justify-center text-sm text-[#64748B] hover:bg-gray-100 rounded">
              120
            </button>
            <button className="p-2 text-[#64748B] hover:text-main">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
