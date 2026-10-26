import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-Bcer-OEV.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.functions-B2c_icbS.js
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
var getProfile_createServerFn_handler = createServerRpc({
	id: "3f0529ad0d1bf392f72fdd7bc6018520fe7a5f3d15dfd89bd4ea20a07089c3c1",
	name: "getProfile",
	filename: "src/lib/account.functions.ts"
}, (opts) => getProfile.__executeServer(opts));
var getProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getProfile_createServerFn_handler, async ({ context }) => {
	const { readProfile } = await import("./training-queries.server-DcbqVnRe.mjs");
	return readProfile(context.userId);
});
var saveOnboarding_createServerFn_handler = createServerRpc({
	id: "a4c819c49c2498eef117eb7d74793b73fb78593e418b94767168c740cb0fb40f",
	name: "saveOnboarding",
	filename: "src/lib/account.functions.ts"
}, (opts) => saveOnboarding.__executeServer(opts));
var saveOnboarding = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(saveOnboarding_createServerFn_handler, async ({ context, data }) => {
	const { parsePlanInput, savePlan } = await import("./training-queries.server-DcbqVnRe.mjs");
	return savePlan(context.userId, parsePlanInput(data), true);
});
var updatePreferences_createServerFn_handler = createServerRpc({
	id: "7a57d3268e768b21af657a2636907d8d2b863cce352a559f39a16b586212471c",
	name: "updatePreferences",
	filename: "src/lib/account.functions.ts"
}, (opts) => updatePreferences.__executeServer(opts));
var updatePreferences = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(updatePreferences_createServerFn_handler, async ({ context, data }) => {
	const { parsePlanInput, savePlan } = await import("./training-queries.server-DcbqVnRe.mjs");
	return savePlan(context.userId, parsePlanInput(data), false);
});
var getDashboard_createServerFn_handler = createServerRpc({
	id: "06d0758a331a0d82f205d8adce0db3301b4fa2f12a86a2eeefac8fcc12a856ca",
	name: "getDashboard",
	filename: "src/lib/account.functions.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => ({ tzOffsetMin: tzOf(input) })).handler(getDashboard_createServerFn_handler, async ({ context, data }) => {
	const { getDashboard: load } = await import("./training-queries.server-DcbqVnRe.mjs");
	return load(context.userId, data.tzOffsetMin);
});
var RANGES = /* @__PURE__ */ new Set([
	"7d",
	"30d",
	"90d",
	"all"
]);
var getProgress_createServerFn_handler = createServerRpc({
	id: "321e82b6ffdd7720a10e822731c5e4bd9cdb11cf7c9ebc9becb9c7efd7cd7ab7",
	name: "getProgress",
	filename: "src/lib/account.functions.ts"
}, (opts) => getProgress.__executeServer(opts));
var getProgress = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => {
	const raw = input && typeof input === "object" ? input : {};
	return {
		range: RANGES.has(raw.range) ? raw.range : "7d",
		tzOffsetMin: tzOf(raw)
	};
}).handler(getProgress_createServerFn_handler, async ({ context, data }) => {
	const { getProgress: load } = await import("./training-queries.server-DcbqVnRe.mjs");
	return load(context.userId, data.range, data.tzOffsetMin);
});
var getWorkoutSession_createServerFn_handler = createServerRpc({
	id: "d710d3e58f580c62aed9007d93ff72262f52f26a9f4c0e400d3a23c23cbf6f9c",
	name: "getWorkoutSession",
	filename: "src/lib/account.functions.ts"
}, (opts) => getWorkoutSession.__executeServer(opts));
var getWorkoutSession = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(parseId).handler(getWorkoutSession_createServerFn_handler, async ({ context, data }) => {
	const { getWorkoutSession: load } = await import("./training-queries.server-DcbqVnRe.mjs");
	return load(context.userId, data);
});
var completeWorkout_createServerFn_handler = createServerRpc({
	id: "ec4cc9308c0fa0843331a101e621ae98d65e2326adf2064d61baa9919a034bc9",
	name: "completeWorkout",
	filename: "src/lib/account.functions.ts"
}, (opts) => completeWorkout.__executeServer(opts));
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
}).handler(completeWorkout_createServerFn_handler, async ({ context, data }) => {
	const { completeWorkout: save } = await import("./training-queries.server-DcbqVnRe.mjs");
	return save(context.userId, data);
});
var listBookmarks_createServerFn_handler = createServerRpc({
	id: "7b482b2e91921677e4cf5dea2ea0e94d1f9485eaf1bb4f5ab204d8b204edbc1a",
	name: "listBookmarks",
	filename: "src/lib/account.functions.ts"
}, (opts) => listBookmarks.__executeServer(opts));
var listBookmarks = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listBookmarks_createServerFn_handler, async ({ context }) => {
	const { listBookmarkIds } = await import("./training-queries.server-DcbqVnRe.mjs");
	return listBookmarkIds(context.userId);
});
var toggleBookmark_createServerFn_handler = createServerRpc({
	id: "4ace9d499b45ed09418efcbb60eb66dd2ab5bdb8bf4c375ab9380cda4e8880d9",
	name: "toggleBookmark",
	filename: "src/lib/account.functions.ts"
}, (opts) => toggleBookmark.__executeServer(opts));
var toggleBookmark = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(parseId).handler(toggleBookmark_createServerFn_handler, async ({ context, data }) => {
	const { toggleBookmark: toggle } = await import("./training-queries.server-DcbqVnRe.mjs");
	return toggle(context.userId, data);
});
var startCheckout_createServerFn_handler = createServerRpc({
	id: "60c7dcfe1450e2743599df1a67d997fda9aaa14b69e96323aa59d2c2b482d820",
	name: "startCheckout",
	filename: "src/lib/account.functions.ts"
}, (opts) => startCheckout.__executeServer(opts));
var startCheckout = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const plan = input && typeof input === "object" ? String(input.plan ?? "") : "";
	if (plan !== "pro-monthly") throw new Error("Unknown plan.");
	return { plan };
}).handler(startCheckout_createServerFn_handler, async ({ context, data }) => {
	const { startCheckout: begin } = await import("./training-queries.server-DcbqVnRe.mjs");
	return begin(context.userId, data.plan);
});
var getExerciseForUser_createServerFn_handler = createServerRpc({
	id: "276de1bd7e7ab03507673bb971763ba9df68c4f05498ae1c5aa16ad0842e06db",
	name: "getExerciseForUser",
	filename: "src/lib/account.functions.ts"
}, (opts) => getExerciseForUser.__executeServer(opts));
var getExerciseForUser = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(parseId).handler(getExerciseForUser_createServerFn_handler, async ({ context, data }) => {
	const { getExerciseById, readProfile } = await import("./training-queries.server-DcbqVnRe.mjs");
	return getExerciseById(data, (await readProfile(context.userId)).subscriptionStatus === "pro");
});
//#endregion
export { completeWorkout_createServerFn_handler, getDashboard_createServerFn_handler, getExerciseForUser_createServerFn_handler, getProfile_createServerFn_handler, getProgress_createServerFn_handler, getWorkoutSession_createServerFn_handler, listBookmarks_createServerFn_handler, saveOnboarding_createServerFn_handler, startCheckout_createServerFn_handler, toggleBookmark_createServerFn_handler, updatePreferences_createServerFn_handler };
