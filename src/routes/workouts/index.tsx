import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { listBookmarks } from "@/lib/account.functions";
import { listWorkouts } from "@/lib/catalog.functions";
import { matchesWorkout, type LibrarySearch } from "@/lib/filter";
import { labelLevel } from "@/lib/options";
import { LIBRARY_GOALS } from "@/lib/options";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Shell } from "@/components/shell";
import { EmptyState } from "@/components/states";
import { TextInput } from "@/components/ui";

export const Route = createFileRoute("/workouts/")({
  validateSearch: (search: Record<string, unknown>): LibrarySearch => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    goal: typeof search.goal === "string" && search.goal ? search.goal : undefined,
    difficulty: typeof search.difficulty === "string" && search.difficulty ? search.difficulty : undefined,
    equipment: typeof search.equipment === "string" && search.equipment ? search.equipment : undefined,
    duration: typeof search.duration === "string" && search.duration ? search.duration : undefined,
    saved: search.saved === "1" ? "1" : undefined,
  }),
  loader: () => listWorkouts(),
  component: LibraryPage,
});

function LibraryPage() {
  const all = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { user } = useCurrentUserState();
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    if (!user || search.saved !== "1") return;
    let cancel = false;
    listBookmarks()
      .then((ids) => {
        if (!cancel) setSaved(ids);
      })
      .catch(() => {
        if (!cancel) setSaved([]);
      });
    return () => {
      cancel = true;
    };
  }, [user?.id, search.saved]);

  const savedSet = search.saved === "1" ? new Set(saved) : undefined;
  const workouts = all.filter((workout) => matchesWorkout(workout, search, savedSet));

  function setFilter(patch: Partial<LibrarySearch>) {
    void navigate({
      search: (prev) => {
        const next = { ...prev, ...patch };
        (Object.keys(next) as (keyof LibrarySearch)[]).forEach((key) => {
          if (!next[key]) delete next[key];
        });
        return next;
      },
    });
  }

  return (
    <Shell>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[240px_1fr]">
        <aside>
          <h1 className="display text-5xl">Library</h1>
          <p className="text-muted mt-3 text-sm">{all.length} sessions. Filter without leaving the page.</p>
          <div className="mt-6 space-y-5">
            <TextInput
              aria-label="Search sessions"
              placeholder="Search"
              value={search.q ?? ""}
              onChange={(event) => setFilter({ q: event.target.value || undefined })}
            />
            <FilterGroup
              label="Goal"
              value={search.goal}
              options={LIBRARY_GOALS.map((item) => ({ id: item.id, label: item.label }))}
              onChange={(goal) => setFilter({ goal })}
            />
            <FilterGroup
              label="Difficulty"
              value={search.difficulty}
              options={[
                { id: "beginner", label: "Beginner" },
                { id: "intermediate", label: "Intermediate" },
                { id: "advanced", label: "Advanced" },
              ]}
              onChange={(difficulty) => setFilter({ difficulty })}
            />
            <FilterGroup
              label="Equipment"
              value={search.equipment}
              options={[
                { id: "none", label: "None" },
                { id: "dumbbells", label: "Dumbbells" },
                { id: "bands", label: "Bands" },
                { id: "bench", label: "Bench" },
                { id: "bar", label: "Bar" },
                { id: "gym", label: "Gym" },
              ]}
              onChange={(equipment) => setFilter({ equipment })}
            />
            <FilterGroup
              label="Duration"
              value={search.duration}
              options={[
                { id: "lt15", label: "Under 15 min" },
                { id: "m15", label: "15–30 min" },
                { id: "m30", label: "30–45 min" },
                { id: "m45", label: "45+ min" },
              ]}
              onChange={(duration) => setFilter({ duration })}
            />
            {user ? (
              <button
                type="button"
                className={`min-h-11 text-sm ${search.saved === "1" ? "text-fg" : "text-muted"}`}
                onClick={() => setFilter({ saved: search.saved === "1" ? undefined : "1" })}
              >
                {search.saved === "1" ? "Showing saved" : "Show saved"}
              </button>
            ) : null}
          </div>
        </aside>
        <div>
          <p className="text-faint mb-4 text-xs tracking-[0.16em] uppercase">{workouts.length} shown</p>
          {workouts.length === 0 ? (
            <EmptyState
              title="No sessions"
              body={search.saved === "1" && !user ? "Sign in to see saved sessions." : "Nothing matches these filters."}
              action={{ href: "/workouts", label: "Clear filters" }}
            />
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {workouts.map((workout) => (
                <li key={workout.id}>
                  <Link
                    to="/workouts/$id"
                    params={{ id: workout.id }}
                    className="group relative block min-h-64 overflow-hidden"
                  >
                    <img
                      src={workout.coverImage ?? "/media/engine.jpg"}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div className="tile-scrim absolute inset-0" />
                    <div className="relative flex min-h-64 flex-col justify-end p-4">
                      <p className="text-faint text-xs tracking-[0.14em] uppercase">
                        {workout.programTitle}
                        {workout.premium && !workout.freePreview ? " · Pro" : workout.freePreview ? " · Preview" : ""}
                      </p>
                      <span className="display mt-2 text-4xl">{workout.title}</span>
                      <span className="text-muted mt-2 text-sm">
                        {workout.durationMin} min · {labelLevel(workout.difficulty)} · {workout.equipment}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Shell>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value?: string;
  options: { id: string; label: string }[];
  onChange: (id: string | undefined) => void;
}) {
  return (
    <div>
      <p className="text-faint text-xs tracking-[0.16em] uppercase">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const on = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(on ? undefined : option.id)}
              className={`min-h-10 rounded-sm border px-3 text-sm ${on ? "border-fg bg-fg text-bg" : "border-line text-muted"}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
