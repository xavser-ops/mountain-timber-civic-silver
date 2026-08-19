import { circuitById } from "./circuits.ts";
import type { Budget, Duration, Season } from "./season.ts";

export type CostLine = {
  id: string;
  label: string;
  amount: number;
  detail: string;
};

export type CostEstimate = {
  lines: CostLine[];
  mid: number;
  min: number;
  max: number;
  rooms: number;
  adults: number;
  children: number;
  note: string;
};

type Profile = {
  helNights: number;
  southNights: number;
  lapNights: number;
  days: number;
  /** Chambre double / nuit, 2026. */
  helRoom: Record<Budget, number>;
  southRoom: Record<Budget, number>;
  lapRoom: Record<Budget, number>;
  carDays: number;
  carKm: number;
  trainHops: number;
  urbanDays: number;
  domesticFlight: boolean;
  ferryParty: Record<Budget, number>;
  activitiesAdult: Record<Budget, number>;
  /** 0–1, part du tarif adulte. Husky / Santa plus proche de 1. */
  childActivity: number;
  winterActivity: number;
  note: string;
};

const MEAL_ADULT: Record<Budget, number> = { eco: 32, confort: 55, plus: 90 };
const MEAL_CHILD_RATIO = 0.52;

const CAR_DAY: Record<Budget, number> = { eco: 48, confort: 75, plus: 115 };
const TRAIN_HOP: Record<Budget, number> = { eco: 42, confort: 55, plus: 82 };
const URBAN_DAY = 9;
const FLIGHT_AR: Record<Season, number> = {
  hiver: 290,
  printemps: 210,
  ete: 190,
  automne: 230,
};
const CHILD_FLIGHT = 0.75;
const CHILD_TRAIN = 0.5;
const SANTA_ADULT = 50;
const SANTA_CHILD = 55;

