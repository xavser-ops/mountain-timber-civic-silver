import { CIRCUITS } from "./circuits.ts";
import type { Airport, Duration, Season } from "./season.ts";

export type MatchRole = "primary" | "alternative";

export type CircuitMatch = {
  circuit: (typeof CIRCUITS)[number];
  role: MatchRole;
  reasons: string[];
  warnings: string[];
};

export type MatchInput = {
  duration: Duration;
  season: Season;
  airport: Airport;
};

function auroraWarning(season: Season): string | undefined {
  if (season === "ete") return "Pas d’aurores en été (soleil de minuit).";
  if (season === "printemps") {
    return "Aurores possibles en avril, nuits trop claires dès mai.";
  }
  return undefined;
}

function pick(
  id: string,
  role: MatchRole,
  reasons: string[],
  warnings: string[] = [],
): CircuitMatch | null {
  const circuit = CIRCUITS.find((c) => c.id === id);
  if (!circuit) return null;
  return { circuit, role, reasons, warnings };
}

/**
 * Durée × saison × aéroport → circuits de la même durée.
 * 15 j = assemblages 7+8 ou 10+5, jamais un noyau 10 j tel quel.
 */
export function matchCircuits(input: MatchInput): CircuitMatch[] {
  const { duration, season, airport } = input;

  if (airport === "RVN") {
    const warnings = [
      duration >= 10
        ? "Arrivée RVN : pas d’ossature 10/15 j nord-only pour l’instant. On pose le 7 j, à allonger sur place."
        : "Arrivée Rovaniemi : on reste au nord. Pas d’Helsinki fantôme.",
      auroraWarning(season),
    ].filter(Boolean) as string[];
    const m = pick("laponie-express", "primary", ["Aéroport d’arrivée = Rovaniemi"], warnings);
    return m ? [m] : [];
  }

  if (duration === 3) {
    const m = pick("we-helsinki", "primary", [
      "3 j = Helsinki. Suomenlinna, un sauna, Porvoo si le vol retour est tardif.",
    ]);
    return m ? [m] : [];
  }

  if (duration === 7) {
    const out: CircuitMatch[] = [];
    const triangle = pick("triangle", "primary", [
      "Le plus sûr pour un premier séjour : Helsinki, Tampere, Turku, en train.",
    ]);
    const bois = pick(
      "unesco-bois",
      "alternative",
      ["Porvoo, Turku, Rauma — voiture. Première ville = Helsinki."],
      season === "hiver" ? ["Porvoo et Rauma restent beaux, musées plus calmes."] : [],
    );
    const lap = pick(
      "laponie-express",
      "alternative",
      ["Nord : 4 nuits Rovaniemi, retour Helsinki. Pas d’open-jaw."],
      [auroraWarning(season)].filter(Boolean) as string[],
    );
    if (triangle) out.push(triangle);
    if (bois) out.push(bois);
    if (lap) out.push(lap);
    return out;
  }

  if (duration === 10) {
    if (season === "hiver") {
      const mix = pick("mix-hel-lap", "primary", [
        "Hiver 10 j : Helsinki + Laponie (aurores). Côte fermée.",
      ]);
      return mix ? [mix] : [];
    }
    if (season === "automne") {
      const mix = pick("mix-hel-lap", "primary", [
        "Automne 10 j : Helsinki + Laponie (ruska, aurores).",
      ]);
      const cote = pick("cote-sud", "alternative", [
        "Rester au sud : Porvoo, Turku, Rauma, Tampere. Overlay ruska, pas d’aurores.",
      ]);
      return [mix, cote].filter(Boolean) as CircuitMatch[];
    }
    const cote = pick("cote-sud", "primary", [
      season === "ete"
        ? "Été 10 j : les meilleurs lieux du sud, 1 nuit archipel."
        : "Printemps 10 j : côte et sud, ferries qui ouvrent.",
    ]);
    const mix = pick(
      "mix-hel-lap",
      "alternative",
      ["Sud + nord. Pas d’aurores avant l’automne."],
      [auroraWarning(season)].filter(Boolean) as string[],
    );
    return [cote, mix].filter(Boolean) as CircuitMatch[];
  }

  // 15 j / 14 nuits — assemblages, pas un 10 j recollé
  if (season === "hiver") {
    const combo = pick("triangle-laponie", "primary", [
      "7 j triangle + 8 j Laponie. Pont J7 : Turku → vol RVN.",
      "14 nuits, dernière à Helsinki. Pas d’open-jaw.",
    ]);
    const longNorth = pick("mix-plus", "alternative", [
      "10 j mix + 5 nuits au nord. Moins de villes du sud, plus d’aurores.",
    ]);
    return [combo, longNorth].filter(Boolean) as CircuitMatch[];
  }

  if (season === "automne") {
    const combo = pick("triangle-laponie", "primary", [
      "7 j + 8 j : sud en train, puis ruska / aurores au nord.",
      "Pont J7, dernière nuit Helsinki.",
    ]);
    const south = pick("cote-plus", "alternative", [
      "10 j côte + 5 j sud (Porvoo, 2 nuits archipel, tampon HEL). Pas de Laponie.",
    ]);
    return [combo, south].filter(Boolean) as CircuitMatch[];
  }

  const south = pick("cote-plus", "primary", [
    season === "ete"
      ? "10 j + 5 j au sud : l’archipel a besoin de ces jours."
      : "10 j + 5 j : côte, Porvoo, ferries qui ouvrent.",
  ]);
  const combo = pick(
    "triangle-laponie",
    "alternative",
    ["7 j + 8 j sud puis nord. Soleil de minuit, pas d’aurores."],
    [auroraWarning(season)].filter(Boolean) as string[],
  );
  return [south, combo].filter(Boolean) as CircuitMatch[];
}
