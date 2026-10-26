import { E as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shell, t as Button } from "./ui-BmWTPcea.mjs";
import { c as Route$16 } from "./router-DzvRaRmd.mjs";
import { r as prescription } from "./format-tUHOGkwl.mjs";
import { s as labelLevel } from "./options-Dk8bgBlc.mjs";
import { t as MediaFrame } from "./media-Bs8-O59h.mjs";
import { n as PRO_FEATURES, t as FREE_FEATURES } from "./pricing-DXEXMQdT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CvGnjYW4.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { programs, featured } = Route$16.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, {
		mode: "marketing",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-[100svh]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaFrame, {
						src: "/media/hero.jpg",
						alt: "Athlete training in a dark studio, seen from behind",
						label: "Train",
						className: "absolute inset-0 h-full min-h-[100svh]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-scrim absolute inset-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pt-24 pb-12 md:justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-faint text-xs tracking-[0.22em] uppercase",
								children: "Home training system"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "display hero-title mt-4 max-w-4xl",
								children: [
									"Train from home.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Become stronger."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mt-6 max-w-md text-base",
								children: "Tell TREX the body you want to build. Get a visual path you can follow with the equipment you already own."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/register",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full sm:w-auto",
										children: "Start training"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/workouts",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										className: "w-full sm:w-auto",
										children: "Explore workouts"
									})
								})]
							}),
							featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/workouts/$id",
								params: { id: featured.workoutId },
								className: "border-line bg-elevated mt-10 block max-w-sm border p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-faint text-xs tracking-[0.16em] uppercase",
										children: featured.programTitle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-lg font-medium",
										children: featured.workoutTitle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted mt-1 text-sm",
										children: [
											featured.exerciseName,
											" · ",
											prescription(featured.sets, featured.reps, featured.seconds)
										]
									})
								]
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display section-title",
						children: "Pick a target"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/programs",
						className: "text-muted hidden text-sm sm:inline",
						children: "All programs"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: programs.map((program) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/programs/$id",
						params: { id: program.slug },
						className: "group relative block min-h-72 overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: program.coverImage ?? "/media/engine.jpg",
								alt: "",
								className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tile-scrim absolute inset-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex h-full min-h-72 flex-col justify-end p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-faint text-xs tracking-[0.16em] uppercase",
										children: [
											labelLevel(program.difficulty),
											" · ",
											program.durationDays,
											" days",
											program.premium ? " · Pro" : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "display mt-2 text-4xl",
										children: program.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted mt-2 max-h-0 overflow-hidden text-sm opacity-0 transition-all duration-200 group-hover:max-h-24 group-hover:opacity-100",
										children: program.description
									})
								]
							})
						]
					}, program.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-line border-y",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-6xl md:grid-cols-3",
					children: [
						[
							"01",
							"Choose a goal",
							"Fat loss, muscle, a body part, or a foundation week."
						],
						[
							"02",
							"Get a path",
							"TREX matches a program to your level, days, and equipment."
						],
						[
							"03",
							"Train and log",
							"Follow the session. Rest is timed. The streak updates when you finish."
						]
					].map(([index, title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-line border-b px-5 py-10 md:border-r md:border-b-0 md:last:border-r-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-faint text-xs tracking-[0.18em]",
								children: index
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "display mt-4 text-4xl",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mt-3 text-sm",
								children: body
							})
						]
					}, index))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display section-title",
						children: "Free, then Pro"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted mt-4 max-w-md text-sm",
						children: "Train immediately. Pro opens the rest of the library. Checkout does not pretend a card was charged."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plan, {
							name: "Free",
							price: "$0",
							items: FREE_FEATURES
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plan, {
							name: "TREX Pro",
							price: `$15`,
							items: PRO_FEATURES
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						className: "md:col-start-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							children: "See membership"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-line border-t",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "display text-2xl",
						children: "Trex"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-muted flex gap-5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/workouts",
								children: "Workouts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/programs",
								children: "Programs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pricing",
								children: "Pricing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Sign in"
							})
						]
					})]
				})
			})
		]
	});
}
function Plan({ name, price, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-line border p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-faint text-xs tracking-[0.16em] uppercase",
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "display mt-3 text-5xl",
				children: price
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "text-muted mt-4 space-y-2 text-sm",
				children: items.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
			})
		]
	});
}
//#endregion
export { Home as component };