const PROFILES: Record<string, Profile> = {
  "we-helsinki": {
    helNights: 2,
    southNights: 0,
    lapNights: 0,
    days: 3,
    helRoom: { eco: 115, confort: 185, plus: 310 },
    southRoom: { eco: 100, confort: 165, plus: 260 },
    lapRoom: { eco: 140, confort: 240, plus: 420 },
    carDays: 0,
    carKm: 0,
    trainHops: 0,
    urbanDays: 3,
    domesticFlight: false,
    ferryParty: { eco: 0, confort: 0, plus: 0 },
    activitiesAdult: { eco: 45, confort: 85, plus: 150 },
    childActivity: 0.5,
    winterActivity: 1,
    note: "Hors avion international. Suomenlinna est inclus dans les activités (ferry).",
  },
  "unesco-bois": {
    helNights: 2,
    southNights: 4,
    lapNights: 0,
    days: 7,
    helRoom: { eco: 110, confort: 180, plus: 300 },
    southRoom: { eco: 100, confort: 160, plus: 255 },
    lapRoom: { eco: 140, confort: 240, plus: 420 },
    carDays: 5,
    carKm: 650,
    trainHops: 0,
    urbanDays: 2,
    domesticFlight: false,
    ferryParty: { eco: 0, confort: 0, plus: 0 },
    activitiesAdult: { eco: 75, confort: 145, plus: 240 },
    childActivity: 0.55,
    winterActivity: 0.9,
    note: "Hors avion international. Voiture 5 j, essence et sièges auto inclus.",
  },
  triangle: {
    helNights: 2,
    southNights: 4,
    lapNights: 0,
    days: 7,
    helRoom: { eco: 110, confort: 175, plus: 290 },
    southRoom: { eco: 95, confort: 155, plus: 250 },
    lapRoom: { eco: 140, confort: 240, plus: 420 },
    carDays: 0,
    carKm: 0,
    trainHops: 3,
    urbanDays: 6,
    domesticFlight: false,
    ferryParty: { eco: 0, confort: 0, plus: 0 },
    activitiesAdult: { eco: 70, confort: 140, plus: 240 },
    childActivity: 0.55,
    winterActivity: 1,
    note: "Hors avion international. Trains VR 2ᵉ classe (1ʳᵉ en Plus).",
  },
  "laponie-express": {
    helNights: 2,
    southNights: 0,
    lapNights: 4,
    days: 7,
    helRoom: { eco: 110, confort: 180, plus: 300 },
    southRoom: { eco: 100, confort: 160, plus: 255 },
    lapRoom: { eco: 145, confort: 255, plus: 450 },
    carDays: 0,
    carKm: 0,
    trainHops: 0,
    urbanDays: 2,
    domesticFlight: true,
    ferryParty: { eco: 0, confort: 0, plus: 0 },
    activitiesAdult: { eco: 220, confort: 460, plus: 760 },
    childActivity: 0.85,
    winterActivity: 1,
    note: "Hors avion international. Vols intérieurs HEL–RVN–HEL inclus (train de nuit = variante éco).",
  },
  "cote-sud": {
    helNights: 2,
    southNights: 7,
    lapNights: 0,
    days: 10,
    helRoom: { eco: 110, confort: 180, plus: 300 },
    southRoom: { eco: 105, confort: 165, plus: 265 },
    lapRoom: { eco: 140, confort: 240, plus: 420 },
    carDays: 8,
    carKm: 950,
    trainHops: 0,
    urbanDays: 2,
    domesticFlight: false,
    ferryParty: { eco: 45, confort: 70, plus: 110 },
    activitiesAdult: { eco: 100, confort: 190, plus: 320 },
    childActivity: 0.55,
    winterActivity: 1,
    note: "Hors avion international. Voiture 8 j + ferry archipel.",
  },
  "mix-hel-lap": {
    helNights: 4,
    southNights: 0,
    lapNights: 5,
    days: 10,
    helRoom: { eco: 110, confort: 180, plus: 300 },
    southRoom: { eco: 100, confort: 160, plus: 255 },
    lapRoom: { eco: 145, confort: 255, plus: 450 },
    carDays: 0,
    carKm: 0,
    trainHops: 0,
    urbanDays: 4,
    domesticFlight: true,
    ferryParty: { eco: 0, confort: 0, plus: 0 },
    activitiesAdult: { eco: 260, confort: 520, plus: 850 },
    childActivity: 0.8,
    winterActivity: 1,
    note: "Hors avion international. Vols intérieurs HEL–RVN–HEL inclus.",
  },
  "triangle-laponie": {
    helNights: 4,
    southNights: 4,
    lapNights: 6,
    days: 15,
    helRoom: { eco: 110, confort: 175, plus: 290 },
    southRoom: { eco: 95, confort: 155, plus: 250 },
    lapRoom: { eco: 145, confort: 255, plus: 450 },
    carDays: 0,
    carKm: 0,
    trainHops: 3,
    urbanDays: 8,
    domesticFlight: true,
    ferryParty: { eco: 0, confort: 0, plus: 0 },
    activitiesAdult: { eco: 280, confort: 560, plus: 920 },
    childActivity: 0.75,
    winterActivity: 1,
    note: "Hors avion international. Trains sud + vols HEL–RVN–HEL. Assemblage 7 j + 8 j.",
  },
  "cote-plus": {
    helNights: 5,
    southNights: 9,
    lapNights: 0,
    days: 15,
    helRoom: { eco: 110, confort: 180, plus: 300 },
    southRoom: { eco: 105, confort: 165, plus: 265 },
    lapRoom: { eco: 140, confort: 240, plus: 420 },
    carDays: 10,
    carKm: 1100,
    trainHops: 0,
    urbanDays: 5,
    domesticFlight: false,
    ferryParty: { eco: 80, confort: 120, plus: 180 },
    activitiesAdult: { eco: 140, confort: 260, plus: 420 },
    childActivity: 0.55,
    winterActivity: 1,
    note: "Hors avion international. Voiture 10 j + ferries archipel. Assemblage 10 j + 5 j sud.",
  },
  "mix-plus": {
    helNights: 6,
    southNights: 0,
    lapNights: 8,
    days: 15,
    helRoom: { eco: 110, confort: 180, plus: 300 },
    southRoom: { eco: 100, confort: 160, plus: 255 },
    lapRoom: { eco: 145, confort: 255, plus: 450 },
    carDays: 0,
    carKm: 0,
    trainHops: 0,
    urbanDays: 6,
    domesticFlight: true,
    ferryParty: { eco: 0, confort: 0, plus: 0 },
    activitiesAdult: { eco: 320, confort: 640, plus: 1050 },
    childActivity: 0.8,
    winterActivity: 1,
    note: "Hors avion international. Vols intérieurs inclus. Assemblage 10 j + 5 nuits nord.",
  },
};

export function roomsNeeded(adults: number, children: number): number {
  const a = clamp(Math.floor(adults), 1, 8);
  const c = clamp(Math.floor(children), 0, 6);
  const base = Math.ceil(a / 2);
  const extraKids = Math.max(0, c - base * 2);
  return base + Math.ceil(extraKids / 2);
}

export function partyLabel(adults: number, children: number): string {
  const a = `${adults} adulte${adults > 1 ? "s" : ""}`;
  if (children <= 0) return a;
  return `${a}, ${children} enfant${children > 1 ? "s" : ""}`;
}

