import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shell, l as useCurrentUserState, t as Button } from "./ui-BmWTPcea.mjs";
import { d as PageSkeleton, u as ErrorState } from "./router-DzvRaRmd.mjs";
import { a as getProgress } from "./account.functions-BpvVhRMw.mjs";
import { t as RedirectToSignIn } from "./gates-BFvJCRsE.mjs";
import { a as Cell, i as Bar, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-DsGLrMcx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RANGES = [
	{
		id: "7d",
		label: "7 days"
	},
	{
		id: "30d",
		label: "30 days"
	},
	{
		id: "90d",
		label: "90 days"
	},
	{
		id: "all",
		label: "All time"
	}
];
function ProgressPage() {
	const { user, isPending } = useCurrentUserState();
	const [range, setRange] = (0, import_react.useState)("7d");
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let cancel = false;
		setLoading(true);
		getProgress({ data: {
			range,
			tzOffsetMin: (/* @__PURE__ */ new Date()).getTimezoneOffset()
		} }).then((next) => {
			if (!cancel) {
				setData(next);
				setError(null);
				setLoading(false);
			}
		}).catch((caught) => {
			if (!cancel) {
				setError(caught instanceof Error ? caught.message : "Could not load progress.");
				setLoading(false);
			}
		});
		return () => {
			cancel = true;
		};
	}, [user?.id, range]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display section-title",
				children: "Progress"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				role: "tablist",
				"aria-label": "Range",
				children: RANGES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": range === item.id,
					onClick: () => setRange(item.id),
					className: `min-h-11 rounded-sm border px-3 text-sm ${range === item.id ? "border-fg bg-fg text-bg" : "border-line text-muted"}`,
					children: item.label
				}, item.id))
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error })
			}) : null,
			data?.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-line mt-8 border p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display text-4xl",
						children: "Longer history is on Pro"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted mt-3 max-w-md text-sm",
						children: "Free includes the last 7 days. 30 days, 90 days, and all-time open with TREX Pro."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						className: "mt-6 inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "See Pro" })
					})
				]
			}) : null,
			data && !data.locked && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 grid grid-cols-2 gap-6 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Sessions",
							value: String(data.totals.workouts)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Minutes",
							value: String(data.totals.minutes)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Calories",
							value: String(data.totals.calories)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Streak",
							value: String(data.totals.streak)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 h-56 w-full min-w-0",
					children: data.buckets.every((bucket) => bucket.workouts === 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted text-sm",
						children: "No sessions in this range yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: data.buckets,
							barCategoryGap: "28%",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "label",
									tick: {
										fill: "#a1a1aa",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									allowDecimals: false,
									width: 24,
									tick: {
										fill: "#a1a1aa",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									cursor: { fill: "rgba(255,255,255,0.04)" },
									contentStyle: {
										background: "#121214",
										border: "1px solid #2a2a30",
										borderRadius: 0
									},
									labelStyle: { color: "#f4f4f5" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "workouts",
									radius: [
										2,
										2,
										0,
										0
									],
									children: data.buckets.map((bucket, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: index === data.buckets.length - 1 ? "#d63a32" : "#3a3a42" }, bucket.label))
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display mt-10 text-3xl",
					children: "History"
				}),
				data.history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted mt-4 text-sm",
					children: "Finish a session and it will show up here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "border-line mt-4 divide-y divide-line border-y",
					children: data.history.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-4 py-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								item.programTitle,
								" · ",
								new Date(item.completedAt).toLocaleDateString()
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted tabular-nums",
							children: [
								Math.max(1, Math.round(item.durationSec / 60)),
								"m · ",
								item.calories,
								" kcal"
							]
						})]
					}, item.id))
				})
			] }) : null
		]
	}) });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-faint text-xs tracking-[0.14em] uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "display mt-1 text-4xl tabular-nums",
		children: value
	})] });
}
//#endregion
export { ProgressPage as component };
