import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { getWorkout } from "@/lib/catalog.functions";
import { getWorkoutSession, listBookmarks, toggleBookmark } from "@/lib/account.functions";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { prescription } from "@/lib/format";
import { labelLevel } from "@/lib/options";
import type { WorkoutDetail } from "@/lib/types";
import { MediaFrame } from "@/components/media";
import { Shell } from "@/components/shell";
import { EmptyState, PageSkeleton } from "@/components/states";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/workouts/$id")({
  loader: ({ params }) => getWorkout({ data: params.id }),
  component: WorkoutPage,
  pendingComponent: () => (
    <Shell>
      <PageSkeleton />
    </Shell>
  ),
});

function WorkoutPage() {
  const initial = Route.useLoaderData();
  const { id } = Route.useParams();
  const { user } = useCurrentUserState();
  const [detail, setDetail] = useState<WorkoutDetail | null>(initial);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDetail(initial);
  }, [initial]);

  useEffect(() => {
    if (!user) return;
    let cancel = false;
    getWorkoutSession({ data: id })
      .then((next) => {
        if (!cancel && next) setDetail(next);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, [user?.id, id]);

  useEffect(() => {
    if (!user) return;
    let cancel = false;
    listBookmarks()
      .then((ids) => {
        if (!cancel) setSaved(ids.includes(id));
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, [user?.id, id]);

  if (!detail) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-5 py-10">
          <EmptyState title="Session missing" body="That workout is not in the library." action={{ href: "/workouts", label: "Back to library" }} />
        </div>
      </Shell>
    );
  }

  const { workout, exercises, locked } = detail;

  return (
    <Shell>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <MediaFrame
          src={exercises[0]?.thumbnailUrl ?? workout.coverImage}
          videoUrl={locked ? null : exercises[0]?.videoUrl}
          alt={workout.title}
          label={workout.title}
          className="aspect-[4/5] lg:aspect-[4/5]"
        />
        <div>
          <p className="text-faint text-xs tracking-[0.16em] uppercase">
            {workout.programTitle} · Session {String(workout.dayIndex).padStart(2, "0")}
          </p>
          <h1 className="display section-title mt-3">{workout.title}</h1>
          <p className="text-muted mt-4 text-sm">{workout.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <Meta label="Time" value={`${workout.durationMin} min`} />
            <Meta label="Level" value={labelLevel(workout.difficulty)} />
            <Meta label="Equipment" value={workout.equipment} />
            <Meta label="Estimate" value={`${workout.baseCalories} kcal`} />
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {locked ? (
              <Link to="/pricing">
                <Button>Unlock with Pro</Button>
              </Link>
            ) : user ? (
              <Link to="/workout/$id/player" params={{ id: workout.id }}>
                <Button>Start workout</Button>
              </Link>
            ) : (
              <Link to="/register" search={{ redirect: `/workout/${workout.id}/player` }}>
                <Button>Start workout</Button>
              </Link>
            )}
            {user ? (
              <Button
                variant="ghost"
                onClick={() => {
                  void toggleBookmark({ data: workout.id })
                    .then((result) => {
                      setSaved(result.bookmarked);
                      toast(result.bookmarked ? "Saved" : "Removed");
                    })
                    .catch(() => toast("Could not update saved sessions"));
                }}
              >
                {saved ? "Saved" : "Save"}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="display text-3xl">Exercises</h2>
        <ol className="border-line mt-4 divide-y divide-line border-y">
          {exercises.map((exercise, index) => (
            <li key={`${exercise.exerciseId}-${index}`} className="grid gap-2 py-4 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
              <span className="text-faint tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <span>
                {locked ? (
                  <span className="font-medium">{exercise.name}</span>
                ) : (
                  <Link to="/exercises/$id" params={{ id: exercise.exerciseId }} className="font-medium">
                    {exercise.name}
                  </Link>
                )}
                <span className="text-muted mt-1 block text-sm">{exercise.targetMuscles.join(" · ")}</span>
              </span>
              <span className="text-sm tabular-nums">{prescription(exercise.sets, exercise.reps, exercise.seconds)}</span>
            </li>
          ))}
        </ol>
        {locked ? <p className="text-muted mt-4 text-sm">Coaching cues for this session are on TREX Pro.</p> : null}
      </div>
    </Shell>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-line border p-3">
      <dt className="text-faint text-xs tracking-[0.14em] uppercase">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
