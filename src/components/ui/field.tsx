import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold tracking-wide text-muted uppercase">
        {label}
      </span>
      {children}
      {hint ? <span className="text-xs text-subtle">{hint}</span> : null}
    </div>
  );
}

const control =
  "min-h-11 w-full rounded-lg border border-border bg-card px-3 text-sm text-fg outline-none transition-shadow duration-150 focus-visible:border-primary";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, className)} {...props} />;
}

export function StepperInput({
  value,
  min,
  max,
  onChange,
  decreaseLabel = "Moins",
  increaseLabel = "Plus",
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  decreaseLabel?: string;
  increaseLabel?: string;
}) {
  return (
    <div className="flex items-center gap-2" role="group">
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-card text-lg text-ink disabled:opacity-40"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label={decreaseLabel}
        disabled={value <= min}
      >
        −
      </button>
      <span className="min-w-8 text-center text-base font-semibold tabular-nums text-ink">
        {value}
      </span>
      <button
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-card text-lg text-ink disabled:opacity-40"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label={increaseLabel}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}
