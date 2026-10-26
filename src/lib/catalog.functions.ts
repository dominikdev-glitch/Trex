import { createServerFn } from "@tanstack/react-start";
import type { Exercise, HomeData, Program, WorkoutDetail, WorkoutSummary } from "@/lib/types";

function parseId(input: unknown): string {
  const id = typeof input === "string" ? input.trim() : "";
  if (!/^[a-z0-9-]{1,80}$/.test(id)) throw new Error("Invalid id.");
  return id;
}

export const getHome = createServerFn({ method: "GET" }).handler(async (): Promise<HomeData> => {
  const { getHomeData } = await import("./training-queries.server");
  return getHomeData();
});

export const listWorkouts = createServerFn({ method: "GET" }).handler(async (): Promise<WorkoutSummary[]> => {
  const { listWorkoutSummaries } = await import("./training-queries.server");
  return listWorkoutSummaries();
});

export const getProgram = createServerFn({ method: "GET" })
  .validator(parseId)
  .handler(async ({ data }): Promise<{ program: Program; workouts: WorkoutSummary[] } | null> => {
    const { getProgramBundle } = await import("./training-queries.server");
    return getProgramBundle(data);
  });

export const getWorkout = createServerFn({ method: "GET" })
  .validator(parseId)
  .handler(async ({ data }): Promise<WorkoutDetail | null> => {
    const { getWorkoutPublic } = await import("./training-queries.server");
    return getWorkoutPublic(data);
  });

export const getExercise = createServerFn({ method: "GET" })
  .validator(parseId)
  .handler(async ({ data }): Promise<Exercise | null> => {
    const { getExerciseById } = await import("./training-queries.server");
    return getExerciseById(data, false);
  });
