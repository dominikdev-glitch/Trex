import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { saveOnboarding } from "@/lib/account.functions";
import { labelLevel } from "@/lib/options";
import { DAY_OPTIONS, EQUIPMENT_OPTIONS, EXPERIENCE_OPTIONS, GOAL_OPTIONS } from "@/lib/options";
import type { Profile } from "@/lib/types";
import { Wordmark } from "@/components/shell";
import { Button, Choice } from "@/components/ui";

const STEPS = ["Goal", "Level", "Days", "Equipment", "Plan"] as const;

export function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function toggleEquipment(id: string) {
    setEquipment((current) => {
      if (id === "none") return current.includes("none") ? [] : ["none"];
      const withoutNone = current.filter((item) => item !== "none");
      return withoutNone.includes(id) ? withoutNone.filter((item) => item !== id) : [...withoutNone, id];
    });
  }

  const canContinue =
    (step === 0 && goal) ||
    (step === 1 && experience) ||
    (step === 2 && days) ||
    (step === 3 && equipment.length > 0) ||
    step === 4;

  async function next() {
    if (step < 3) {
      setStep((value) => value + 1);
      return;
    }
    if (step === 3) {
      if (!goal || !experience || !days) return;
      setBusy(true);
      setError(null);
      try {
        const saved = await saveOnboarding({
          data: { goal, experience, trainingDays: days, equipment },
        });
        setProfile(saved);
        setStep(4);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Could not save your plan.");
      } finally {
        setBusy(false);
      }
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-6">
      <div className="flex items-center justify-between">
        <Wordmark />
        <p className="text-faint text-sm tabular-nums">
          0{step + 1} / 0{STEPS.length}
        </p>
      </div>
      <div className="bg-line mt-6 h-px">
        <div className="bg-accent draw h-px" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
      <div className="flex flex-1 flex-col py-10">
        {step === 0 ? (
          <Step title="What's your goal?" body="TREX uses this to pick the plan, not a generic checklist.">
            {GOAL_OPTIONS.map((option) => (
              <Choice
                key={option.id}
                selected={goal === option.id}
                label={option.label}
                detail={option.detail}
                onClick={() => setGoal(option.id)}
              />
            ))}
          </Step>
        ) : null}
        {step === 1 ? (
          <Step title="What's your experience?" body="Beginners start on the foundation week when the goal plan is harder.">
            {EXPERIENCE_OPTIONS.map((option) => (
              <Choice
                key={option.id}
                selected={experience === option.id}
                label={option.label}
                detail={option.detail}
                onClick={() => setExperience(option.id)}
              />
            ))}
          </Step>
        ) : null}
        {step === 2 ? (
          <Step title="How many days can you train?" body="This becomes the weekly target on your dashboard.">
            {DAY_OPTIONS.map((option) => (
              <Choice
                key={option.id}
                selected={days === Number(option.id)}
                label={option.label}
                detail={option.detail}
                onClick={() => setDays(Number(option.id))}
              />
            ))}
          </Step>
        ) : null}
        {step === 3 ? (
          <Step title="What equipment do you have?" body="Pick everything you can actually use this week.">
            {EQUIPMENT_OPTIONS.map((option) => (
              <Choice
                key={option.id}
                selected={equipment.includes(option.id)}
                label={option.label}
                detail={option.detail}
                onClick={() => toggleEquipment(option.id)}
              />
            ))}
          </Step>
        ) : null}
        {step === 4 && profile ? (
          <div className="rise">
            <p className="text-faint text-xs tracking-[0.18em] uppercase">Your plan</p>
            <h1 className="display section-title mt-3">{planTitle(profile.currentProgramId)}</h1>
            <p className="text-muted mt-4 text-base">{profile.planReason}</p>
            <dl className="border-line mt-8 divide-y divide-line border-y text-sm">
              <Row label="Goal" value={GOAL_OPTIONS.find((item) => item.id === profile.goal)?.label ?? "Set"} />
              <Row label="Level" value={labelLevel(profile.experience)} />
              <Row label="Days" value={profile.trainingDays ? `${profile.trainingDays} / week` : "Set"} />
              <Row
                label="Next"
                value={profile.nextProgramId ? planTitle(profile.nextProgramId) : "Stay on this plan"}
              />
            </dl>
          </div>
        ) : null}
        {error ? (
          <p className="text-accent mt-4 text-sm" role="alert">
            {error}
          </p>
        ) : null}
      </div>
      <div className="sticky bottom-0 flex gap-3 bg-bg py-4">
        {step > 0 && step < 4 ? (
          <Button variant="ghost" onClick={() => setStep((value) => value - 1)}>
            Back
          </Button>
        ) : null}
        {step < 4 ? (
          <Button className="flex-1" disabled={!canContinue || busy} onClick={() => void next()}>
            {busy ? "Building plan…" : step === 3 ? "Build my plan" : "Continue"}
          </Button>
        ) : (
          <Button className="flex-1" onClick={() => void navigate({ to: "/dashboard" })}>
            Go to training
          </Button>
        )}
      </div>
    </div>
  );
}

function Step({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <div className="rise">
      <h1 className="display section-title">{title}</h1>
      <p className="text-muted mt-3 mb-6 text-sm">{body}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}

const TITLES: Record<string, string> = {
  "seven-day-start": "7 Day Beginner Start",
  "abs-attack": "Abs Attack",
  "strength-base": "Strength Base",
  "fat-loss-30": "30 Day Fat Loss",
  "chest-builder": "Chest Builder",
  "arm-builder": "Arm Builder",
  "shoulder-line": "Shoulder Line",
  "leg-engine": "Leg Engine",
  "home-muscle": "Home Muscle",
  "full-body-athlete": "Full Body Athlete",
};

function planTitle(id: string | null): string {
  if (!id) return "7 Day Beginner Start";
  return TITLES[id] ?? "Your plan";
}
