"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipContentProps,
} from "recharts";
import { Eye, Ban } from "lucide-react";
import Image from "next/image";

// Mock Data
const stats = [
  { label: "Total Clients", value: "38.6K" },
  { label: "Total Providers", value: "18.6K" },
  { label: "Total Revenue", value: "4.9M" },
];

const chartData = [
  { name: "Jan", users: 650 },
  { name: "Feb", users: 380 },
  { name: "Mar", users: 780 },
  { name: "Apr", users: 550 },
  { name: "May", users: 450 },
  { name: "June", users: 850 },
  { name: "July", users: 550 },
  { name: "Aug", users: 600 },
  { name: "Sep", users: 820 },
  { name: "Oct", users: 720 },
  { name: "Nov", users: 550 },
  { name: "Dec", users: 780 },
];

const userData = Array(6).fill({
  id: "01",
  name: "Robert Fox",
  email: "fox@email",
  phone: "+123124",
  type: "Restaurant Owner",
  date: "02-24-2024",
});

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-card rounded-xl p-8 shadow-sm border border-gray-100">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center border-r last:border-r-0 border-gray-200 py-4"
          >
            <h2 className="text-3xl font-bold text-heading">{stat.value}</h2>
            <p className="text-muted text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-semibold text-heading">User Ratio</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              <span className="text-sm text-muted">Users</span>
            </div>
          </div>
          <select className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium outline-none">
            <option>Year-2024</option>
          </select>
        </div>

        <div className="h-87.5 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({
                  active,
                  payload,
                }: TooltipContentProps<string, string>) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-primary text-white p-2 rounded shadow-lg text-xs">
                        <p className="font-bold">Users</p>
                        <p>{payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="users"
                fill="var(--token-primary)"
                radius={[4, 4, 0, 0]}
                barSize={25}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-heading">Recent Users</h3>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-4 font-medium text-sm">S.ID</th>
                <th className="p-4 font-medium text-sm">Full Name</th>
                <th className="p-4 font-medium text-sm">Email</th>
                <th className="p-4 font-medium text-sm">Phone No</th>
                <th className="p-4 font-medium text-sm">User Type</th>
                <th className="p-4 font-medium text-sm">Joined Date</th>
                <th className="p-4 font-medium text-sm text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {userData.map((user, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-body font-medium">
                    {user.id}
                  </td>
                  <td className="p-4 text-sm text-body">
                    <div className="flex items-center gap-3">
                      <div>
                        <Image
                          src="/appIcon.png"
                          alt="avatar"
                          width={8}
                          height={8}
                          className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden"
                        />
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-body">{user.email}</td>
                  <td className="p-4 text-sm text-body">{user.phone}</td>
                  <td className="p-4 text-sm text-body">{user.type}</td>
                  <td className="p-4 text-sm text-body">{user.date}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button className="text-error hover:opacity-80">
                        <Ban size={18} />
                      </button>
                      <button className="text-primary hover:opacity-80">
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
