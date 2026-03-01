"use client";

import { MessageCircle, Bell, User } from "lucide-react";

export default function Topbar() {
  return (
    <div className="w-full flex items-center justify-between">
      {/* Welcome Section */}
      <div>
        <p className="text-sm text-muted">Welcome,</p>
        <h2 className="text-lg font-semibold text-heading">
          James
        </h2>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Chat */}
        <button className="relative p-2 rounded-full bg-card border border-primary hover:bg-gray-100 transition">
          <MessageCircle size={18} className="text-primary" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-full bg-card border border-primary hover:bg-gray-100 transition">
          <Bell size={18} className="text-primary" />
          {/* Notification Dot */}
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
        </button>

        {/* User Avatar */}
        <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-text">
          <User size={16} />
        </button>
      </div>
    </div>
  );
}
