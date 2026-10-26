import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getProfile, updatePreferences } from "@/lib/account.functions";
import { authClient } from "@/lib/auth/client";
import { DAY_OPTIONS, EQUIPMENT_OPTIONS, EXPERIENCE_OPTIONS, GOAL_OPTIONS } from "@/lib/options";
import type { Profile } from "@/lib/types";
import { Shell } from "@/components/shell";
import { PageSkeleton } from "@/components/states";
import { Button, Choice, Field, TextInput } from "@/components/ui";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [goal, setGoal] = useState("fitness");
  const [experience, setExperience] = useState("beginner");
  const [days, setDays] = useState(3);
  const [equipment, setEquipment] = useState<string[]>(["none"]);
  const [busy, setBusy] = useState(false);
  const [resetNote, setResetNote] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancel = false;
    getProfile()
      .then((next) => {
        if (cancel) return;
        setProfile(next);
        if (next.goal) setGoal(next.goal);
        if (next.experience) setExperience(next.experience);
        if (next.trainingDays) setDays(next.trainingDays);
        if (next.equipment.length) setEquipment(next.equipment);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, [user?.id]);

  function toggleEquipment(id: string) {
    setEquipment((current) => {
      if (id === "none") return current.includes("none") ? [] : ["none"];
      const withoutNone = current.filter((item) => item !== "none");
      return withoutNone.includes(id) ? withoutNone.filter((item) => item !== id) : [...withoutNone, id];
    });
  }

  if (isPending || (user && !profile)) {
    return (
      <Shell>
        <PageSkeleton />
      </Shell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <Shell>
      <div className="mx-auto max-w-xl px-5 py-8">
        <p className="text-faint text-xs tracking-[0.16em] uppercase">Account</p>
        <h1 className="display text-5xl">Settings</h1>
        <p className="text-muted mt-3 text-sm">
          Signed in as {user.primaryEmail}. Membership: {profile?.subscriptionStatus === "pro" ? "TREX Pro" : profile?.subscriptionStatus === "expired" ? "Pro expired" : "Free"}.
        </p>
        <form
          className="mt-8 space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            setBusy(true);
            void updatePreferences({ data: { goal, experience, trainingDays: days, equipment } })
              .then((next) => {
                setProfile(next);
                toast("Training setup updated");
              })
              .catch((caught) => toast(caught instanceof Error ? caught.message : "Could not save"))
              .finally(() => setBusy(false));
          }}
        >
          <fieldset className="space-y-2">
            <legend className="text-muted mb-2 text-sm">Goal</legend>
            {GOAL_OPTIONS.map((option) => (
              <Choice key={option.id} selected={goal === option.id} label={option.label} onClick={() => setGoal(option.id)} />
            ))}
          </fieldset>
          <fieldset className="space-y-2">
            <legend className="text-muted mb-2 text-sm">Experience</legend>
            {EXPERIENCE_OPTIONS.map((option) => (
              <Choice
                key={option.id}
                selected={experience === option.id}
                label={option.label}
                onClick={() => setExperience(option.id)}
              />
            ))}
          </fieldset>
          <fieldset className="space-y-2">
            <legend className="text-muted mb-2 text-sm">Days</legend>
            {DAY_OPTIONS.map((option) => (
              <Choice
                key={option.id}
                selected={days === Number(option.id)}
                label={option.label}
                onClick={() => setDays(Number(option.id))}
              />
            ))}
          </fieldset>
          <fieldset className="space-y-2">
            <legend className="text-muted mb-2 text-sm">Equipment</legend>
            {EQUIPMENT_OPTIONS.map((option) => (
              <Choice
                key={option.id}
                selected={equipment.includes(option.id)}
                label={option.label}
                onClick={() => toggleEquipment(option.id)}
              />
            ))}
          </fieldset>
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save setup"}
          </Button>
        </form>

        <div className="border-line mt-12 border-t pt-8">
          <h2 className="text-lg font-medium">Password</h2>
          <p className="text-muted mt-2 text-sm">
            Reset email is only delivered when an email sender is connected. Google and X stay available if you lose this password.
          </p>
          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              const email = user.primaryEmail;
              if (!email) return;
              const client = authClient as unknown as {
                requestPasswordReset?: (args: { email: string; redirectTo: string }) => Promise<{ error?: { message?: string } | null }>;
              };
              if (!client.requestPasswordReset) {
                setResetNote("Password reset is not available.");
                return;
              }
              void client.requestPasswordReset({ email, redirectTo: "/login" }).then((result) => {
                setResetNote(result.error?.message ?? "If email delivery is connected, the reset link was sent.");
              });
            }}
          >
            <Field label="Account email">
              <TextInput value={user.primaryEmail ?? ""} readOnly aria-label="Account email" />
            </Field>
            <Button type="submit" variant="ghost">
              Request reset
            </Button>
            {resetNote ? <p className="text-muted text-sm">{resetNote}</p> : null}
          </form>
        </div>
        <div className="mt-10">
          <UserButton />
        </div>
        <Link to="/profile" className="text-muted mt-6 inline-block text-sm">
          Back to profile
        </Link>
      </div>
    </Shell>
  );
}
