"use client";

import { InputHTMLAttributes } from "react";

type CustomInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
  actionLabel?: string;
  onActionClick?: () => void;
  error?: string;
};

export default function CustomInput({
  actionLabel,
  autoComplete,
  error,
  id,
  label,
  onActionClick,
  onChange,
  placeholder,
  type = "text",
  value,
  ...props
}: CustomInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="text-xs font-bold text-body">
          {label}
        </label>
        {actionLabel ? (
          <button
            type="button"
            className="text-xs font-medium text-main"
            onClick={onActionClick}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
      <input
        {...props}
        id={inputId}
        autoComplete={autoComplete}
        className={[
          "rounded-lg border-2 h-11 w-full bg-field px-3 py-2 text-sm text-body outline-none focus:border-main",
          error ? "border-error" : "border-border",
        ].join(" ")}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? <p className="text-xs text-error">{error}</p> : null}
    </div>
  );
}
