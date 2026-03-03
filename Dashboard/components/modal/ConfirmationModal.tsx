"use client";

import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  confirmButtonClassName?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  cancelText = "Cancel",
  confirmText = "Yes, Confirm",
  confirmButtonClassName = "bg-main text-white hover:bg-[#d9561a]",
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-[2px] px-4">
      <div className="w-full max-w-125 rounded-lg bg-white p-10 shadow-xl">
        <div className="mb-8 text-center">
          <h2 className="text-[32px] font-bold leading-tight text-[#0F172A]">
            {title}
          </h2>
        </div>

        <div className="flex items-center justify-center gap-5">
          <button
            onClick={onClose}
            className="max-w-40 flex-1 rounded-md border border-main bg-white py-2.5 text-sm font-semibold text-main transition-colors hover:bg-orange-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`max-w-40 flex-1 rounded-md py-2.5 text-sm font-semibold transition-colors ${confirmButtonClassName}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
