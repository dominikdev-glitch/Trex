import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import type { RangeKey } from "@/lib/dates";
import type {
  CheckoutResult,
  CompletionResult,
  DashboardData,
  Exercise,
  Profile,
  ProgressData,
  WorkoutDetail,
} from "@/lib/types";

function tzOf(input: unknown): number {
  const raw =
    input && typeof input === "object" ? (input as { tzOffsetMin?: unknown }).tzOffsetMin : input;
  const n = typeof raw === "number" ? raw : Number(raw ?? 0);
  if (!Number.isFinite(n)) return 0;
  return Math.max(-16 * 60, Math.min(16 * 60, Math.trunc(n)));
}

function parseId(input: unknown): string {
  const value =
    typeof input === "string"
      ? input
      : input && typeof input === "object" && "id" in input
        ? String((input as { id: unknown }).id ?? "")
        : "";
  const id = value.trim();
  if (!/^[a-z0-9-]{1,80}$/.test(id)) throw new Error("Invalid id.");
  return id;
}

export const getProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Profile> => {
    const { readProfile } = await import("./training-queries.server");
    return readProfile(context.userId);
  });

export const saveOnboarding = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => input)
  .handler(async ({ context, data }): Promise<Profile> => {
    const { parsePlanInput, savePlan } = await import("./training-queries.server");
    return savePlan(context.userId, parsePlanInput(data), true);
  });

export const updatePreferences = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => input)
  .handler(async ({ context, data }): Promise<Profile> => {
    const { parsePlanInput, savePlan } = await import("./training-queries.server");
    return savePlan(context.userId, parsePlanInput(data), false);
  });

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((input: unknown) => ({ tzOffsetMin: tzOf(input) }))
  .handler(async ({ context, data }): Promise<DashboardData> => {
    const { getDashboard: load } = await import("./training-queries.server");
    return load(context.userId, data.tzOffsetMin);
  });

const RANGES = new Set<RangeKey>(["7d", "30d", "90d", "all"]);

export const getProgress = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const raw = input && typeof input === "object" ? (input as { range?: unknown; tzOffsetMin?: unknown }) : {};
    const range = RANGES.has(raw.range as RangeKey) ? (raw.range as RangeKey) : "7d";
    return { range, tzOffsetMin: tzOf(raw) };
  })
  .handler(async ({ context, data }): Promise<ProgressData> => {
    const { getProgress: load } = await import("./training-queries.server");
    return load(context.userId, data.range, data.tzOffsetMin);
  });

export const getWorkoutSession = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(parseId)
  .handler(async ({ context, data }): Promise<WorkoutDetail | null> => {
    const { getWorkoutSession: load } = await import("./training-queries.server");
    return load(context.userId, data);
  });

export const completeWorkout = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    if (!input || typeof input !== "object") throw new Error("Invalid session.");
    const raw = input as Record<string, unknown>;
    const workoutId = parseId(raw.workoutId);
    const durationSec = Number(raw.durationSec);
    const exercisesCompleted = Number(raw.exercisesCompleted);
    if (!Number.isFinite(durationSec) || !Number.isFinite(exercisesCompleted)) {
      throw new Error("Invalid session.");
    }
    return {
      workoutId,
      durationSec,
      exercisesCompleted,
      tzOffsetMin: tzOf(raw),
    };
  })
  .handler(async ({ context, data }): Promise<CompletionResult> => {
    const { completeWorkout: save } = await import("./training-queries.server");
    return save(context.userId, data);
  });

export const listBookmarks = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<string[]> => {
    const { listBookmarkIds } = await import("./training-queries.server");
    return listBookmarkIds(context.userId);
  });

export const toggleBookmark = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(parseId)
  .handler(async ({ context, data }): Promise<{ bookmarked: boolean }> => {
    const { toggleBookmark: toggle } = await import("./training-queries.server");
    return toggle(context.userId, data);
  });

export const startCheckout = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    const plan =
      input && typeof input === "object" ? String((input as { plan?: unknown }).plan ?? "") : "";
    if (plan !== "pro-monthly") throw new Error("Unknown plan.");
    return { plan };
  })
  .handler(async ({ context, data }): Promise<CheckoutResult> => {
    const { startCheckout: begin } = await import("./training-queries.server");
    return begin(context.userId, data.plan);
  });

export const getExerciseForUser = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(parseId)
  .handler(async ({ context, data }): Promise<Exercise | null> => {
    const { getExerciseById, readProfile } = await import("./training-queries.server");
    const profile = await readProfile(context.userId);
    return getExerciseById(data, profile.subscriptionStatus === "pro");
  });
