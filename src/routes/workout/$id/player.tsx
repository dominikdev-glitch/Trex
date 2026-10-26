import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getWorkoutSession } from "@/lib/account.functions";
import type { WorkoutDetail } from "@/lib/types";
import { WorkoutPlayer } from "@/components/player";
import { ErrorState, PageSkeleton } from "@/components/states";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/workout/$id/player")({
  component: PlayerPage,
});

function PlayerPage() {
  const { id } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const [detail, setDetail] = useState<WorkoutDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let cancel = false;
    getWorkoutSession({ data: id })
      .then((next) => {
        if (cancel) return;
        if (!next) setError("That session does not exist.");
        else setDetail(next);
      })
      .catch((caught) => {
        if (!cancel) setError(caught instanceof Error ? caught.message : "Could not open the session.");
      });
    return () => {
      cancel = true;
    };
  }, [user?.id, id]);

  if (isPending || (user && !detail && !error)) return <PageSkeleton />;
  if (!user) return <RedirectToSignIn />;
  if (error) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16">
        <ErrorState message={error} />
      </div>
    );
  }
  if (!detail) return null;
  if (detail.locked) {
    return (
      <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5">
        <p className="text-faint text-xs tracking-[0.18em] uppercase">TREX Pro</p>
        <h1 className="display section-title mt-3">{detail.workout.title}</h1>
        <p className="text-muted mt-4 text-sm">
          This session is part of {detail.workout.programTitle}. The preview is open. The rest of the plan is on Pro.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/pricing">
            <Button>See Pro</Button>
          </Link>
          <Link to="/workouts/$id" params={{ id: detail.workout.id }}>
            <Button variant="ghost">Session details</Button>
          </Link>
        </div>
      </div>
    );
  }
  return <WorkoutPlayer detail={detail} />;
}
