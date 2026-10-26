import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shell, l as useCurrentUserState, t as Button } from "./ui-BmWTPcea.mjs";
import { l as startCheckout } from "./account.functions-BpvVhRMw.mjs";
import { n as PRO_FEATURES, t as FREE_FEATURES } from "./pricing-DXEXMQdT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-CI_NaUg1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PricingPage() {
	const { user, isPending } = useCurrentUserState();
	const [result, setResult] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		mode: "marketing",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-5 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-faint text-xs tracking-[0.18em] uppercase",
					children: "Membership"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display section-title mt-3 max-w-3xl",
					children: "Train free. Open the full library when you want it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border-line border p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "display text-4xl",
								children: "Free"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "display mt-4 text-6xl",
								children: "$0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 space-y-3 text-sm",
								children: FREE_FEATURES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-muted",
									children: item
								}, item))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: user ? "/dashboard" : "/register",
								className: "mt-8 inline-flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									children: "Start free"
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border-fg border p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "display text-4xl",
								children: "Trex Pro"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "display text-6xl",
									children: ["$", 15]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted text-sm",
									children: " / month"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 space-y-3 text-sm",
								children: PRO_FEATURES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
							}),
							isPending ? null : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-8",
								disabled: busy,
								onClick: () => {
									setBusy(true);
									setError(null);
									startCheckout({ data: { plan: "pro-monthly" } }).then(setResult).catch((caught) => setError(caught instanceof Error ? caught.message : "Checkout failed.")).finally(() => setBusy(false));
								},
								children: busy ? "Requesting…" : "Upgrade"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								search: { redirect: "/pricing" },
								className: "mt-8 inline-flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Create account to upgrade" })
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-accent mt-4 text-sm",
								role: "alert",
								children: error
							}) : null,
							result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mt-4 text-sm",
								role: "status",
								children: result.message
							}) : null
						]
					})]
				})
			]
		})
	});
}
//#endregion
export { PricingPage as component };
