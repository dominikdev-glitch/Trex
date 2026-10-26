import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, C as useNavigate, E as require_jsx_runtime, w as useSearch, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { i as TextInput, o as Wordmark, r as Field, t as Button } from "./ui-BmWTPcea.mjs";
import { t as GROK_PROVIDERS } from "./server-C45iq7_s.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as getProfile } from "./account.functions-BpvVhRMw.mjs";
import { i as safeRedirect } from "./format-tUHOGkwl.mjs";
import { t as MediaFrame } from "./media-Bs8-O59h.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-screen-Ci9gnVFx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BEARER_KEY = "grok-auth.bearer-token";
function storeToken(token) {
	if (!token || typeof window === "undefined") return;
	try {
		window.sessionStorage.setItem(BEARER_KEY, token);
	} catch {}
}
async function afterSession(navigate, redirect) {
	await authClient.getSession();
	try {
		if (!(await getProfile()).onboardingCompleted) {
			await navigate({ to: "/onboarding" });
			return;
		}
	} catch {
		await navigate({ to: "/onboarding" });
		return;
	}
	if (redirect === "/dashboard") await navigate({ to: "/dashboard" });
	else if (redirect.startsWith("/workout/")) window.location.assign(redirect);
	else if (redirect.startsWith("/workouts")) await navigate({ to: "/workouts" });
	else if (redirect.startsWith("/programs")) await navigate({ to: "/programs" });
	else if (redirect.startsWith("/pricing")) await navigate({ to: "/pricing" });
	else if (redirect.startsWith("/progress")) await navigate({ to: "/progress" });
	else if (redirect.startsWith("/profile")) await navigate({ to: "/profile" });
	else await navigate({ to: "/dashboard" });
}
function AuthScreen({ mode }) {
	const navigate = useNavigate();
	const search = useSearch({ strict: false });
	const redirect = safeRedirect(search.redirect, "/dashboard");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [resetNote, setResetNote] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [showReset, setShowReset] = (0, import_react.useState)(false);
	async function onSubmit(event) {
		event.preventDefault();
		setError(null);
		setBusy(true);
		try {
			let headerToken = null;
			if (mode === "register") {
				const result = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: name.trim()
				}, { onSuccess(ctx) {
					headerToken = ctx.response.headers.get("set-auth-token");
				} });
				if (result.error) {
					setError(result.error.message ?? "Could not create the account.");
					return;
				}
				storeToken(headerToken || result.data?.token || null);
			} else {
				const result = await authClient.signIn.email({
					email: email.trim(),
					password
				}, { onSuccess(ctx) {
					headerToken = ctx.response.headers.get("set-auth-token");
				} });
				if (result.error) {
					setError(result.error.message ?? "Email or password is wrong.");
					return;
				}
				storeToken(headerToken || result.data?.token || null);
			}
			await afterSession(navigate, redirect);
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Sign-in failed.");
		} finally {
			setBusy(false);
		}
	}
	async function onReset(event) {
		event.preventDefault();
		setResetNote(null);
		const client = authClient;
		if (!client.requestPasswordReset) {
			setResetNote("Password reset is not available on this account system.");
			return;
		}
		const message = (await client.requestPasswordReset({
			email: email.trim(),
			redirectTo: "/login"
		})).error?.message ?? "If an inbox is connected, a reset link is on the way. Otherwise use Google or X.";
		setResetNote(message);
		toast(message);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden min-h-screen lg:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaFrame, {
					src: "/media/hero.jpg",
					alt: "Athlete training with their back to the camera",
					label: "Train",
					className: "absolute inset-0 h-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-scrim absolute inset-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex h-full flex-col justify-between p-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-faint text-xs tracking-[0.22em] uppercase",
						children: "Home training"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "display hero-title mt-3 max-w-xl",
						children: [
							"Train from",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"home."
						]
					})] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col px-5 py-8 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-faint text-xs tracking-[0.18em] uppercase",
						children: mode === "register" ? "Create account" : "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display section-title mt-3",
						children: mode === "register" ? "Start training" : "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-8 space-y-4",
						onSubmit,
						children: [
							mode === "register" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									autoComplete: "name",
									required: true,
									value: name,
									onChange: (event) => setName(event.target.value)
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "email",
									autoComplete: "email",
									required: true,
									value: email,
									onChange: (event) => setEmail(event.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Password",
								hint: "At least 8 characters.",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "password",
									autoComplete: mode === "register" ? "new-password" : "current-password",
									required: true,
									minLength: 8,
									value: password,
									onChange: (event) => setPassword(event.target.value)
								})
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-accent text-sm",
								role: "alert",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: busy,
								className: "w-full",
								children: busy ? "Working…" : mode === "register" ? "Create account" : "Sign in"
							})
						]
					}),
					mode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-muted text-sm underline-offset-4 hover:underline",
							onClick: () => setShowReset((value) => !value),
							children: "Forgot password"
						}), showReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-3 space-y-3",
							onSubmit: onReset,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "email",
									required: true,
									placeholder: "Email for the reset",
									value: email,
									onChange: (event) => setEmail(event.target.value),
									"aria-label": "Email for password reset"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "ghost",
									children: "Send reset"
								}),
								resetNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted text-sm",
									children: resetNote
								}) : null
							]
						}) : null]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-line my-8 border-t" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							className: "w-full",
							onClick: () => {
								signIn(provider.providerId, { callbackURL: mode === "register" ? "/onboarding" : redirect });
							},
							children: ["Continue with ", provider.label]
						}, provider.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted mt-8 text-sm",
						children: [
							mode === "register" ? "Already training?" : "New to TREX?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: mode === "register" ? "/login" : "/register",
								search: { redirect },
								className: "text-fg underline-offset-4 hover:underline",
								children: mode === "register" ? "Sign in" : "Create an account"
							})
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { AuthScreen as t };
