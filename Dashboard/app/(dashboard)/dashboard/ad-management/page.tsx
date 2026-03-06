"use client";

import React from "react";
import { Pause, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import TablePagination from "@/components/ui/TablePagination";

type BannerItem = {
  id: string;
  placement: "Home Page" | "Restaurant Page";
  duration: string;
  status: "Active" | "Scheduled" | "Expired";
  previewClassName: string;
};

const bannerData: BannerItem[] = [
  {
    id: "b-1",
    placement: "Home Page",
    duration: "Feb 20 - Mar 5",
    status: "Active",
    previewClassName: "bg-gradient-to-r from-[#1f2937] via-[#334155] to-[#0f172a]",
  },
  {
    id: "b-2",
    placement: "Restaurant Page",
    duration: "Mar 10 - Mar 20",
    status: "Scheduled",
    previewClassName: "bg-gradient-to-r from-[#9ca3af] via-[#e5e7eb] to-[#9ca3af]",
  },
  {
    id: "b-3",
    placement: "Home Page",
    duration: "Feb 1 - Feb 14",
    status: "Expired",
    previewClassName: "bg-gradient-to-r from-[#f8fafc] via-[#e7e5e4] to-[#d6d3d1]",
  },
  {
    id: "b-4",
    placement: "Home Page",
    duration: "Mar 20 - Apr 15",
    status: "Scheduled",
    previewClassName: "bg-gradient-to-r from-[#f3f4f6] via-[#e5e7eb] to-[#f3f4f6]",
  },
  {
    id: "b-5",
    placement: "Restaurant Page",
    duration: "Feb 12 - Mar 12",
    status: "Active",
    previewClassName: "bg-gradient-to-r from-[#115e59] via-[#0f766e] to-[#134e4a]",
  },
];

const statusStyles: Record<BannerItem["status"], string> = {
  Active: "bg-[#dcfce7] text-[#16a34a]",
  Scheduled: "bg-[#fef3c7] text-[#d97706]",
  Expired: "bg-[#fee2e2] text-[#ef4444]",
};

export default function AddManagementPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-[calc(100vh-7.4rem)] flex flex-col">
      <div className="bg-main px-6 py-4 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-white">
          Add Management
        </h1>
        <Link
          href="/dashboard/add-management/new-add"
          className="rounded-md bg-white px-6 py-1.5 font-semibold text-main transition-colors hover:bg-orange-50"
        >
          New Add Banner
        </Link>
      </div>

      <div className="overflow-x-auto min-h-0 flex-1">
        <table className="w-full text-left">
          <thead className="bg-[#f8fafc] text-main border-b border-main/60">
            <tr>
              <th className="px-6 py-2 text-lg font-medium">
                Banner
              </th>
              <th className="px-6 py-2 text-lg font-medium">
                Placement
              </th>
              <th className="px-6 py-2 text-lg font-medium">
                Duration
              </th>
              <th className="px-6 py-2 text-lg font-medium">
                Status
              </th>
              <th className="px-6 py-2 text-lg font-medium text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {bannerData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-6 py-5">
                  <div
                    className={`h-10 w-24 rounded-md border border-gray-100 ${item.previewClassName}`}
                  />
                </td>

                <td className="px-6 py-5">
                  <span className="inline-flex rounded-full bg-[#e0ecff] px-3 py-1 text-xs font-medium text-[#2563eb]">
                    {item.placement}
                  </span>
                </td>

                <td className="px-6 py-5 text-sm text-[#64748B]">{item.duration}</td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      className="text-[#94A3B8] hover:text-main transition-colors"
                      aria-label="Edit banner"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      className="text-[#94A3B8] hover:text-main transition-colors"
                      aria-label="Pause banner"
                    >
                      <Pause size={14} />
                    </button>
                    <button
                      type="button"
                      className="text-[#94A3B8] hover:text-[#ef4444] transition-colors"
                      aria-label="Delete banner"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination />
    </div>
  );
}
