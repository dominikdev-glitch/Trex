export const GOAL_OPTIONS = [
  { id: "lose-fat", label: "Lose fat", detail: "Shorter rest. More total work." },
  { id: "build-muscle", label: "Build muscle", detail: "Harder sets. Dumbbells if you have them." },
  { id: "chest", label: "Build chest", detail: "Pressing volume." },
  { id: "arms", label: "Build arms", detail: "Triceps, biceps, and the presses that feed them." },
  { id: "shoulders", label: "Build shoulders", detail: "Overhead strength at home." },
  { id: "legs", label: "Grow legs", detail: "Squat, lunge, hinge." },
  { id: "abs", label: "Build abs", detail: "Bracing and rotation." },
  { id: "strength", label: "Get stronger", detail: "Slower reps. Fuller rest." },
  { id: "endurance", label: "Improve endurance", detail: "Repeatable conditioning." },
  { id: "fitness", label: "Full-body fitness", detail: "Strength and engine in one plan." },
] as const;

export const EXPERIENCE_OPTIONS = [
  { id: "beginner", label: "Beginner", detail: "New, or coming back after a long break." },
  { id: "intermediate", label: "Intermediate", detail: "You can already finish a hard session." },
  { id: "advanced", label: "Advanced", detail: "You want density, not an introduction." },
] as const;

export const DAY_OPTIONS = [
  { id: "2", label: "2 days", detail: "Enough to stay consistent." },
  { id: "3", label: "3 days", detail: "The default that most people can keep." },
  { id: "4", label: "4 days", detail: "Room for upper and lower emphasis." },
  { id: "5", label: "5 days", detail: "Training is a weekday habit." },
  { id: "6", label: "6+ days", detail: "High frequency. Recovery still counts." },
] as const;

export const EQUIPMENT_OPTIONS = [
  { id: "none", label: "None", detail: "Floor space only." },
  { id: "dumbbells", label: "Dumbbells", detail: "Any pair you can press and row." },
  { id: "bands", label: "Resistance bands", detail: "Rows and pull-aparts." },
  { id: "bar", label: "Pull-up bar", detail: "A bar you can hang from." },
  { id: "bench", label: "Bench", detail: "Or a sturdy chair for dips." },
  { id: "gym", label: "Full home gym", detail: "Dumbbells, a bar, and a bench." },
] as const;

export const GOAL_LABEL: Record<string, string> = {
  "lose-fat": "Fat loss",
  "build-muscle": "Muscle",
  chest: "Chest",
  arms: "Arms",
  shoulders: "Shoulders",
  legs: "Legs",
  abs: "Abs",
  strength: "Strength",
  endurance: "Endurance",
  fitness: "Full body",
  beginner: "Beginner",
};

export const LIBRARY_GOALS = [
  { id: "lose-fat", label: "Fat loss" },
  { id: "build-muscle", label: "Muscle" },
  { id: "chest", label: "Chest" },
  { id: "arms", label: "Arms" },
  { id: "shoulders", label: "Shoulders" },
  { id: "legs", label: "Legs" },
  { id: "abs", label: "Abs" },
  { id: "fitness", label: "Full body" },
  { id: "endurance", label: "Endurance" },
  { id: "strength", label: "Strength" },
  { id: "beginner", label: "Beginner" },
] as const;

export function labelGoal(id: string | null | undefined): string {
  if (!id) return "Not set";
  return GOAL_LABEL[id] ?? id;
}

export function labelLevel(id: string | null | undefined): string {
  if (!id) return "Not set";
  return id.slice(0, 1).toUpperCase() + id.slice(1);
}
