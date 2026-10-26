import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getDashboard } from "@/lib/account.functions";
import { formatDuration } from "@/lib/format";
import { labelGoal, labelLevel } from "@/lib/options";
import type { DashboardData } from "@/lib/types";
import { Shell } from "@/components/shell";
import { ErrorState, PageSkeleton } from "@/components/states";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, isPending } = useCurrentUserState();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancel = false;
    getDashboard({ data: { tzOffsetMin: new Date().getTimezoneOffset() } })
      .then((next) => {
        if (!cancel) setData(next);
      })
      .catch((caught) => {
        if (!cancel) setError(caught instanceof Error ? caught.message : "Could not load profile.");
      });
    return () => {
      cancel = true;
    };
  }, [user?.id]);

  if (isPending || (user && !data && !error)) {
    return (
      <Shell>
        <PageSkeleton />
      </Shell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const initial = (user.displayName ?? user.primaryEmail ?? "T").slice(0, 1).toUpperCase();

  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-5 py-8">
        <div className="flex items-center gap-4">
          {user.profileImageUrl ? (
            <img src={user.profileImageUrl} alt="" className="h-16 w-16 object-cover" />
          ) : (
            <span className="bg-subtle display grid h-16 w-16 place-items-center text-3xl">{initial}</span>
          )}
          <div>
            <h1 className="display text-4xl">{user.displayName ?? "Athlete"}</h1>
            <p className="text-muted text-sm">{user.primaryEmail}</p>
          </div>
        </div>
        {error ? (
          <div className="mt-6">
            <ErrorState message={error} />
          </div>
        ) : null}
        {data ? (
          <>
            <dl className="border-line mt-8 divide-y divide-line border-y text-sm">
              <Row label="Goal" value={labelGoal(data.profile.goal)} />
              <Row label="Experience" value={labelLevel(data.profile.experience)} />
              <Row label="Days" value={data.profile.trainingDays ? `${data.profile.trainingDays} / week` : "Not set"} />
              <Row label="Equipment" value={data.profile.equipment.join(", ") || "Not set"} />
              <Row label="Program" value={data.program?.title ?? "Not set"} />
              <Row label="Membership" value={membership(data.profile.subscriptionStatus)} />
              <Row label="Streak" value={`${data.stats.streak} days`} />
              <Row label="Sessions" value={String(data.stats.totalWorkouts)} />
              <Row label="Time" value={formatDuration(data.stats.totalMinutes)} />
              <Row label="Calories" value={String(data.stats.calories)} />
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/settings" className="border-line min-h-11 rounded-sm border px-4 py-2 text-sm">
                Edit training setup
              </Link>
              <Link to="/pricing" className="text-accent text-sm">
                Membership
              </Link>
            </div>
          </>
        ) : null}
        <div className="border-line mt-10 border-t pt-6">
          <UserButton />
        </div>
      </div>
    </Shell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right capitalize">{value}</dd>
    </div>
  );
}

function membership(status: string): string {
  if (status === "pro") return "TREX Pro";
  if (status === "expired") return "Pro expired";
  return "Free";
}
