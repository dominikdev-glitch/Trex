import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as authClient } from "./client-1vAx-gM_.mjs";
import { a as Shell, i as TextInput, l as useCurrentUserState, n as Choice, r as Field, t as Button } from "./ui-BmWTPcea.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as PageSkeleton } from "./router-DzvRaRmd.mjs";
import { d as updatePreferences, i as getProfile } from "./account.functions-BpvVhRMw.mjs";
import { i as GOAL_OPTIONS, n as EQUIPMENT_OPTIONS, r as EXPERIENCE_OPTIONS, t as DAY_OPTIONS } from "./options-Dk8bgBlc.mjs";
import { n as UserButton, t as RedirectToSignIn } from "./gates-BFvJCRsE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-C0Hconzn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [goal, setGoal] = (0, import_react.useState)("fitness");
	const [experience, setExperience] = (0, import_react.useState)("beginner");
	const [days, setDays] = (0, import_react.useState)(3);
	const [equipment, setEquipment] = (0, import_react.useState)(["none"]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [resetNote, setResetNote] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let cancel = false;
		getProfile().then((next) => {
			if (cancel) return;
			setProfile(next);
			if (next.goal) setGoal(next.goal);
			if (next.experience) setExperience(next.experience);
			if (next.trainingDays) setDays(next.trainingDays);
			if (next.equipment.length) setEquipment(next.equipment);
		}).catch(() => void 0);
		return () => {
			cancel = true;
		};
	}, [user?.id]);
	function toggleEquipment(id) {
		setEquipment((current) => {
			if (id === "none") return current.includes("none") ? [] : ["none"];
			const withoutNone = current.filter((item) => item !== "none");
			return withoutNone.includes(id) ? withoutNone.filter((item) => item !== id) : [...withoutNone, id];
		});
	}
	if (isPending || user && !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-faint text-xs tracking-[0.16em] uppercase",
				children: "Account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display text-5xl",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted mt-3 text-sm",
				children: [
					"Signed in as ",
					user.primaryEmail,
					". Membership: ",
					profile?.subscriptionStatus === "pro" ? "TREX Pro" : profile?.subscriptionStatus === "expired" ? "Pro expired" : "Free",
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-6",
				onSubmit: (event) => {
					event.preventDefault();
					setBusy(true);
					updatePreferences({ data: {
						goal,
						experience,
						trainingDays: days,
						equipment
					} }).then((next) => {
						setProfile(next);
						toast("Training setup updated");
					}).catch((caught) => toast(caught instanceof Error ? caught.message : "Could not save")).finally(() => setBusy(false));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-muted mb-2 text-sm",
							children: "Goal"
						}), GOAL_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							selected: goal === option.id,
							label: option.label,
							onClick: () => setGoal(option.id)
						}, option.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-muted mb-2 text-sm",
							children: "Experience"
						}), EXPERIENCE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							selected: experience === option.id,
							label: option.label,
							onClick: () => setExperience(option.id)
						}, option.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-muted mb-2 text-sm",
							children: "Days"
						}), DAY_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							selected: days === Number(option.id),
							label: option.label,
							onClick: () => setDays(Number(option.id))
						}, option.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-muted mb-2 text-sm",
							children: "Equipment"
						}), EQUIPMENT_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							selected: equipment.includes(option.id),
							label: option.label,
							onClick: () => toggleEquipment(option.id)
						}, option.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Saving…" : "Save setup"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-line mt-12 border-t pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted mt-2 text-sm",
						children: "Reset email is only delivered when an email sender is connected. Google and X stay available if you lose this password."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-4 space-y-3",
						onSubmit: (event) => {
							event.preventDefault();
							const email = user.primaryEmail;
							if (!email) return;
							const client = authClient;
							if (!client.requestPasswordReset) {
								setResetNote("Password reset is not available.");
								return;
							}
							client.requestPasswordReset({
								email,
								redirectTo: "/login"
							}).then((result) => {
								setResetNote(result.error?.message ?? "If email delivery is connected, the reset link was sent.");
							});
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Account email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									value: user.primaryEmail ?? "",
									readOnly: true,
									"aria-label": "Account email"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								variant: "ghost",
								children: "Request reset"
							}),
							resetNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted text-sm",
								children: resetNote
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/profile",
				className: "text-muted mt-6 inline-block text-sm",
				children: "Back to profile"
			})
		]
	}) });
}
//#endregion
export { SettingsPage as component };
