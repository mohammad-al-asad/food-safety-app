"use client";

import { Bell, ChevronLeft } from "lucide-react";
import Link from "next/link";

const notifications = [
  { message: "Profile report!", time: "Fri, 12:30pm" },
  { message: "A new Verification request!", time: "Fri, 12:30pm" },
  { message: "Profile report!", time: "Fri, 12:30pm" },
  { message: "Profile report!", time: "Fri, 12:30pm" },
  { message: "A new user join in your app.", time: "Fri, 12:30pm" },
  { message: "A new user join in your app.", time: "Fri, 12:30pm" },
  { message: "A new user join in your app.", time: "Fri, 12:30pm" },
  { message: "A new user join in your app.", time: "Fri, 12:30pm" },
  { message: "A new user join in your app.", time: "Fri, 12:30pm" },
];

export default function NotificationsPage() {
  return (
    <div className="w-full">
      {/* Container matches the rounded white card style */}
      <div className="mx-auto w-full rounded-2xl bg-white shadow-sm border border-gray-100 max-h-[calc(100vh-7.6rem)] overflow-auto">
        {/* Header - Matches the orange bar with text and back arrow */}
        <div className="bg-main px-6 py-4 text-white">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-3xl font-bold hover:opacity-90 transition-opacity"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
            <span>All Notifications</span>
          </Link>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-50 px-8 py-4">
          {notifications.map((item, index) => (
            <div
              key={`${item.message}-${index}`}
              className="group flex items-start gap-4 py-5 transition-colors hover:bg-gray-50/50"
            >
              {/* Icon Container matches the small orange bell */}
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-orange-50/50 text-main">
                <Bell size={18} />
              </div>

              <div className="flex-1">
                <p className="text-[15px] font-medium text-[#334155]">
                  {item.message}
                </p>
                <p className="mt-1 text-xs font-medium text-gray-400">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
