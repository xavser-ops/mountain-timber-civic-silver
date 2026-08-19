export type Season = "hiver" | "printemps" | "ete" | "automne";
export type Duration = 3 | 7 | 10 | 15;
export type Family =
  | "indispensables"
  | "unesco-bois"
  | "aurores-laponie"
  | "cote-archipel";
export type Airport = "HEL" | "RVN";
export type DaySlot = "matin" | "apresmidi" | "soir";
export type Pace = "lent" | "equilibre" | "soutenu";
export type Budget = "eco" | "confort" | "plus";

export const DURATIONS: { id: Duration; label: string; nights: number }[] = [
  { id: 3, label: "Long week-end", nights: 2 },
  { id: 7, label: "Semaine", nights: 6 },
  { id: 10, label: "Longue semaine", nights: 9 },
  { id: 15, label: "Deux semaines", nights: 14 },
];

export const PACE_LABEL: Record<Pace, string> = {
  lent: "Lent",
  equilibre: "Équilibré",
  soutenu: "Soutenu",
};

export const SEASON_LABEL: Record<Season, string> = {
  hiver: "Hiver",
  printemps: "Printemps",
  ete: "Été",
  automne: "Automne",
};


/** Hiver nov–mars · printemps avr–mai · été juin–août · automne sept–oct. */
export function seasonFromDate(isoDate: string): Season {
  const [, monthStr, dayStr] = isoDate.split("-");
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (month === 11 || month === 12 || month === 1 || month === 2 || month === 3) {
    return "hiver";
  }
  if (month === 4 || month === 5) return "printemps";
  if (month === 6 || month === 7 || month === 8) return "ete";
  if (month === 9 || month === 10) return "automne";
  return "hiver";
}

export function isSantaParkWindow(isoDate: string): boolean {
  const [, monthStr, dayStr] = isoDate.split("-");
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (month === 12) return true;
  if (month === 1 && day <= 6) return true;
  if (month === 11 && day >= 15) return true;
  return false;
}

export function santaDefault(isoDate: string, hasChildren: boolean): boolean {
  const season = seasonFromDate(isoDate);
  if (season !== "hiver") return false;
  if (hasChildren) return true;
  return isSantaParkWindow(isoDate);
}

export function slotFromTime(hhmm: string | undefined): DaySlot | undefined {
  if (!hhmm) return undefined;
  const hour = Number(hhmm.slice(0, 2));
  if (Number.isNaN(hour)) return undefined;
  if (hour < 12) return "matin";
  if (hour < 17) return "apresmidi";
  return "soir";
}

export function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function formatFrDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(dt);
}
