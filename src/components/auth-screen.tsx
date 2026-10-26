import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import { GROK_PROVIDERS, authClient, signIn } from "@/lib/auth/client";
import { getProfile } from "@/lib/account.functions";
import { safeRedirect } from "@/lib/format";
import { MediaFrame } from "@/components/media";
import { Wordmark } from "@/components/shell";
import { Button, Field, TextInput } from "@/components/ui";

const BEARER_KEY = "grok-auth.bearer-token";

function storeToken(token: string | null) {
  if (!token || typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(BEARER_KEY, token);
  } catch {
    /* ignore */
  }
}

async function afterSession(navigate: ReturnType<typeof useNavigate>, redirect: string) {
  await authClient.getSession();
  try {
    const profile = await getProfile();
    if (!profile.onboardingCompleted) {
      await navigate({ to: "/onboarding" });
      return;
    }
  } catch {
    await navigate({ to: "/onboarding" });
    return;
  }
  if (redirect === "/dashboard") await navigate({ to: "/dashboard" });
  else if (redirect.startsWith("/workout/")) window.location.assign(redirect);
  else if (redirect.startsWith("/workouts")) await navigate({ to: "/workouts" });
  else if (redirect.startsWith("/programs")) await navigate({ to: "/programs" });
  else if (redirect.startsWith("/pricing")) await navigate({ to: "/pricing" });
  else if (redirect.startsWith("/progress")) await navigate({ to: "/progress" });
  else if (redirect.startsWith("/profile")) await navigate({ to: "/profile" });
  else await navigate({ to: "/dashboard" });
}

export function AuthScreen({ mode }: { mode: "login" | "register" }) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { redirect?: string };
  const redirect = safeRedirect(search.redirect, "/dashboard");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resetNote, setResetNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showReset, setShowReset] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      let headerToken: string | null = null;
      if (mode === "register") {
        const result = await authClient.signUp.email(
          { email: email.trim(), password, name: name.trim() },
          {
            onSuccess(ctx) {
              headerToken = ctx.response.headers.get("set-auth-token");
            },
          },
        );
        if (result.error) {
          setError(result.error.message ?? "Could not create the account.");
          return;
        }
        storeToken(headerToken || result.data?.token || null);
      } else {
        const result = await authClient.signIn.email(
          { email: email.trim(), password },
          {
            onSuccess(ctx) {
              headerToken = ctx.response.headers.get("set-auth-token");
            },
          },
        );
        if (result.error) {
          setError(result.error.message ?? "Email or password is wrong.");
          return;
        }
        storeToken(headerToken || result.data?.token || null);
      }
      await afterSession(navigate, redirect);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onReset(event: FormEvent) {
    event.preventDefault();
    setResetNote(null);
    const client = authClient as unknown as {
      requestPasswordReset?: (args: { email: string; redirectTo: string }) => Promise<{ error?: { message?: string } | null }>;
    };
    if (!client.requestPasswordReset) {
      setResetNote("Password reset is not available on this account system.");
      return;
    }
    const result = await client.requestPasswordReset({ email: email.trim(), redirectTo: "/login" });
    const message =
      result.error?.message ??
      "If an inbox is connected, a reset link is on the way. Otherwise use Google or X.";
    setResetNote(message);
    toast(message);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden min-h-screen lg:block">
        <MediaFrame
          src="/media/hero.jpg"
          alt="Athlete training with their back to the camera"
          label="Train"
          className="absolute inset-0 h-full"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Wordmark />
          <div>
            <p className="text-faint text-xs tracking-[0.22em] uppercase">Home training</p>
            <h1 className="display hero-title mt-3 max-w-xl">
              Train from
              <br />
              home.
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-5 py-8 sm:px-10">
        <div className="relative -mx-5 -mt-8 mb-6 h-48 overflow-hidden sm:-mx-10 lg:hidden">
          <img src="/media/hero.jpg" alt="" className="h-full w-full object-cover object-top" />
          <div className="hero-scrim absolute inset-0" />
          <div className="absolute bottom-4 left-5">
            <Wordmark />
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-6 lg:py-10">
          <p className="text-faint text-xs tracking-[0.18em] uppercase">
            {mode === "register" ? "Create account" : "Welcome back"}
          </p>
          <h2 className="display section-title mt-3">{mode === "register" ? "Start training" : "Sign in"}</h2>
          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            {mode === "register" ? (
              <Field label="Name">
                <TextInput
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Field>
            ) : null}
            <Field label="Email">
              <TextInput
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Field>
            <Field label="Password" hint="At least 8 characters.">
              <TextInput
                type="password"
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Field>
            {error ? (
              <p className="text-accent text-sm" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" disabled={busy} className="w-full">
              {busy ? "Working…" : mode === "register" ? "Create account" : "Sign in"}
            </Button>
          </form>
          {mode === "login" ? (
            <div className="mt-4">
              <button
                type="button"
                className="text-muted text-sm underline-offset-4 hover:underline"
                onClick={() => setShowReset((value) => !value)}
              >
                Forgot password
              </button>
              {showReset ? (
                <form className="mt-3 space-y-3" onSubmit={onReset}>
                  <TextInput
                    type="email"
                    required
                    placeholder="Email for the reset"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-label="Email for password reset"
                  />
                  <Button type="submit" variant="ghost">
                    Send reset
                  </Button>
                  {resetNote ? <p className="text-muted text-sm">{resetNote}</p> : null}
                </form>
              ) : null}
            </div>
          ) : null}
          <div className="border-line my-8 border-t" />
          <div className="space-y-3">
            {GROK_PROVIDERS.map((provider) => (
              <Button
                key={provider.providerId}
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  void signIn(provider.providerId, {
                    callbackURL: mode === "register" ? "/onboarding" : redirect,
                  });
                }}
              >
                Continue with {provider.label}
              </Button>
            ))}
          </div>
          <p className="text-muted mt-8 text-sm">
            {mode === "register" ? "Already training?" : "New to TREX?"}{" "}
            <Link
              to={mode === "register" ? "/login" : "/register"}
              search={{ redirect }}
              className="text-fg underline-offset-4 hover:underline"
            >
              {mode === "register" ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
