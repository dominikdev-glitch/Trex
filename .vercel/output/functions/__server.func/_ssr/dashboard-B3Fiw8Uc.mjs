import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, S as Navigate, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shell, l as useCurrentUserState, t as Button } from "./ui-BmWTPcea.mjs";
import { d as PageSkeleton, u as ErrorState } from "./router-DzvRaRmd.mjs";
import { n as getDashboard } from "./account.functions-BpvVhRMw.mjs";
import { n as formatDuration } from "./format-tUHOGkwl.mjs";
import { t as RedirectToSignIn } from "./gates-BFvJCRsE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-B3Fiw8Uc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { user, isPending } = useCurrentUserState();
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let cancel = false;
		getDashboard({ data: { tzOffsetMin: (/* @__PURE__ */ new Date()).getTimezoneOffset() } }).then((next) => {
			if (!cancel) setData(next);
		}).catch((caught) => {
			if (!cancel) setError(caught instanceof Error ? caught.message : "Could not load training.");
		});
		return () => {
			cancel = true;
		};
	}, [user?.id]);
	if (isPending || user && !data && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error })
	}) });
	if (!data) return null;
	if (!data.profile.onboardingCompleted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	const name = user.displayName?.split(" ")[0] ?? "Athlete";
	const today = data.today;
	const week = Math.min(100, Math.round(data.stats.weekDone / Math.max(1, data.stats.weekTarget) * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Greeting, { name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display section-title mt-3",
				children: data.program?.title ?? "Your training"
			}),
			data.profile.planReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-3 max-w-xl text-sm",
				children: data.profile.planReason
			}) : null,
			today ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-0 lg:grid-cols-[1.4fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-h-80 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: today.workout.coverImage ?? "/media/engine.jpg",
							alt: "",
							className: "absolute inset-0 h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tile-scrim absolute inset-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex h-full min-h-80 flex-col justify-end p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-[0.18em] uppercase",
									children: "Today"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "display mt-2 text-5xl",
									children: today.workout.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted mt-2 text-sm",
									children: [
										today.workout.durationMin,
										" min · ",
										today.exerciseCount,
										" exercises · ",
										today.workout.equipment
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-line flex flex-col justify-between border p-6 lg:border-l-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-faint text-xs tracking-[0.16em] uppercase",
							children: today.locked ? "Locked session" : "Ready"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-base",
							children: today.workout.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted mt-4 text-sm tabular-nums",
							children: [
								data.stats.programDone,
								" of ",
								data.stats.programTotal,
								" sessions logged in this plan"
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex flex-col gap-3",
						children: today.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pricing",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								children: "Unlock with Pro"
							})
						}), data.alternative ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/workout/$id/player",
							params: { id: data.alternative.workout.id },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								className: "w-full",
								children: ["Train ", data.alternative.workout.title]
							})
						}) : null] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/workout/$id/player",
							params: { id: today.workout.id },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								children: "Start workout"
							})
						})
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-8",
				children: "No session is queued. Open the library and pick one."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "border-line mt-8 grid grid-cols-2 gap-px border bg-line md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Streak",
						value: `${data.stats.streak}`,
						unit: "days"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "This week",
						value: `${data.stats.weekDone}/${data.stats.weekTarget}`,
						unit: "sessions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Sessions",
						value: `${data.stats.totalWorkouts}`,
						unit: "logged"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Time",
						value: formatDuration(data.stats.totalMinutes),
						unit: "trained"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-line mt-4 h-px",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-fg h-px",
					style: { width: `${week}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-faint mt-2 text-xs",
				children: "Weekly target"
			}),
			data.nextProgram ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted mt-8 text-sm",
				children: ["After this block: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-fg",
					children: data.nextProgram.title
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display text-3xl",
					children: "Recent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/progress",
					className: "text-muted text-sm",
					children: "Progress"
				})]
			}),
			data.recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-4 text-sm",
				children: "No sessions yet. Start today’s workout."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "border-line mt-4 divide-y divide-line border-y",
				children: data.recent.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-4 py-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: item.programTitle
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted tabular-nums",
						children: [Math.round(item.durationSec / 60), "m"]
					})]
				}, item.id))
			})
		]
	}) });
}
function Greeting({ name }) {
	const [hello, setHello] = (0, import_react.useState)("Welcome");
	(0, import_react.useEffect)(() => {
		const hour = (/* @__PURE__ */ new Date()).getHours();
		setHello(hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-faint text-xs tracking-[0.18em] uppercase",
		children: [
			hello,
			", ",
			name
		]
	});
}
function Metric({ label, value, unit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-bg px-4 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-faint text-xs tracking-[0.14em] uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "display mt-2 text-4xl tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-1 text-xs",
				children: unit
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
