import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shell, i as TextInput, l as useCurrentUserState } from "./ui-BmWTPcea.mjs";
import { i as Route$4, l as EmptyState } from "./router-DzvRaRmd.mjs";
import { s as listBookmarks } from "./account.functions-BpvVhRMw.mjs";
import { a as LIBRARY_GOALS, s as labelLevel } from "./options-Dk8bgBlc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workouts-Bikgl6Wm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function matchesWorkout(workout, search, saved) {
	if (search.q) {
		const q = search.q.toLowerCase();
		if (!`${workout.title} ${workout.programTitle} ${workout.description}`.toLowerCase().includes(q)) return false;
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
		if (eq === "gym" && workout.equipment !== "Gym" && workout.equipment !== "Dumbbells" && workout.equipment !== "Bar") return false;
	}
	if (search.duration === "lt15" && workout.durationMin >= 15) return false;
	if (search.duration === "m15" && (workout.durationMin < 15 || workout.durationMin >= 30)) return false;
	if (search.duration === "m30" && (workout.durationMin < 30 || workout.durationMin >= 45)) return false;
	if (search.duration === "m45" && workout.durationMin < 45) return false;
	if (search.saved === "1" && saved && !saved.has(workout.id)) return false;
	return true;
}
function LibraryPage() {
	const all = Route$4.useLoaderData();
	const search = Route$4.useSearch();
	const navigate = Route$4.useNavigate();
	const { user } = useCurrentUserState();
	const [saved, setSaved] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!user || search.saved !== "1") return;
		let cancel = false;
		listBookmarks().then((ids) => {
			if (!cancel) setSaved(ids);
		}).catch(() => {
			if (!cancel) setSaved([]);
		});
		return () => {
			cancel = true;
		};
	}, [user?.id, search.saved]);
	const savedSet = search.saved === "1" ? new Set(saved) : void 0;
	const workouts = all.filter((workout) => matchesWorkout(workout, search, savedSet));
	function setFilter(patch) {
		navigate({ search: (prev) => {
			const next = {
				...prev,
				...patch
			};
			Object.keys(next).forEach((key) => {
				if (!next[key]) delete next[key];
			});
			return next;
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[240px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display text-5xl",
				children: "Library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted mt-3 text-sm",
				children: [all.length, " sessions. Filter without leaving the page."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						"aria-label": "Search sessions",
						placeholder: "Search",
						value: search.q ?? "",
						onChange: (event) => setFilter({ q: event.target.value || void 0 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
						label: "Goal",
						value: search.goal,
						options: LIBRARY_GOALS.map((item) => ({
							id: item.id,
							label: item.label
						})),
						onChange: (goal) => setFilter({ goal })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
						label: "Difficulty",
						value: search.difficulty,
						options: [
							{
								id: "beginner",
								label: "Beginner"
							},
							{
								id: "intermediate",
								label: "Intermediate"
							},
							{
								id: "advanced",
								label: "Advanced"
							}
						],
						onChange: (difficulty) => setFilter({ difficulty })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
						label: "Equipment",
						value: search.equipment,
						options: [
							{
								id: "none",
								label: "None"
							},
							{
								id: "dumbbells",
								label: "Dumbbells"
							},
							{
								id: "bands",
								label: "Bands"
							},
							{
								id: "bench",
								label: "Bench"
							},
							{
								id: "bar",
								label: "Bar"
							},
							{
								id: "gym",
								label: "Gym"
							}
						],
						onChange: (equipment) => setFilter({ equipment })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
						label: "Duration",
						value: search.duration,
						options: [
							{
								id: "lt15",
								label: "Under 15 min"
							},
							{
								id: "m15",
								label: "15–30 min"
							},
							{
								id: "m30",
								label: "30–45 min"
							},
							{
								id: "m45",
								label: "45+ min"
							}
						],
						onChange: (duration) => setFilter({ duration })
					}),
					user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 text-sm ${search.saved === "1" ? "text-fg" : "text-muted"}`,
						onClick: () => setFilter({ saved: search.saved === "1" ? void 0 : "1" }),
						children: search.saved === "1" ? "Showing saved" : "Show saved"
					}) : null
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-faint mb-4 text-xs tracking-[0.16em] uppercase",
			children: [workouts.length, " shown"]
		}), workouts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No sessions",
			body: search.saved === "1" && !user ? "Sign in to see saved sessions." : "Nothing matches these filters.",
			action: {
				href: "/workouts",
				label: "Clear filters"
			}
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2",
			children: workouts.map((workout) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/workouts/$id",
				params: { id: workout.id },
				className: "group relative block min-h-64 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: workout.coverImage ?? "/media/engine.jpg",
						alt: "",
						className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tile-scrim absolute inset-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex min-h-64 flex-col justify-end p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-faint text-xs tracking-[0.14em] uppercase",
								children: [workout.programTitle, workout.premium && !workout.freePreview ? " · Pro" : workout.freePreview ? " · Preview" : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "display mt-2 text-4xl",
								children: workout.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted mt-2 text-sm",
								children: [
									workout.durationMin,
									" min · ",
									labelLevel(workout.difficulty),
									" · ",
									workout.equipment
								]
							})
						]
					})
				]
			}) }, workout.id))
		})] })]
	}) });
}
function FilterGroup({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-faint text-xs tracking-[0.16em] uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-wrap gap-2",
		children: options.map((option) => {
			const on = value === option.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": on,
				onClick: () => onChange(on ? void 0 : option.id),
				className: `min-h-10 rounded-sm border px-3 text-sm ${on ? "border-fg bg-fg text-bg" : "border-line text-muted"}`,
				children: option.label
			}, option.id);
		})
	})] });
}
//#endregion
export { LibraryPage as component };
