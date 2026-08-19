import type { AdaptedDay } from "./adapt-circuit.ts";

export type PlacePhoto = {
  src: string;
  alt: string;
  caption: string;
};

type Shot = PlacePhoto & {
  keys: RegExp;
  cities?: string[];
};

const SHOTS: Shot[] = [
  {
    src: "/places/husky.jpg",
    alt: "Attelage de huskies en Laponie",
    caption: "Husky",
    keys: /husky/,
  },
  {
    src: "/places/reindeer.jpg",
    alt: "Rennes en Laponie",
    caption: "Rennes",
    keys: /renne/,
  },
  {
    src: "/places/aurora.jpg",
    alt: "Aurores boréales en Laponie",
    caption: "Aurores",
    keys: /aurores|aurora|soleil de minuit|igloo|raquette|ranua|ounasvaara|arktikum|cercle polaire|père noël|santa/,
  },
  {
    src: "/places/suomenlinna.jpg",
    alt: "Forteresse maritime de Suomenlinna",
    caption: "Suomenlinna",
    keys: /suomenlinna/,
  },
  {
    src: "/places/temppeliaukio.jpg",
    alt: "Église Temppeliaukio à Helsinki",
    caption: "Temppeliaukio",
    keys: /temppeliaukio/,
  },
  {
    src: "/places/oodi.jpg",
    alt: "Bibliothèque Oodi à Helsinki",
    caption: "Oodi",
    keys: /oodi|design/,
  },
  {
    src: "/places/sauna.jpg",
    alt: "Sauna Löyly à Helsinki",
    caption: "Löyly",
    keys: /löyly|allas/,
    cities: ["helsinki"],
  },
  {
    src: "/places/kauppatori.jpg",
    alt: "Place du Marché à Helsinki",
    caption: "Kauppatori",
    keys: /kauppatori|marché|halle|shopping|promenade centre|calme centre/,
    cities: ["helsinki"],
  },
  {
    src: "/places/uspenski.jpg",
    alt: "Cathédrale Uspenski à Helsinki",
    caption: "Uspenski",
    keys: /uspenski/,
  },
  {
    src: "/places/helsinki.jpg",
    alt: "Cathédrale d’Helsinki, place du Sénat",
    caption: "Senaatintori",
    keys: /senaatintori|tuomiokirkko|centre historique|centre helsinki|centre selon/,
    cities: ["helsinki"],
  },
  {
    src: "/places/pyynikki.jpg",
    alt: "Tour de Pyynikki à Tampere",
    caption: "Pyynikki",
    keys: /pyynikki/,
  },
  {
    src: "/places/pispala.jpg",
    alt: "Pispala et le lac, Tampere",
    caption: "Pispala",
    keys: /pispala/,
  },
  {
    src: "/places/tampere.jpg",
    alt: "Briques de Finlayson à Tampere",
    caption: "Finlayson",
    keys: /finlayson|tammerkoski|vapriikki|näsinneula|moomin|sauna rajaportti|sauna tampere/,
    cities: ["tampere"],
  },
  {
    src: "/places/porvoo.jpg",
    alt: "Entrepôts rouges de Porvoo",
    caption: "Entrepôts",
    keys: /entrepôt/,
  },
  {
    src: "/places/porvoo-town.jpg",
    alt: "Vieille ville de Porvoo",
    caption: "Porvoo",
    keys: /porvoo|vieille ville bois/,
    cities: ["porvoo"],
  },
  {
    src: "/places/castle.jpg",
    alt: "Château de Turku sous la neige",
    caption: "Château",
    keys: /château/,
    cities: ["turku"],
  },
  {
    src: "/places/turku.jpg",
    alt: "Turku, rivière Aura",
    caption: "Aura",
    keys: /aura|cathédrale|kakola|centre turku/,
    cities: ["turku"],
  },
  {
    src: "/places/naantali.jpg",
    alt: "Vieille ville de Naantali",
    caption: "Naantali",
    keys: /naantali/,
  },
  {
    src: "/places/archipel.jpg",
    alt: "Archipel finlandais",
    caption: "Archipel",
    keys: /archipel|nauvo|île|mer, sauna/,
  },
  {
    src: "/places/rauma.jpg",
    alt: "Old Rauma, maisons de bois UNESCO",
    caption: "Old Rauma",
    keys: /rauma|sammallahdenmäki|kontion/,
    cities: ["rauma"],
  },
];

const CITY_FILL: Record<string, string[]> = {
  helsinki: ["/places/helsinki.jpg", "/places/suomenlinna.jpg", "/places/sauna.jpg"],
  tampere: ["/places/tampere.jpg", "/places/pyynikki.jpg", "/places/pispala.jpg"],
  turku: ["/places/castle.jpg", "/places/turku.jpg", "/places/naantali.jpg"],
  porvoo: ["/places/porvoo.jpg", "/places/porvoo-town.jpg"],
  rauma: ["/places/rauma.jpg", "/places/naantali.jpg"],
  rovaniemi: ["/places/aurora.jpg", "/places/husky.jpg", "/places/reindeer.jpg"],
  archipel: ["/places/naantali.jpg", "/places/archipel.jpg", "/places/turku.jpg"],
  nauvo: ["/places/naantali.jpg", "/places/archipel.jpg"],
  naantali: ["/places/naantali.jpg", "/places/archipel.jpg", "/places/turku.jpg"],
};

function cityKey(city: string): string {
  const c = city.toLowerCase();
  if (c.includes("nauvo") || c.includes("archipel")) return "archipel";
  if (c.includes("naantali")) return "naantali";
  if (c.includes("rovaniemi")) return "rovaniemi";
  if (c.includes("helsinki")) return "helsinki";
  if (c.includes("tampere")) return "tampere";
  if (c.includes("turku")) return "turku";
  if (c.includes("porvoo")) return "porvoo";
  if (c.includes("rauma")) return "rauma";
  return c;
}

function bySrc(src: string): PlacePhoto | undefined {
  const s = SHOTS.find((x) => x.src === src);
  if (s) return { src: s.src, alt: s.alt, caption: s.caption };
  return undefined;
}

/** 2–3 photos du jour, calées sur matin / après-midi / soir. */
export function placePhotos(day: AdaptedDay): PlacePhoto[] {
  if (day.city === "Vol retour") return [];
  const used = new Set<string>();
  const out: PlacePhoto[] = [];

  const slotTexts = day.slots
    .filter((s) => s.flag !== "skip")
    .map((s) => s.text);

  for (const text of slotTexts) {
    const lower = text.toLowerCase();
    for (const hit of SHOTS) {
      if (used.has(hit.src)) continue;
      if (hit.cities && !hit.cities.some((x) => day.city.toLowerCase().includes(x))) continue;
      if (!hit.keys.test(lower)) continue;
      used.add(hit.src);
      out.push({ src: hit.src, alt: hit.alt, caption: hit.caption });
      if (out.length === 3) return out;
    }
  }

  const fill = CITY_FILL[cityKey(day.city)] ?? [];
  for (const src of fill) {
    if (used.has(src)) continue;
    const shot = bySrc(src);
    if (!shot) continue;
    used.add(src);
    out.push(shot);
    if (out.length === 3) break;
  }
  return out;
}

export function placePhoto(day: AdaptedDay): PlacePhoto | null {
  return placePhotos(day)[0] ?? null;
}
