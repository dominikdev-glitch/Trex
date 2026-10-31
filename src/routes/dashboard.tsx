import { useEffect, useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getDashboard } from "@/lib/account.functions";
import { formatDuration } from "@/lib/format";
import { firstName, isOnboardingMarkedDone } from "@/lib/user-name";
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
        if (!cancel) setError(caught instanceof Error ? caught.message : "Could not load your training.");
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

  const finishedSetup = data.profile.onboardingCompleted || isOnboardingMarkedDone(user.id);
  if (!finishedSetup) return <Navigate to="/onboarding" />;

  const name = firstName(user);
  const today = data.today;
  const week = Math.min(100, Math.round((data.stats.weekDone / Math.max(1, data.stats.weekTarget)) * 100));

  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-5 py-6 pb-8">
        <Greeting name={name} />
        <h1 className="display mt-2 max-w-3xl text-4xl sm:text-5xl md:text-6xl">{data.program?.title ?? "Your training"}</h1>
        {data.profile.planReason ? (
          <p className="text-muted mt-2 max-w-xl text-sm">{data.profile.planReason}</p>
        ) : null}

        {today ? (
          <section className="mt-6 grid gap-0 lg:grid-cols-[1.35fr_0.85fr]">
            <div className="relative aspect-video overflow-hidden sm:min-h-0">
              <img
                src={today.workout.coverImage ?? "/media/engine.jpg"}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="tile-scrim absolute inset-0" />
              <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
                <p className="text-[11px] tracking-[0.16em] uppercase">Today</p>
                <h2 className="display mt-1 text-3xl sm:text-4xl">{today.workout.title}</h2>
                <p className="text-muted mt-1 text-xs sm:text-sm">
                  {today.workout.durationMin} min · {today.exerciseCount} moves · {today.workout.equipment}
                </p>
              </div>
            </div>
            <div className="border-line flex flex-col justify-between border p-4 sm:p-5 lg:border-l-0">
              <div>
                <p className="text-faint text-[11px] tracking-[0.14em] uppercase">
                  {today.locked ? "Locked" : "Ready to train"}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{today.workout.description}</p>
                <p className="text-muted mt-3 text-xs tabular-nums">
                  {data.stats.programDone} of {data.stats.programTotal} sessions done in this plan
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-2">
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
          <p className="text-muted mt-6 text-sm">No workout queued. Open Workouts and pick one.</p>
        )}

        <dl className="border-line mt-5 grid grid-cols-2 gap-px border bg-line md:grid-cols-4">
          <Metric label="Streak" value={`${data.stats.streak}`} unit="days" />
          <Metric label="This week" value={`${data.stats.weekDone}/${data.stats.weekTarget}`} unit="sessions" />
          <Metric label="Sessions" value={`${data.stats.totalWorkouts}`} unit="logged" />
          <Metric label="Time" value={formatDuration(data.stats.totalMinutes)} unit="trained" />
        </dl>
        <div className="bg-line mt-3 h-px" aria-hidden>
          <div className="bg-fg h-px" style={{ width: `${week}%` }} />
        </div>
        <p className="text-faint mt-1.5 text-[11px]">Weekly target</p>

        {data.nextProgram ? (
          <p className="text-muted mt-5 text-sm">
            After this plan: <span className="text-fg">{data.nextProgram.title}</span>
          </p>
        ) : null}

        <div className="mt-8 flex items-center justify-between">
          <h2 className="display text-2xl">Recent</h2>
          <Link to="/progress" className="text-muted text-sm">
            Progress
          </Link>
        </div>
        {data.recent.length === 0 ? (
          <p className="text-muted mt-3 text-sm">No sessions yet. Start today's workout.</p>
        ) : (
          <ul className="border-line mt-3 divide-y divide-line border-y">
            {data.recent.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                <span>
                  <span className="block">{item.title}</span>
                  <span className="text-muted text-xs">{item.programTitle}</span>
                </span>
                <span className="text-muted text-xs tabular-nums">{Math.round(item.durationSec / 60)}m</span>
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
    <p className="text-faint text-xs tracking-[0.16em] uppercase">
      {hello}, {name}
    </p>
  );
}

function Metric({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="bg-bg px-3 py-3 sm:px-4 sm:py-3.5">
      <dt className="text-faint text-[10px] tracking-[0.12em] uppercase">{label}</dt>
      <dd className="display mt-1 text-2xl tabular-nums sm:text-3xl">{value}</dd>
      <p className="text-muted mt-0.5 text-[11px]">{unit}</p>
    </div>
  );
}
