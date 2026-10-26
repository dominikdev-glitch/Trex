import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getProgress } from "@/lib/account.functions";
import type { RangeKey } from "@/lib/dates";
import type { ProgressData } from "@/lib/types";
import { Shell } from "@/components/shell";
import { ErrorState, PageSkeleton } from "@/components/states";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/progress")({
  component: ProgressPage,
});

const RANGES: { id: RangeKey; label: string }[] = [
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
  { id: "all", label: "All time" },
];

function ProgressPage() {
  const { user, isPending } = useCurrentUserState();
  const [range, setRange] = useState<RangeKey>("7d");
  const [data, setData] = useState<ProgressData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancel = false;
    setLoading(true);
    getProgress({ data: { range, tzOffsetMin: new Date().getTimezoneOffset() } })
      .then((next) => {
        if (!cancel) {
          setData(next);
          setError(null);
          setLoading(false);
        }
      })
      .catch((caught) => {
        if (!cancel) {
          setError(caught instanceof Error ? caught.message : "Could not load progress.");
          setLoading(false);
        }
      });
    return () => {
      cancel = true;
    };
  }, [user?.id, range]);

  if (isPending) {
    return (
      <Shell>
        <PageSkeleton />
      </Shell>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="display section-title">Progress</h1>
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Range">
          {RANGES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={range === item.id}
              onClick={() => setRange(item.id)}
              className={`min-h-11 rounded-sm border px-3 text-sm ${range === item.id ? "border-fg bg-fg text-bg" : "border-line text-muted"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {loading ? <PageSkeleton /> : null}
        {error ? (
          <div className="mt-6">
            <ErrorState message={error} />
          </div>
        ) : null}
        {data?.locked ? (
          <div className="border-line mt-8 border p-6">
            <h2 className="display text-4xl">Longer history is on Pro</h2>
            <p className="text-muted mt-3 max-w-md text-sm">
              Free includes the last 7 days. 30 days, 90 days, and all-time open with TREX Pro.
            </p>
            <Link to="/pricing" className="mt-6 inline-flex">
              <Button>See Pro</Button>
            </Link>
          </div>
        ) : null}
        {data && !data.locked && !loading ? (
          <>
            <dl className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
              <Stat label="Sessions" value={String(data.totals.workouts)} />
              <Stat label="Minutes" value={String(data.totals.minutes)} />
              <Stat label="Calories" value={String(data.totals.calories)} />
              <Stat label="Streak" value={String(data.totals.streak)} />
            </dl>
            <div className="mt-8 h-56 w-full min-w-0">
              {data.buckets.every((bucket) => bucket.workouts === 0) ? (
                <p className="text-muted text-sm">No sessions in this range yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.buckets} barCategoryGap="28%">
                    <XAxis dataKey="label" tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} width={24} tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      contentStyle={{ background: "#121214", border: "1px solid #2a2a30", borderRadius: 0 }}
                      labelStyle={{ color: "#f4f4f5" }}
                    />
                    <Bar dataKey="workouts" radius={[2, 2, 0, 0]}>
                      {data.buckets.map((bucket, index) => (
                        <Cell key={bucket.label} fill={index === data.buckets.length - 1 ? "#d63a32" : "#3a3a42"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <h2 className="display mt-10 text-3xl">History</h2>
            {data.history.length === 0 ? (
              <p className="text-muted mt-4 text-sm">Finish a session and it will show up here.</p>
            ) : (
              <ul className="border-line mt-4 divide-y divide-line border-y">
                {data.history.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-4 py-4 text-sm">
                    <span>
                      <span className="block">{item.title}</span>
                      <span className="text-muted">
                        {item.programTitle} · {new Date(item.completedAt).toLocaleDateString()}
                      </span>
                    </span>
                    <span className="text-muted tabular-nums">
                      {Math.max(1, Math.round(item.durationSec / 60))}m · {item.calories} kcal
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-faint text-xs tracking-[0.14em] uppercase">{label}</dt>
      <dd className="display mt-1 text-4xl tabular-nums">{value}</dd>
    </div>
  );
}
