import { o as __toESM } from "../_runtime.mjs";
import { R as require_react, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as ArrowRight, r as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as cn, n as SiteFooter, r as SiteHeader, t as Button } from "./button-DNBKhxyg.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planificateur-CP6URyDF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CircuitCard({ match, selected, onSelect }) {
	const { circuit, role, reasons, warnings } = match;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onSelect,
		className: cn("flex w-full flex-col gap-3 rounded-2xl border bg-card p-5 text-left shadow-soft transition-transform duration-200", selected ? "border-primary ring-2 ring-ice" : "border-border hover:-translate-y-0.5"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[0.65rem] font-semibold tracking-wider text-primary uppercase",
					children: [role === "primary" ? "Circuit de base" : "Variante", selected ? " · retenu" : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display mt-1 text-xl tracking-tight text-ink",
					children: circuit.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-ice px-2.5 py-1 text-xs font-semibold text-primary",
					children: [
						circuit.duration,
						" j / ",
						circuit.nights,
						" n"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: circuit.tagline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-medium text-fg",
				children: ["Nuits : ", circuit.nightsSummary]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: circuit.transport
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-sm text-fg",
				children: reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						"aria-hidden": true,
						children: "→"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r })]
				}, r))
			}),
			warnings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 rounded-lg bg-wx-sun-bg px-3 py-2 text-xs text-wx-sun",
				children: warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: w }, w))
			}) : null
		]
	});
}
var STEPS = [
	{
		n: 1,
		label: "Dates & circuit"
	},
	{
		n: 2,
		label: "Rythme"
	},
	{
		n: 3,
		label: "Proposition"
	},
	{
		n: 4,
		label: "Résumé"
	}
];
function Stepper({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid grid-cols-4 gap-2",
		children: STEPS.map((s) => {
			const active = s.n === step;
			const done = s.n < step;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("flex flex-col gap-1 border-t-2 pt-2", active && "border-primary", done && "border-moss", !active && !done && "border-border"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("text-[0.65rem] font-semibold tracking-wider uppercase", active ? "text-primary" : done ? "text-moss" : "text-subtle"),
					children: ["Étape ", s.n]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("text-sm font-medium", active ? "text-ink" : "text-muted"),
					children: s.label
				})]
			}, s.n);
		})
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-semibold tracking-wide text-muted uppercase",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
var control = "min-h-11 w-full rounded-lg border border-border bg-card px-3 text-sm text-fg outline-none transition-shadow duration-150 focus-visible:border-primary";
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(control, className),
		...props
	});
}
function Select({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(control, className),
		...props
	});
}
var DURATIONS = [
	{
		id: 3,
		label: "Long week-end",
		nights: 2
	},
	{
		id: 7,
		label: "Semaine",
		nights: 6
	},
	{
		id: 10,
		label: "Longue semaine",
		nights: 9
	},
	{
		id: 15,
		label: "Deux semaines",
		nights: 14
	}
];
var FAMILIES = [
	{
		id: "indispensables",
		label: "Premier séjour",
		hint: "Les meilleurs lieux, sans se disperser"
	},
	{
		id: "unesco-bois",
		label: "UNESCO & villes bois",
		hint: "Suomenlinna, Porvoo, Rauma"
	},
	{
		id: "aurores-laponie",
		label: "Laponie",
		hint: "Aurores en saison sombre, nature le reste de l’année"
	},
	{
		id: "cote-archipel",
		label: "Côte & archipel",
		hint: "Turku, Naantali, Rauma — pas en hiver"
	}
];
var SEASON_LABEL = {
	hiver: "Hiver",
	printemps: "Printemps",
	ete: "Été",
	automne: "Automne"
};
/** Hiver nov–mars · printemps avr–mai · été juin–août · automne sept–oct. */
function seasonFromDate(isoDate) {
	const [, monthStr, dayStr] = isoDate.split("-");
	const month = Number(monthStr);
	Number(dayStr);
	if (month === 11 || month === 12 || month === 1 || month === 2 || month === 3) return "hiver";
	if (month === 4 || month === 5) return "printemps";
	if (month === 6 || month === 7 || month === 8) return "ete";
	if (month === 9 || month === 10) return "automne";
	return "hiver";
}
function isSantaParkWindow(isoDate) {
	const [, monthStr, dayStr] = isoDate.split("-");
	const month = Number(monthStr);
	const day = Number(dayStr);
	if (month === 12) return true;
	if (month === 1 && day <= 6) return true;
	if (month === 11 && day >= 15) return true;
	return false;
}
function santaDefault(isoDate, hasChildren) {
	if (seasonFromDate(isoDate) !== "hiver") return false;
	if (hasChildren) return true;
	return isSantaParkWindow(isoDate);
}
function slotFromTime(hhmm) {
	if (!hhmm) return void 0;
	const hour = Number(hhmm.slice(0, 2));
	if (Number.isNaN(hour)) return void 0;
	if (hour < 12) return "matin";
	if (hour < 17) return "apresmidi";
	return "soir";
}
function addDays(isoDate, days) {
	const [y, m, d] = isoDate.split("-").map(Number);
	const dt = new Date(Date.UTC(y, m - 1, d + days));
	return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
}
function formatFrDate(isoDate) {
	const [y, m, d] = isoDate.split("-").map(Number);
	const dt = new Date(Date.UTC(y, m - 1, d));
	return new Intl.DateTimeFormat("fr-FR", {
		weekday: "short",
		day: "numeric",
		month: "short",
		timeZone: "UTC"
	}).format(dt);
}
var SANTA_ON = "Village du Père Noël (½ j) — cercle polaire, une fois, pas deux jours";
var SANTA_OFF = "Remplaçant Santa : cercle polaire photo 30 min + Arktikum, ou Ounasvaara + Pilke, ou Ranua";
var CALM_ARRIVAL = {
	matin: "En vol / transfert aéroport",
	apresmidi: "Promenade centre-ville, rythme calme",
	soir: "Arrivée calme — centre, shopping ou sauna doux"
};
function overlayActivity(text, season) {
	if (season === "hiver") return text.replace("Husky (hiver) / chenil + balade", "Husky sur neige").replace("Husky / chenil", "Husky sur neige").replace("Archipel : Nauvo l’été, Naantali l’épaule", "—");
	if (season === "automne") return text.replace("Husky (hiver) / chenil + balade", "Chenil + balade ruska").replace("Husky / chenil", "Chenil + ruska").replace("Archipel : Nauvo l’été, Naantali l’épaule", "Naantali, ferries réduits");
	if (season === "printemps") return text.replace("Husky (hiver) / chenil + balade", "Husky si neige, sinon chenil").replace("Husky / chenil", "Chenil / nature de fonte").replace("Archipel : Nauvo l’été, Naantali l’épaule", "Naantali, ferries qui ouvrent");
	return text.replace("Husky (hiver) / chenil + balade", "Chenil / cani-rando").replace("Husky / chenil", "Chenil / rando").replace("Aurores guidées", "Soirée soleil de minuit").replace("Première chasse aurores si saison sombre", "Soirée claire, pas d’aurores").replace("Aurores si saison", "Soleil de minuit").replace(/Aurores( guidées)?/g, "Soir calme / sauna").replace("Dernière chasse", "Dernière soirée nord").replace("Archipel : Nauvo l’été, Naantali l’épaule", "Nuit à Nauvo (archipel)");
}
function applySanta(text, santa) {
	if (/Père Noël|Santa|remplaçant/i.test(text)) return santa ? SANTA_ON : SANTA_OFF;
	return text;
}
function arrivalSlots(day, slot) {
	if (!day.arrivalSensitive || !slot) return day;
	if (slot === "matin") return day;
	if (slot === "apresmidi") return {
		...day,
		morning: CALM_ARRIVAL.matin,
		afternoon: CALM_ARRIVAL.apresmidi
	};
	return {
		...day,
		morning: CALM_ARRIVAL.matin,
		afternoon: CALM_ARRIVAL.matin,
		evening: CALM_ARRIVAL.soir
	};
}
function departureSlots(day, slot, pace) {
	if (!day.departureSensitive) return day;
	if (!slot || slot === "matin") return {
		...day,
		morning: "Transfert aéroport — vol du matin, pas d’activité",
		afternoon: "En vol",
		evening: void 0,
		optionalSoutenu: void 0
	};
	if (slot === "apresmidi") return {
		...day,
		morning: "Tampon souple, pas d’excursion longue",
		afternoon: "Aéroport",
		optionalSoutenu: void 0
	};
	if (pace === "lent") return {
		...day,
		optionalSoutenu: void 0
	};
	return day;
}
function adaptCircuit(opts) {
	const { circuit, arrivalDate, season, arrivalSlot, departureSlot, pace, santa } = opts;
	return circuit.days.map((raw) => {
		let day = raw;
		day = arrivalSlots(day, arrivalSlot);
		day = departureSlots(day, departureSlot, pace);
		let morning = overlayActivity(applySanta(day.morning, santa), season);
		let afternoon = overlayActivity(applySanta(day.afternoon, santa), season);
		let evening = day.evening ? overlayActivity(applySanta(day.evening, santa), season) : void 0;
		if (pace === "soutenu" && day.optionalSoutenu) afternoon = `${afternoon} · ${day.optionalSoutenu}`;
		if (pace === "lent") {
			if (day.optionalSoutenu) afternoon = afternoon.replace(` · ${day.optionalSoutenu}`, "");
		}
		const date = addDays(arrivalDate, day.n - 1);
		const tags = [];
		if (day.arrivalSensitive) tags.push("Arrivée");
		if (day.departureSensitive) tags.push("Retour");
		if (day.night === "Helsinki" && day.n === circuit.days.length - 1 && circuit.id !== "we-helsinki") tags.push("Tampon HEL");
		if (opts.budget === "plus" && /Igloo|igloo/.test(`${morning} ${afternoon} ${evening ?? ""}`)) tags.push("Igloo option");
		const slots = [{
			period: "Matin",
			text: morning,
			tone: /vol|aéroport|En vol/i.test(morning) ? "transfer" : /calme|Calme/i.test(morning) ? "calm" : "normal"
		}, {
			period: "Après-midi",
			text: afternoon,
			tone: /vol|aéroport/i.test(afternoon) ? "transfer" : /calme/i.test(afternoon) ? "calm" : "normal"
		}];
		if (evening) slots.push({
			period: "Soir",
			text: evening,
			tone: /calme|sauna doux/i.test(evening) ? "calm" : "normal"
		});
		return {
			n: day.n,
			date,
			dateLabel: formatFrDate(date),
			city: day.night ?? "Vol retour",
			transfer: day.transfer,
			slots,
			tags
		};
	});
}
var CIRCUITS = [
	{
		id: "we-helsinki",
		title: "Long week-end à Helsinki",
		tagline: "La capitale, Suomenlinna, un vrai sauna. On ne pretend pas voir la Finlande.",
		duration: 3,
		nights: 2,
		families: [
			"indispensables",
			"unesco-bois",
			"cote-archipel"
		],
		seasons: "all",
		winterOk: true,
		hub: "HEL",
		transport: "Transports urbains, pas de voiture",
		nightsSummary: "Helsinki ×2",
		firstCity: "Helsinki",
		cities: ["Helsinki"],
		notes: ["Porvoo en aller-retour seulement si le vol retour est après 16 h."],
		days: [
			{
				n: 1,
				night: "Helsinki",
				transfer: "Aéroport → centre ~30 min",
				morning: "Senaatintori, Tuomiokirkko, Uspenski",
				afternoon: "Promenade centre, Kauppatori / halle",
				evening: "Allas ou Löyly, ou shopping Stockmann",
				arrivalSensitive: true
			},
			{
				n: 2,
				night: "Helsinki",
				transfer: "Ferry Suomenlinna ~20 min",
				morning: "Suomenlinna UNESCO (3 h)",
				afternoon: "Temppeliaukio, Oodi, Design District",
				evening: "Sauna si pas fait J1"
			},
			{
				n: 3,
				night: null,
				transfer: "Train aéroport ~30 min",
				morning: "Porvoo A/R ou Amos Rex / Kiasma",
				afternoon: "Aéroport",
				departureSensitive: true,
				optionalSoutenu: "Porvoo en aller-retour (~1 h)"
			}
		]
	},
	{
		id: "unesco-bois",
		title: "UNESCO et villes de bois",
		tagline: "Helsinki, Porvoo, Turku, Rauma. L’arrivée à l’aéroport est dans le circuit.",
		duration: 7,
		nights: 6,
		families: ["unesco-bois"],
		seasons: "all",
		winterOk: true,
		hub: "HEL",
		transport: "Voiture J3 → J7 (ou bus, sans Sammallahdenmäki)",
		nightsSummary: "Helsinki ×2 · Porvoo ×1 · Turku ×1 · Rauma ×2",
		firstCity: "Helsinki",
		cities: [
			"Helsinki",
			"Porvoo",
			"Turku",
			"Rauma"
		],
		notes: ["On reste à Helsinki J1 — pas de saut vers Turku.", "Petäjävesi n’est pas sur cette route."],
		days: [
			{
				n: 1,
				night: "Helsinki",
				transfer: "Aéroport → centre",
				morning: "Centre historique",
				afternoon: "Calme centre / shopping",
				evening: "Sauna doux (Allas)",
				arrivalSensitive: true
			},
			{
				n: 2,
				night: "Helsinki",
				transfer: "Ferry",
				morning: "Suomenlinna UNESCO",
				afternoon: "Temppeliaukio, Oodi, Design",
				evening: "Libre"
			},
			{
				n: 3,
				night: "Porvoo",
				transfer: "Helsinki → Porvoo ~50 min",
				morning: "Vieille ville bois, cathédrale",
				afternoon: "Entrepôts rouges, colline",
				evening: "Dîner local"
			},
			{
				n: 4,
				night: "Turku",
				transfer: "Porvoo → Turku ~2 h 15",
				morning: "Route. Pause Fiskars si rythme soutenu",
				afternoon: "Château, cathédrale, Aura",
				evening: "Centre Turku",
				optionalSoutenu: "Pause Fiskars (+45 min)"
			},
			{
				n: 5,
				night: "Rauma",
				transfer: "Turku → Rauma ~1 h 30",
				morning: "Naantali vieille ville en chemin",
				afternoon: "Old Rauma UNESCO, café Kontion",
				evening: "Bois le soir"
			},
			{
				n: 6,
				night: "Rauma",
				morning: "Sammallahdenmäki UNESCO (~20 min)",
				afternoon: "Rauma libre / musée maritime",
				evening: "Calme"
			},
			{
				n: 7,
				night: null,
				transfer: "Rauma → HEL ~3 h",
				morning: "Route. Pause Tampere si vol du soir",
				afternoon: "Aéroport",
				departureSensitive: true
			}
		]
	},
	{
		id: "triangle",
		title: "Triangle d’or",
		tagline: "Helsinki, Tampere, Turku — le premier séjour le plus sûr, toute saison, en train.",
		duration: 7,
		nights: 6,
		families: ["indispensables", "cote-archipel"],
		seasons: "all",
		winterOk: true,
		hub: "HEL",
		transport: "Trains. Pas de voiture.",
		nightsSummary: "Helsinki ×2 · Tampere ×2 · Turku ×2",
		firstCity: "Helsinki",
		cities: [
			"Helsinki",
			"Tampere",
			"Turku"
		],
		notes: ["Rauma = option J6 si rythme soutenu, pas une nuit."],
		days: [
			{
				n: 1,
				night: "Helsinki",
				transfer: "Aéroport → centre",
				morning: "Senaatintori, marché",
				afternoon: "Calme si vol tard",
				evening: "Allas / Löyly",
				arrivalSensitive: true
			},
			{
				n: 2,
				night: "Helsinki",
				transfer: "Ferry",
				morning: "Suomenlinna",
				afternoon: "Temppeliaukio, Oodi, Design",
				evening: "Libre"
			},
			{
				n: 3,
				night: "Tampere",
				transfer: "Train HEL–TRE ~1 h 40",
				morning: "Arrivée, Pyynikki + donuts",
				afternoon: "Finlayson, Tammerkoski",
				evening: "Sauna Rajaportti ou Kuuma"
			},
			{
				n: 4,
				night: "Tampere",
				morning: "Vapriikki ou Moominmuseum / Näsinneula",
				afternoon: "Deuxième sauna ou Pispala",
				evening: "Calme"
			},
			{
				n: 5,
				night: "Turku",
				transfer: "Train TRE–TKU ~1 h 50",
				morning: "Château de Turku",
				afternoon: "Cathédrale, Aura, halle",
				evening: "Centre"
			},
			{
				n: 6,
				night: "Turku",
				morning: "Naantali vieille ville",
				afternoon: "Turku libre / Kakola",
				evening: "Dîner Aura",
				optionalSoutenu: "Rauma A/R ~1 h 30"
			},
			{
				n: 7,
				night: null,
				transfer: "Train Turku → HEL aéroport ~2 h 30",
				morning: "Matin Turku si vol après 17 h",
				afternoon: "Aéroport",
				departureSensitive: true
			}
		]
	},
	{
		id: "laponie-express",
		title: "Laponie express",
		tagline: "Helsinki tampon, Rovaniemi, retour Helsinki. Pas d’open-jaw.",
		duration: 7,
		nights: 6,
		families: ["aurores-laponie"],
		seasons: "all",
		winterOk: true,
		hub: "HEL",
		transport: "Vol intérieur HEL–RVN–HEL (train de nuit = variante éco)",
		nightsSummary: "Helsinki ×2 · Rovaniemi ×4",
		firstCity: "Helsinki",
		cities: ["Helsinki", "Rovaniemi"],
		notes: [
			"Dernière nuit à Helsinki.",
			"Village du Père Noël = créneau remplaçable.",
			"Pas d’Inari, Levi, Cap Nord."
		],
		days: [
			{
				n: 1,
				night: "Helsinki",
				transfer: "Aéroport → centre",
				morning: "Centre Helsinki",
				afternoon: "Calme si vol tard",
				evening: "Dîner Helsinki. Pas de vol RVN ce soir",
				arrivalSensitive: true
			},
			{
				n: 2,
				night: "Rovaniemi",
				transfer: "Vol HEL → RVN ~1 h 15",
				morning: "Vol, installation",
				afternoon: "Village du Père Noël (½ j) ou remplaçant",
				evening: "Première chasse aurores si saison sombre",
				santaSlot: "afternoon"
			},
			{
				n: 3,
				night: "Rovaniemi",
				morning: "Husky (hiver) / chenil + balade",
				afternoon: "Ferme de rennes",
				evening: "Aurores guidées"
			},
			{
				n: 4,
				night: "Rovaniemi",
				morning: "Arktikum",
				afternoon: "Ounasvaara / ville",
				evening: "Aurores ou sauna"
			},
			{
				n: 5,
				night: "Rovaniemi",
				morning: "Libre / raquettes / Ranua",
				afternoon: "Calme nord",
				evening: "Dernière nuit Laponie"
			},
			{
				n: 6,
				night: "Helsinki",
				transfer: "Vol RVN → HEL après-midi",
				morning: "Matin calme Rovaniemi",
				afternoon: "Vol, arrivée Helsinki tampon",
				evening: "Calme Helsinki"
			},
			{
				n: 7,
				night: null,
				transfer: "Train aéroport ~30 min",
				morning: "Selon vol international",
				afternoon: "Aéroport",
				departureSensitive: true
			}
		]
	},
	{
		id: "cote-sud",
		title: "Road trip côte et sud",
		tagline: "Les meilleurs lieux du sud. Voiture. Archipel 1 nuit, pas un trail vélo.",
		duration: 10,
		nights: 9,
		families: [
			"cote-archipel",
			"unesco-bois",
			"indispensables"
		],
		seasons: [
			"printemps",
			"ete",
			"automne"
		],
		winterOk: false,
		hub: "HEL",
		transport: "Voiture J3 → J10",
		nightsSummary: "Helsinki ×2 · Turku ×2 · archipel ×1 · Rauma ×2 · Tampere ×2",
		firstCity: "Helsinki",
		cities: [
			"Helsinki",
			"Porvoo",
			"Turku",
			"Naantali",
			"Rauma",
			"Tampere"
		],
		notes: ["En hiver cette ossature est fermée — on bascule vers le mix Helsinki + Laponie."],
		days: [
			{
				n: 1,
				night: "Helsinki",
				transfer: "Aéroport",
				morning: "Centre selon vol",
				afternoon: "Calme si tard",
				evening: "Sauna",
				arrivalSensitive: true
			},
			{
				n: 2,
				night: "Helsinki",
				transfer: "Ferry",
				morning: "Suomenlinna",
				afternoon: "Ville / Design",
				evening: "Libre"
			},
			{
				n: 3,
				night: "Turku",
				transfer: "Voiture HEL → Porvoo → Turku",
				morning: "Porvoo (stop, pas une nuit)",
				afternoon: "Route ouest, arrivée Turku",
				evening: "Aura"
			},
			{
				n: 4,
				night: "Turku",
				morning: "Château + cathédrale",
				afternoon: "Naantali vieille ville",
				evening: "Turku"
			},
			{
				n: 5,
				night: "Nauvo ou Naantali",
				transfer: "Ferry archipel (été) / route courte (épaule)",
				morning: "Archipel : Nauvo l’été, Naantali l’épaule",
				afternoon: "Village, mer, sauna chalet",
				evening: "Archipel"
			},
			{
				n: 6,
				night: "Rauma",
				transfer: "~1 h 30–2 h",
				morning: "Route côtière",
				afternoon: "Old Rauma UNESCO",
				evening: "Bois"
			},
			{
				n: 7,
				night: "Rauma",
				morning: "Sammallahdenmäki UNESCO",
				afternoon: "Rauma libre",
				evening: "Calme"
			},
			{
				n: 8,
				night: "Tampere",
				transfer: "~1 h 45",
				morning: "Route intérieure",
				afternoon: "Pyynikki, Finlayson",
				evening: "Sauna Tampere"
			},
			{
				n: 9,
				night: "Tampere",
				morning: "Sauna / musée",
				afternoon: "Libre",
				evening: "Dernière nuit sud",
				optionalSoutenu: "Détour Petäjävesi si ouvert"
			},
			{
				n: 10,
				night: null,
				transfer: "Tampere → HEL aéroport ~1 h 40",
				morning: "Selon vol",
				afternoon: "Aéroport",
				departureSensitive: true
			}
		]
	},
	{
		id: "mix-hel-lap",
		title: "Helsinki + Laponie",
		tagline: "Trois vrais jours au sud, cinq nuits au nord, nuit tampon à Helsinki. Pas d’open-jaw.",
		duration: 10,
		nights: 9,
		families: ["indispensables", "aurores-laponie"],
		seasons: "all",
		winterOk: true,
		hub: "HEL",
		transport: "Vols intérieurs HEL–RVN–HEL",
		nightsSummary: "Helsinki ×4 · Rovaniemi ×5",
		firstCity: "Helsinki",
		cities: ["Helsinki", "Rovaniemi"],
		notes: ["Turku + Rauma + Laponie en 10 j = trop de bitume.", "Santa = créneau remplaçable."],
		days: [
			{
				n: 1,
				night: "Helsinki",
				transfer: "Aéroport",
				morning: "Centre selon vol",
				afternoon: "Calme si tard",
				evening: "Sauna doux",
				arrivalSensitive: true
			},
			{
				n: 2,
				night: "Helsinki",
				transfer: "Ferry",
				morning: "Suomenlinna UNESCO",
				afternoon: "Temppeliaukio, Oodi, Design",
				evening: "Libre"
			},
			{
				n: 3,
				night: "Helsinki",
				morning: "Porvoo ou Nuuksio (½–1 j)",
				afternoon: "Retour Helsinki",
				evening: "Libre"
			},
			{
				n: 4,
				night: "Rovaniemi",
				transfer: "Vol HEL → RVN matin",
				morning: "Vol + installation",
				afternoon: "Village du Père Noël (½ j) ou remplaçant",
				evening: "Aurores si saison",
				santaSlot: "afternoon"
			},
			{
				n: 5,
				night: "Rovaniemi",
				morning: "Husky / chenil",
				afternoon: "Rennes",
				evening: "Aurores"
			},
			{
				n: 6,
				night: "Rovaniemi",
				morning: "Arktikum",
				afternoon: "Ville / Ounasvaara",
				evening: "Aurores"
			},
			{
				n: 7,
				night: "Rovaniemi",
				morning: "Nature / Ranua",
				afternoon: "Libre",
				evening: "Igloo option budget plus"
			},
			{
				n: 8,
				night: "Rovaniemi",
				morning: "Journée nature",
				afternoon: "Sauna",
				evening: "Dernière chasse"
			},
			{
				n: 9,
				night: "Helsinki",
				transfer: "Vol RVN → HEL après-midi",
				morning: "Matin calme Rovaniemi",
				afternoon: "Arrivée Helsinki, tampon",
				evening: "Calme / shopping"
			},
			{
				n: 10,
				night: null,
				transfer: "Train aéroport",
				morning: "Selon vol international",
				afternoon: "Aéroport",
				departureSensitive: true
			}
		]
	}
];
function circuitById(id) {
	return CIRCUITS.find((c) => c.id === id);
}
/** Fourchette par personne, hors vols internationaux, 2026, autonome. */
var BANDS = {
	"we-helsinki": {
		eco: [280, 420],
		confort: [450, 700],
		plus: [800, 1200]
	},
	"unesco-bois": {
		eco: [750, 1100],
		confort: [1200, 1800],
		plus: [2e3, 2800]
	},
	triangle: {
		eco: [700, 1050],
		confort: [1150, 1700],
		plus: [1900, 2700]
	},
	"laponie-express": {
		eco: [1400, 2e3],
		confort: [2200, 3200],
		plus: [3500, 4800]
	},
	"cote-sud": {
		eco: [1200, 1800],
		confort: [2e3, 2800],
		plus: [3200, 4200]
	},
	"mix-hel-lap": {
		eco: [1800, 2600],
		confort: [2800, 4e3],
		plus: [4500, 6200]
	}
};
function estimateCost(circuitId, budget, travelers) {
	const band = BANDS[circuitId]?.[budget] ?? [800, 1500];
	const note = circuitId.startsWith("laponie") || circuitId === "mix-hel-lap" ? "Inclut vols intérieurs HEL–RVN–HEL, hôtels, une partie des activités. Hors avion international." : "Hôtels, trains ou voiture, saunas. Hors avion international.";
	return {
		min: band[0] * travelers,
		max: band[1] * travelers,
		perPerson: band,
		note
	};
}
function formatEuro(n) {
	return new Intl.NumberFormat("fr-FR", {
		style: "currency",
		currency: "EUR",
		maximumFractionDigits: 0
	}).format(n);
}
function inSeason(circuit, season) {
	if (circuit.seasons === "all") return true;
	return circuit.seasons.includes(season);
}
function auroraWarning(season) {
	if (season === "ete") return "Pas d’aurores en été (soleil de minuit).";
	if (season === "printemps") return "Aurores possibles en avril, nuits trop claires dès mai.";
}
function pick(id, role, reasons, warnings = []) {
	const circuit = CIRCUITS.find((c) => c.id === id);
	if (!circuit) return null;
	return {
		circuit,
		role,
		reasons,
		warnings
	};
}
/**
* Durée × famille × saison → 1 circuit primaire (+ 1 alternative possible).
* Jamais de liste de villes recalculée depuis des tags.
*/
function matchCircuits(input) {
	const { duration, season, family, airport } = input;
	const out = [];
	if (airport === "RVN") {
		const m = pick("laponie-express", "primary", ["Aéroport d’arrivée = Rovaniemi"], ["Arrivée Rovaniemi : on reste au nord. Pas d’Helsinki fantôme.", auroraWarning(season)].filter(Boolean));
		if (m) out.push(m);
		return out;
	}
	const band = duration === 15 ? 10 : duration;
	const stretch = duration === 15 ? ["15 j : le noyau est un circuit 10 j (vague 2 pour allonger)."] : [];
	if (family === "aurores-laponie") {
		if (band === 3) {
			const m = pick("we-helsinki", "primary", ["3 j trop court pour la Laponie — Helsinki d’abord"], ["Un express Laponie demande 7 j, A/R Helsinki."]);
			if (m) out.push(m);
			return out;
		}
		const m = pick(band === 7 ? "laponie-express" : "mix-hel-lap", "primary", [band === 7 ? "7 j Laponie, retour Helsinki" : "10 j sud + nord, retour Helsinki", ...stretch], [auroraWarning(season)].filter(Boolean));
		if (m) out.push(m);
		if (band === 10) {
			const alt = pick("laponie-express", "alternative", ["Si vous préférez tout miser sur le nord (7 j dans un séjour 10 j)."]);
			if (alt) out.push(alt);
		}
		return out;
	}
	if (family === "unesco-bois") {
		if (band === 3) {
			const m = pick("we-helsinki", "primary", ["3 j : Suomenlinna + Helsinki. Porvoo si vol retour tardif."]);
			if (m) out.push(m);
			return out;
		}
		if (band === 7) {
			const m = pick("unesco-bois", "primary", ["7 j UNESCO & bois, première ville = Helsinki"], season === "hiver" ? ["Porvoo et Rauma restent beaux, musées plus calmes."] : []);
			if (m) out.push(m);
			const alt = pick("triangle", "alternative", ["Variante sans voiture : triangle d’or en train."]);
			if (alt) out.push(alt);
			return out;
		}
		if (season === "hiver") {
			const m = pick("mix-hel-lap", "primary", ["10 j hiver : la côte est pauvre — mix Helsinki + Laponie", ...stretch]);
			if (m) out.push(m);
			return out;
		}
		const m = pick("cote-sud", "primary", ["10 j sud : Porvoo, Turku, Rauma, Tampere", ...stretch]);
		if (m) out.push(m);
		return out;
	}
	if (family === "cote-archipel") {
		if (band === 3) {
			const m = pick("we-helsinki", "primary", ["3 j : Helsinki. L’archipel demande 10 j."]);
			if (m) out.push(m);
			return out;
		}
		if (band === 7) {
			const m = pick("triangle", "primary", ["7 j : triangle + Naantali. Un vrai archipel, c’est 10 j."]);
			if (m) out.push(m);
			return out;
		}
		if (season === "hiver" || !inSeason(CIRCUITS.find((c) => c.id === "cote-sud"), season)) {
			const m = pick("mix-hel-lap", "primary", ["Côte fermée en hiver — on bascule vers Helsinki + Laponie", ...stretch], ["Ferries et jours courts : pas de road trip archipel."]);
			if (m) out.push(m);
			return out;
		}
		const m = pick("cote-sud", "primary", [season === "ete" ? "Été : 1 nuit Nauvo dans l’archipel" : "Épaule : Naantali, ferries réduits", ...stretch]);
		if (m) out.push(m);
		return out;
	}
	if (band === 3) {
		const m = pick("we-helsinki", "primary", ["Long week-end = Helsinki"]);
		if (m) out.push(m);
		return out;
	}
	if (band === 7) {
		const m = pick("triangle", "primary", ["Premier séjour 7 j : triangle d’or en train"]);
		if (m) out.push(m);
		const alt = pick("unesco-bois", "alternative", ["Si le bois / UNESCO prime : Porvoo + Rauma, avec voiture."]);
		if (alt) out.push(alt);
		return out;
	}
	if (season === "hiver" || season === "automne") {
		const m = pick("mix-hel-lap", "primary", [season === "hiver" ? "Hiver 10 j : Helsinki + Laponie (aurores)" : "Automne 10 j : Helsinki + Laponie (ruska, aurores)", ...stretch]);
		if (m) out.push(m);
		if (season === "automne") {
			const alt = pick("cote-sud", "alternative", ["Automne sud : même ossature côte, overlay ruska, sans aurores."]);
			if (alt) out.push(alt);
		}
		return out;
	}
	const m = pick("cote-sud", "primary", [season === "ete" ? "Printemps/été 10 j : côte et sud" : "Printemps 10 j : côte et sud (ferries qui ouvrent)", ...stretch]);
	if (m) out.push(m);
	const alt = pick("mix-hel-lap", "alternative", ["Variante nord : Helsinki + Laponie (pas d’aurores avant l’automne)."]);
	if (alt) out.push(alt);
	return out;
}
function familyAvailable(family, season, duration) {
	if (family === "cote-archipel" && season === "hiver") return {
		available: duration >= 10,
		note: "Côte fermée en hiver — on proposera le mix Helsinki + Laponie."
	};
	if (family === "aurores-laponie" && duration === 3) return {
		available: false,
		note: "La Laponie demande au moins 7 j."
	};
	if (family === "aurores-laponie" && (season === "ete" || season === "printemps")) return {
		available: true,
		note: season === "ete" ? "Laponie sous le soleil de minuit — pas d’aurores." : "Aurores possibles en avril seulement."
	};
	return { available: true };
}
var today = /* @__PURE__ */ new Date();
var initial = {
	step: 1,
	arrivalDate: new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 21)).toISOString().slice(0, 10),
	duration: 7,
	family: "indispensables",
	airport: "HEL",
	arrivalTime: "14:30",
	departureTime: "18:10",
	flightIn: "",
	flightOut: "",
	circuitId: null,
	pace: "equilibre",
	budget: "confort",
	hasChildren: false,
	travelers: 2,
	santa: null
};
var usePlanner = create((set) => ({
	...initial,
	set: (patch) => set(patch),
	reset: () => set(initial)
}));
function PlanificateurPage() {
	const s = usePlanner();
	const season = seasonFromDate(s.arrivalDate);
	const arrivalSlot = slotFromTime(s.arrivalTime);
	const departureSlot = slotFromTime(s.departureTime);
	const matches = (0, import_react.useMemo)(() => matchCircuits({
		duration: s.duration,
		season,
		family: s.family,
		airport: s.airport
	}), [
		s.duration,
		season,
		s.family,
		s.airport
	]);
	const selectedId = matches.some((m) => m.circuit.id === s.circuitId) ? s.circuitId : matches[0]?.circuit.id ?? null;
	const circuit = selectedId ? circuitById(selectedId) : void 0;
	const santa = s.santa ?? santaDefault(s.arrivalDate, s.hasChildren);
	const days = circuit ? adaptCircuit({
		circuit,
		arrivalDate: s.arrivalDate,
		season,
		arrivalSlot,
		departureSlot,
		pace: s.pace,
		budget: s.budget,
		santa
	}) : [];
	const cost = circuit ? estimateCost(circuit.id, s.budget, s.travelers) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "page-wrap flex flex-1 flex-col gap-8 py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-widest text-primary uppercase",
								children: "Planificateur"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl tracking-tight text-ink sm:text-4xl",
								children: "On part d’un circuit, ensuite on l’adapte."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-2xl text-muted",
								children: "Date, durée, vols, saison : on sait sur quelle ossature s’appuyer. Pas de soupe de tags. Première ville = aéroport d’arrivée."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, { step: s.step }),
					s.step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepOne, {
						season,
						matches,
						selectedId,
						arrivalSlot
					}) : null,
					s.step === 2 && circuit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepTwo, {
						season,
						santa,
						hasSantaSlot: circuit.days.some((d) => d.santaSlot)
					}) : null,
					s.step === 3 && circuit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepThree, {
						title: circuit.title,
						nights: circuit.nightsSummary,
						days
					}) : null,
					s.step === 4 && circuit && cost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepFour, {
						title: circuit.title,
						nights: circuit.nightsSummary,
						days,
						cost,
						santa,
						hasSantaSlot: circuit.days.some((d) => d.santaSlot)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col-reverse gap-3 sm:flex-row sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							disabled: s.step === 1,
							onClick: () => s.set({ step: s.step - 1 }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Retour"]
						}), s.step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							disabled: s.step === 1 && !selectedId,
							onClick: () => {
								if (s.step === 1) s.set({
									circuitId: selectedId,
									step: 2
								});
								else s.set({ step: s.step + 1 });
							},
							children: ["Continuer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							onClick: () => s.reset(),
							children: "Nouveau séjour"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function StepOne({ season, matches, selectedId, arrivalSlot }) {
	const s = usePlanner();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-col gap-5 rounded-2xl border border-border bg-bg-elevated p-5",
			onSubmit: (e) => e.preventDefault(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Date d’arrivée",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: s.arrivalDate,
						onChange: (e) => s.set({
							arrivalDate: e.target.value,
							circuitId: null
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase",
					children: "Durée"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: DURATIONS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => s.set({
							duration: d.id,
							circuitId: null
						}),
						className: s.duration === d.id ? "min-h-14 rounded-xl border border-primary bg-card px-3 py-2 text-left" : "min-h-14 rounded-xl border border-border bg-card px-3 py-2 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold text-ink",
							children: d.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-subtle",
							children: [
								d.id,
								" j / ",
								d.nights,
								" n"
							]
						})]
					}, d.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-ice px-3 py-2 text-sm text-primary",
					children: [
						"Saison : ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: SEASON_LABEL[season] }),
						s.duration === 15 ? " · 15 j posé sur un noyau 10 j" : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Aéroport d’arrivée",
					hint: "Toujours le même aéroport A/R. Pas d’open-jaw.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: s.airport,
						onChange: (e) => s.set({
							airport: e.target.value,
							circuitId: null
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "HEL",
							children: "Helsinki (HEL)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "RVN",
							children: "Rovaniemi (RVN)"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Heure d’arrivée",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "time",
							value: s.arrivalTime,
							onChange: (e) => s.set({ arrivalTime: e.target.value })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Heure retour",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "time",
							value: s.departureTime,
							onChange: (e) => s.set({ departureTime: e.target.value })
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Vol aller",
						hint: "Optionnel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "AY1581",
							value: s.flightIn,
							onChange: (e) => s.set({ flightIn: e.target.value.toUpperCase() })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Vol retour",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "AY1582",
							value: s.flightOut,
							onChange: (e) => s.set({ flightOut: e.target.value.toUpperCase() })
						})
					})]
				}),
				arrivalSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: arrivalSlot === "matin" ? "Arrivée le matin : transfert possible l’après-midi si ≤ 2 h 30." : "Arrivée tardive : jour 1 calme à Helsinki (ou RVN)."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase",
					children: "Intention"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: FAMILIES.map((f) => {
						const avail = familyAvailable(f.id, season, s.duration);
						const on = s.family === f.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => s.set({
								family: f.id,
								circuitId: null
							}),
							className: on ? "rounded-xl border border-primary bg-card px-3 py-3 text-left" : "rounded-xl border border-border bg-card px-3 py-3 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-semibold text-ink",
									children: f.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-subtle",
									children: f.hint
								}),
								avail.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-xs text-wx-sun",
									children: avail.note
								}) : null
							]
						}, f.id);
					})
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight text-ink",
					children: "Circuit(s) de base"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Choisissez l’ossature. Les villes ne bougeront plus à l’étape 3 — seulement les créneaux (vol, rythme, Santa, saison)."
				}),
				matches.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircuitCard, {
					match: m,
					selected: m.circuit.id === selectedId,
					onSelect: () => s.set({ circuitId: m.circuit.id })
				}, m.circuit.id + m.role))
			]
		})]
	});
}
function StepTwo({ season, santa, hasSantaSlot }) {
	const s = usePlanner();
	const showSanta = season === "hiver" && hasSantaSlot;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border bg-card p-5 shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-ink",
				children: "Rythme"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: [
					[
						"lent",
						"Lent",
						"Moins de sites, plus de sauna et de café."
					],
					[
						"equilibre",
						"Équilibré",
						"L’ossature telle quelle."
					],
					[
						"soutenu",
						"Soutenu",
						"Fiskars, Rauma A/R, Petäjävesi si ouvert."
					]
				].map(([id, label, hint]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => s.set({ pace: id }),
					className: s.pace === id ? "rounded-xl border border-primary px-4 py-3 text-left" : "rounded-xl border border-border px-4 py-3 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-ink",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-sm text-muted",
						children: hint
					})]
				}, id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border bg-card p-5 shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-ink",
				children: "Voyageurs & budget"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Voyageurs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 8,
							value: s.travelers,
							onChange: (e) => s.set({ travelers: Number(e.target.value) || 1 })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: s.hasChildren,
							onChange: (e) => s.set({
								hasChildren: e.target.checked,
								santa: null
							}),
							className: "size-4 accent-primary"
						}), "Voyage avec enfant(s)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase",
						children: "Budget"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							["eco", "Éco"],
							["confort", "Confort"],
							["plus", "Plus"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => s.set({ budget: id }),
							className: s.budget === id ? "min-h-11 rounded-lg border border-primary bg-ice text-sm font-semibold" : "min-h-11 rounded-lg border border-border text-sm",
							children: label
						}, id))
					})] }),
					showSanta ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 rounded-xl bg-bg-elevated p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: santa,
							onChange: (e) => s.set({ santa: e.target.checked }),
							className: "mt-1 size-4 accent-primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-ink",
							children: "Village du Père Noël"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-muted",
							children: "Défaut selon le mois et les enfants. Décochez pour le remplacer (Arktikum, Ounasvaara, Ranua)."
						})] })]
					}) : null
				]
			})]
		})]
	});
}
function StepThree({ title, nights, days }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl text-ink",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				"Nuits : ",
				nights,
				". Villes verrouillées."
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex flex-col gap-3",
			children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-lg text-ink",
							children: [
								"J",
								d.n,
								" · ",
								d.city
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-muted uppercase",
							children: d.dateLabel
						})]
					}),
					d.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-1.5",
						children: d.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-moss-bg px-2 py-0.5 text-[0.65rem] font-semibold text-moss",
							children: t
						}, t))
					}) : null,
					d.transfer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-subtle",
						children: d.transfer
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-3 grid gap-2 sm:grid-cols-3",
						children: d.slots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-bg-elevated px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[0.65rem] font-semibold tracking-wider text-subtle uppercase",
								children: slot.period
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm leading-snug text-fg",
								children: slot.text
							})]
						}, slot.period))
					})
				]
			}, d.n))
		})]
	});
}
function StepFour({ title, nights, days, cost, santa, hasSantaSlot }) {
	const s = usePlanner();
	const cities = [...new Set(days.map((d) => d.city).filter((c) => c !== "Vol retour"))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_minmax(0,20rem)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-border bg-card p-5 shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-ink",
				children: "Résumé"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Circuit",
						v: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Nuits",
						v: nights
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Villes",
						v: cities.join(" · ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Vols",
						v: `${s.airport} A/R${s.flightIn ? ` · ${s.flightIn}` : ""}${s.flightOut ? ` / ${s.flightOut}` : ""}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Rythme",
						v: s.pace
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Budget",
						v: s.budget
					}),
					hasSantaSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						k: "Santa",
						v: santa ? "Oui, ½ journée" : "Remplacé"
					}) : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-2xl bg-ink px-5 py-6 text-primary-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-widest uppercase opacity-70",
					children: "Chiffrage approximatif"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display mt-3 text-3xl tracking-tight",
					children: [
						formatEuro(cost.min),
						" – ",
						formatEuro(cost.max)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm opacity-80",
					children: [
						"pour ",
						s.travelers,
						" voyageur",
						s.travelers > 1 ? "s" : "",
						" · ",
						s.budget
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed opacity-75",
					children: cost.note
				})
			]
		})]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-4 border-b border-border py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-medium text-ink",
			children: v
		})]
	});
}
//#endregion
export { PlanificateurPage as component };
