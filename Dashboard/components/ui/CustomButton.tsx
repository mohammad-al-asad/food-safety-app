"use client";

import { ButtonHTMLAttributes } from "react";

type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export default function CustomButton({
  children,
  className = "",
  fullWidth = true,
  style,
  ...props
}: CustomButtonProps) {
  return (
    <button
      {...props}
      className={[
        "rounded-lg bg-primary h-11.5 px-4 py-2 text-sm font-semibold text-primary-text transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      style={style}
    >
      {children}
    </button>
  );
}
