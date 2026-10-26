import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, m as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as authClient } from "./client-1vAx-gM_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-current-user-OuxL-e6u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/shell-nJZ5izd3.js
var import_jsx_runtime = require_jsx_runtime();
var APP_PREFIXES = [
	"/dashboard",
	"/workouts",
	"/programs",
	"/progress",
	"/profile",
	"/settings",
	"/exercises"
];
function NavLink({ to, label, exact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		activeOptions: { exact },
		className: "text-muted data-[status=active]:text-fg text-sm",
		activeProps: { className: "text-fg text-sm" },
		children: label
	});
}
function Shell({ children, mode = "auto" }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const resolved = mode === "auto" ? APP_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ? "app" : "marketing" : mode;
	const online = useOnline();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-bg text-fg min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "bg-accent text-accent-fg sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-3 focus:py-2",
				children: "Skip to content"
			}),
			resolved !== "plain" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, { app: resolved === "app" }) : null,
			!online ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "bg-subtle text-muted border-line border-b px-5 py-2 text-center text-sm",
				role: "status",
				children: "You are offline. Sessions need a connection to save."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "main",
				className: resolved === "app" ? "pb-24 md:pb-0" : void 0,
				children
			}),
			resolved === "app" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {}) : null
		]
	});
}
function TopBar({ app }) {
	const { user, isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-line bg-bg sticky top-0 z-30 border-b",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					"aria-label": "TREX home",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-accent h-2.5 w-2.5",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "display text-2xl leading-none",
						children: "Trex"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-6 md:flex",
					"aria-label": "Primary",
					children: app ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							to: "/dashboard",
							label: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							to: "/workouts",
							label: "Workouts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							to: "/programs",
							label: "Programs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							to: "/progress",
							label: "Progress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							to: "/profile",
							label: "Profile"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							to: "/workouts",
							label: "Workouts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							to: "/programs",
							label: "Programs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							to: "/pricing",
							label: "Pricing"
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bg-subtle h-8 w-20 animate-pulse motion-reduce:animate-none" }) : null,
						!isPending && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pricing",
							className: "text-accent text-sm font-medium",
							children: app ? "Pro" : "TREX Pro"
						}) : null,
						!isPending && !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-sm font-medium",
							children: "Sign in"
						}) : null
					]
				})
			]
		})
	});
}
function MobileNav() {
	const item = "flex min-h-14 flex-1 flex-col items-center justify-center text-[11px] tracking-wide text-faint data-[status=active]:text-fg";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "border-line bg-bg fixed inset-x-0 bottom-0 z-30 border-t pb-[env(safe-area-inset-bottom)] md:hidden",
		"aria-label": "Mobile",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: item,
					activeProps: { className: item },
					children: "Home"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/workouts",
					className: item,
					activeProps: { className: item },
					children: "Workouts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/progress",
					className: item,
					activeProps: { className: item },
					children: "Progress"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profile",
					className: item,
					activeProps: { className: item },
					children: "Profile"
				})
			]
		})
	});
}
function useOnline() {
	const [online, setOnline] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const on = () => setOnline(true);
		const off = () => setOnline(false);
		setOnline(navigator.onLine);
		window.addEventListener("online", on);
		window.addEventListener("offline", off);
		return () => {
			window.removeEventListener("online", on);
			window.removeEventListener("offline", off);
		};
	}, []);
	return online;
}
function Wordmark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2",
		"aria-label": "TREX home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "bg-accent h-2.5 w-2.5",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "display text-2xl leading-none",
			children: "Trex"
		})]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/ui-BmWTPcea.js
function Button({ variant = "primary", className = "", ...props }) {
	const styles = variant === "primary" ? "bg-accent text-accent-fg hover:brightness-110" : variant === "ghost" ? "border border-line bg-transparent text-fg hover:bg-subtle" : "bg-transparent text-muted hover:text-fg";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		className: `inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium transition-[transform,filter,background-color,color] duration-150 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-2 block text-sm text-muted",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-2 block text-xs text-faint",
				children: hint
			}) : null
		]
	});
}
function TextInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: `border-line bg-subtle text-fg placeholder:text-faint h-12 w-full rounded-sm border px-3 text-base outline-none ${props.className ?? ""}`
	});
}
function Choice({ selected, label, detail, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-pressed": selected,
		onClick,
		className: `flex min-h-14 w-full items-center justify-between gap-4 rounded-sm border px-4 py-3 text-left transition-colors duration-150 ${selected ? "border-fg bg-subtle" : "border-line bg-transparent hover:bg-elevated"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-base font-medium",
			children: label
		}), detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted mt-1 block text-sm",
			children: detail
		}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `h-2.5 w-2.5 shrink-0 ${selected ? "bg-accent" : "border-line border"}`,
			"aria-hidden": true
		})]
	});
}
//#endregion
export { Shell as a, useCurrentUser as c, TextInput as i, useCurrentUserState as l, Choice as n, Wordmark as o, Field as r, createSsrRpc as s, Button as t };
