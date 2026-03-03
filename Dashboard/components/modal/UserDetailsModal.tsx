"use client";
import React, { useState } from "react";
import { User } from "@/app/(dashboard)/dashboard/users/page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import ConfirmationModal from "@/components/modal/ConfirmationModal";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
}

export default function UserDetailsModal({
  isOpen,
  onClose,
  user,
}: UserDetailsModalProps) {
  const [isBlockConfirmOpen, setIsBlockConfirmOpen] = useState(false);

  const displayUser = user || {
    name: "John Doe",
    email: "john@email.com",
    phone: "+12313412",
    joiningDate: "02-24-2024",
    userType: "User",
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-160 border-0 px-20 p-10 bg-white"
      >
        {/* Header Section */}
        <div className="text-center mb-6">
          <DialogTitle className="text-3xl font-semibold text-main">
            User Details
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-sm mt-1">
            See all details about {displayUser.name}
          </DialogDescription>
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-sm">
            <div className="bg-[#94a3b8] w-full h-full flex items-center justify-center text-white text-xl">
              JD
            </div>
          </div>
          <h3 className="text-2xl font-medium text-main">{displayUser.name}</h3>
        </div>

        {/* Details List */}
        <div className="space-y-5 mb-10">
          <DetailRow label="Name" value={displayUser.name + "."} />
          <DetailRow label="Email" value={displayUser.email} />
          <DetailRow label="Phone" value={displayUser.phone} />
          <DetailRow label="Joining Date" value={displayUser.joiningDate} />
          <DetailRow label="User Type" value={displayUser.userType} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-main text-main rounded-md font-bold hover:bg-orange-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              setIsBlockConfirmOpen(true);
            }}
            className="flex-1 py-2.5 bg-main text-white rounded-md font-bold hover:bg-[#d9561a] transition-colors"
          >
            Block
          </button>
        </div>
      </DialogContent>
      <ConfirmationModal
        isOpen={isBlockConfirmOpen}
        onClose={() => setIsBlockConfirmOpen(false)}
        onConfirm={() => {
          setIsBlockConfirmOpen(false);
        }}
        title={
          <>
            Do you want to Block <br /> this user?
          </>
        }
      />
    </Dialog>
  );
}

// Helper component for the key-value rows
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="font-bold text-[#1e293b]">{label}</span>
      <span className="text-gray-500">{value}</span>
    </div>
  );
}
