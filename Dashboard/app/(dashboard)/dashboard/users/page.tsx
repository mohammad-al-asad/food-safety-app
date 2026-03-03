"use client";
import React, { useState } from "react";
import {
  Eye,
  Ban,
  Search,
  ChevronLeft,
  ChevronRight,
  ListFilter,
} from "lucide-react";
import UserDetailsModal from "@/components/modal/UserDetailsModal";
import ConfirmationModal from "@/components/modal/ConfirmationModal";

export interface User {
  name: string;
  email: string;
  phone: string;
  joiningDate: string;
  userType: string;
  image?: string;
}

interface UserRow extends User {
  id: string;
}
// Updated Mock Data to match the 1-8 of 250 count
const userData: UserRow[] = Array(8).fill({
  id: "01",
  name: "Robert Fox",
  email: "fox@email",
  phone: "+123124",
  joiningDate: "02-24-2024",
  userType: "User",
});

export default function UserList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleBlockUser = () => {
    setIsModalOpen(false);
    setIsBlockModalOpen(true);
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
      />
      <ConfirmationModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        onConfirm={() => setIsBlockModalOpen(false)}
        title={
          <>
            Do you want to Block <br /> this user?
          </>
        }
      />
      {/* --- Orange Header --- */}
      <div className="bg-main p-4 flex flex-col md:flex-row justify-between items-center gap-4 rounded-t-xl">
        <h2 className="text-2xl font-semibold text-white">User List</h2>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search User"
              className="w-full pl-10 pr-4 py-2 rounded-md text-sm outline-none bg-white text-gray-700"
            />
          </div>
          <button className="bg-white text-main px-6 py-2 rounded-md text-sm font-bold whitespace-nowrap">
            Blocked Users
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* --- Filters Row --- */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <button className="bg-main text-white px-6 py-2 rounded-md text-sm font-medium">
              User
            </button>
            <button className="border border-main text-main px-4 py-2 rounded-md text-sm font-medium">
              Restaurant Owner
            </button>
          </div>

          <button className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-600">
            <ListFilter size={16} />
            <span>Date</span>
            <ChevronLeft size={16} className="-rotate-90 ml-1" />
          </button>
        </div>

        {/* --- Table Section --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 font-semibold text-main text-sm">S.ID</th>
                <th className="pb-4 font-semibold text-main text-sm">
                  Full Name
                </th>
                <th className="pb-4 font-semibold text-main text-sm">Email</th>
                <th className="pb-4 font-semibold text-main text-sm">
                  Phone No
                </th>
                <th className="pb-4 font-semibold text-main text-sm">
                  Joined Date
                </th>
                <th className="pb-4 font-semibold text-main text-sm text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {userData.map((user, i) => (
                <tr key={i} className="group">
                  <td className="py-4 text-sm text-gray-600">{user.id}</td>
                  <td className="py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
                        {/* Replace with your local image or a placeholder */}
                        <div className="bg-[#94a3b8] w-full h-full flex items-center justify-center text-[10px] text-white">
                          RF
                        </div>
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="py-4 text-sm text-gray-600">{user.phone}</td>
                  <td className="py-4 text-sm text-gray-600">
                    {user.joiningDate}
                  </td>
                  <td className="py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        className="text-main hover:scale-110 transition-transform"
                        onClick={handleBlockUser}
                      >
                        <Ban size={20} />
                      </button>
                      <button
                        className="text-main hover:scale-110 transition-transform"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Pagination --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
          <p className="text-sm font-bold text-main uppercase tracking-wider">
            Showing 1-8 of 250
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <ChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-main text-white text-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-100 rounded">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-100 rounded">
              3
            </button>
            <span className="px-1 text-gray-400">4....30</span>
            <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-100 rounded">
              60
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-100 rounded">
              120
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
