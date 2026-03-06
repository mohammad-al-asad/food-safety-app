"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import CustomInput from "@/components/ui/CustomInput";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"edit" | "password">("edit");
  const [profileValues, setProfileValues] = useState({
    userName: "userdemo",
    email: "email@gmail.com",
    contactNo: "+1 222 333 4444",
  });
  const [passwordValues, setPasswordValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="flex justify-center items-start">
      <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col pb-4">
        <div className="bg-main px-6 py-4">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Profile
          </h1>
        </div>

        <div className="p-3 flex-1 flex flex-col items-center">
          <div className="relative mb-2">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100">
              <Image
                src="/appIcon.png"
                alt="Mr. Admin"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 p-1.5 bg-gray-200 rounded-full border-2 border-white text-gray-600 hover:bg-gray-300 transition-colors">
              <Pencil size={14} strokeWidth={3} />
            </button>
          </div>

          <h2 className="text-2xl font-bold text-[#1E293B] mb-3">Mr. Admin</h2>

          <div className="flex gap-8 mb-4 border-b border-gray-50 w-full justify-center">
            <button
              onClick={() => setActiveTab("edit")}
              className={`text-sm font-semibold transition-colors ${
                activeTab === "edit"
                  ? "text-main border-b-2 border-main pb-2"
                  : "text-gray-400"
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`text-sm font-semibold transition-colors ${
                activeTab === "password"
                  ? "text-main border-b-2 border-main pb-2"
                  : "text-gray-400"
              }`}
            >
              Change Password
            </button>
          </div>

          {activeTab === "edit" ? (
            <form className="w-full max-w-lg space-y-3" onSubmit={(e) => e.preventDefault()}>
              <CustomInput
                label="User Name"
                value={profileValues.userName}
                onChange={(value) =>
                  setProfileValues((prev) => ({ ...prev, userName: value }))
                }
                placeholder="userdemo"
              />

              <CustomInput
                label="Email"
                type="email"
                value={profileValues.email}
                onChange={(value) =>
                  setProfileValues((prev) => ({ ...prev, email: value }))
                }
                placeholder="email@gmail.com"
              />

              <CustomInput
                label="Contact No"
                value={profileValues.contactNo}
                onChange={(value) =>
                  setProfileValues((prev) => ({ ...prev, contactNo: value }))
                }
                placeholder="+1 222 333 4444"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-main text-white font-bold rounded-xl shadow-md hover:bg-[#d9561a] transition-all"
                >
                  Update Profile
                </button>
              </div>
            </form>
          ) : (
            <form className="w-full max-w-lg space-y-3" onSubmit={(e) => e.preventDefault()}>
              <CustomInput
                label="Current Password"
                type="password"
                value={passwordValues.currentPassword}
                onChange={(value) =>
                  setPasswordValues((prev) => ({ ...prev, currentPassword: value }))
                }
                placeholder="••••••"
              />

              <CustomInput
                label="New Password"
                type="password"
                value={passwordValues.newPassword}
                onChange={(value) =>
                  setPasswordValues((prev) => ({ ...prev, newPassword: value }))
                }
                placeholder="••••••"
              />

              <CustomInput
                label="Confirm Password"
                type="password"
                value={passwordValues.confirmPassword}
                onChange={(value) =>
                  setPasswordValues((prev) => ({ ...prev, confirmPassword: value }))
                }
                placeholder="••••••"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-main text-white font-bold rounded-xl shadow-md hover:bg-[#d9561a] transition-all"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
