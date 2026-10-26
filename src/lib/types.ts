export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Program = {
  id: string;
  slug: string;
  title: string;
  description: string;
  goalKey: string;
  difficulty: string;
  durationDays: number;
  equipment: string;
  requires: string;
  coverImage: string | null;
  premium: boolean;
  sortOrder: number;
  workoutCount: number;
};

export type WorkoutSummary = {
  id: string;
  programId: string;
  programTitle: string;
  programSlug: string;
  coverImage: string | null;
  premium: boolean;
  dayIndex: number;
  title: string;
  description: string;
  durationMin: number;
  difficulty: string;
  goal: string;
  equipment: string;
  baseCalories: number;
  freePreview: boolean;
};

export type Exercise = {
  id: string;
  slug: string;
  name: string;
  description: string;
  targetMuscles: string[];
  equipment: string;
  difficulty: string;
  premium: boolean;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  instructions: string[];
  mistakes: string[];
  beginnerMod: string;
  advancedMod: string;
  defaultSets: number;
  defaultReps: number | null;
  defaultSeconds: number | null;
  restSeconds: number;
  caloriesPerMin: number;
  locked: boolean;
};

export type SessionExercise = {
  exerciseId: string;
  name: string;
  description: string;
  targetMuscles: string[];
  equipment: string;
  difficulty: string;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  instructions: string[];
  mistakes: string[];
  beginnerMod: string;
  advancedMod: string;
  sets: number;
  reps: number | null;
  seconds: number | null;
  restSeconds: number;
  position: number;
};

export type Profile = {
  goal: string | null;
  experience: string | null;
  trainingDays: number | null;
  equipment: string[];
  onboardingCompleted: boolean;
  currentProgramId: string | null;
  nextProgramId: string | null;
  planReason: string | null;
  subscriptionStatus: "free" | "pro" | "expired";
  subscriptionPlan: string | null;
  subscriptionExpiresAt: string | null;
};

export type TodayCard = {
  workout: WorkoutSummary;
  locked: boolean;
  exerciseCount: number;
  exercises: SessionExercise[];
};

export type RecentCompletion = {
  id: string;
  title: string;
  programTitle: string;
  completedAt: string;
  durationSec: number;
  calories: number;
  exercisesCompleted: number;
};

export type DashboardData = {
  profile: Profile;
  program: Program | null;
  nextProgram: Program | null;
  today: TodayCard | null;
  alternative: TodayCard | null;
  stats: {
    streak: number;
    weekDone: number;
    weekTarget: number;
    totalWorkouts: number;
    totalMinutes: number;
    calories: number;
    programDone: number;
    programTotal: number;
  };
  recent: RecentCompletion[];
};

export type ProgressData = {
  locked: boolean;
  range: "7d" | "30d" | "90d" | "all";
  buckets: { label: string; workouts: number; minutes: number; calories: number }[];
  totals: { workouts: number; minutes: number; calories: number; streak: number };
  history: RecentCompletion[];
};

export type WorkoutDetail = {
  workout: WorkoutSummary;
  exercises: SessionExercise[];
  locked: boolean;
};

export type CompletionResult = {
  completionId: string;
  durationSec: number;
  calories: number;
  exercisesCompleted: number;
  streak: number;
  totalWorkouts: number;
  totalMinutes: number;
};

export type CheckoutResult = {
  status: "unconfigured";
  message: string;
  intentId: string;
};

export type HomeData = {
  programs: Program[];
  featured: {
    workoutId: string;
    workoutTitle: string;
    programTitle: string;
    exerciseName: string;
    sets: number;
    reps: number | null;
    seconds: number | null;
    coverImage: string | null;
  } | null;
};

