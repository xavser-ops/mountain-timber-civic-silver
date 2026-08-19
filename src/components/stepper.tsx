import { cn } from "@/lib/cn";

const STEPS = [
  { n: 1, label: "Dates & circuit" },
  { n: 2, label: "Rythme" },
  { n: 3, label: "Proposition" },
  { n: 4, label: "Résumé" },
] as const;

export function Stepper({ step }: { step: number }) {
  return (
    <ol className="grid grid-cols-4 gap-2">
      {STEPS.map((s) => {
        const active = s.n === step;
        const done = s.n < step;
        return (
          <li
            key={s.n}
            className={cn(
              "flex flex-col gap-1 border-t-2 pt-2",
              active && "border-primary",
              done && "border-moss",
              !active && !done && "border-border",
            )}
          >
            <span
              className={cn(
                "text-[0.65rem] font-semibold tracking-wider uppercase",
                active ? "text-primary" : done ? "text-moss" : "text-subtle",
              )}
            >
              Étape {s.n}
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                active ? "text-ink" : "text-muted",
              )}
            >
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
