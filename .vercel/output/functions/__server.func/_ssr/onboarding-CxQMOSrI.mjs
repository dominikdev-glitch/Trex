import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, C as useNavigate, E as require_jsx_runtime, S as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCurrentUserState, n as Choice, o as Wordmark, t as Button } from "./ui-BmWTPcea.mjs";
import { d as PageSkeleton } from "./router-DzvRaRmd.mjs";
import { c as saveOnboarding, i as getProfile } from "./account.functions-BpvVhRMw.mjs";
import { i as GOAL_OPTIONS, n as EQUIPMENT_OPTIONS, r as EXPERIENCE_OPTIONS, s as labelLevel, t as DAY_OPTIONS } from "./options-Dk8bgBlc.mjs";
import { t as RedirectToSignIn } from "./gates-BFvJCRsE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-CxQMOSrI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Goal",
	"Level",
	"Days",
	"Equipment",
	"Plan"
];
function OnboardingFlow() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [goal, setGoal] = (0, import_react.useState)(null);
	const [experience, setExperience] = (0, import_react.useState)(null);
	const [days, setDays] = (0, import_react.useState)(null);
	const [equipment, setEquipment] = (0, import_react.useState)([]);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	function toggleEquipment(id) {
		setEquipment((current) => {
			if (id === "none") return current.includes("none") ? [] : ["none"];
			const withoutNone = current.filter((item) => item !== "none");
			return withoutNone.includes(id) ? withoutNone.filter((item) => item !== id) : [...withoutNone, id];
		});
	}
	const canContinue = step === 0 && goal || step === 1 && experience || step === 2 && days || step === 3 && equipment.length > 0 || step === 4;
	async function next() {
		if (step < 3) {
			setStep((value) => value + 1);
			return;
		}
		if (step === 3) {
			if (!goal || !experience || !days) return;
			setBusy(true);
			setError(null);
			try {
				const saved = await saveOnboarding({ data: {
					goal,
					experience,
					trainingDays: days,
					equipment
				} });
				setProfile(saved);
				setStep(4);
			} catch (caught) {
				setError(caught instanceof Error ? caught.message : "Could not save your plan.");
			} finally {
				setBusy(false);
			}
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-screen max-w-xl flex-col px-5 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-faint text-sm tabular-nums",
					children: [
						"0",
						step + 1,
						" / 0",
						STEPS.length
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-line mt-6 h-px",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-accent draw h-px",
					style: { width: `${(step + 1) / STEPS.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col py-10",
				children: [
					step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						title: "What's your goal?",
						body: "TREX uses this to pick the plan, not a generic checklist.",
						children: GOAL_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							selected: goal === option.id,
							label: option.label,
							detail: option.detail,
							onClick: () => setGoal(option.id)
						}, option.id))
					}) : null,
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						title: "What's your experience?",
						body: "Beginners start on the foundation week when the goal plan is harder.",
						children: EXPERIENCE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							selected: experience === option.id,
							label: option.label,
							detail: option.detail,
							onClick: () => setExperience(option.id)
						}, option.id))
					}) : null,
					step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						title: "How many days can you train?",
						body: "This becomes the weekly target on your dashboard.",
						children: DAY_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							selected: days === Number(option.id),
							label: option.label,
							detail: option.detail,
							onClick: () => setDays(Number(option.id))
						}, option.id))
					}) : null,
					step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
						title: "What equipment do you have?",
						body: "Pick everything you can actually use this week.",
						children: EQUIPMENT_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
							selected: equipment.includes(option.id),
							label: option.label,
							detail: option.detail,
							onClick: () => toggleEquipment(option.id)
						}, option.id))
					}) : null,
					step === 4 && profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rise",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-faint text-xs tracking-[0.18em] uppercase",
								children: "Your plan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "display section-title mt-3",
								children: planTitle(profile.currentProgramId)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mt-4 text-base",
								children: profile.planReason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "border-line mt-8 divide-y divide-line border-y text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Goal",
										value: GOAL_OPTIONS.find((item) => item.id === profile.goal)?.label ?? "Set"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Level",
										value: labelLevel(profile.experience)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Days",
										value: profile.trainingDays ? `${profile.trainingDays} / week` : "Set"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "Next",
										value: profile.nextProgramId ? planTitle(profile.nextProgramId) : "Stay on this plan"
									})
								]
							})
						]
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-accent mt-4 text-sm",
						role: "alert",
						children: error
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-0 flex gap-3 bg-bg py-4",
				children: [step > 0 && step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => setStep((value) => value - 1),
					children: "Back"
				}) : null, step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					disabled: !canContinue || busy,
					onClick: () => void next(),
					children: busy ? "Building plan…" : step === 3 ? "Build my plan" : "Continue"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: () => void navigate({ to: "/dashboard" }),
					children: "Go to training"
				})]
			})
		]
	});
}
function Step({ title, body, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display section-title",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-3 mb-6 text-sm",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children
			})
		]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right",
			children: value
		})]
	});
}
var TITLES = {
	"seven-day-start": "7 Day Beginner Start",
	"abs-attack": "Abs Attack",
	"strength-base": "Strength Base",
	"fat-loss-30": "30 Day Fat Loss",
	"chest-builder": "Chest Builder",
	"arm-builder": "Arm Builder",
	"shoulder-line": "Shoulder Line",
	"leg-engine": "Leg Engine",
	"home-muscle": "Home Muscle",
	"full-body-athlete": "Full Body Athlete"
};
function planTitle(id) {
	if (!id) return "7 Day Beginner Start";
	return TITLES[id] ?? "Your plan";
}
function OnboardingPage() {
	const { user, isPending } = useCurrentUserState();
	const [ready, setReady] = (0, import_react.useState)("loading");
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let cancel = false;
		getProfile().then((profile) => {
			if (!cancel) setReady(profile.onboardingCompleted ? "done" : "show");
		}).catch(() => {
			if (!cancel) setReady("show");
		});
		return () => {
			cancel = true;
		};
	}, [user?.id]);
	if (isPending || user && ready === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (ready === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingFlow, {});
}
//#endregion
export { OnboardingPage as component };
