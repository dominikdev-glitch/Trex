import { r as createServerFn } from "./ssr.mjs";
import { s as createSsrRpc } from "./ui-BmWTPcea.mjs";
import { t as authMiddleware } from "./middleware-Bcer-OEV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.functions-BpvVhRMw.js
function tzOf(input) {
	const raw = input && typeof input === "object" ? input.tzOffsetMin : input;
	const n = typeof raw === "number" ? raw : Number(raw ?? 0);
	if (!Number.isFinite(n)) return 0;
	return Math.max(-960, Math.min(960, Math.trunc(n)));
}
function parseId(input) {
	const id = (typeof input === "string" ? input : input && typeof input === "object" && "id" in input ? String(input.id ?? "") : "").trim();
	if (!/^[a-z0-9-]{1,80}$/.test(id)) throw new Error("Invalid id.");
	return id;
}
var getProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("3f0529ad0d1bf392f72fdd7bc6018520fe7a5f3d15dfd89bd4ea20a07089c3c1"));
var saveOnboarding = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("a4c819c49c2498eef117eb7d74793b73fb78593e418b94767168c740cb0fb40f"));
var updatePreferences = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("7a57d3268e768b21af657a2636907d8d2b863cce352a559f39a16b586212471c"));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => ({ tzOffsetMin: tzOf(input) })).handler(createSsrRpc("06d0758a331a0d82f205d8adce0db3301b4fa2f12a86a2eeefac8fcc12a856ca"));
var RANGES = /* @__PURE__ */ new Set([
	"7d",
	"30d",
	"90d",
	"all"
]);
var getProgress = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => {
	const raw = input && typeof input === "object" ? input : {};
	return {
		range: RANGES.has(raw.range) ? raw.range : "7d",
		tzOffsetMin: tzOf(raw)
	};
}).handler(createSsrRpc("321e82b6ffdd7720a10e822731c5e4bd9cdb11cf7c9ebc9becb9c7efd7cd7ab7"));
var getWorkoutSession = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(parseId).handler(createSsrRpc("d710d3e58f580c62aed9007d93ff72262f52f26a9f4c0e400d3a23c23cbf6f9c"));
var completeWorkout = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!input || typeof input !== "object") throw new Error("Invalid session.");
	const raw = input;
	const workoutId = parseId(raw.workoutId);
	const durationSec = Number(raw.durationSec);
	const exercisesCompleted = Number(raw.exercisesCompleted);
	if (!Number.isFinite(durationSec) || !Number.isFinite(exercisesCompleted)) throw new Error("Invalid session.");
	return {
		workoutId,
		durationSec,
		exercisesCompleted,
		tzOffsetMin: tzOf(raw)
	};
}).handler(createSsrRpc("ec4cc9308c0fa0843331a101e621ae98d65e2326adf2064d61baa9919a034bc9"));
var listBookmarks = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7b482b2e91921677e4cf5dea2ea0e94d1f9485eaf1bb4f5ab204d8b204edbc1a"));
var toggleBookmark = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(parseId).handler(createSsrRpc("4ace9d499b45ed09418efcbb60eb66dd2ab5bdb8bf4c375ab9380cda4e8880d9"));
var startCheckout = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const plan = input && typeof input === "object" ? String(input.plan ?? "") : "";
	if (plan !== "pro-monthly") throw new Error("Unknown plan.");
	return { plan };
}).handler(createSsrRpc("60c7dcfe1450e2743599df1a67d997fda9aaa14b69e96323aa59d2c2b482d820"));
var getExerciseForUser = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(parseId).handler(createSsrRpc("276de1bd7e7ab03507673bb971763ba9df68c4f05498ae1c5aa16ad0842e06db"));
//#endregion
export { getProgress as a, saveOnboarding as c, updatePreferences as d, getProfile as i, startCheckout as l, getDashboard as n, getWorkoutSession as o, getExerciseForUser as r, listBookmarks as s, completeWorkout as t, toggleBookmark as u };
