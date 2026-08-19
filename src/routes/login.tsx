import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <SiteHeader />
      <main className="page-wrap grid flex-1 place-items-center py-16">
        <div className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h1 className="font-display text-2xl text-ink">Connexion</h1>
          <p className="text-sm text-muted">
            Le planificateur fonctionne sans compte. La connexion sert à sauver un
            séjour plus tard.
          </p>
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              >
                Continuer avec {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-subtle">Connexion désactivée.</p>
          )}
          <Link to="/planificateur" className="block text-center text-sm text-primary">
            Retour au planificateur
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
