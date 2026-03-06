"use client";

import React, { ChangeEvent, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import CustomInput from "@/components/ui/CustomInput";

export default function CreateAdminPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
  };

  return (
    <div className="flex justify-center items-start max-h-[calc(100vh-7.6rem)] lg:overflow-hidden">
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-main px-6 py-4">
          <h1 className="text-3xl font-bold text-white">Create Admin</h1>
        </div>

        <form className="p-8 space-y-6">
          <CustomInput
            label="Name"
            value={formValues.name}
            onChange={(value) =>
              setFormValues((prev) => ({ ...prev, name: value }))
            }
            placeholder="jhon doe"
          />

          <CustomInput
            label="Email"
            type="email"
            value={formValues.email}
            onChange={(value) =>
              setFormValues((prev) => ({ ...prev, email: value }))
            }
            placeholder="abc@gmail.com"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              label="New Password"
              type="password"
              value={formValues.newPassword}
              onChange={(value) =>
                setFormValues((prev) => ({ ...prev, newPassword: value }))
              }
              placeholder="**********"
            />

            <CustomInput
              label="Confirm New Password"
              type="password"
              value={formValues.confirmNewPassword}
              onChange={(value) =>
                setFormValues((prev) => ({
                  ...prev,
                  confirmNewPassword: value,
                }))
              }
              placeholder="**********"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="profile-image"
              className="text-sm font-medium text-[#475569]"
            >
              Profile Image
            </label>
            <input
              id="profile-image"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleProfileImageChange}
              className="hidden"
            />
            <label
              htmlFor="profile-image"
              className="w-full h-28 p-2 rounded-xl border-2 border-dashed border-gray-300 bg-[#F8FAFC] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <ImageIcon className="text-gray-300" size={32} />
              <span className="text-gray-400 text-sm">
                {profileImage ? "Change Image" : "Upload Image"}
              </span>
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full max-w-lg py-3 bg-main text-white font-bold rounded-lg shadow-md hover:bg-[#d9561a] active:scale-[0.98] transition-all"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
