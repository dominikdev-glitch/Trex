import { r as getSql } from "./db-H36oKmb-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/training-queries.server-DcbqVnRe.js
function localToday(offsetMin) {
	return localDate((/* @__PURE__ */ new Date()).toISOString(), offsetMin);
}
function localDate(iso, offsetMin) {
	return (/* @__PURE__ */ new Date(new Date(iso).getTime() - offsetMin * 6e4)).toISOString().slice(0, 10);
}
function addIsoDays(iso, days) {
	const [year, month, day] = iso.split("-").map(Number);
	const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
	date.setUTCDate(date.getUTCDate() + days);
	return date.toISOString().slice(0, 10);
}
function startOfWeek(iso) {
	const [year, month, day] = iso.split("-").map(Number);
	const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
	const weekday = date.getUTCDay();
	const delta = weekday === 0 ? -6 : 1 - weekday;
	date.setUTCDate(date.getUTCDate() + delta);
	return date.toISOString().slice(0, 10);
}
function streakFromDates(dates, today) {
	const set = new Set(dates);
	let cursor = today;
	if (!set.has(cursor)) {
		cursor = addIsoDays(today, -1);
		if (!set.has(cursor)) return 0;
	}
	let count = 0;
	while (set.has(cursor)) {
		count += 1;
		cursor = addIsoDays(cursor, -1);
	}
	return count;
}
var WEEKDAYS = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
function weekday(iso) {
	const [year, month, day] = iso.split("-").map(Number);
	return WEEKDAYS[new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1)).getUTCDay()] ?? "";
}
function buildBuckets(range, rows, offsetMin) {
	const today = localToday(offsetMin);
	const mapped = rows.map((row) => ({
		day: localDate(row.at, offsetMin),
		minutes: Math.round(row.durationSec / 60),
		calories: row.calories
	}));
	if (range === "7d" || range === "30d") {
		const span = range === "7d" ? 7 : 30;
		const buckets = [];
		for (let i = span - 1; i >= 0; i -= 1) {
			const day = addIsoDays(today, -i);
			const hits = mapped.filter((row) => row.day === day);
			buckets.push({
				label: range === "7d" ? weekday(day) : day.slice(5),
				workouts: hits.length,
				minutes: hits.reduce((sum, row) => sum + row.minutes, 0),
				calories: hits.reduce((sum, row) => sum + row.calories, 0)
			});
		}
		return buckets;
	}
	if (range === "90d") {
		const buckets = [];
		for (let i = 12; i >= 0; i -= 1) {
			const end = addIsoDays(today, -i * 7);
			const start = addIsoDays(end, -6);
			const hits = mapped.filter((row) => row.day >= start && row.day <= end);
			buckets.push({
				label: start.slice(5),
				workouts: hits.length,
				minutes: hits.reduce((sum, row) => sum + row.minutes, 0),
				calories: hits.reduce((sum, row) => sum + row.calories, 0)
			});
		}
		return buckets;
	}
	const byMonth = /* @__PURE__ */ new Map();
	for (const row of mapped) {
		const key = row.day.slice(0, 7);
		const bucket = byMonth.get(key) ?? {
			label: key,
			workouts: 0,
			minutes: 0,
			calories: 0
		};
		bucket.workouts += 1;
		bucket.minutes += row.minutes;
		bucket.calories += row.calories;
		byMonth.set(key, bucket);
	}
	return [...byMonth.values()].slice(-12);
}
var FOUNDATION = "seven-day-start";
function hasEquipment(equipment, requires) {
	if (requires === "none") return true;
	if (equipment.includes("gym")) return true;
	return equipment.includes(requires);
}
function choosePlan(programs, input) {
	const goalKey = input.goal === "endurance" ? "fitness" : input.goal;
	const matching = programs.filter((program) => program.goalKey === goalKey);
	let chosen = matching.find((program) => hasEquipment(input.equipment, program.requires)) ?? matching[0] ?? programs.find((program) => program.id === "full-body-athlete") ?? programs.find((program) => program.id === FOUNDATION) ?? programs[0];
	if (chosen && !hasEquipment(input.equipment, chosen.requires)) {
		const fallback = programs.find((program) => program.id === "full-body-athlete") ?? programs.find((program) => program.id === FOUNDATION);
		if (fallback) chosen = fallback;
	}
	let next = null;
	if (chosen && input.experience === "beginner" && chosen.difficulty !== "beginner" && chosen.id !== FOUNDATION) {
		const foundation = programs.find((program) => program.id === FOUNDATION);
		if (foundation) {
			next = chosen;
			chosen = foundation;
		}
	}
	const reason = !chosen ? "7 Day Beginner Start is ready." : next ? `${next.title} matches the goal you picked. The first week is ${chosen.title} so the patterns are solid before that plan.` : `${chosen.title} matches your goal, level, and equipment.`;
	return {
		currentId: chosen?.id ?? FOUNDATION,
		nextId: next?.id ?? null,
		reason
	};
}
function equipmentFits(workoutEquipment, owned) {
	if (workoutEquipment === "None") return true;
	if (owned.includes("gym")) return true;
	if (workoutEquipment === "Dumbbells") return owned.includes("dumbbells");
	if (workoutEquipment === "Bands") return owned.includes("bands");
	if (workoutEquipment === "Bar") return owned.includes("bar");
	if (workoutEquipment === "Bench") return owned.includes("bench") || owned.includes("dumbbells");
	if (workoutEquipment === "Gym") return owned.includes("gym");
	return true;
}
function asBool(value) {
	if (typeof value === "boolean") return value;
	if (typeof value === "number") return value !== 0;
	if (typeof value === "string") return value === "t" || value === "true" || value === "1";
	return false;
}
function asNum(value, fallback = 0) {
	const n = typeof value === "number" ? value : Number(value);
	return Number.isFinite(n) ? n : fallback;
}
function asStr(value) {
	return value == null ? "" : String(value);
}
function asNullable(value) {
	if (value == null || value === "") return null;
	return String(value);
}
function asStrings(value) {
	if (Array.isArray(value)) return value.map(String);
	if (typeof value === "string") try {
		const parsed = JSON.parse(value);
		if (Array.isArray(parsed)) return parsed.map(String);
	} catch {
		return [];
	}
	return [];
}
function asIso(value) {
	if (value == null || value === "") return null;
	if (value instanceof Date) return value.toISOString();
	const text = String(value);
	const date = new Date(text);
	if (Number.isNaN(date.getTime())) return text;
	return date.toISOString();
}
function mapProgram(row) {
	return {
		id: asStr(row.id),
		slug: asStr(row.slug),
		title: asStr(row.title),
		description: asStr(row.description),
		goalKey: asStr(row.goal_key),
		difficulty: asStr(row.difficulty),
		durationDays: asNum(row.duration_days),
		equipment: asStr(row.equipment),
		requires: asStr(row.requires),
		coverImage: asNullable(row.cover_image),
		premium: asBool(row.premium),
		sortOrder: asNum(row.sort_order),
		workoutCount: asNum(row.workout_count)
	};
}
function mapSummary(row) {
	return {
		id: asStr(row.id),
		programId: asStr(row.program_id),
		programTitle: asStr(row.program_title),
		programSlug: asStr(row.program_slug),
		coverImage: asNullable(row.cover_image),
		premium: asBool(row.premium),
		dayIndex: asNum(row.day_index),
		title: asStr(row.title),
		description: asStr(row.description),
		durationMin: asNum(row.duration_min),
		difficulty: asStr(row.difficulty),
		goal: asStr(row.goal),
		equipment: asStr(row.equipment),
		baseCalories: asNum(row.base_calories),
		freePreview: asBool(row.free_preview)
	};
}
function mapSession(row, locked) {
	return {
		exerciseId: asStr(row.exercise_id),
		name: asStr(row.name),
		description: locked ? "" : asStr(row.description),
		targetMuscles: asStrings(row.target_muscles),
		equipment: asStr(row.equipment),
		difficulty: asStr(row.difficulty),
		videoUrl: locked ? null : asNullable(row.video_url),
		thumbnailUrl: asNullable(row.thumbnail_url),
		instructions: locked ? [] : asStrings(row.instructions),
		mistakes: locked ? [] : asStrings(row.mistakes),
		beginnerMod: locked ? "" : asStr(row.beginner_mod),
		advancedMod: locked ? "" : asStr(row.advanced_mod),
		sets: asNum(row.sets),
		reps: row.reps == null ? null : asNum(row.reps),
		seconds: row.seconds == null ? null : asNum(row.seconds),
		restSeconds: asNum(row.rest_seconds),
		position: asNum(row.position)
	};
}
function mapExercise(row, locked) {
	return {
		id: asStr(row.id),
		slug: asStr(row.slug),
		name: asStr(row.name),
		description: asStr(row.description),
		targetMuscles: asStrings(row.target_muscles),
		equipment: asStr(row.equipment),
		difficulty: asStr(row.difficulty),
		premium: asBool(row.premium),
		videoUrl: locked ? null : asNullable(row.video_url),
		thumbnailUrl: asNullable(row.thumbnail_url),
		instructions: locked ? [] : asStrings(row.instructions),
		mistakes: locked ? [] : asStrings(row.mistakes),
		beginnerMod: locked ? "" : asStr(row.beginner_mod),
		advancedMod: locked ? "" : asStr(row.advanced_mod),
		defaultSets: asNum(row.default_sets),
		defaultReps: row.default_reps == null ? null : asNum(row.default_reps),
		defaultSeconds: row.default_seconds == null ? null : asNum(row.default_seconds),
		restSeconds: asNum(row.rest_seconds),
		caloriesPerMin: asNum(row.calories_per_min),
		locked
	};
}
async function programs(sql) {
	return (await sql`
    select p.*, (select count(*) from workouts w where w.program_id = p.id) as workout_count
    from programs p
    order by sort_order asc, title asc
  `).map(mapProgram);
}
async function workoutRows(sql, programId) {
	return (await sql`
    select w.*, p.title as program_title, p.slug as program_slug, p.premium, p.cover_image
    from workouts w
    join programs p on p.id = w.program_id
    where w.program_id = ${programId}
    order by w.day_index asc
  `).map(mapSummary);
}
async function exercisesFor(sql, workoutId, locked) {
	return (await sql`
    select we.exercise_id, we.position, we.sets, we.reps, we.seconds, we.rest_seconds,
           e.name, e.description, e.target_muscles, e.equipment, e.difficulty,
           e.video_url, e.thumbnail_url, e.instructions, e.mistakes, e.beginner_mod, e.advanced_mod
    from workout_exercises we
    join exercises e on e.id = we.exercise_id
    where we.workout_id = ${workoutId}
    order by we.position asc
  `).map((row) => mapSession(row, locked));
}
function effectiveStatus(row) {
	const status = asStr(row.subscription_status);
	if (status === "pro") {
		const exp = asIso(row.subscription_expires_at);
		if (exp && new Date(exp).getTime() <= Date.now()) return "expired";
		return "pro";
	}
	if (status === "expired") return "expired";
	return "free";
}
function mapProfile(row) {
	return {
		goal: asNullable(row.goal),
		experience: asNullable(row.experience),
		trainingDays: row.training_days == null ? null : asNum(row.training_days),
		equipment: asStrings(row.equipment),
		onboardingCompleted: asBool(row.onboarding_completed),
		currentProgramId: asNullable(row.current_program_id),
		nextProgramId: asNullable(row.next_program_id),
		planReason: asNullable(row.plan_reason),
		subscriptionStatus: effectiveStatus(row),
		subscriptionPlan: asNullable(row.subscription_plan),
		subscriptionExpiresAt: asIso(row.subscription_expires_at)
	};
}
async function ensureProfile(sql, userId) {
	await sql`insert into profiles (user_id) values (${userId}) on conflict (user_id) do nothing`;
	const row = (await sql`select * from profiles where user_id = ${userId}`)[0];
	if (!row) throw new Error("Profile could not be created.");
	const profile = mapProfile(row);
	if (asStr(row.subscription_status) === "pro" && profile.subscriptionStatus === "expired") await sql`
      update profiles
      set subscription_status = 'expired', updated_at = now()
      where user_id = ${userId}
    `;
	return profile;
}
async function loadCompletions(sql, userId) {
	return (await sql`
    select c.id, c.workout_id, c.program_id, c.completed_at, c.duration_sec, c.calories, c.exercises_completed,
           w.title, p.title as program_title
    from completions c
    join workouts w on w.id = c.workout_id
    join programs p on p.id = w.program_id
    where c.user_id = ${userId}
    order by c.completed_at desc
    limit 2000
  `).map((row) => ({
		id: asStr(row.id),
		workoutId: asStr(row.workout_id),
		programId: asStr(row.program_id),
		at: asIso(row.completed_at) ?? (/* @__PURE__ */ new Date()).toISOString(),
		durationSec: asNum(row.duration_sec),
		calories: asNum(row.calories),
		exercisesCompleted: asNum(row.exercises_completed),
		title: asStr(row.title),
		programTitle: asStr(row.program_title)
	}));
}
function isPro(profile) {
	return profile.subscriptionStatus === "pro";
}
function unlocked(premium, freePreview, pro) {
	if (!premium || pro) return true;
	return freePreview;
}
function selectSession(list, completedCount, owned, pro) {
	if (list.length === 0) return null;
	const start = completedCount % list.length;
	const natural = list[start];
	if (!natural) return null;
	const open = (workout) => unlocked(workout.premium, workout.freePreview, pro);
	const fits = (workout) => equipmentFits(workout.equipment, owned);
	if (open(natural) && fits(natural)) return {
		workout: natural,
		locked: false
	};
	if (!open(natural)) return {
		workout: natural,
		locked: true
	};
	for (let i = 1; i < list.length; i += 1) {
		const workout = list[(start + i) % list.length];
		if (workout && open(workout) && fits(workout)) return {
			workout,
			locked: false
		};
	}
	return {
		workout: natural,
		locked: !open(natural)
	};
}
async function toCard(sql, picked) {
	const exercises = picked.locked ? [] : await exercisesFor(sql, picked.workout.id, false);
	const countRow = picked.locked ? await sql`select count(*) as c from workout_exercises where workout_id = ${picked.workout.id}` : null;
	return {
		workout: picked.workout,
		locked: picked.locked,
		exerciseCount: picked.locked ? asNum(countRow?.[0]?.c) : exercises.length,
		exercises
	};
}
async function getHomeData() {
	const sql = await getSql();
	const list = await programs(sql);
	const featured = (await sql`
    select w.id, w.title as workout_title, p.title as program_title, p.cover_image,
           e.name as exercise_name, we.sets, we.reps, we.seconds
    from workouts w
    join programs p on p.id = w.program_id
    join workout_exercises we on we.workout_id = w.id and we.position = 1
    join exercises e on e.id = we.exercise_id
    where p.premium = false
    order by p.sort_order asc, w.day_index asc
    limit 1
  `)[0];
	return {
		programs: list,
		featured: featured ? {
			workoutId: asStr(featured.id),
			workoutTitle: asStr(featured.workout_title),
			programTitle: asStr(featured.program_title),
			exerciseName: asStr(featured.exercise_name),
			sets: asNum(featured.sets),
			reps: featured.reps == null ? null : asNum(featured.reps),
			seconds: featured.seconds == null ? null : asNum(featured.seconds),
			coverImage: asNullable(featured.cover_image)
		} : null
	};
}
async function listWorkoutSummaries() {
	return (await (await getSql())`
    select w.*, p.title as program_title, p.slug as program_slug, p.premium, p.cover_image
    from workouts w
    join programs p on p.id = w.program_id
    order by p.sort_order asc, w.day_index asc
  `).map(mapSummary);
}
async function getProgramBundle(id) {
	const sql = await getSql();
	const row = (await sql`
    select p.*, (select count(*) from workouts w where w.program_id = p.id) as workout_count
    from programs p
    where p.slug = ${id} or p.id = ${id}
    limit 1
  `)[0];
	if (!row) return null;
	const program = mapProgram(row);
	return {
		program,
		workouts: await workoutRows(sql, program.id)
	};
}
async function loadWorkoutRow(sql, id) {
	const rows = await sql`
    select w.*, p.title as program_title, p.slug as program_slug, p.premium, p.cover_image
    from workouts w
    join programs p on p.id = w.program_id
    where w.id = ${id}
    limit 1
  `;
	return rows[0] ? mapSummary(rows[0]) : null;
}
async function getWorkoutPublic(id) {
	const sql = await getSql();
	const workout = await loadWorkoutRow(sql, id);
	if (!workout) return null;
	const locked = workout.premium && !workout.freePreview;
	return {
		workout,
		locked,
		exercises: await exercisesFor(sql, workout.id, locked)
	};
}
async function getExerciseById(id, pro) {
	const row = (await (await getSql())`select * from exercises where id = ${id} or slug = ${id} limit 1`)[0];
	if (!row) return null;
	return mapExercise(row, asBool(row.premium) && !pro);
}
async function readProfile(userId) {
	return ensureProfile(await getSql(), userId);
}
var GOAL_IDS = /* @__PURE__ */ new Set([
	"lose-fat",
	"build-muscle",
	"chest",
	"arms",
	"shoulders",
	"legs",
	"abs",
	"strength",
	"endurance",
	"fitness"
]);
var LEVELS = /* @__PURE__ */ new Set([
	"beginner",
	"intermediate",
	"advanced"
]);
var EQUIP = /* @__PURE__ */ new Set([
	"none",
	"dumbbells",
	"bands",
	"bar",
	"bench",
	"gym"
]);
function parsePlanInput(input) {
	if (!input || typeof input !== "object") throw new Error("Invalid plan.");
	const raw = input;
	const goal = asStr(raw.goal);
	const experience = asStr(raw.experience);
	const trainingDays = asNum(raw.trainingDays, 0);
	if (!GOAL_IDS.has(goal)) throw new Error("Choose a goal.");
	if (!LEVELS.has(experience)) throw new Error("Choose your experience.");
	if (![
		2,
		3,
		4,
		5,
		6
	].includes(trainingDays)) throw new Error("Choose training days.");
	const equipment = Array.isArray(raw.equipment) ? [...new Set(raw.equipment.map(String).filter((item) => EQUIP.has(item)))] : [];
	return {
		goal,
		experience,
		trainingDays,
		equipment: equipment.length > 0 ? equipment : ["none"]
	};
}
async function savePlan(userId, input, complete) {
	const sql = await getSql();
	const existing = await ensureProfile(sql, userId);
	const choice = choosePlan(await programs(sql), input);
	const done = complete ? true : existing.onboardingCompleted;
	await sql`
    update profiles
    set goal = ${input.goal},
        experience = ${input.experience},
        training_days = ${input.trainingDays},
        equipment = ${JSON.stringify(input.equipment)},
        onboarding_completed = ${done},
        current_program_id = ${choice.currentId},
        next_program_id = ${choice.nextId},
        plan_reason = ${choice.reason},
        updated_at = now()
    where user_id = ${userId}
  `;
	return ensureProfile(sql, userId);
}
async function getDashboard(userId, tzOffsetMin) {
	const sql = await getSql();
	const profile = await ensureProfile(sql, userId);
	const list = await programs(sql);
	const byId = new Map(list.map((program) => [program.id, program]));
	const program = profile.currentProgramId && byId.get(profile.currentProgramId) || null;
	const nextProgram = profile.nextProgramId && byId.get(profile.nextProgramId) || null;
	const completions = await loadCompletions(sql, userId);
	const todayIso = localToday(tzOffsetMin);
	const dates = completions.map((row) => localDate(row.at, tzOffsetMin));
	const weekStart = startOfWeek(todayIso);
	const weekDone = completions.filter((row) => localDate(row.at, tzOffsetMin) >= weekStart).length;
	const totals = completions.reduce((sum, row) => {
		sum.workouts += 1;
		sum.seconds += row.durationSec;
		sum.calories += row.calories;
		return sum;
	}, {
		workouts: 0,
		seconds: 0,
		calories: 0
	});
	let today = null;
	let alternative = null;
	let programDone = 0;
	const programTotal = program?.workoutCount ?? 0;
	if (program) {
		const sessions = await workoutRows(sql, program.id);
		const inProgram = completions.filter((row) => row.programId === program.id);
		programDone = new Set(inProgram.map((row) => row.workoutId)).size;
		const picked = selectSession(sessions, inProgram.length, profile.equipment, isPro(profile));
		if (picked) {
			today = await toCard(sql, picked);
			if (picked.locked) {
				const foundation = list.find((item) => item.id === "seven-day-start");
				if (foundation) {
					const freeSessions = await workoutRows(sql, foundation.id);
					const freeCount = completions.filter((row) => row.programId === foundation.id).length;
					const freePick = selectSession(freeSessions, freeCount, profile.equipment, true);
					if (freePick) alternative = await toCard(sql, freePick);
				}
			}
		}
	}
	return {
		profile,
		program,
		nextProgram,
		today,
		alternative,
		stats: {
			streak: streakFromDates(dates, todayIso),
			weekDone,
			weekTarget: profile.trainingDays ?? 3,
			totalWorkouts: totals.workouts,
			totalMinutes: Math.round(totals.seconds / 60),
			calories: totals.calories,
			programDone,
			programTotal
		},
		recent: completions.slice(0, 5).map(toRecent)
	};
}
function toRecent(row) {
	return {
		id: row.id,
		title: row.title,
		programTitle: row.programTitle,
		completedAt: row.at,
		durationSec: row.durationSec,
		calories: row.calories,
		exercisesCompleted: row.exercisesCompleted
	};
}
async function getProgress(userId, range, tzOffsetMin) {
	const sql = await getSql();
	const pro = isPro(await ensureProfile(sql, userId));
	if (!pro && range !== "7d") return {
		locked: true,
		range,
		buckets: [],
		totals: {
			workouts: 0,
			minutes: 0,
			calories: 0,
			streak: 0
		},
		history: []
	};
	const completions = await loadCompletions(sql, userId);
	const today = localToday(tzOffsetMin);
	const dates = completions.map((row) => localDate(row.at, tzOffsetMin));
	const windowStart = range === "all" ? null : range === "7d" ? addDaysSafe(today, -6) : range === "30d" ? addDaysSafe(today, -29) : addDaysSafe(today, -89);
	const inRange = completions.filter((row) => {
		if (!windowStart) return true;
		return localDate(row.at, tzOffsetMin) >= windowStart;
	});
	const buckets = buildBuckets(range, inRange.map((row) => ({
		at: row.at,
		durationSec: row.durationSec,
		calories: row.calories
	})), tzOffsetMin);
	const historyLimit = pro ? 100 : 8;
	return {
		locked: false,
		range,
		buckets,
		totals: {
			workouts: inRange.length,
			minutes: Math.round(inRange.reduce((sum, row) => sum + row.durationSec, 0) / 60),
			calories: inRange.reduce((sum, row) => sum + row.calories, 0),
			streak: streakFromDates(dates, today)
		},
		history: inRange.slice(0, historyLimit).map(toRecent)
	};
}
function addDaysSafe(iso, days) {
	const [year, month, day] = iso.split("-").map(Number);
	const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
	date.setUTCDate(date.getUTCDate() + days);
	return date.toISOString().slice(0, 10);
}
async function getWorkoutSession(userId, id) {
	const sql = await getSql();
	const profile = await ensureProfile(sql, userId);
	const workout = await loadWorkoutRow(sql, id);
	if (!workout) return null;
	const locked = !unlocked(workout.premium, workout.freePreview, isPro(profile));
	return {
		workout,
		locked,
		exercises: await exercisesFor(sql, workout.id, locked)
	};
}
async function completeWorkout(userId, input) {
	const sql = await getSql();
	const profile = await ensureProfile(sql, userId);
	const workout = await loadWorkoutRow(sql, input.workoutId);
	if (!workout) throw new Error("That session does not exist.");
	if (!unlocked(workout.premium, workout.freePreview, isPro(profile))) throw new Error("This session is on TREX Pro.");
	const countRows = await sql`select count(*) as c from workout_exercises where workout_id = ${workout.id}`;
	const exerciseCount = Math.max(1, asNum(countRows[0]?.c, 1));
	const done = Math.min(exerciseCount, Math.max(0, Math.floor(input.exercisesCompleted)));
	if (done < 1) throw new Error("Complete at least one exercise before ending the session.");
	const durationSec = Math.min(10800, Math.max(30, Math.floor(input.durationSec)));
	const expected = Math.max(60, workout.durationMin * 60);
	const ratio = Math.min(1, done / exerciseCount);
	const timeFactor = Math.min(1.2, Math.max(.45, durationSec / expected));
	const calories = Math.max(1, Math.round(workout.baseCalories * ratio * timeFactor));
	const id = crypto.randomUUID();
	await sql`
    insert into completions (id, user_id, workout_id, program_id, duration_sec, calories, exercises_completed)
    values (${id}, ${userId}, ${workout.id}, ${workout.programId}, ${durationSec}, ${calories}, ${done})
  `;
	const completions = await loadCompletions(sql, userId);
	const today = localToday(input.tzOffsetMin);
	const dates = completions.map((row) => localDate(row.at, input.tzOffsetMin));
	const seconds = completions.reduce((sum, row) => sum + row.durationSec, 0);
	return {
		completionId: id,
		durationSec,
		calories,
		exercisesCompleted: done,
		streak: streakFromDates(dates, today),
		totalWorkouts: completions.length,
		totalMinutes: Math.round(seconds / 60)
	};
}
async function listBookmarkIds(userId) {
	return (await (await getSql())`select workout_id from bookmarks where user_id = ${userId} order by created_at desc`).map((row) => asStr(row.workout_id));
}
async function toggleBookmark(userId, workoutId) {
	const sql = await getSql();
	if (!await loadWorkoutRow(sql, workoutId)) throw new Error("That session does not exist.");
	if ((await sql`
    select workout_id from bookmarks where user_id = ${userId} and workout_id = ${workoutId}
  `).length > 0) {
		await sql`delete from bookmarks where user_id = ${userId} and workout_id = ${workoutId}`;
		return { bookmarked: false };
	}
	await sql`
    insert into bookmarks (user_id, workout_id) values (${userId}, ${workoutId})
    on conflict (user_id, workout_id) do nothing
  `;
	return { bookmarked: true };
}
async function startCheckout(userId, plan) {
	if (plan !== "pro-monthly") throw new Error("Unknown plan.");
	const sql = await getSql();
	await ensureProfile(sql, userId);
	const intentId = crypto.randomUUID();
	await sql`
    insert into checkout_intents (id, user_id, plan, status)
    values (${intentId}, ${userId}, ${plan}, 'awaiting_provider')
  `;
	return {
		status: "unconfigured",
		intentId,
		message: process.env.BILLING_PROVIDER === "stripe" && Boolean(process.env.STRIPE_SECRET_KEY) ? "Stripe is named in the server environment, but checkout session creation is not wired yet. Nothing was charged." : "No payment provider is connected. Your upgrade request was saved. TREX stays on Free until a real checkout can take payment."
	};
}
async function applySubscription(input) {
	const sql = await getSql();
	const status = input.status === "pro" || input.status === "expired" || input.status === "free" ? input.status : "free";
	await sql`insert into profiles (user_id) values (${input.userId}) on conflict (user_id) do nothing`;
	await sql`
    update profiles
    set subscription_status = ${status},
        subscription_plan = ${input.plan},
        subscription_expires_at = ${input.expiresAt},
        updated_at = now()
    where user_id = ${input.userId}
  `;
}
//#endregion
export { applySubscription, completeWorkout, getDashboard, getExerciseById, getHomeData, getProgramBundle, getProgress, getWorkoutPublic, getWorkoutSession, listBookmarkIds, listWorkoutSummaries, parsePlanInput, readProfile, savePlan, startCheckout, toggleBookmark };
