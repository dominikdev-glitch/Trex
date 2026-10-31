export type PlanProgram = {
  id: string;
  title: string;
  goalKey: string;
  requires: string;
  difficulty: string;
};

export type PlanChoice = {
  currentId: string;
  nextId: string | null;
  reason: string;
};

const FOUNDATION = "seven-day-start";

function hasEquipment(equipment: string[], requires: string): boolean {
  if (requires === "none") return true;
  if (equipment.includes("gym")) return true;
  return equipment.includes(requires);
}

export function choosePlan(
  programs: PlanProgram[],
  input: { goal: string; experience: string; equipment: string[] },
): PlanChoice {
  const goalKey = input.goal === "endurance" ? "fitness" : input.goal;
  const matching = programs.filter((program) => program.goalKey === goalKey);
  let chosen =
    matching.find((program) => hasEquipment(input.equipment, program.requires)) ??
    matching[0] ??
    programs.find((program) => program.id === "full-body-athlete") ??
    programs.find((program) => program.id === FOUNDATION) ??
    programs[0];

  if (chosen && !hasEquipment(input.equipment, chosen.requires)) {
    const fallback =
      programs.find((program) => program.id === "full-body-athlete") ??
      programs.find((program) => program.id === FOUNDATION);
    if (fallback) chosen = fallback;
  }

  let next: PlanProgram | null = null;
  if (
    chosen &&
    input.experience === "beginner" &&
    chosen.difficulty !== "beginner" &&
    chosen.id !== FOUNDATION
  ) {
    const foundation = programs.find((program) => program.id === FOUNDATION);
    if (foundation) {
      next = chosen;
      chosen = foundation;
    }
  }

  const reason = !chosen
    ? "Start with the beginner week."
    : next
      ? `You start with ${chosen.title}. After that week you move to ${next.title}.`
      : `Your plan is ${chosen.title}. Built from your goal and the gear you have.`;

  return {
    currentId: chosen?.id ?? FOUNDATION,
    nextId: next?.id ?? null,
    reason,
  };
}

export function equipmentFits(workoutEquipment: string, owned: string[]): boolean {
  if (workoutEquipment === "None") return true;
  if (owned.includes("gym")) return true;
  if (workoutEquipment === "Dumbbells") return owned.includes("dumbbells");
  if (workoutEquipment === "Bands") return owned.includes("bands");
  if (workoutEquipment === "Bar") return owned.includes("bar");
  if (workoutEquipment === "Bench") return owned.includes("bench") || owned.includes("dumbbells");
  if (workoutEquipment === "Gym") return owned.includes("gym");
  return true;
}
