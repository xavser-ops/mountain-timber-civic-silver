import { cn } from "@/lib/cn";
import type { CircuitMatch } from "@/lib/match-circuits";

export function CircuitCard({
  match,
  selected,
  onSelect,
}: {
  match: CircuitMatch;
  selected: boolean;
  onSelect: () => void;
}) {
  const { circuit, role, reasons, warnings } = match;
  const combo = circuit.composition;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full flex-col gap-3 rounded-2xl border bg-card p-5 text-left shadow-soft transition-transform duration-200",
        selected ? "border-primary ring-2 ring-ice" : "border-border hover:-translate-y-0.5",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-semibold tracking-wider text-primary uppercase">
            {role === "primary" ? "Conseillé" : "Autre parcours"}
            {selected ? " · retenu" : ""}
          </p>
          <h3 className="font-display mt-1 text-xl tracking-tight text-ink">
            {circuit.title}
          </h3>
        </div>
        <span className="rounded-full bg-ice px-2.5 py-1 text-xs font-semibold text-primary">
          {combo ? combo.scheme : `${circuit.duration} j / ${circuit.nights} n`}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted">{circuit.tagline}</p>
      {combo ? (
        <p className="text-xs font-medium text-primary">
          Assemblage : {combo.parts.join(" · ")}
        </p>
      ) : null}
      <p className="text-xs font-medium text-fg">
        Nuits : {circuit.nightsSummary}
      </p>
      <p className="text-xs text-subtle">{circuit.transport}</p>
      <ul className="space-y-1 text-sm text-fg">
        {reasons.map((r) => (
          <li key={r} className="flex gap-2">
            <span className="text-primary" aria-hidden>
              →
            </span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
      {warnings.length > 0 ? (
        <ul className="space-y-1 rounded-lg bg-wx-sun-bg px-3 py-2 text-xs text-wx-sun">
          {warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      ) : null}
    </button>
  );
}