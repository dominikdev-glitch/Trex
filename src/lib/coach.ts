/** Short motivational lines for the workout player (Web Speech). */

const START = ["Let's go.", "Begin.", "Start now.", "Work."];
const MID = ["Keep going.", "Come on.", "Push.", "Stay with it.", "Don't stop."];
const FINISH_SET = ["That's one.", "Rest.", "Good. Recover."];
const REST_START = ["Rest. Breathe.", "Recover.", "Shake it out."];
const REST_READY = ["Get ready.", "Almost time.", "Next set."];
const LAST_SET = ["Last set. Empty it.", "Final set. Go hard.", "Finish strong."];

function pick(lines: string[]) {
  return lines[Math.floor(Math.random() * lines.length)] ?? lines[0] ?? "";
}

export type CoachCue = "start" | "mid" | "finish-set" | "rest-start" | "rest-ready" | "last-set";

export function coachLine(cue: CoachCue): string {
  switch (cue) {
    case "start":
      return pick(START);
    case "mid":
      return pick(MID);
    case "finish-set":
      return pick(FINISH_SET);
    case "rest-start":
      return pick(REST_START);
    case "rest-ready":
      return pick(REST_READY);
    case "last-set":
      return pick(LAST_SET);
    default:
      return "";
  }
}

export function speakCoach(line: string, enabled: boolean) {
  if (!enabled || typeof window === "undefined" || !window.speechSynthesis || !line) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(line);
    utterance.rate = 1.05;
    utterance.pitch = 0.95;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  } catch {
    /* speech is optional */
  }
}
