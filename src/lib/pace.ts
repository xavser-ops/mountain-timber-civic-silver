import type { CircuitDay } from "./circuits.ts";
import type { DaySlot } from "./season.ts";

export type PaceZone = {
  /** Activité du programme équilibré qu’on peut sauter. */
  skippable: string;
  /** Extra dans la même ville / zone, pas une autre étape. */
  extra: string;
};

const ZONES: Record<string, PaceZone> = {
  Helsinki: {
    skippable: "Design District, 2e musée, shopping — café ou sauna à la place",
    extra: "Seurasaari, Amos Rex / Kiasma, ou un deuxième sauna (Löyly si Allas déjà fait)",
  },
  Tampere: {
    skippable: "Näsinneula, Moominmuseum si pas d’enfants — un sauna suffit",
    extra: "Pispala à pied, Sara Hildén, ou Rajaportti si pas encore fait",
  },
  Turku: {
    skippable: "Kakola, Forum Marinum — le château et l’Aura suffisent",
    extra: "Luostarinmäki, île via ferry, ou plus de rive Aura",
  },
  Porvoo: {
    skippable: "Colline / deuxième atelier — la vieille ville bois suffit",
    extra: "Promenade de rivière, Haikko, artisanat de la Ruelle",
  },
  Rauma: {
    skippable: "Musée maritime — Old Rauma UNESCO suffit",
    extra: "Plus de venelles bois, plage Otanlahti, café supplémentaire",
  },
  Archipel: {
    skippable: "Île voisine — un village et la mer suffisent",
    extra: "Kayak, deuxième crique, sauna mer",
  },
  Rovaniemi: {
    skippable: "Ranua, 2e musée, shopping du village — une activité nord suffit",
    extra: "Pilke, Korundi, Ounasvaara (ski / rando), ou Arktikum si pas fait",
  },
};

export function zoneOf(city: string | null): string | null {
  if (!city) return null;
  const c = city.toLowerCase();
  if (c.includes("nauvo") || c.includes("naantali") || c.includes("archipel")) return "Archipel";
  if (c.includes("rovaniemi")) return "Rovaniemi";
  if (c.includes("helsinki")) return "Helsinki";
  if (c.includes("tampere")) return "Tampere";
  if (c.includes("turku")) return "Turku";
  if (c.includes("porvoo")) return "Porvoo";
  if (c.includes("rauma")) return "Rauma";
  return null;
}

export function paceZone(city: string | null): PaceZone | null {
  const z = zoneOf(city);
  return z ? ZONES[z] ?? null : null;
}

/** Jours trop serrés : pas d’overlay rythme. */
export function paceOpen(
  day: CircuitDay,
  arrivalSlot?: DaySlot,
  departureSlot?: DaySlot,
): boolean {
  if (day.departureSensitive) {
    if (!departureSlot || departureSlot === "matin" || departureSlot === "apresmidi") {
      return false;
    }
  }
  if (day.arrivalSensitive && arrivalSlot && arrivalSlot !== "matin") return false;
  const blob = `${day.transfer ?? ""} ${day.morning} ${day.afternoon}`;
  if (/vol HEL\s*→|vol RVN\s*→|Vol HEL|Vol RVN/i.test(blob) && /vol/i.test(day.morning)) {
    return false;
  }
  return true;
}
