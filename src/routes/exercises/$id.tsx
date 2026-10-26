import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getExercise } from "@/lib/catalog.functions";
import { getExerciseForUser } from "@/lib/account.functions";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { prescription } from "@/lib/format";
import { labelLevel } from "@/lib/options";
import type { Exercise } from "@/lib/types";
import { MediaFrame } from "@/components/media";
import { Shell } from "@/components/shell";
import { EmptyState, PageSkeleton } from "@/components/states";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/exercises/$id")({
  loader: ({ params }) => getExercise({ data: params.id }),
  pendingComponent: () => (
    <Shell>
      <PageSkeleton />
    </Shell>
  ),
  component: ExercisePage,
});

function ExercisePage() {
  const initial = Route.useLoaderData();
  const { id } = Route.useParams();
  const { user } = useCurrentUserState();
  const [exercise, setExercise] = useState<Exercise | null>(initial);

  useEffect(() => {
    setExercise(initial);
  }, [initial]);

  useEffect(() => {
    if (!user || !initial?.premium) return;
    let cancel = false;
    getExerciseForUser({ data: id })
      .then((next) => {
        if (!cancel && next) setExercise(next);
      })
      .catch(() => undefined);
    return () => {
      cancel = true;
    };
  }, [user?.id, id, initial?.premium]);

  if (!exercise) {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl px-5 py-10">
          <EmptyState title="Exercise missing" body="That movement is not in the library." action={{ href: "/workouts", label: "Library" }} />
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-2">
        <MediaFrame
          src={exercise.thumbnailUrl}
          videoUrl={exercise.videoUrl}
          alt={exercise.name}
          label={exercise.name}
          className="aspect-[4/5]"
        />
        <div>
          <p className="text-faint text-xs tracking-[0.16em] uppercase">
            {labelLevel(exercise.difficulty)} · {exercise.equipment}
          </p>
          <h1 className="display section-title mt-3">{exercise.name}</h1>
          <p className="mt-4 text-base">{exercise.description}</p>
          <p className="text-muted mt-4 text-sm">{exercise.targetMuscles.join(" · ")}</p>
          <p className="mt-2 text-sm tabular-nums">
            {prescription(exercise.defaultSets, exercise.defaultReps, exercise.defaultSeconds)} · Rest {exercise.restSeconds}s
          </p>
          {exercise.locked ? (
            <div className="border-line mt-8 border p-5">
              <h2 className="display text-3xl">Coaching is on Pro</h2>
              <p className="text-muted mt-3 text-sm">
                Cues, mistakes, and easier or harder versions for loaded movements open with TREX Pro.
              </p>
              <Link to="/pricing" className="mt-5 inline-flex">
                <Button>See Pro</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-6 text-sm">
              <Block title="How" items={exercise.instructions} ordered />
              <Block title="Common mistakes" items={exercise.mistakes} />
              <p>
                <span className="text-faint">Easier · </span>
                {exercise.beginnerMod}
              </p>
              <p>
                <span className="text-faint">Harder · </span>
                {exercise.advancedMod}
              </p>
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Block({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <div>
      <h2 className="text-faint text-xs tracking-[0.16em] uppercase">{title}</h2>
      <List className={`mt-2 space-y-1 ${ordered ? "list-decimal pl-4" : ""}`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </div>
  );
}
