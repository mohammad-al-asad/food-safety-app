"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { label: "Change Password", href: "/dashboard/settings/change-password" },
  { label: "Privacy Policy", href: "/dashboard/settings/privacy-policy" },
  { label: "Terms & Conditions", href: "/dashboard/settings/terms-conditions" },
  { label: "About Us", href: "/dashboard/settings/about-us" },
];

export default function SettingsPage() {
  return (
    <div className="w-full">
      <div className="w-full h-[calc(100vh-7.4rem)] overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="bg-main px-4 py-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Settings
          </h1>
        </div>

        <div className="flex flex-col">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="group flex items-center justify-between border-b border-gray-100 px-4 py-4 transition-colors last:border-0 hover:bg-gray-50"
                >
                  <span className="text-[15px] font-normal text-[#2d3748]">
                    {item.label}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-gray-400 transition-colors group-hover:text-gray-600"
                  />
                </Link>
              ) : (
                <button className="group flex w-full items-center justify-between border-b border-gray-100 px-4 py-4 text-left transition-colors last:border-0 hover:bg-gray-50">
                  <span className="text-[15px] font-normal text-[#2d3748]">
                    {item.label}
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-gray-400 transition-colors group-hover:text-gray-600"
                  />
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
