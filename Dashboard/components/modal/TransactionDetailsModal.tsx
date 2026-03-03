"use client";

import React from "react";

interface TransactionDetails {
  id: string;
  plan: string;
  date: string;
  userName: string;
  accountNumber: string;
  email: string;
  amount: string;
}

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: TransactionDetails;
}

export default function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
}: TransactionDetailsModalProps) {
  if (!isOpen) return null;

  const data = transaction || {
    id: "#12345678",
    plan: "Monthly Subscription",
    date: "02-24-2024",
    userName: "John Doe.",
    accountNumber: "**** **** **** *545",
    email: "john@email.com",
    amount: "$75",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-10 relative">
        <div className="text-center mb-10">
          <h2 className="text-[32px] font-semibold text-main">
            Transaction Details
          </h2>
        </div>

        <div className="space-y-5 mb-10">
          <DetailRow label="Transaction ID" value={data.id} />
          <DetailRow label="Plans" value={data.plan} />
          <DetailRow label="Date" value={data.date} />
          <DetailRow label="Name" value={data.userName} />
          <DetailRow label="A/C number" value={data.accountNumber} />
          <DetailRow label="Email" value={data.email} />
          <DetailRow label="Transaction amount" value={data.amount} />
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-main text-main rounded-md font-bold text-sm hover:bg-orange-50 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 bg-main text-white rounded-md font-bold text-sm hover:bg-[#d9561a] transition-colors">
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-[15px]">
      <span className="font-bold text-[#1E293B]">{label}</span>
      <span className="text-[#64748B] text-right">{value}</span>
    </div>
  );
}
