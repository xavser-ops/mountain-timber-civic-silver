import { _ as Link, y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GROK_PROVIDERS } from "./router-sZu0a1CL.mjs";
import { a as signIn, n as SiteFooter, r as SiteHeader, t as Button } from "./button-DNBKhxyg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-ldorM0qd.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "page-wrap grid flex-1 place-items-center py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl text-ink",
							children: "Connexion"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Le planificateur fonctionne sans compte. La connexion sert à sauver un séjour plus tard."
						}),
						GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							className: "w-full",
							onClick: () => signIn(p.providerId, { callbackURL: "/" }),
							children: ["Continuer avec ", p.label]
						}, p.providerId)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/planificateur",
							className: "block text-center text-sm text-primary",
							children: "Retour au planificateur"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Login as component };
