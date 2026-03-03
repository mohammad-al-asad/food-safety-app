"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import ManageFeesModal from "@/components/modal/ManageFeesModal";

const subscriptionData = [
  { id: "01", name: "Robert Fox", email: "fox@email", status: "Paid", plan: "Monthly", date: "02-24-2024" },
  { id: "01", name: "Robert Fox", email: "fox@email", status: "Paid", plan: "Monthly", date: "02-24-2024" },
  { id: "01", name: "Robert Fox", email: "fox@email", status: "Paid", plan: "Monthly", date: "02-24-2024" },
  { id: "01", name: "Robert Fox", email: "fox@email", status: "Expired", plan: "6 Months", date: "02-24-2024" },
  { id: "01", name: "Robert Fox", email: "fox@email", status: "Expired", plan: "6 Months", date: "02-24-2024" },
  { id: "01", name: "Robert Fox", email: "fox@email", status: "Expired", plan: "6 Months", date: "02-24-2024" },
  { id: "01", name: "Robert Fox", email: "fox@email", status: "Expired", plan: "Yearly", date: "02-24-2024" },
  { id: "01", name: "Robert Fox", email: "fox@email", status: "Expired", plan: "Yearly", date: "02-24-2024" },
  { id: "01", name: "Robert Fox", email: "fox@email", status: "Expired", plan: "Yearly", date: "02-24-2024" },
  { id: "01", name: "Robert Fox", email: "fox@email", status: "Expired", plan: "Yearly", date: "02-24-2024" },
];

export default function SubscriptionsPage() {
  const [isManageFeesOpen, setIsManageFeesOpen] = useState(false);

  return (
    <div className="">
      <ManageFeesModal
        isOpen={isManageFeesOpen}
        onClose={() => setIsManageFeesOpen(false)}
      />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-main px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-white">Subscriptions</h1>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search User"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-sm focus:outline-none"
              />
            </div>

            <button
              onClick={() => setIsManageFeesOpen(true)}
              className="bg-white text-main px-6 py-2 rounded-lg font-bold text-sm whitespace-nowrap hover:bg-gray-50 transition-colors"
            >
              Manages Fees
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-5 text-sm font-semibold text-main">S.ID</th>
                <th className="px-6 py-5 text-sm font-semibold text-main">User</th>
                <th className="px-6 py-5 text-sm font-semibold text-main">Email</th>
                <th className="px-6 py-5 text-sm font-semibold text-main">Status</th>
                <th className="px-6 py-5 text-sm font-semibold text-main">Plans</th>
                <th className="px-6 py-5 text-sm font-semibold text-main text-right">
                  Expiration Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subscriptionData.map((sub, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-[#475569]">{sub.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden relative bg-gray-100">
                        <Image src="/appIcon.png" alt="user" fill className="object-cover" />
                      </div>
                      <span className="text-sm font-medium text-[#334155]">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#475569]">{sub.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        sub.status === "Paid" ? "text-[#10B981]" : "text-[#EF4444]"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#475569]">{sub.plan}</td>
                  <td className="px-6 py-4 text-sm text-[#475569] text-right">{sub.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center p-8 gap-4 border-t border-gray-50">
          <p className="text-sm font-bold text-main uppercase tracking-widest">
            Showing 1-8 of 250
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-main">
              <ChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-main text-white text-sm font-bold">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-400 hover:bg-gray-100 rounded">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-400 hover:bg-gray-100 rounded">
              3
            </button>
            <span className="px-2 text-gray-300">4.....30</span>
            <button className="w-10 h-8 flex items-center justify-center text-sm text-gray-400 hover:bg-gray-100 rounded">
              60
            </button>
            <button className="w-10 h-8 flex items-center justify-center text-sm text-gray-400 hover:bg-gray-100 rounded">
              120
            </button>
            <button className="p-2 text-gray-400 hover:text-main">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