export function estimateCost(input: {
  circuitId: string;
  budget: Budget;
  adults: number;
  children: number;
  santa: boolean;
  season: Season;
  duration: Duration;
}): CostEstimate {
  const adults = clamp(Math.floor(input.adults), 1, 8);
  const children = clamp(Math.floor(input.children), 0, 6);
  const { budget, season } = input;
  const profile = PROFILES[input.circuitId] ?? PROFILES.triangle;
  const circuit = circuitById(input.circuitId);
  const rooms = roomsNeeded(adults, children);
  const family = children > 0;
  const single = adults === 1 && children === 0;
  const occ = single ? 0.9 : family ? 1.28 : 1;
  const helWinter = season === "hiver" ? 1.1 : 1;
  const lapWinter = season === "hiver" ? 1.42 : season === "automne" ? 1.12 : 1;

  const lodging = round10(
    rooms *
      occ *
      (profile.helNights * profile.helRoom[budget] * helWinter +
        profile.southNights * profile.southRoom[budget] * helWinter +
        profile.lapNights * profile.lapRoom[budget] * lapWinter),
  );

  const mealDays = profile.days;
  const meals = round10(
    mealDays * (adults * MEAL_ADULT[budget] + children * MEAL_ADULT[budget] * MEAL_CHILD_RATIO),
  );

  let transport = 0;
  const transportBits: string[] = [];
  if (profile.urbanDays) {
    transport += (adults + children * 0.5) * URBAN_DAY * profile.urbanDays;
    transportBits.push("transports urbains");
  }
  if (profile.trainHops) {
    transport +=
      profile.trainHops * TRAIN_HOP[budget] * (adults + children * CHILD_TRAIN);
    transportBits.push("trains VR");
  }
  if (profile.carDays) {
    transport += profile.carDays * CAR_DAY[budget];
    transport += profile.carKm * 0.16;
    transport += profile.carDays * (budget === "eco" ? 10 : 16);
    if (children > 0) transport += children * 7 * profile.carDays;
    transportBits.push(`voiture ${profile.carDays} j`);
  }
  if (profile.domesticFlight) {
    const fare =
      budget === "eco" && season !== "hiver"
        ? 95
        : budget === "eco"
          ? 160
          : FLIGHT_AR[season];
    const plus = budget === "plus" ? 1.25 : 1;
    transport += fare * plus * (adults + children * CHILD_FLIGHT);
    transportBits.push(budget === "eco" ? "train de nuit ou vol éco" : "vols HEL–RVN–HEL");
  }
  const ferry = profile.ferryParty[budget];
  if (ferry) {
    transport += ferry;
    transportBits.push("ferry");
  }
  transport = round10(transport);

  const actFactor =
    season === "hiver" ? profile.winterActivity : season === "ete" ? 0.72 : 0.85;
  const activities = round10(
    profile.activitiesAdult[budget] *
      actFactor *
      (adults + children * profile.childActivity),
  );

  const hasSantaSlot = circuit?.days.some((d) => d.santaSlot) ?? false;
  const santaAmount =
    hasSantaSlot && input.santa
      ? round10(adults * SANTA_ADULT + children * SANTA_CHILD)
      : 0;

  const lines: CostLine[] = [
    {
      id: "lodging",
      label: "Hébergement",
      amount: lodging,
      detail: `${rooms} chambre${rooms > 1 ? "s" : ""}${
        family ? (rooms > 1 ? " familiales" : " familiale") : single ? " single" : ""
      } · ${profile.helNights + profile.southNights + profile.lapNights} n`,
    },
    {
      id: "transport",
      label: "Transports sur place",
      amount: transport,
      detail: transportBits.join(" · ") || "—",
    },
    {
      id: "meals",
      label: "Repas",
      amount: meals,
      detail: `${partyLabel(adults, children)} · ${mealDays} j`,
    },
    {
      id: "activities",
      label: "Activités & saunas",
      amount: activities,
      detail:
        profile.lapNights && season === "hiver"
          ? "Husky / aurores selon le budget"
          : "Musées, ferries, saunas",
    },
  ];
  if (santaAmount > 0) {
    lines.push({
      id: "santa",
      label: "Village du Père Noël",
      amount: santaAmount,
      detail: "½ journée, créneau remplaçable",
    });
  }

  const mid = lines.reduce((s, l) => s + l.amount, 0);
  const min = round10(mid * 0.88);
  const max = round10(mid * 1.18);

  const notes = [profile.note];
  if (children > 0) {
    notes.push("Moins de 4 ans : trains souvent gratuits, musées réduits.");
  }

  return {
    lines,
    mid,
    min,
    max,
    rooms,
    adults,
    children,
    note: notes.join(" "),
  };
}

export function formatEuro(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function round10(n: number): number {
  return Math.round(n / 10) * 10;
}

function clamp(n: number, min: number, max: number): number {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}
