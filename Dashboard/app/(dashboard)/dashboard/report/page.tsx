"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const reportData = Array(12).fill({
  id: "01",
  from: "Robert Fox",
  reason: "Unprofessional behavior",
  to: "Robert Fox",
  dateTime: "02-24-2025",
});

export default function ReportsPage() {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-main px-6 py-5">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Reports
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-5 text-sm font-semibold text-main">
                  S.ID
                </th>
                <th className="px-6 py-5 text-sm font-semibold text-main text-center">
                  Report From
                </th>
                <th className="px-6 py-5 text-sm font-semibold text-main text-center">
                  Report Reason
                </th>
                <th className="px-6 py-5 text-sm font-semibold text-main text-center">
                  Report TO
                </th>
                <th className="px-6 py-5 text-sm font-semibold text-main text-right">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {reportData.map((report, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-[#475569] font-medium">
                    {report.id}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-9 h-9 rounded-full overflow-hidden relative border border-gray-100">
                        <Image
                          src="/appIcon.png"
                          alt="user"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-[#334155]">
                        {report.from}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[#64748B] text-center">
                    {report.reason}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-9 h-9 rounded-full overflow-hidden relative border border-gray-100">
                        <Image
                          src="/appIcon.png"
                          alt="user"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-[#334155]">
                        {report.to}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[#64748B] text-right font-medium">
                    {report.dateTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center p-8 gap-4">
          <p className="text-sm font-bold text-main uppercase tracking-widest">
            Showing 1-8 of 250
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-main transition-colors">
              <ChevronLeft size={22} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded bg-main text-white text-sm font-bold shadow-sm">
              1
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-sm text-[#64748B] hover:bg-gray-100 rounded transition-colors">
              2
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-sm text-[#64748B] hover:bg-gray-100 rounded transition-colors">
              3
            </button>
            <span className="px-2 text-[#CBD5E1] font-medium">4.....30</span>
            <button className="w-10 h-9 flex items-center justify-center text-sm text-[#64748B] hover:bg-gray-100 rounded transition-colors">
              60
            </button>
            <button className="w-10 h-9 flex items-center justify-center text-sm text-[#64748B] hover:bg-gray-100 rounded transition-colors">
              120
            </button>
            <button className="p-2 text-gray-400 hover:text-main transition-colors">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
