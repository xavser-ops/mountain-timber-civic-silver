import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <SiteHeader />
      <main>
        <section className="bg-ink text-primary-fg">
          <div className="page-wrap grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="flex flex-col gap-5">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase opacity-70">
                Premier séjour · autonome
              </p>
              <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
                La Finlande, à partir d’un vrai circuit.
              </h1>
              <p className="max-w-xl text-base leading-relaxed opacity-85">
                Date, durée, vols, saison. On choisit une ossature — Helsinki,
                UNESCO, triangle d’or, Laponie, côte — puis on l’adapte. Pas de
                liste de villes sortie d’une soupe de thèmes.
              </p>
              <div>
                <Link to="/planificateur">
                  <Button>
                    Commencer le planificateur
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <ul className="grid gap-3 text-sm">
              {[
                "Long week-end Helsinki — 3 j",
                "UNESCO & bois — 7 j",
                "Triangle d’or en train — 7 j",
                "Laponie express, A/R Helsinki — 7 j",
                "Côte et sud — 10 j",
                "Helsinki + Laponie — 10 j",
                "Triangle + Laponie — 15 j (7+8)",
                "Côte 10 j + 5 j sud — 15 j",
              ].map((item) => (
                <li
                  key={item}
                  className="border-t border-white/15 pt-3 font-medium tracking-tight"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="page-wrap grid gap-6 py-14 sm:grid-cols-3">
          {[
            {
              t: "Étape 1",
              d: "Arrivée, durée, vols. La saison filtre les circuits possibles.",
            },
            {
              t: "Étape 2",
              d: "Rythme, budget, adultes et enfants. Santa n’est qu’un créneau, remplaçable.",
            },
            {
              t: "Étapes 3–4",
              d: "Proposition jour par jour, puis résumé et chiffrage hors vol international.",
            },
          ].map((b) => (
            <article
              key={b.t}
              className="rounded-2xl border border-border bg-bg-elevated p-5"
            >
              <h2 className="font-display text-xl text-ink">{b.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.d}</p>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
