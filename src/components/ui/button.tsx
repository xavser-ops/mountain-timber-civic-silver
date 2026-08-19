import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "moss";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold tracking-tight transition-opacity duration-150 disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary" && "bg-primary text-primary-fg hover:bg-primary-hover",
        variant === "secondary" &&
          "border border-border-strong bg-card text-fg hover:bg-bg-elevated",
        variant === "ghost" && "text-muted hover:bg-bg-elevated hover:text-fg",
        variant === "moss" && "bg-moss text-moss-fg hover:opacity-90",
        className,
      )}
      {...props}
    />
  );
}
