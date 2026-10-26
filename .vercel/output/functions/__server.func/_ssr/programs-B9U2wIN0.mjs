import { E as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shell } from "./ui-BmWTPcea.mjs";
import { o as Route$6 } from "./router-DzvRaRmd.mjs";
import { s as labelLevel } from "./options-Dk8bgBlc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/programs-B9U2wIN0.js
var import_jsx_runtime = require_jsx_runtime();
function ProgramsPage() {
	const { programs } = Route$6.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display section-title",
				children: "Programs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-3 max-w-xl text-sm",
				children: "Each plan is a rotation of sessions. Free plans are open. Pro plans include a preview session."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: programs.map((program) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/programs/$id",
					params: { id: program.slug },
					className: "border-line grid border-b md:grid-cols-[280px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: program.coverImage ?? "/media/engine.jpg",
						alt: "",
						className: "aspect-[3/2] h-full w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center px-0 py-5 md:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-faint text-xs tracking-[0.16em] uppercase",
								children: [
									labelLevel(program.difficulty),
									" · ",
									program.durationDays,
									" days · ",
									program.workoutCount,
									" sessions",
									program.premium ? " · Pro" : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "display mt-2 text-4xl",
								children: program.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mt-3 max-w-xl text-sm",
								children: program.description
							})
						]
					})]
				}, program.id))
			})
		]
	}) });
}
//#endregion
export { ProgramsPage as component };
