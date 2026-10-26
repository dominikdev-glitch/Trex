import { o as __toESM } from "./_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Shell, l as useCurrentUserState, t as Button } from "./_ssr/ui-BmWTPcea.mjs";
import { l as EmptyState, s as Route$7 } from "./_ssr/router-DzvRaRmd.mjs";
import { r as getExerciseForUser } from "./_ssr/account.functions-BpvVhRMw.mjs";
import { r as prescription } from "./_ssr/format-tUHOGkwl.mjs";
import { s as labelLevel } from "./_ssr/options-Dk8bgBlc.mjs";
import { t as MediaFrame } from "./_ssr/media-Bs8-O59h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-B3h6ekXv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExercisePage() {
	const initial = Route$7.useLoaderData();
	const { id } = Route$7.useParams();
	const { user } = useCurrentUserState();
	const [exercise, setExercise] = (0, import_react.useState)(initial);
	(0, import_react.useEffect)(() => {
		setExercise(initial);
	}, [initial]);
	(0, import_react.useEffect)(() => {
		if (!user || !initial?.premium) return;
		let cancel = false;
		getExerciseForUser({ data: id }).then((next) => {
			if (!cancel && next) setExercise(next);
		}).catch(() => void 0);
		return () => {
			cancel = true;
		};
	}, [
		user?.id,
		id,
		initial?.premium
	]);
	if (!exercise) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Exercise missing",
			body: "That movement is not in the library.",
			action: {
				href: "/workouts",
				label: "Library"
			}
		})
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaFrame, {
			src: exercise.thumbnailUrl,
			videoUrl: exercise.videoUrl,
			alt: exercise.name,
			label: exercise.name,
			className: "aspect-[4/5]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-faint text-xs tracking-[0.16em] uppercase",
				children: [
					labelLevel(exercise.difficulty),
					" · ",
					exercise.equipment
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display section-title mt-3",
				children: exercise.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base",
				children: exercise.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-4 text-sm",
				children: exercise.targetMuscles.join(" · ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm tabular-nums",
				children: [
					prescription(exercise.defaultSets, exercise.defaultReps, exercise.defaultSeconds),
					" · Rest ",
					exercise.restSeconds,
					"s"
				]
			}),
			exercise.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-line mt-8 border p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display text-3xl",
						children: "Coaching is on Pro"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted mt-3 text-sm",
						children: "Cues, mistakes, and easier or harder versions for loaded movements open with TREX Pro."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						className: "mt-5 inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "See Pro" })
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "How",
						items: exercise.instructions,
						ordered: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "Common mistakes",
						items: exercise.mistakes
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "Easier · "
					}), exercise.beginnerMod] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: "Harder · "
					}), exercise.advancedMod] })
				]
			})
		] })]
	}) });
}
function Block({ title, items, ordered = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-faint text-xs tracking-[0.16em] uppercase",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ordered ? "ol" : "ul", {
		className: `mt-2 space-y-1 ${ordered ? "list-decimal pl-4" : ""}`,
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
	})] });
}
//#endregion
export { ExercisePage as component };
