import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { startCheckout } from "@/lib/account.functions";
import { FREE_FEATURES, PRO_FEATURES, PRO_PRICE } from "@/lib/pricing";
import type { CheckoutResult } from "@/lib/types";
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const { user, isPending } = useCurrentUserState();
  const [result, setResult] = useState<CheckoutResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <Shell mode="marketing">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <p className="text-faint text-xs tracking-[0.18em] uppercase">Membership</p>
        <h1 className="display section-title mt-3 max-w-3xl">Train free. Open the full library when you want it.</h1>
        <div className="mt-10 grid gap-3 md:grid-cols-[0.85fr_1.15fr]">
          <article className="border-line border p-6 md:p-8">
            <h2 className="display text-5xl">Free</h2>
            <p className="display mt-6 text-7xl">$0</p>
            <ul className="text-muted mt-8 space-y-3 text-sm">
              {FREE_FEATURES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link to={user ? "/dashboard" : "/register"} className="mt-10 inline-flex">
              <Button variant="ghost">Start free</Button>
            </Link>
          </article>
          <article className="bg-fg text-bg p-6 md:p-10">
            <h2 className="display text-6xl">Trex Pro</h2>
            <p className="mt-6">
              <span className="display text-7xl">${PRO_PRICE}</span>
              <span className="text-sm opacity-70"> / month</span>
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {PRO_FEATURES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {isPending ? null : user ? (
              <Button
                className="mt-8"
                disabled={busy}
                onClick={() => {
                  setBusy(true);
                  setError(null);
                  void startCheckout({ data: { plan: "pro-monthly" } })
                    .then(setResult)
                    .catch((caught) => setError(caught instanceof Error ? caught.message : "Checkout failed."))
                    .finally(() => setBusy(false));
                }}
              >
                {busy ? "Requesting…" : "Upgrade"}
              </Button>
            ) : (
              <Link to="/register" search={{ redirect: "/pricing" }} className="mt-8 inline-flex">
                <Button>Create account to upgrade</Button>
              </Link>
            )}
            {error ? (
              <p className="text-accent mt-4 text-sm" role="alert">
                {error}
              </p>
            ) : null}
            {result ? (
              <p className="text-muted mt-4 text-sm" role="status">
                {result.message}
              </p>
            ) : null}
          </article>
        </div>
      </div>
    </Shell>
  );
}
