"use client";

import React, { ChangeEvent, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Home,
  UploadCloud,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Placement = "home" | "restaurant";

export default function NewAddPage() {
  const router = useRouter();
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [placement, setPlacement] = useState<Placement>("home");

  const handleBannerUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-h-[calc(100vh-7.6rem)] flex flex-col">
      <div className="bg-main px-6 py-3.5">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-3 text-white"
        >
          <ArrowLeft size={30} />
          <h1 className="text-3xl font-bold text-white">New Add</h1>
        </button>
      </div>

      <form className="min-h-0 flex-1 flex flex-col">
        <div className="p-5 space-y-4 max-h-[calc(100vh-22rem)]] overflow-scroll flex-1">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#111827]">
              Upload Banner
            </h2>
            <input
              id="banner-upload"
              type="file"
              accept=".svg,.png,.jpg,.jpeg,.gif"
              className="hidden"
              onChange={handleBannerUpload}
            />
            <label
              htmlFor="banner-upload"
              className="h-36 w-full rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#f1f5f9] transition-colors"
            >
              <div className="h-12 w-12 rounded-full border border-[#dbeafe] bg-white text-[#3b82f6] flex items-center justify-center">
                <UploadCloud size={20} />
              </div>
              <p className="text-sm font-medium text-[#475569]">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-[#94a3b8]">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
              {selectedFileName ? (
                <p className="mt-1 text-xs font-medium text-main">
                  Selected: {selectedFileName}
                </p>
              ) : null}
            </label>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#111827]">
              Set Duration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#334155]">
                  Start Date
                </label>
                <div className="relative">
                  <CalendarDays
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-[#f8fafc] pl-9 pr-3 text-sm text-[#334155] outline-none focus:ring-2 focus:ring-main/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-[#334155]">
                  End Date
                </label>
                <div className="relative">
                  <CalendarDays
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-[#f8fafc] pl-9 pr-3 text-sm text-[#334155] outline-none focus:ring-2 focus:ring-main/20"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#111827]">
              Select Placement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPlacement("home")}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  placement === "home"
                    ? "border-[#60a5fa] bg-[#eff6ff]"
                    : "border-gray-200 bg-[#f8fafc] hover:bg-[#f1f5f9]"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 text-[#3b82f6]">
                    <Home size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a]">
                      Home Page
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Display on the main home page for high visibility.
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPlacement("restaurant")}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  placement === "restaurant"
                    ? "border-[#60a5fa] bg-[#eff6ff]"
                    : "border-gray-200 bg-[#f8fafc] hover:bg-[#f1f5f9]"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 text-main">
                    <Utensils size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a]">
                      Restaurant Page
                    </p>
                    <p className="text-xs text-[#64748B]">
                      Display specifically on restaurant detail pages.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </section>
        </div>

        <div className="border-t border-gray-100 bg-white px-6 py-4 flex items-center justify-end gap-3">
          <Link
            href="/dashboard/add-management"
            className="rounded-md px-4 py-2 text-sm font-semibold text-[#64748B] hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-full bg-main px-6 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Save Ad
          </button>
        </div>
      </form>
    </div>
  );
}
