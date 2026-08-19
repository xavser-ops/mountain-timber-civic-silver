import type { Circuit, CircuitDay } from "./circuits.ts";
import { paceOpen, paceZone } from "./pace.ts";
import {
  addDays,
  formatFrDate,
  type Budget,
  type DaySlot,
  type Pace,
  type Season,
} from "./season.ts";

export type AdaptedSlot = {
  period: "Matin" | "Après-midi" | "Soir" | "En plus" | "Souple";
  text: string;
  tone: "normal" | "calm" | "transfer" | "muted";
  flag?: "skip" | "extra";
};

export type AdaptedDay = {
  n: number;
  date: string;
  dateLabel: string;
  city: string;
  transfer?: string;
  slots: AdaptedSlot[];
  tags: string[];
};

const SANTA_ON =
  "Village du Père Noël (½ j) — cercle polaire, une fois, pas deux jours";
const SANTA_OFF =
  "Remplaçant Santa : cercle polaire photo 30 min + Arktikum, ou Ounasvaara + Pilke, ou Ranua";

const CALM_ARRIVAL = {
  matin: "En vol / transfert aéroport",
  apresmidi: "Promenade centre-ville, rythme calme",
  soir: "Arrivée calme — centre, shopping ou sauna doux",
};

function overlayActivity(text: string, season: Season): string {
  if (season === "hiver") {
    return text
      .replace("Husky (hiver) / chenil + balade", "Husky sur neige")
      .replace("Husky / chenil", "Husky sur neige")
      .replace("Archipel : Nauvo l’été, Naantali l’épaule", "—")
      .replace("ski / rando", "ski");
  }
  if (season === "automne") {
    return text
      .replace("Husky (hiver) / chenil + balade", "Chenil + balade ruska")
      .replace("Husky / chenil", "Chenil + ruska")
      .replace("Archipel : Nauvo l’été, Naantali l’épaule", "Naantali, ferries réduits");
  }
  if (season === "printemps") {
    return text
      .replace("Husky (hiver) / chenil + balade", "Husky si neige, sinon chenil")
      .replace("Husky / chenil", "Chenil / nature de fonte")
      .replace("Archipel : Nauvo l’été, Naantali l’épaule", "Naantali, ferries qui ouvrent");
  }
  return text
    .replace("Husky (hiver) / chenil + balade", "Chenil / cani-rando")
    .replace("Husky / chenil", "Chenil / rando")
    .replace("Aurores guidées", "Soirée soleil de minuit")
    .replace("Première chasse aurores si saison sombre", "Soirée claire, pas d’aurores")
    .replace("Aurores si saison", "Soleil de minuit")
    .replace(/Aurores( guidées)?/g, "Soir calme / sauna")
    .replace("Dernière chasse", "Dernière soirée nord")
    .replace("Archipel : Nauvo l’été, Naantali l’épaule", "Nuit à Nauvo (archipel)")
    .replace("ski / rando", "rando");
}

function applySanta(text: string, santa: boolean): string {
  if (/Père Noël|Santa|remplaçant/i.test(text)) {
    return santa ? SANTA_ON : SANTA_OFF;
  }
  return text;
}

function arrivalSlots(day: CircuitDay, slot: DaySlot | undefined): CircuitDay {
  if (!day.arrivalSensitive || !slot) return day;
  if (slot === "matin") return day;
  if (slot === "apresmidi") {
    return {
      ...day,
      morning: CALM_ARRIVAL.matin,
      afternoon: CALM_ARRIVAL.apresmidi,
    };
  }
  return {
    ...day,
    morning: CALM_ARRIVAL.matin,
    afternoon: CALM_ARRIVAL.matin,
    evening: CALM_ARRIVAL.soir,
  };
}

function departureSlots(day: CircuitDay, slot: DaySlot | undefined): CircuitDay {
  if (!day.departureSensitive) return day;
  if (!slot || slot === "matin") {
    return {
      ...day,
      morning: "Transfert aéroport — vol du matin, pas d’activité",
      afternoon: "En vol",
      evening: undefined,
    };
  }
  if (slot === "apresmidi") {
    return {
      ...day,
      morning: "Tampon souple, pas d’excursion longue",
      afternoon: "Aéroport",
    };
  }
  return day;
}

function slotTone(text: string, flag?: AdaptedSlot["flag"]): AdaptedSlot["tone"] {
  if (flag === "skip") return "muted";
  if (/vol|aéroport|En vol/i.test(text)) return "transfer";
  if (/calme|Calme|sauna doux/i.test(text)) return "calm";
  return "normal";
}

export function adaptCircuit(opts: {
  circuit: Circuit;
  arrivalDate: string;
  season: Season;
  arrivalSlot?: DaySlot;
  departureSlot?: DaySlot;
  pace: Pace;
  budget: Budget;
  santa: boolean;
}): AdaptedDay[] {
  const { circuit, arrivalDate, season, arrivalSlot, departureSlot, pace, santa } = opts;

  return circuit.days.map((raw) => {
    let day = raw;
    day = arrivalSlots(day, arrivalSlot);
    day = departureSlots(day, departureSlot);

    const morning = overlayActivity(applySanta(day.morning, santa), season);
    const afternoon = overlayActivity(applySanta(day.afternoon, santa), season);
    const evening = day.evening
      ? overlayActivity(applySanta(day.evening, santa), season)
      : undefined;

    const date = addDays(arrivalDate, day.n - 1);
    const tags: string[] = [];
    if (day.arrivalSensitive) tags.push("Arrivée");
    if (day.departureSensitive) tags.push("Retour");
    if (day.night === "Helsinki" && day.n === circuit.days.length - 1 && circuit.id !== "we-helsinki") {
      tags.push("Tampon HEL");
    }
    if (opts.budget === "plus" && /Igloo|igloo/.test(`${morning} ${afternoon} ${evening ?? ""}`)) {
      tags.push("Igloo option");
    }

    const slots: AdaptedSlot[] = [
      { period: "Matin", text: morning, tone: slotTone(morning) },
      { period: "Après-midi", text: afternoon, tone: slotTone(afternoon) },
    ];
    if (evening) {
      slots.push({ period: "Soir", text: evening, tone: slotTone(evening) });
    }

    const zone = paceZone(day.night);
    const open = paceOpen(day, arrivalSlot, departureSlot);

    if (pace === "lent" && open && zone) {
      tags.push("Rythme lent");
      slots.push({
        period: "Souple",
        text: zone.skippable,
        tone: "muted",
        flag: "skip",
      });
    }

    if (pace === "soutenu" && open && zone) {
      tags.push("En plus");
      slots.push({
        period: "En plus",
        text: overlayActivity(zone.extra, season),
        tone: "normal",
        flag: "extra",
      });
    }

    return {
      n: day.n,
      date,
      dateLabel: formatFrDate(date),
      city: day.night ?? "Vol retour",
      transfer: day.transfer,
      slots,
      tags,
    };
  });
}
