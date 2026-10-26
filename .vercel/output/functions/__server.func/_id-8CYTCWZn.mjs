import { o as __toESM } from "./_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Shell, l as useCurrentUserState, t as Button } from "./_ssr/ui-BmWTPcea.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { l as EmptyState, r as Route$3 } from "./_ssr/router-DzvRaRmd.mjs";
import { o as getWorkoutSession, s as listBookmarks, u as toggleBookmark } from "./_ssr/account.functions-BpvVhRMw.mjs";
import { r as prescription } from "./_ssr/format-tUHOGkwl.mjs";
import { s as labelLevel } from "./_ssr/options-Dk8bgBlc.mjs";
import { t as MediaFrame } from "./_ssr/media-Bs8-O59h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-8CYTCWZn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WorkoutPage() {
	const initial = Route$3.useLoaderData();
	const { id } = Route$3.useParams();
	const { user } = useCurrentUserState();
	const [detail, setDetail] = (0, import_react.useState)(initial);
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDetail(initial);
	}, [initial]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let cancel = false;
		getWorkoutSession({ data: id }).then((next) => {
			if (!cancel && next) setDetail(next);
		}).catch(() => void 0);
		return () => {
			cancel = true;
		};
	}, [user?.id, id]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let cancel = false;
		listBookmarks().then((ids) => {
			if (!cancel) setSaved(ids.includes(id));
		}).catch(() => void 0);
		return () => {
			cancel = true;
		};
	}, [user?.id, id]);
	if (!detail) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Session missing",
			body: "That workout is not in the library.",
			action: {
				href: "/workouts",
				label: "Back to library"
			}
		})
	}) });
	const { workout, exercises, locked } = detail;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[1.1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaFrame, {
			src: exercises[0]?.thumbnailUrl ?? workout.coverImage,
			videoUrl: locked ? null : exercises[0]?.videoUrl,
			alt: workout.title,
			label: workout.title,
			className: "aspect-[4/5] lg:aspect-[4/5]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-faint text-xs tracking-[0.16em] uppercase",
				children: [
					workout.programTitle,
					" · Session ",
					String(workout.dayIndex).padStart(2, "0")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display section-title mt-3",
				children: workout.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-4 text-sm",
				children: workout.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid grid-cols-2 gap-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Time",
						value: `${workout.durationMin} min`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Level",
						value: labelLevel(workout.difficulty)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Equipment",
						value: workout.equipment
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Estimate",
						value: `${workout.baseCalories} kcal`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3 sm:flex-row",
				children: [locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/pricing",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Unlock with Pro" })
				}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/workout/$id/player",
					params: { id: workout.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Start workout" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/register",
					search: { redirect: `/workout/${workout.id}/player` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Start workout" })
				}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => {
						toggleBookmark({ data: workout.id }).then((result) => {
							setSaved(result.bookmarked);
							toast(result.bookmarked ? "Saved" : "Removed");
						}).catch(() => toast("Could not update saved sessions"));
					},
					children: saved ? "Saved" : "Save"
				}) : null]
			})
		] })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display text-3xl",
				children: "Exercises"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "border-line mt-4 divide-y divide-line border-y",
				children: exercises.map((exercise, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-2 py-4 sm:grid-cols-[4rem_1fr_auto] sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-faint tabular-nums",
							children: String(index + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: exercise.name
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/exercises/$id",
							params: { id: exercise.exerciseId },
							className: "font-medium",
							children: exercise.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted mt-1 block text-sm",
							children: exercise.targetMuscles.join(" · ")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tabular-nums",
							children: prescription(exercise.sets, exercise.reps, exercise.seconds)
						})
					]
				}, `${exercise.exerciseId}-${index}`))
			}),
			locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-4 text-sm",
				children: "Coaching cues for this session are on TREX Pro."
			}) : null
		]
	})] });
}
function Meta({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-line border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-faint text-xs tracking-[0.14em] uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1",
			children: value
		})]
	});
}
//#endregion
export { WorkoutPage as component };
