import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { completeWorkout } from "@/lib/account.functions";
import { formatClock, formatDuration, prescription } from "@/lib/format";
import type { CompletionResult, WorkoutDetail } from "@/lib/types";
import { MediaFrame } from "@/components/media";
import { Button } from "@/components/ui";

export function WorkoutPlayer({ detail }: { detail: WorkoutDetail }) {
  const exercises = detail.exercises;
  const [index, setIndex] = useState(0);
  const [setNo, setSetNo] = useState(1);
  const [phase, setPhase] = useState<"work" | "rest" | "done">("work");
  const [paused, setPaused] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [result, setResult] = useState<CompletionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [cues, setCues] = useState(false);
  const [restLabel, setRestLabel] = useState("Recover");

  const pausedRef = useRef(paused);
  const phaseRef = useRef(phase);
  const originRef = useRef(Date.now());
  const pausedMsRef = useRef(0);
  const pauseStartedRef = useRef<number | null>(null);
  const endAtRef = useRef<number | null>(null);
  const finishedRef = useRef(false);
  const timerKindRef = useRef<"work" | "rest" | null>(null);
  const remainingRef = useRef<number | null>(null);
  const exerciseRef = useRef(exercises[0]);
  const indexRef = useRef(0);
  const setNoRef = useRef(1);
  const doneCountRef = useRef(0);
  const advanceRef = useRef<() => void>(() => {});
  pausedRef.current = paused;
  phaseRef.current = phase;

  const exercise = exercises[index];
  const total = exercises.length;
  exerciseRef.current = exercise;
  indexRef.current = index;
  setNoRef.current = setNo;
  doneCountRef.current = doneCount;

  function setLeft(value: number | null) {
    remainingRef.current = value;
    setRemaining(value);
  }

  function clearTimer() {
    endAtRef.current = null;
    timerKindRef.current = null;
    setLeft(null);
  }

  function arm(kind: "work" | "rest", seconds: number) {
    timerKindRef.current = kind;
    setLeft(seconds);
    endAtRef.current = Date.now() + seconds * 1000;
  }

  function armWork(target = exerciseRef.current) {
    if (target?.seconds && target.seconds > 0) arm("work", target.seconds);
    else clearTimer();
  }

  function startRest(nextSet: number, label: string, target = exerciseRef.current) {
    const rest = target?.restSeconds ?? 30;
    setSetNo(nextSet);
    setNoRef.current = nextSet;
    setRestLabel(label);
    setPhase("rest");
    phaseRef.current = "rest";
    arm("rest", rest);
  }

  function advance() {
    const current = exerciseRef.current;
    const at = indexRef.current;
    const setNow = setNoRef.current;
    if (!current || phaseRef.current === "done" || finishedRef.current) return;
    if (setNow < current.sets) {
      startRest(setNow + 1, `Set ${setNow + 1} of ${current.sets}`, current);
      return;
    }
    const nextDone = doneCountRef.current + 1;
    setDoneCount(nextDone);
    doneCountRef.current = nextDone;
    if (at < exercises.length - 1) {
      const next = exercises[at + 1];
      setIndex(at + 1);
      indexRef.current = at + 1;
      exerciseRef.current = next;
      setSetNo(1);
      setNoRef.current = 1;
      startRest(1, `Next · ${next?.name ?? "next exercise"}`, next);
      return;
    }
    void finish(nextDone);
  }
  advanceRef.current = advance;

  useEffect(() => {
    const first = exercises[0];
    if (first?.seconds) {
      timerKindRef.current = "work";
      remainingRef.current = first.seconds;
      endAtRef.current = Date.now() + first.seconds * 1000;
      setRemaining(first.seconds);
    }
    const id = window.setInterval(() => {
      if (pausedRef.current || phaseRef.current === "done" || finishedRef.current) return;
      setElapsed(Math.floor((Date.now() - originRef.current - pausedMsRef.current) / 1000));
      if (!endAtRef.current) return;
      const left = Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000));
      if (left > 0) {
        if (remainingRef.current !== left) setLeft(left);
        return;
      }
      const kind = timerKindRef.current;
      endAtRef.current = null;
      timerKindRef.current = null;
      setLeft(null);
      if (kind === "rest") {
        setPhase("work");
        phaseRef.current = "work";
        const next = exerciseRef.current;
        if (next?.seconds) arm("work", next.seconds);
        return;
      }
      if (kind === "work" && phaseRef.current === "work") advanceRef.current();
    }, 200);
    return () => window.clearInterval(id);
    // Timer owns its own refs; the session does not remount mid-workout.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pause() {
    setPaused((value) => {
      if (!value) {
        pauseStartedRef.current = Date.now();
        if (endAtRef.current) {
          setLeft(Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000)));
          endAtRef.current = null;
        }
        return true;
      }
      if (pauseStartedRef.current) {
        pausedMsRef.current += Date.now() - pauseStartedRef.current;
        pauseStartedRef.current = null;
      }
      const left = remainingRef.current;
      if (timerKindRef.current && left && left > 0) {
        endAtRef.current = Date.now() + left * 1000;
      }
      return false;
    });
  }

  function completeSet() {
    if (phaseRef.current !== "work" || finishedRef.current) return;
    clearTimer();
    advance();
  }

  function skipRest() {
    if (phaseRef.current !== "rest") return;
    endAtRef.current = null;
    timerKindRef.current = null;
    setLeft(null);
    setPhase("work");
    phaseRef.current = "work";
    armWork();
  }

  function goTo(nextIndex: number) {
    const next = exercises[nextIndex];
    if (!next || phaseRef.current === "done") return;
    clearTimer();
    setPhase("work");
    phaseRef.current = "work";
    setIndex(nextIndex);
    indexRef.current = nextIndex;
    exerciseRef.current = next;
    setSetNo(1);
    setNoRef.current = 1;
    armWork(next);
  }

  function skipExercise() {
    if (indexRef.current >= total - 1) return;
    goTo(indexRef.current + 1);
  }

  function previous() {
    if (indexRef.current === 0) return;
    goTo(indexRef.current - 1);
  }

  async function finish(count = doneCount) {
    if (finishedRef.current || saving) return;
    if (count < 1) {
      setError("Complete at least one exercise before ending.");
      setConfirmEnd(false);
      return;
    }
    finishedRef.current = true;
    setSaving(true);
    setError(null);
    setPhase("done");
    phaseRef.current = "done";
    endAtRef.current = null;
    try {
      const saved = await completeWorkout({
        data: {
          workoutId: detail.workout.id,
          durationSec: Math.max(30, elapsed),
          exercisesCompleted: count,
          tzOffsetMin: new Date().getTimezoneOffset(),
        },
      });
      setResult(saved);
    } catch (caught) {
      finishedRef.current = false;
      setPhase("work");
      phaseRef.current = "work";
      setError(caught instanceof Error ? caught.message : "Could not save the session.");
    } finally {
      setSaving(false);
      setConfirmEnd(false);
    }
  }

  if (result) {
    return (
      <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-16">
        <p className="text-faint text-xs tracking-[0.2em] uppercase">Session complete</p>
        <h1 className="display hero-title rise mt-4">{detail.workout.title}</h1>
        <div className="bg-accent draw mt-8 h-px w-24" />
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
          <Stat label="Time" value={formatClock(result.durationSec)} />
          <Stat label="Exercises" value={String(result.exercisesCompleted)} />
          <Stat label="Calories" value={String(result.calories)} />
          <Stat label="Streak" value={`${result.streak} day${result.streak === 1 ? "" : "s"}`} />
        </dl>
        <p className="text-muted mt-6 text-sm tabular-nums">
          {result.totalWorkouts} sessions logged · {formatDuration(result.totalMinutes)} total
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/dashboard" className="flex-1">
            <Button className="w-full">Back to training</Button>
          </Link>
          <Link to="/progress" className="flex-1">
            <Button variant="ghost" className="w-full">
              View progress
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return <p className="text-muted p-8">This session has no exercises.</p>;
  }

  const resting = phase === "rest";

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-5">
      <div className="flex items-center justify-between gap-3">
        <Link to="/dashboard" className="text-muted text-sm">
          Close
        </Link>
        <p className="text-sm tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <p className="text-sm tabular-nums">{formatClock(elapsed)}</p>
      </div>
      <div className="bg-line mt-4 h-px">
        <div className="bg-fg h-px" style={{ width: `${(index / Math.max(1, total)) * 100}%` }} />
      </div>
      <p className="text-faint mt-6 text-xs tracking-[0.18em] uppercase">{detail.workout.title}</p>
      <h1 className="display mt-2 text-5xl sm:text-6xl">{resting ? "Rest" : exercise.name}</h1>
      {resting ? (
        <>
          <p className="display text-accent mt-4 text-7xl tabular-nums">{formatClock(remaining ?? 0)}</p>
          <p className="text-muted mt-3 text-lg">{restLabel}</p>
        </>
      ) : exercise.seconds ? (
        <>
          <p className="display mt-4 text-7xl tabular-nums">{formatClock(remaining ?? exercise.seconds)}</p>
          <p className="text-muted mt-3 text-lg">
            Set {setNo} of {exercise.sets}
            {paused ? " · paused" : ""}
          </p>
        </>
      ) : (
        <p className="text-muted mt-3 text-lg">
          Set {setNo} of {exercise.sets} · {prescription(1, exercise.reps, exercise.seconds).replace("1 × ", "")}
        </p>
      )}
      <MediaFrame
        src={exercise.thumbnailUrl}
        videoUrl={exercise.videoUrl}
        alt={exercise.name}
        label={exercise.name}
        className="mt-6 aspect-[4/5] sm:aspect-[16/9]"
      />
      <p className="text-muted mt-4 text-sm">
        {exercise.targetMuscles.join(" · ")} · Rest {exercise.restSeconds}s
      </p>
      {error ? (
        <p className="text-accent mt-4 text-sm" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-auto flex flex-col gap-3 pt-6">
        {confirmEnd ? (
          <div className="border-line border p-4">
            <p className="text-sm">End this session and save what you finished?</p>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => void finish()} disabled={saving}>
                {saving ? "Saving…" : "Save session"}
              </Button>
              <Button variant="ghost" onClick={() => setConfirmEnd(false)}>
                Keep going
              </Button>
            </div>
          </div>
        ) : (
          <Button className="w-full" onClick={resting ? skipRest : completeSet}>
            {resting ? "Skip rest" : setNo < exercise.sets ? "Complete set" : index < total - 1 ? "Complete exercise" : "Finish workout"}
          </Button>
        )}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="ghost" onClick={previous} aria-label="Previous exercise" disabled={index === 0}>
            <SkipBack className="size-4" />
            Prev
          </Button>
          <Button variant="ghost" onClick={pause} aria-label={paused ? "Resume" : "Pause"}>
            {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
            {paused ? "Resume" : "Pause"}
          </Button>
          <Button variant="ghost" onClick={skipExercise} aria-label="Skip exercise" disabled={index >= total - 1}>
            <SkipForward className="size-4" />
            Skip
          </Button>
        </div>
        <button type="button" className="text-muted text-sm" onClick={() => setCues((value) => !value)}>
          {cues ? "Hide cues" : "Form cues"}
        </button>
        {cues ? (
          <div className="border-line space-y-4 border p-4 text-sm">
            <div>
              <p className="text-faint text-xs tracking-[0.16em] uppercase">How</p>
              <ol className="mt-2 list-decimal space-y-1 pl-4">
                {exercise.instructions.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <p className="text-faint text-xs tracking-[0.16em] uppercase">Watch for</p>
              <ul className="text-muted mt-2 space-y-1">
                {exercise.mistakes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p>
              <span className="text-faint">Easier · </span>
              {exercise.beginnerMod}
            </p>
            <p>
              <span className="text-faint">Harder · </span>
              {exercise.advancedMod}
            </p>
          </div>
        ) : null}
        <button type="button" className="text-faint pb-4 text-sm" onClick={() => setConfirmEnd(true)}>
          End session early
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-faint text-xs tracking-[0.16em] uppercase">{label}</dt>
      <dd className="display mt-1 text-4xl tabular-nums">{value}</dd>
    </div>
  );
}
