import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getProfile } from "@/lib/account.functions";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { PageSkeleton } from "@/components/states";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const { user, isPending } = useCurrentUserState();
  const [ready, setReady] = useState<"loading" | "show" | "done">("loading");

  useEffect(() => {
    if (!user) return;
    let cancel = false;
    getProfile()
      .then((profile) => {
        if (!cancel) setReady(profile.onboardingCompleted ? "done" : "show");
      })
      .catch(() => {
        if (!cancel) setReady("show");
      });
    return () => {
      cancel = true;
    };
  }, [user?.id]);

  if (isPending || (user && ready === "loading")) return <PageSkeleton />;
  if (!user) return <RedirectToSignIn />;
  if (ready === "done") return <Navigate to="/dashboard" />;
  return <OnboardingFlow />;
}
