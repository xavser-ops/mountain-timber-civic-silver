import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as SiteFooter, r as SiteHeader, t as Button } from "./button-DNBKhxyg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CK4W-awU.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-ink text-primary-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-wrap grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold tracking-[0.2em] uppercase opacity-70",
								children: "Premier séjour · autonome"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl tracking-tight sm:text-5xl",
								children: "La Finlande, à partir d’un vrai circuit."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xl text-base leading-relaxed opacity-85",
								children: "Date, durée, vols, saison. On choisit une ossature — Helsinki, UNESCO, triangle d’or, Laponie, côte — puis on l’adapte. Pas de liste de villes sortie d’une soupe de thèmes."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/planificateur",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: ["Commencer le planificateur", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] })
							}) })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-3 text-sm",
						children: [
							"Long week-end Helsinki — 3 j",
							"UNESCO & bois — 7 j",
							"Triangle d’or en train — 7 j",
							"Laponie express, A/R Helsinki — 7 j",
							"Côte et sud — 10 j",
							"Helsinki + Laponie — 10 j"
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-t border-white/15 pt-3 font-medium tracking-tight",
							children: item
						}, item))
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "page-wrap grid gap-6 py-14 sm:grid-cols-3",
				children: [
					{
						t: "Étape 1",
						d: "Arrivée, durée, vols, intention possible selon la saison. On sait quel circuit."
					},
					{
						t: "Étape 2",
						d: "Rythme, budget, enfants. Santa n’est qu’un créneau, remplaçable."
					},
					{
						t: "Étapes 3–4",
						d: "Proposition jour par jour, puis résumé et chiffrage hors vol international."
					}
				].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl border border-border bg-bg-elevated p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-ink",
						children: b.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: b.d
					})]
				}, b.t))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Home as component };
