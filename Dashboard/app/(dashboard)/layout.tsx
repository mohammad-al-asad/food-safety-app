"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const isMobileMenuOpen = mobileMenuPath === pathname;

  return (
    <div className="h-screen overflow-hidden relative bg-gray-100">
      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileMenuPath(null)}
            className="absolute inset-0 bg-black/40"
          />
          <aside className="relative h-full w-fit">
            <Sidebar />
          </aside>
        </div>
      ) : null}

      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block">
          <Sidebar />
        </aside>

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 overflow-hidden">
          {/* Topbar */}
          <header className="h-16 border-b border-b-main bg-white shadow-sm px-6 flex items-center justify-between rounded-2xl">
            <Topbar onMenuClick={() => setMobileMenuPath(pathname)} />
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto no-scrollbar px-2 pt-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
