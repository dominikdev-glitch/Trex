import { createFileRoute, Link } from "@tanstack/react-router";
import { getProgram } from "@/lib/catalog.functions";
import { labelLevel } from "@/lib/options";
import { Shell } from "@/components/shell";
import { EmptyState, PageSkeleton } from "@/components/states";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/programs/$id")({
  loader: ({ params }) => getProgram({ data: params.id }),
  pendingComponent: () => (
    <Shell>
      <PageSkeleton />
    </Shell>
  ),
  component: ProgramPage,
});

function ProgramPage() {
  const data = Route.useLoaderData();
  if (!data) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-5 py-10">
          <EmptyState title="Program missing" body="That plan is not in the library." action={{ href: "/programs", label: "All programs" }} />
        </div>
      </Shell>
    );
  }
  const { program, workouts } = data;
  return (
    <Shell>
      <div className="relative min-h-[50svh]">
        <img src={program.coverImage ?? "/media/engine.jpg"} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="tile-scrim absolute inset-0" />
        <div className="relative mx-auto flex min-h-[50svh] max-w-6xl flex-col justify-end px-5 py-10">
          <p className="text-xs tracking-[0.18em] uppercase">
            {labelLevel(program.difficulty)} · {program.equipment} · {program.durationDays} days
          </p>
          <h1 className="display section-title mt-3 max-w-3xl">{program.title}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <p className="max-w-2xl text-base">{program.description}</p>
        <p className="text-muted mt-3 text-sm">
          {program.premium
            ? "Pro program. Session 01 is a free preview. The rest open with TREX Pro."
            : "Included on the free plan."}
        </p>
        <ol className="border-line mt-8 divide-y divide-line border-y">
          {workouts.map((workout) => {
            const locked = program.premium && !workout.freePreview;
            return (
              <li key={workout.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-faint text-xs tabular-nums">
                    {String(workout.dayIndex).padStart(2, "0")} · {workout.durationMin} min · {workout.equipment}
                    {locked ? " · Pro" : workout.freePreview ? " · Preview" : ""}
                  </p>
                  <h2 className="mt-1 text-xl">{workout.title}</h2>
                  <p className="text-muted mt-1 max-w-xl text-sm">{workout.description}</p>
                </div>
                <Link to="/workouts/$id" params={{ id: workout.id }}>
                  <Button variant={locked ? "ghost" : "primary"}>{locked ? "View" : "Open"}</Button>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </Shell>
  );
}
