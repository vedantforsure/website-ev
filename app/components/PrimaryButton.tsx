"use client";

import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { playCtaClick } from "./sounds";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "lg" | "sm";
};

const sizeStyles = {
  lg: "px-5 py-3 text-[20px] leading-[28px] tracking-[0.3px]",
  sm: "px-4 py-2.5 text-[16px] leading-[20px] tracking-[0.24px]",
};

export default function PrimaryButton({
  children = "Start for Free",
  className = "",
  size = "lg",
  onClick,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center bg-white rounded-[88px] font-medium text-black whitespace-nowrap cursor-pointer select-none transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/90 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 motion-reduce:transition-none motion-reduce:active:scale-100 ${sizeStyles[size]} ${className}`}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        playCtaClick();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
