"use client";
import logo from "@/public/appIcon.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  CreditCard,
  UserPlus,
  Shield,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Earnings", href: "/dashboard/earnings", icon: DollarSign },
  { name: "Subscriptions", href: "/dashboard/subscriptions", icon: CreditCard },
  { name: "Add Management", href: "/dashboard/add-management", icon: UserPlus },
  { name: "Create Admin", href: "/dashboard/create-admin", icon: Shield },
  { name: "Report", href: "/dashboard/report", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 p-4">
      <div className="h-full rounded-2xl bg-card shadow-sm flex flex-col">
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-3 border-b border-primary">
          <Image src={logo} alt="logo" width={10} height={10} className="w-10 h-10 rounded-full bg-primary" />
          <h1 className="text-lg font-semibold text-heading">
            Dashboard
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 px-1.5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-text"
                    : "text-body hover:bg-gray-100",
                )}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 justify-center flex border-t border-primary rounded-b-lg">
          <button className="flex items-center gap-2 text-sm text-error hover:scale-[1.05] transition">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
