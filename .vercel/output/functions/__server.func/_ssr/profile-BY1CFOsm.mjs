import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shell, l as useCurrentUserState } from "./ui-BmWTPcea.mjs";
import { d as PageSkeleton, u as ErrorState } from "./router-DzvRaRmd.mjs";
import { n as getDashboard } from "./account.functions-BpvVhRMw.mjs";
import { n as formatDuration } from "./format-tUHOGkwl.mjs";
import { o as labelGoal, s as labelLevel } from "./options-Dk8bgBlc.mjs";
import { n as UserButton, t as RedirectToSignIn } from "./gates-BFvJCRsE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BY1CFOsm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user, isPending } = useCurrentUserState();
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let cancel = false;
		getDashboard({ data: { tzOffsetMin: (/* @__PURE__ */ new Date()).getTimezoneOffset() } }).then((next) => {
			if (!cancel) setData(next);
		}).catch((caught) => {
			if (!cancel) setError(caught instanceof Error ? caught.message : "Could not load profile.");
		});
		return () => {
			cancel = true;
		};
	}, [user?.id]);
	if (isPending || user && !data && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const initial = (user.displayName ?? user.primaryEmail ?? "T").slice(0, 1).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: user.profileImageUrl,
					alt: "",
					className: "h-16 w-16 object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-subtle display grid h-16 w-16 place-items-center text-3xl",
					children: initial
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display text-4xl",
					children: user.displayName ?? "Athlete"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted text-sm",
					children: user.primaryEmail
				})] })]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error })
			}) : null,
			data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "border-line mt-8 divide-y divide-line border-y text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Goal",
						value: labelGoal(data.profile.goal)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Experience",
						value: labelLevel(data.profile.experience)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Days",
						value: data.profile.trainingDays ? `${data.profile.trainingDays} / week` : "Not set"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Equipment",
						value: data.profile.equipment.join(", ") || "Not set"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Program",
						value: data.program?.title ?? "Not set"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Membership",
						value: membership(data.profile.subscriptionStatus)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Streak",
						value: `${data.stats.streak} days`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Sessions",
						value: String(data.stats.totalWorkouts)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Time",
						value: formatDuration(data.stats.totalMinutes)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Calories",
						value: String(data.stats.calories)
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/settings",
					className: "border-line min-h-11 rounded-sm border px-4 py-2 text-sm",
					children: "Edit training setup"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/pricing",
					className: "text-accent text-sm",
					children: "Membership"
				})]
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-line mt-10 border-t pt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
			})
		]
	}) });
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right capitalize",
			children: value
		})]
	});
}
function membership(status) {
	if (status === "pro") return "TREX Pro";
	if (status === "expired") return "Pro expired";
	return "Free";
}
//#endregion
export { ProfilePage as component };
