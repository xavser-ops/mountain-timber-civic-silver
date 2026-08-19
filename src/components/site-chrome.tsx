import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function SiteHeader() {
  const { isPending } = useCurrentUserState();

  return (
    <header className="site-header border-b border-border bg-bg">
      <div className="page-wrap flex h-14 items-center justify-between gap-4">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-lg tracking-tight text-ink">Nordi</span>
          <span className="hidden text-xs font-medium tracking-wide text-muted uppercase sm:inline">
            Planifier la Finlande
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            to="/planificateur"
            className="font-medium text-primary hover:opacity-80"
          >
            Planificateur
          </Link>
          {isPending ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-surface" />
          ) : (
            <>
              <SignedOut>
                <Link to="/login" className="text-muted hover:text-fg">
                  Connexion
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer mt-auto border-t border-border py-8 text-sm text-subtle">
      <div className="page-wrap flex flex-col gap-2 sm:flex-row sm:justify-between">
        <p>Circuits premier séjour — autonome, A/R Helsinki.</p>
        <p>Pas un tour opérateur. Chiffrage indicatif.</p>
      </div>
    </footer>
  );
}
