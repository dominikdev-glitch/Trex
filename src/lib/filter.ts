import type { WorkoutSummary } from "@/lib/types";

export type LibrarySearch = {
  q?: string;
  goal?: string;
  difficulty?: string;
  equipment?: string;
  duration?: string;
  saved?: string;
};

export function matchesWorkout(workout: WorkoutSummary, search: LibrarySearch, saved?: Set<string>): boolean {
  if (search.q) {
    const q = search.q.toLowerCase();
    const hay = `${workout.title} ${workout.programTitle} ${workout.description}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  if (search.goal && workout.goal !== search.goal) return false;
  if (search.difficulty && workout.difficulty !== search.difficulty) return false;
  if (search.equipment) {
    const eq = search.equipment;
    if (eq === "none" && workout.equipment !== "None") return false;
    if (eq === "dumbbells" && workout.equipment !== "Dumbbells") return false;
    if (eq === "bands" && workout.equipment !== "Bands") return false;
    if (eq === "bar" && workout.equipment !== "Bar" && workout.equipment !== "Gym") return false;
    if (eq === "bench" && workout.equipment !== "Bench") return false;
    if (eq === "gym" && workout.equipment !== "Gym" && workout.equipment !== "Dumbbells" && workout.equipment !== "Bar") {
      return false;
    }
  }
  if (search.duration === "lt15" && workout.durationMin >= 15) return false;
  if (search.duration === "m15" && (workout.durationMin < 15 || workout.durationMin >= 30)) return false;
  if (search.duration === "m30" && (workout.durationMin < 30 || workout.durationMin >= 45)) return false;
  if (search.duration === "m45" && workout.durationMin < 45) return false;
  if (search.saved === "1" && saved && !saved.has(workout.id)) return false;
  return true;
}
