import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

const APP_PREFIXES = ["/dashboard", "/workouts", "/programs", "/progress", "/profile", "/settings", "/exercises", "/workout"];

function NavLink({
  to,
  label,
  exact = false,
  hash,
  light = false,
}: {
  to: "/" | "/workouts" | "/programs" | "/progress" | "/profile" | "/dashboard" | "/pricing";
  label: string;
  exact?: boolean;
  hash?: string;
  light?: boolean;
}) {
  return (
    <Link
      to={to}
      hash={hash}
      activeOptions={{ exact }}
      className={`text-sm ${light ? "text-fg/80 hover:text-fg" : "text-muted hover:text-fg"} data-[status=active]:text-fg`}
    >
      {label}
    </Link>
  );
}

export function Shell({ children, mode = "auto" }: { children: ReactNode; mode?: "marketing" | "app" | "plain" | "auto" }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const resolved =
    mode === "auto" ? (APP_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ? "app" : "marketing") : mode;
  const online = useOnline();
  const overlay = resolved === "marketing" && pathname === "/";

  return (
    <div className="bg-bg text-fg min-h-screen">
      <a
        href="#main"
        className="bg-accent text-accent-fg sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      {resolved !== "plain" ? <TopBar app={resolved === "app"} overlay={overlay} /> : null}
      {!online ? (
        <p className="bg-subtle text-muted border-line border-b px-5 py-2 text-center text-sm" role="status">
          You are offline. Sessions need a connection to save.
        </p>
      ) : null}
      <div id="main" className={resolved === "app" ? "pb-24 md:pb-0" : undefined}>
        {children}
      </div>
      {resolved === "app" ? <MobileNav /> : null}
    </div>
  );
}

function TopBar({ app, overlay }: { app: boolean; overlay: boolean }) {
  const { user, isPending } = useCurrentUserState();
  const scrolled = useScrolled();
  const solid = !overlay || scrolled;
  return (
    <header
      className={`${overlay ? "fixed" : "sticky"} inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-200 ${
        solid ? "border-line bg-bg/95 border-b backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link to={app && user ? "/dashboard" : "/"} className="flex items-center gap-2" aria-label="TREX home">
          <span className="bg-accent h-2.5 w-2.5" aria-hidden />
          <span className="display text-2xl leading-none">Trex</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {app ? (
            <>
              <NavLink to="/dashboard" label="Home" />
              <NavLink to="/workouts" label="Workouts" />
              <NavLink to="/programs" label="Programs" />
              <NavLink to="/progress" label="Progress" />
              <NavLink to="/profile" label="Profile" />
            </>
          ) : (
            <>
              <NavLink to="/programs" label="Programs" light={!solid} />
              <NavLink to="/workouts" label="Workouts" light={!solid} />
              <NavLink to="/" hash="goals" label="Goals" light={!solid} />
              <NavLink to="/progress" label="Progress" light={!solid} />
            </>
          )}
        </nav>
        <div className="flex items-center gap-3">
          {isPending ? <span className="bg-subtle h-8 w-20 animate-pulse motion-reduce:animate-none" /> : null}
          {!isPending && user && app ? (
            <Link to="/pricing" className="text-accent text-sm font-medium">
              Pro
            </Link>
          ) : null}
          {!isPending && !user ? (
            <>
              <Link to="/login" className={`hidden text-sm sm:inline ${solid ? "text-fg" : "text-fg"}`}>
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-accent text-accent-fg inline-flex min-h-11 items-center px-4 text-sm font-medium"
              >
                Start training
              </Link>
            </>
          ) : null}
          {!isPending && user && !app ? (
            <Link
              to="/dashboard"
              className="bg-accent text-accent-fg inline-flex min-h-11 items-center px-4 text-sm font-medium"
            >
              Continue
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const item =
    "flex min-h-14 flex-1 flex-col items-center justify-center text-[11px] tracking-wide text-faint data-[status=active]:text-fg";
  return (
    <nav
      className="border-line bg-bg fixed inset-x-0 bottom-0 z-30 border-t pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Mobile"
    >
      <div className="flex">
        <Link to="/dashboard" className={item} activeProps={{ className: item }}>
          Home
        </Link>
        <Link to="/workouts" className={item} activeProps={{ className: item }}>
          Workouts
        </Link>
        <Link to="/progress" className={item} activeProps={{ className: item }}>
          Progress
        </Link>
        <Link to="/profile" className={item} activeProps={{ className: item }}>
          Profile
        </Link>
      </div>
    </nav>
  );
}

function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    setOnline(navigator.onLine);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return scrolled;
}

export function Wordmark() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="TREX home">
      <span className="bg-accent h-2.5 w-2.5" aria-hidden />
      <span className="display text-2xl leading-none">Trex</span>
    </Link>
  );
}