"use client";

import { Bell, Menu, User } from "lucide-react";
import Link from "next/link";

type TopbarProps = {
  onMenuClick?: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <div className="w-full flex items-center justify-between">
      {/* Welcome Section */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-main transition-colors hover:bg-orange-50"
        >
          <Menu size={22} />
        </button>
        <div>
          <p className="text-sm text-muted">Welcome,</p>
          <h2 className="text-lg font-semibold text-heading">James</h2>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Chat */}
        {/* <Link
          href="/dashboard/messages"
          className="relative p-2 rounded-full bg-card border border-primary hover:bg-gray-100 transition"
        >
          <MessageCircle size={18} className="text-primary" />
        </Link> */}

        {/* Notifications */}
        <Link
          href="/dashboard/notifications"
          className="relative p-2 rounded-full bg-card border border-primary hover:bg-gray-100 transition"
        >
          <Bell size={18} className="text-primary" />
          {/* Notification Dot */}
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
        </Link>

        {/* User Avatar */}
        <Link
          href="/dashboard/profile"
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-text"
        >
          <User size={16} />
        </Link>
      </div>
    </div>
  );
}
