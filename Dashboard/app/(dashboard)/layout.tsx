import type { ReactNode } from "react"
import Sidebar from "@/components/layout/Sidebar"
import Topbar from "@/components/layout/Topbar"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <div className="flex h-full">
        {/* Sidebar */}
        <aside className="w-64 hidden md:block">
          <Sidebar />
        </aside>

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 overflow-hidden">
          {/* Topbar */}
          <header className="h-16 border-b border-b-main bg-white shadow-sm px-6 flex items-center justify-between rounded-2xl">
            <Topbar />
          </header>

          {/* Page Content */}
          <main className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-2 pt-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
