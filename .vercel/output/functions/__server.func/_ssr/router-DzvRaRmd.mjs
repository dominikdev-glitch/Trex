import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, T as useRouter, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, p as HeadContent, v as lazyRouteComponent, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { a as Shell, s as createSsrRpc, t as Button } from "./ui-BmWTPcea.mjs";
import { n as auth } from "./server-C45iq7_s.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/states-BcQ9lJGy.js
var import_jsx_runtime = require_jsx_runtime();
function PageSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-6xl animate-pulse space-y-4 px-5 py-8 motion-reduce:animate-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-subtle h-8 w-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-subtle h-72 w-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-subtle h-16" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-subtle h-16" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-subtle h-16" })
				]
			})
		]
	});
}
function EmptyState({ title, body, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-line border px-6 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display text-3xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-3 max-w-md text-sm",
				children: body
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: action.href,
				className: "mt-6 inline-flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: action.label })
			}) : null
		]
	});
}
function ErrorState({ message, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-line border px-6 py-10",
		role: "alert",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display text-3xl",
				children: "Could not load"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-3 max-w-md text-sm",
				children: message
			}),
			onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				onClick: onRetry,
				variant: "ghost",
				children: "Try again"
			}) : null
		]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-DXYz3_ud.js
function parseId(input) {
	const id = typeof input === "string" ? input.trim() : "";
	if (!/^[a-z0-9-]{1,80}$/.test(id)) throw new Error("Invalid id.");
	return id;
}
var getHome = createServerFn({ method: "GET" }).handler(createSsrRpc("76e2261559e54c80a492b4a527d1a4de758e4665b4feec2e685f000522078484"));
var listWorkouts = createServerFn({ method: "GET" }).handler(createSsrRpc("5ecbde383862d2acb8f71051b0cb3514ab675a1ebac47c9d9e0fe8b23f4192cd"));
var getProgram = createServerFn({ method: "GET" }).validator(parseId).handler(createSsrRpc("79f1520f211b30c588c6645677362ac9a1f250c233a6810fb572d9f12b5b5195"));
var getWorkout = createServerFn({ method: "GET" }).validator(parseId).handler(createSsrRpc("292a568e9017fc4dd5f2184a6ff71fbe8e94ef324df027c714c262588de8f65e"));
var getExercise = createServerFn({ method: "GET" }).validator(parseId).handler(createSsrRpc("12b4c24eeb514dff6bc8a52cd48c3b932ef92c27aaa03fa037efb2c997d6bc99"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DzvRaRmd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				className: "size-8 text-accent",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display text-4xl",
				children: "Something broke"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "bg-accent text-accent-fg rounded-sm px-4 py-3 text-sm font-medium",
				children: "Back to TREX"
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-o5cRR6vD.css";
var Route$17 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TREX — Train from home" },
			{
				name: "description",
				content: "TREX builds a home training path from your goal, equipment, and schedule."
			},
			{
				name: "theme-color",
				content: "#09090b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Outfit:wght@400;500;600&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "top-center",
					toastOptions: { style: {
						background: "#121214",
						color: "#f4f4f5",
						border: "1px solid #2a2a30"
					} }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$14 = () => import("./routes-CvGnjYW4.mjs");
var Route$16 = createFileRoute("/")({
	loader: () => getHome(),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./dashboard-B3Fiw8Uc.mjs");
var Route$15 = createFileRoute("/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./login-DCHdGKvj.mjs");
var Route$14 = createFileRoute("/login")({
	validateSearch: (search) => ({ redirect: typeof search.redirect === "string" ? search.redirect : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./onboarding-CxQMOSrI.mjs");
var Route$13 = createFileRoute("/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./pricing-CI_NaUg1.mjs");
var Route$12 = createFileRoute("/pricing")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./profile-BY1CFOsm.mjs");
var Route$11 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./progress-DsGLrMcx.mjs");
var Route$10 = createFileRoute("/progress")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./register-DdRxRU65.mjs");
var Route$9 = createFileRoute("/register")({
	validateSearch: (search) => ({ redirect: typeof search.redirect === "string" ? search.redirect : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./settings-C0Hconzn.mjs");
var Route$8 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("../_id-B3h6ekXv.mjs");
var Route$7 = createFileRoute("/exercises/$id")({
	loader: ({ params }) => getExercise({ data: params.id }),
	pendingComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {}) }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./programs-B9U2wIN0.mjs");
var Route$6 = createFileRoute("/programs/")({
	loader: () => getHome(),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_id-DjmGFaH0.mjs");
var Route$5 = createFileRoute("/programs/$id")({
	loader: ({ params }) => getProgram({ data: params.id }),
	pendingComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {}) }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./workouts-Bikgl6Wm.mjs");
var Route$4 = createFileRoute("/workouts/")({
	validateSearch: (search) => ({
		q: typeof search.q === "string" && search.q ? search.q : void 0,
		goal: typeof search.goal === "string" && search.goal ? search.goal : void 0,
		difficulty: typeof search.difficulty === "string" && search.difficulty ? search.difficulty : void 0,
		equipment: typeof search.equipment === "string" && search.equipment ? search.equipment : void 0,
		duration: typeof search.duration === "string" && search.duration ? search.duration : void 0,
		saved: search.saved === "1" ? "1" : void 0
	}),
	loader: () => listWorkouts(),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_id-8CYTCWZn.mjs");
var Route$3 = createFileRoute("/workouts/$id")({
	loader: ({ params }) => getWorkout({ data: params.id }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	pendingComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {}) })
});
var Route$2 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var Route$1 = createFileRoute("/api/billing/webhook")({ server: { handlers: { POST: async ({ request }) => {
	const secret = process.env.BILLING_WEBHOOK_SECRET;
	if (!secret) return Response.json({ error: "Billing provider is not configured." }, { status: 501 });
	if (request.headers.get("x-trex-signature") !== secret) return Response.json({ error: "Invalid signature." }, { status: 401 });
	let body;
	try {
		body = await request.json();
	} catch {
		return Response.json({ error: "Invalid JSON." }, { status: 400 });
	}
	if (!body || typeof body !== "object") return Response.json({ error: "Invalid payload." }, { status: 400 });
	const raw = body;
	const userId = typeof raw.userId === "string" ? raw.userId.trim() : "";
	const plan = typeof raw.plan === "string" ? raw.plan.trim() : "";
	const status = typeof raw.status === "string" ? raw.status.trim() : "";
	const expiresAt = typeof raw.expiresAt === "string" ? raw.expiresAt : null;
	if (!/^[A-Za-z0-9_-]{1,80}$/.test(userId)) return Response.json({ error: "Invalid user." }, { status: 400 });
	if (plan !== "pro-monthly") return Response.json({ error: "Unknown plan." }, { status: 400 });
	if (status !== "pro" && status !== "expired" && status !== "free") return Response.json({ error: "Unknown status." }, { status: 400 });
	if (expiresAt && Number.isNaN(new Date(expiresAt).getTime())) return Response.json({ error: "Invalid expiry." }, { status: 400 });
	const { applySubscription } = await import("./training-queries.server-DcbqVnRe.mjs");
	await applySubscription({
		userId,
		plan,
		status,
		expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null
	});
	return Response.json({ ok: true });
} } } });
var $$splitComponentImporter = () => import("./player-vaF5qMdq.mjs");
var Route = createFileRoute("/workout/$id/player")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var DashboardRoute = Route$15.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$17
});
var LoginRoute = Route$14.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$17
});
var OnboardingRoute = Route$13.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$17
});
var PricingRoute = Route$12.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$17
});
var ProfileRoute = Route$11.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$17
});
var ProgressRoute = Route$10.update({
	id: "/progress",
	path: "/progress",
	getParentRoute: () => Route$17
});
var RegisterRoute = Route$9.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$17
});
var SettingsRoute = Route$8.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$17
});
var ExercisesIdRoute = Route$7.update({
	id: "/exercises/$id",
	path: "/exercises/$id",
	getParentRoute: () => Route$17
});
var ProgramsIndexRoute = Route$6.update({
	id: "/programs/",
	path: "/programs/",
	getParentRoute: () => Route$17
});
var ProgramsIdRoute = Route$5.update({
	id: "/programs/$id",
	path: "/programs/$id",
	getParentRoute: () => Route$17
});
var WorkoutsIndexRoute = Route$4.update({
	id: "/workouts/",
	path: "/workouts/",
	getParentRoute: () => Route$17
});
var rootRouteChildren = {
	IndexRoute,
	DashboardRoute,
	LoginRoute,
	OnboardingRoute,
	PricingRoute,
	ProfileRoute,
	ProgressRoute,
	RegisterRoute,
	SettingsRoute,
	ExercisesIdRoute,
	ProgramsIdRoute,
	WorkoutsIdRoute: Route$3.update({
		id: "/workouts/$id",
		path: "/workouts/$id",
		getParentRoute: () => Route$17
	}),
	ProgramsIndexRoute,
	WorkoutsIndexRoute,
	ApiAuthSplatRoute: Route$2.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$17
	}),
	ApiBillingWebhookRoute: Route$1.update({
		id: "/api/billing/webhook",
		path: "/api/billing/webhook",
		getParentRoute: () => Route$17
	}),
	WorkoutIdPlayerRoute: Route.update({
		id: "/workout/$id/player",
		path: "/workout/$id/player",
		getParentRoute: () => Route$17
	})
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { Route$5 as a, Route$16 as c, PageSkeleton as d, Route$4 as i, EmptyState as l, Route as n, Route$6 as o, Route$3 as r, Route$7 as s, router_exports as t, ErrorState as u };
