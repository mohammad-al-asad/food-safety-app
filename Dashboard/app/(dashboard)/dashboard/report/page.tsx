"use client";

import React from "react";
import Image from "next/image";
import TablePagination from "@/components/ui/TablePagination";

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
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-h-[calc(100vh-7.6rem)] flex flex-col">
        <div className="bg-main px-6 py-4">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Reports
          </h1>
        </div>

        <div className="min-h-0 flex-1 overflow-auto">
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

                  <td className="px-6 py-4 text-sm text-[#64748B] text-right font-medium">
                    {report.dateTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TablePagination />
      </div>
    </div>
  );
}
