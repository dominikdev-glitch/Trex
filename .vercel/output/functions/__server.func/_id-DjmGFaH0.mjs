import { E as require_jsx_runtime, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Shell, t as Button } from "./_ssr/ui-BmWTPcea.mjs";
import { a as Route$5, l as EmptyState } from "./_ssr/router-DzvRaRmd.mjs";
import { s as labelLevel } from "./_ssr/options-Dk8bgBlc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-DjmGFaH0.js
var import_jsx_runtime = require_jsx_runtime();
function ProgramPage() {
	const data = Route$5.useLoaderData();
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Program missing",
			body: "That plan is not in the library.",
			action: {
				href: "/programs",
				label: "All programs"
			}
		})
	}) });
	const { program, workouts } = data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-[50svh]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: program.coverImage ?? "/media/engine.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tile-scrim absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-[50svh] max-w-6xl flex-col justify-end px-5 py-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs tracking-[0.18em] uppercase",
					children: [
						labelLevel(program.difficulty),
						" · ",
						program.equipment,
						" · ",
						program.durationDays,
						" days"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display section-title mt-3 max-w-3xl",
					children: program.title
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-base",
				children: program.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-3 text-sm",
				children: program.premium ? "Pro program. Session 01 is a free preview. The rest open with TREX Pro." : "Included on the free plan."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "border-line mt-8 divide-y divide-line border-y",
				children: workouts.map((workout) => {
					const locked = program.premium && !workout.freePreview;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-faint text-xs tabular-nums",
								children: [
									String(workout.dayIndex).padStart(2, "0"),
									" · ",
									workout.durationMin,
									" min · ",
									workout.equipment,
									locked ? " · Pro" : workout.freePreview ? " · Preview" : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl",
								children: workout.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mt-1 max-w-xl text-sm",
								children: workout.description
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/workouts/$id",
							params: { id: workout.id },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: locked ? "ghost" : "primary",
								children: locked ? "View" : "Open"
							})
						})]
					}, workout.id);
				})
			})
		]
	})] });
}
//#endregion
export { ProgramPage as component };
