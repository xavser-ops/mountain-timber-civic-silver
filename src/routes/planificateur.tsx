import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { CircuitCard } from "@/components/circuit-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Stepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, StepperInput } from "@/components/ui/field";
import { adaptCircuit } from "@/lib/adapt-circuit";
import { circuitById } from "@/lib/circuits";
import { estimateCost, formatEuro, partyLabel } from "@/lib/cost";
import { matchCircuits } from "@/lib/match-circuits";
import { placePhotos, type PlacePhoto } from "@/lib/place-photo";
import { usePlanner } from "@/lib/planner-store";
import {
  DURATIONS,
  PACE_LABEL,
  SEASON_LABEL,
  santaDefault,
  seasonFromDate,
  slotFromTime,
} from "@/lib/season";

export const Route = createFileRoute("/planificateur")({
  component: PlanificateurPage,
});

function PlanificateurPage() {
  const s = usePlanner();
  const season = seasonFromDate(s.arrivalDate);
  const arrivalSlot = slotFromTime(s.arrivalTime);
  const departureSlot = slotFromTime(s.departureTime);
  const matches = useMemo(
    () =>
      matchCircuits({
        duration: s.duration,
        season,
        airport: s.airport,
      }),
    [s.duration, season, s.airport],
  );

  const selectedId = matches.some((m) => m.circuit.id === s.circuitId)
    ? s.circuitId
    : (matches[0]?.circuit.id ?? null);

  const circuit = selectedId ? circuitById(selectedId) : undefined;
  const santa =
    s.santa ?? santaDefault(s.arrivalDate, s.children > 0);
  const days = circuit
    ? adaptCircuit({
        circuit,
        arrivalDate: s.arrivalDate,
        season,
        arrivalSlot,
        departureSlot,
        pace: s.pace,
        budget: s.budget,
        santa,
      })
    : [];
  const cost = circuit
    ? estimateCost({
        circuitId: circuit.id,
        budget: s.budget,
        adults: s.adults,
        children: s.children,
        santa,
        season,
        duration: s.duration,
      })
    : null;

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <SiteHeader />
      <main className="page-wrap flex flex-1 flex-col gap-8 py-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Planificateur
          </p>
          <h1 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            On part d’un circuit, ensuite on l’adapte.
          </h1>
          <p className="max-w-2xl text-muted">
            Date, durée, vols. La saison choisit les circuits possibles. Vous
            cliquez sur une ossature — pas sur un thème.
          </p>
        </div>
        <Stepper step={s.step} />
        {s.step === 1 ? (
          <StepOne
            season={season}
            matches={matches}
            selectedId={selectedId}
            arrivalSlot={arrivalSlot}
          />
        ) : null}
        {s.step === 2 && circuit ? (
          <StepTwo season={season} santa={santa} hasSantaSlot={circuit.days.some((d) => d.santaSlot)} />
        ) : null}
        {s.step === 3 && circuit ? (
          <StepThree
            title={circuit.title}
            nights={circuit.nightsSummary}
            days={days}
            pace={s.pace}
          />
        ) : null}
        {s.step === 4 && circuit && cost ? (
          <StepFour
            title={circuit.title}
            nights={circuit.nightsSummary}
            days={days}
            cost={cost}
            santa={santa}
            hasSantaSlot={circuit.days.some((d) => d.santaSlot)}
          />
        ) : null}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            disabled={s.step === 1}
            onClick={() => s.set({ step: (s.step - 1) as 1 | 2 | 3 | 4 })}
          >
            <ArrowLeft className="size-4" />
            Retour
          </Button>
          {s.step < 4 ? (
            <Button
              type="button"
              disabled={s.step === 1 && !selectedId}
              onClick={() => {
                if (s.step === 1) s.set({ circuitId: selectedId, step: 2 });
                else s.set({ step: (s.step + 1) as 2 | 3 | 4 });
              }}
            >
              Continuer
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button type="button" variant="secondary" onClick={() => s.reset()}>
              Nouveau séjour
            </Button>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function StepOne({
  season,
  matches,
  selectedId,
  arrivalSlot,
}: {
  season: ReturnType<typeof seasonFromDate>;
  matches: ReturnType<typeof matchCircuits>;
  selectedId: string | null;
  arrivalSlot: ReturnType<typeof slotFromTime>;
}) {
  const s = usePlanner();
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr]">
      <form
        className="flex flex-col gap-5 rounded-2xl border border-border bg-bg-elevated p-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <Field label="Date d’arrivée">
          <Input
            type="date"
            value={s.arrivalDate}
            onChange={(e) => s.set({ arrivalDate: e.target.value, circuitId: null })}
          />
        </Field>
        <div>
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
            Durée
          </p>
          <div className="grid grid-cols-2 gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => s.set({ duration: d.id, circuitId: null })}
                className={
                  s.duration === d.id
                    ? "min-h-14 rounded-xl border border-primary bg-card px-3 py-2 text-left"
                    : "min-h-14 rounded-xl border border-border bg-card px-3 py-2 text-left"
                }
              >
                <span className="block text-sm font-semibold text-ink">{d.label}</span>
                <span className="text-xs text-subtle">
                  {d.id} j / {d.nights} n
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-ice px-3 py-2 text-sm text-primary">
          Saison : <strong>{SEASON_LABEL[season]}</strong>
          {s.duration === 15 ? " · 15 j = 7+8 ou 10+5, 14 nuits" : ""}
        </div>
        <Field label="Aéroport d’arrivée" hint="Toujours le même aéroport A/R. Pas d’open-jaw.">
          <Select
            value={s.airport}
            onChange={(e) =>
              s.set({ airport: e.target.value as "HEL" | "RVN", circuitId: null })
            }
          >
            <option value="HEL">Helsinki (HEL)</option>
            <option value="RVN">Rovaniemi (RVN)</option>
          </Select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Heure d’arrivée">
            <Input
              type="time"
              value={s.arrivalTime}
              onChange={(e) => s.set({ arrivalTime: e.target.value })}
            />
          </Field>
          <Field label="Heure retour">
            <Input
              type="time"
              value={s.departureTime}
              onChange={(e) => s.set({ departureTime: e.target.value })}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Vol aller" hint="Optionnel">
            <Input
              placeholder="AY1581"
              value={s.flightIn}
              onChange={(e) => s.set({ flightIn: e.target.value.toUpperCase() })}
            />
          </Field>
          <Field label="Vol retour">
            <Input
              placeholder="AY1582"
              value={s.flightOut}
              onChange={(e) => s.set({ flightOut: e.target.value.toUpperCase() })}
            />
          </Field>
        </div>
        {arrivalSlot ? (
          <p className="text-xs text-muted">
            {arrivalSlot === "matin"
              ? "Arrivée le matin : transfert possible l’après-midi si ≤ 2 h 30."
              : "Arrivée tardive : jour 1 calme à Helsinki (ou RVN)."}
          </p>
        ) : null}
      </form>
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-2xl tracking-tight text-ink">
          Circuits possibles
        </h2>
        <p className="text-sm text-muted">
          {s.duration === 15
            ? "Deux semaines = deux ossatures assemblées (7+8 ou 10+5). 14 nuits, dernière à Helsinki."
            : matches.length > 1
              ? "Le premier est le plus sûr pour un premier séjour. Cliquez pour en changer. Les villes de l’ossature ne bougeront plus ensuite."
              : "Pour cette durée et cette saison, une seule ossature tient."}
        </p>
        {matches.map((m) => (
          <CircuitCard
            key={m.circuit.id + m.role}
            match={m}
            selected={m.circuit.id === selectedId}
            onSelect={() => s.set({ circuitId: m.circuit.id })}
          />
        ))}
      </div>
    </div>
  );
}

function StepTwo({
  season,
  santa,
  hasSantaSlot,
}: {
  season: ReturnType<typeof seasonFromDate>;
  santa: boolean;
  hasSantaSlot: boolean;
}) {
  const s = usePlanner();
  const showSanta = season === "hiver" && hasSantaSlot;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="font-display text-2xl text-ink">Rythme</h2>
        <div className="mt-4 flex flex-col gap-2">
          {(
            [
              ["lent", "Lent", "L’ossature reste. On montre ce qui n’est pas indispensable."],
              ["equilibre", "Équilibré", "Le circuit tel quel."],
              ["soutenu", "Soutenu", "Un extra dans la même ville, chaque jour possible."],
            ] as const
          ).map(([id, label, hint]) => (
            <button
              key={id}
              type="button"
              onClick={() => s.set({ pace: id })}
              className={
                s.pace === id
                  ? "rounded-xl border border-primary px-4 py-3 text-left"
                  : "rounded-xl border border-border px-4 py-3 text-left"
              }
            >
              <span className="font-semibold text-ink">{label}</span>
              <span className="mt-0.5 block text-sm text-muted">{hint}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="font-display text-2xl text-ink">Voyageurs & budget</h2>
        <div className="mt-4 grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Adultes">
              <StepperInput
                value={s.adults}
                min={1}
                max={8}
                onChange={(n) => s.set({ adults: n })}
                decreaseLabel="Retirer un adulte"
                increaseLabel="Ajouter un adulte"
              />
            </Field>
            <Field label="Enfants" hint="Moins de 17 ans">
              <StepperInput
                value={s.children}
                min={0}
                max={6}
                onChange={(n) => s.set({ children: n, santa: null })}
                decreaseLabel="Retirer un enfant"
                increaseLabel="Ajouter un enfant"
              />
            </Field>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
              Budget
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["eco", "Éco", "3*, cuisine parfois"],
                  ["confort", "Confort", "Bon 3* / 4*"],
                  ["plus", "Plus", "Design / luxe"],
                ] as const
              ).map(([id, label, hint]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => s.set({ budget: id })}
                  className={
                    s.budget === id
                      ? "min-h-14 rounded-lg border border-primary bg-ice px-2 py-2 text-center"
                      : "min-h-14 rounded-lg border border-border px-2 py-2 text-center"
                  }
                >
                  <span className="block text-sm font-semibold text-ink">{label}</span>
                  <span className="text-[0.65rem] text-subtle">{hint}</span>
                </button>
              ))}
            </div>
          </div>
          {showSanta ? (
            <label className="flex items-start gap-3 rounded-xl bg-bg-elevated p-3 text-sm">
              <input
                type="checkbox"
                checked={santa}
                onChange={(e) => s.set({ santa: e.target.checked })}
                className="mt-1 size-4 accent-primary"
              />
              <span>
                <span className="font-semibold text-ink">Village du Père Noël</span>
                <span className="mt-1 block text-muted">
                  Défaut selon le mois et les enfants. Décochez pour le remplacer
                  (Arktikum, Ounasvaara, Ranua).
                </span>
              </span>
            </label>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function PhotoFigure({
  photo,
  className = "",
}: {
  photo: PlacePhoto;
  className?: string;
}) {
  return (
    <figure className={`relative min-h-0 overflow-hidden ${className}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        className="h-full w-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-2 py-1.5 text-[0.65rem] font-medium text-primary-fg">
        {photo.caption}
      </figcaption>
    </figure>
  );
}

function PhotoMosaic({ photos }: { photos: PlacePhoto[] }) {
  if (photos.length === 1) {
    return (
      <div className="h-full min-h-28 sm:min-h-52">
        <PhotoFigure photo={photos[0]} className="h-full" />
      </div>
    );
  }
  if (photos.length === 2) {
    return (
      <div className="grid h-full min-h-28 grid-cols-2 gap-px bg-border sm:min-h-52 sm:grid-cols-1 sm:grid-rows-2">
        {photos.map((p) => (
          <PhotoFigure key={p.src} photo={p} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid h-full min-h-28 grid-cols-3 gap-px bg-border sm:min-h-52 sm:grid-cols-2 sm:grid-rows-2">
      <PhotoFigure photo={photos[0]} className="sm:row-span-2" />
      <PhotoFigure photo={photos[1]} />
      <PhotoFigure photo={photos[2]} />
    </div>
  );
}

function StepThree({
  title,
  nights,
  days,
  pace,
}: {
  title: string;
  nights: string;
  days: ReturnType<typeof adaptCircuit>;
  pace: "lent" | "equilibre" | "soutenu";
}) {
  return (
    <section className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        <p className="text-sm text-muted">
          Nuits : {nights}. Villes verrouillées.
          {pace === "lent"
            ? " Rythme lent : le souple n’est pas indispensable."
            : pace === "soutenu"
              ? " Rythme soutenu : un extra dans la même zone."
              : ""}
        </p>
      </div>
      <ol className="flex flex-col gap-3">
        {days.map((d) => {
            const photos = placePhotos(d);
            return (
          <li
            key={d.n}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
          >
            <div className="flex flex-col sm:flex-row">
              {photos.length > 0 ? (
                <div
                  className={
                    photos.length === 1
                      ? "h-28 sm:h-auto sm:w-56 sm:self-stretch lg:w-64"
                      : "h-28 sm:h-auto sm:w-72 sm:self-stretch lg:w-80"
                  }
                >
                  <PhotoMosaic photos={photos} />
                </div>
              ) : null}
              <div className="min-w-0 flex-1 p-4 sm:p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-lg text-ink">
                    J{d.n} · {d.city}
                  </p>
                  <p className="text-xs font-medium tracking-wide text-muted uppercase">
                    {d.dateLabel}
                  </p>
                </div>
                {d.tags.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className={
                          t === "En plus"
                            ? "rounded-full bg-ice px-2 py-0.5 text-[0.65rem] font-semibold text-primary"
                            : t === "Rythme lent"
                              ? "rounded-full bg-wx-sun-bg px-2 py-0.5 text-[0.65rem] font-semibold text-wx-sun"
                              : "rounded-full bg-moss-bg px-2 py-0.5 text-[0.65rem] font-semibold text-moss"
                        }
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
                {d.transfer ? (
                  <p className="mt-2 text-xs text-subtle">{d.transfer}</p>
                ) : null}
                <dl className="mt-4 flex flex-col gap-2">
                  {d.slots.map((slot) => (
                    <div
                      key={slot.period}
                      className={
                        slot.flag === "skip"
                          ? "flex gap-3 rounded-lg border border-dashed border-border px-3 py-2"
                          : slot.flag === "extra"
                            ? "flex gap-3 rounded-lg bg-ice px-3 py-2"
                            : "flex gap-3 rounded-lg bg-bg-elevated px-3 py-2"
                      }
                    >
                      <dt className="w-24 shrink-0 text-[0.65rem] font-semibold tracking-wider text-subtle uppercase">
                        {slot.flag === "skip"
                          ? "Souple"
                          : slot.flag === "extra"
                            ? "En plus"
                            : slot.period}
                      </dt>
                      <dd
                        className={
                          slot.flag === "skip"
                            ? "text-sm leading-snug text-muted"
                            : "text-sm leading-snug text-fg"
                        }
                      >
                        {slot.text}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </li>
            );
        })}
      </ol>
    </section>
  );
}

function StepFour({
  title,
  nights,
  days,
  cost,
  santa,
  hasSantaSlot,
}: {
  title: string;
  nights: string;
  days: ReturnType<typeof adaptCircuit>;
  cost: ReturnType<typeof estimateCost>;
  santa: boolean;
  hasSantaSlot: boolean;
}) {
  const s = usePlanner();
  const cities = [...new Set(days.map((d) => d.city).filter((c) => c !== "Vol retour"))];
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,20rem)]">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="font-display text-2xl text-ink">Résumé</h2>
        <dl className="mt-4 grid gap-3 text-sm">
          <Row k="Circuit" v={title} />
          <Row k="Nuits" v={nights} />
          <Row k="Villes" v={cities.join(" · ")} />
          <Row
            k="Vols"
            v={`${s.airport} A/R${s.flightIn ? ` · ${s.flightIn}` : ""}${s.flightOut ? ` / ${s.flightOut}` : ""}`}
          />
          <Row k="Voyageurs" v={partyLabel(s.adults, s.children)} />
          <Row k="Rythme" v={PACE_LABEL[s.pace]} />
          <Row k="Budget" v={s.budget} />
          {hasSantaSlot ? (
            <Row k="Santa" v={santa ? "Oui, ½ journée" : "Remplacé"} />
          ) : null}
        </dl>
      </section>
      <aside className="rounded-2xl bg-ink px-5 py-6 text-primary-fg">
        <p className="text-xs font-semibold tracking-widest uppercase opacity-70">
          Chiffrage approximatif
        </p>
        <p className="font-display mt-3 text-3xl tracking-tight">
          {formatEuro(cost.min)} – {formatEuro(cost.max)}
        </p>
        <p className="mt-1 text-sm opacity-80">
          {partyLabel(cost.adults, cost.children)} · {s.budget}
        </p>
        <ul className="mt-5 space-y-2 text-sm">
          {cost.lines.map((line) => (
            <li key={line.id} className="flex items-start justify-between gap-3 border-t border-white/10 pt-2">
              <span>
                <span className="block font-medium">{line.label}</span>
                <span className="text-xs opacity-65">{line.detail}</span>
              </span>
              <span className="tabular-nums opacity-90">{formatEuro(line.amount)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed opacity-75">{cost.note}</p>
      </aside>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border py-2">
      <dt className="text-subtle">{k}</dt>
      <dd className="font-medium text-ink">{v}</dd>
    </div>
  );
}
