import { useEffect, useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getDashboard } from "@/lib/account.functions";
import { formatDuration } from "@/lib/format";
import type { DashboardData } from "@/lib/types";
import { Shell } from "@/components/shell";
import { ErrorState, PageSkeleton } from "@/components/states";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
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
        if (!cancel) setError(caught instanceof Error ? caught.message : "Could not load training.");
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
  if (error) {
    return (
      <Shell>
        <div className="mx-auto max-w-6xl px-5 py-10">
          <ErrorState message={error} />
        </div>
      </Shell>
    );
  }
  if (!data) return null;
  if (!data.profile.onboardingCompleted) return <Navigate to="/onboarding" />;

  const name = user.displayName?.split(" ")[0] ?? "Athlete";
  const today = data.today;
  const week = Math.min(100, Math.round((data.stats.weekDone / Math.max(1, data.stats.weekTarget)) * 100));

  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <Greeting name={name} />
        <h1 className="display mt-3 max-w-3xl text-6xl md:text-7xl">{data.program?.title ?? "Your training"}</h1>
        {data.profile.planReason ? <p className="text-muted mt-3 max-w-xl text-sm">{data.profile.planReason}</p> : null}

        {today ? (
          <section className="mt-8 grid gap-0 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="relative min-h-80 overflow-hidden">
              <img
                src={today.workout.coverImage ?? "/media/engine.jpg"}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="tile-scrim absolute inset-0" />
              <div className="relative flex h-full min-h-80 flex-col justify-end p-6">
                <p className="text-xs tracking-[0.18em] uppercase">Today</p>
                <h2 className="display mt-2 text-5xl">{today.workout.title}</h2>
                <p className="text-muted mt-2 text-sm">
                  {today.workout.durationMin} min · {today.exerciseCount} exercises · {today.workout.equipment}
                </p>
              </div>
            </div>
            <div className="border-line flex flex-col justify-between border p-6 lg:border-l-0">
              <div>
                <p className="text-faint text-xs tracking-[0.16em] uppercase">
                  {today.locked ? "Locked session" : "Ready"}
                </p>
                <p className="mt-3 text-base">{today.workout.description}</p>
                <p className="text-muted mt-4 text-sm tabular-nums">
                  {data.stats.programDone} of {data.stats.programTotal} sessions logged in this plan
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                {today.locked ? (
                  <>
                    <Link to="/pricing">
                      <Button className="w-full">Unlock with Pro</Button>
                    </Link>
                    {data.alternative ? (
                      <Link to="/workout/$id/player" params={{ id: data.alternative.workout.id }}>
                        <Button variant="ghost" className="w-full">
                          Train {data.alternative.workout.title}
                        </Button>
                      </Link>
                    ) : null}
                  </>
                ) : (
                  <Link to="/workout/$id/player" params={{ id: today.workout.id }}>
                    <Button className="w-full">Start workout</Button>
                  </Link>
                )}
              </div>
            </div>
          </section>
        ) : (
          <p className="text-muted mt-8">No session is queued. Open the library and pick one.</p>
        )}

        <dl className="border-line mt-8 grid grid-cols-2 gap-px border bg-line md:grid-cols-4">
          <Metric label="Streak" value={`${data.stats.streak}`} unit="days" />
          <Metric label="This week" value={`${data.stats.weekDone}/${data.stats.weekTarget}`} unit="sessions" />
          <Metric label="Sessions" value={`${data.stats.totalWorkouts}`} unit="logged" />
          <Metric label="Time" value={formatDuration(data.stats.totalMinutes)} unit="trained" />
        </dl>
        <div className="bg-line mt-4 h-px" aria-hidden>
          <div className="bg-fg h-px" style={{ width: `${week}%` }} />
        </div>
        <p className="text-faint mt-2 text-xs">Weekly target</p>

        {data.nextProgram ? (
          <p className="text-muted mt-8 text-sm">
            After this block: <span className="text-fg">{data.nextProgram.title}</span>
          </p>
        ) : null}

        <div className="mt-10 flex items-center justify-between">
          <h2 className="display text-3xl">Recent</h2>
          <Link to="/progress" className="text-muted text-sm">
            Progress
          </Link>
        </div>
        {data.recent.length === 0 ? (
          <p className="text-muted mt-4 text-sm">No sessions yet. Start today’s workout.</p>
        ) : (
          <ul className="border-line mt-4 divide-y divide-line border-y">
            {data.recent.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-4 text-sm">
                <span>
                  <span className="block">{item.title}</span>
                  <span className="text-muted">{item.programTitle}</span>
                </span>
                <span className="text-muted tabular-nums">{Math.round(item.durationSec / 60)}m</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Shell>
  );
}

function Greeting({ name }: { name: string }) {
  const [hello, setHello] = useState("Welcome");
  useEffect(() => {
    const hour = new Date().getHours();
    setHello(hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");
  }, []);
  return (
    <p className="text-faint text-xs tracking-[0.18em] uppercase">
      {hello}, {name}
    </p>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-bg px-4 py-5">
      <dt className="text-faint text-xs tracking-[0.14em] uppercase">{label}</dt>
      <dd className="display mt-2 text-4xl tabular-nums">{value}</dd>
      <p className="text-muted mt-1 text-xs">{unit}</p>
    </div>
  );
}
