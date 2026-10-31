import type { AppUser } from "@/lib/auth/use-current-user";

/** First name for greetings. Never blank. */
export function firstName(user: AppUser | null | undefined): string {
  const named = user?.displayName?.trim();
  if (named) {
    const first = named.split(/\s+/)[0];
    if (first) return first;
  }
  const email = user?.primaryEmail?.trim();
  if (email) {
    const local = email.split("@")[0]?.trim();
    if (local) {
      // turn john.doe_01 into John
      const cleaned = local.split(/[._+\-]/)[0] ?? local;
      if (cleaned) return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }
  }
  return "Athlete";
}

const ONBOARD_KEY = "trex.onboarding.done";

export function markOnboardingDone(userId: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${ONBOARD_KEY}.${userId}`, "1");
  } catch {
    /* ignore */
  }
}

export function isOnboardingMarkedDone(userId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(`${ONBOARD_KEY}.${userId}`) === "1";
  } catch {
    return false;
  }
}
