import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-C-qLgrbr.js
function parseId(input) {
	const id = typeof input === "string" ? input.trim() : "";
	if (!/^[a-z0-9-]{1,80}$/.test(id)) throw new Error("Invalid id.");
	return id;
}
var getHome_createServerFn_handler = createServerRpc({
	id: "76e2261559e54c80a492b4a527d1a4de758e4665b4feec2e685f000522078484",
	name: "getHome",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getHome.__executeServer(opts));
var getHome = createServerFn({ method: "GET" }).handler(getHome_createServerFn_handler, async () => {
	const { getHomeData } = await import("./training-queries.server-DcbqVnRe.mjs");
	return getHomeData();
});
var listWorkouts_createServerFn_handler = createServerRpc({
	id: "5ecbde383862d2acb8f71051b0cb3514ab675a1ebac47c9d9e0fe8b23f4192cd",
	name: "listWorkouts",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listWorkouts.__executeServer(opts));
var listWorkouts = createServerFn({ method: "GET" }).handler(listWorkouts_createServerFn_handler, async () => {
	const { listWorkoutSummaries } = await import("./training-queries.server-DcbqVnRe.mjs");
	return listWorkoutSummaries();
});
var getProgram_createServerFn_handler = createServerRpc({
	id: "79f1520f211b30c588c6645677362ac9a1f250c233a6810fb572d9f12b5b5195",
	name: "getProgram",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getProgram.__executeServer(opts));
var getProgram = createServerFn({ method: "GET" }).validator(parseId).handler(getProgram_createServerFn_handler, async ({ data }) => {
	const { getProgramBundle } = await import("./training-queries.server-DcbqVnRe.mjs");
	return getProgramBundle(data);
});
var getWorkout_createServerFn_handler = createServerRpc({
	id: "292a568e9017fc4dd5f2184a6ff71fbe8e94ef324df027c714c262588de8f65e",
	name: "getWorkout",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getWorkout.__executeServer(opts));
var getWorkout = createServerFn({ method: "GET" }).validator(parseId).handler(getWorkout_createServerFn_handler, async ({ data }) => {
	const { getWorkoutPublic } = await import("./training-queries.server-DcbqVnRe.mjs");
	return getWorkoutPublic(data);
});
var getExercise_createServerFn_handler = createServerRpc({
	id: "12b4c24eeb514dff6bc8a52cd48c3b932ef92c27aaa03fa037efb2c997d6bc99",
	name: "getExercise",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getExercise.__executeServer(opts));
var getExercise = createServerFn({ method: "GET" }).validator(parseId).handler(getExercise_createServerFn_handler, async ({ data }) => {
	const { getExerciseById } = await import("./training-queries.server-DcbqVnRe.mjs");
	return getExerciseById(data, false);
});
//#endregion
export { getExercise_createServerFn_handler, getHome_createServerFn_handler, getProgram_createServerFn_handler, getWorkout_createServerFn_handler, listWorkouts_createServerFn_handler };
