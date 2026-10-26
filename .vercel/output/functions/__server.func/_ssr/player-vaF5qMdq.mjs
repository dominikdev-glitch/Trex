import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as useCurrentUserState, t as Button } from "./ui-BmWTPcea.mjs";
import { a as Pause, i as Play, n as SkipForward, r as SkipBack } from "../_libs/lucide-react.mjs";
import { d as PageSkeleton, n as Route, u as ErrorState } from "./router-DzvRaRmd.mjs";
import { o as getWorkoutSession, t as completeWorkout } from "./account.functions-BpvVhRMw.mjs";
import { n as formatDuration, r as prescription, t as formatClock } from "./format-tUHOGkwl.mjs";
import { t as MediaFrame } from "./media-Bs8-O59h.mjs";
import { t as RedirectToSignIn } from "./gates-BFvJCRsE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/player-vaF5qMdq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WorkoutPlayer({ detail }) {
	const exercises = detail.exercises;
	const [index, setIndex] = (0, import_react.useState)(0);
	const [setNo, setSetNo] = (0, import_react.useState)(1);
	const [phase, setPhase] = (0, import_react.useState)("work");
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [remaining, setRemaining] = (0, import_react.useState)(null);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [doneCount, setDoneCount] = (0, import_react.useState)(0);
	const [confirmEnd, setConfirmEnd] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [cues, setCues] = (0, import_react.useState)(false);
	const [restLabel, setRestLabel] = (0, import_react.useState)("Recover");
	const pausedRef = (0, import_react.useRef)(paused);
	const phaseRef = (0, import_react.useRef)(phase);
	const originRef = (0, import_react.useRef)(Date.now());
	const pausedMsRef = (0, import_react.useRef)(0);
	const pauseStartedRef = (0, import_react.useRef)(null);
	const endAtRef = (0, import_react.useRef)(null);
	const finishedRef = (0, import_react.useRef)(false);
	const timerKindRef = (0, import_react.useRef)(null);
	const remainingRef = (0, import_react.useRef)(null);
	const exerciseRef = (0, import_react.useRef)(exercises[0]);
	const indexRef = (0, import_react.useRef)(0);
	const setNoRef = (0, import_react.useRef)(1);
	const doneCountRef = (0, import_react.useRef)(0);
	const advanceRef = (0, import_react.useRef)(() => {});
	pausedRef.current = paused;
	phaseRef.current = phase;
	const exercise = exercises[index];
	const total = exercises.length;
	exerciseRef.current = exercise;
	indexRef.current = index;
	setNoRef.current = setNo;
	doneCountRef.current = doneCount;
	function setLeft(value) {
		remainingRef.current = value;
		setRemaining(value);
	}
	function clearTimer() {
		endAtRef.current = null;
		timerKindRef.current = null;
		setLeft(null);
	}
	function arm(kind, seconds) {
		timerKindRef.current = kind;
		setLeft(seconds);
		endAtRef.current = Date.now() + seconds * 1e3;
	}
	function armWork(target = exerciseRef.current) {
		if (target?.seconds && target.seconds > 0) arm("work", target.seconds);
		else clearTimer();
	}
	function startRest(nextSet, label, target = exerciseRef.current) {
		const rest = target?.restSeconds ?? 30;
		setSetNo(nextSet);
		setNoRef.current = nextSet;
		setRestLabel(label);
		setPhase("rest");
		phaseRef.current = "rest";
		arm("rest", rest);
	}
	function advance() {
		const current = exerciseRef.current;
		const at = indexRef.current;
		const setNow = setNoRef.current;
		if (!current || phaseRef.current === "done" || finishedRef.current) return;
		if (setNow < current.sets) {
			startRest(setNow + 1, `Set ${setNow + 1} of ${current.sets}`, current);
			return;
		}
		const nextDone = doneCountRef.current + 1;
		setDoneCount(nextDone);
		doneCountRef.current = nextDone;
		if (at < exercises.length - 1) {
			const next = exercises[at + 1];
			setIndex(at + 1);
			indexRef.current = at + 1;
			exerciseRef.current = next;
			setSetNo(1);
			setNoRef.current = 1;
			startRest(1, `Next · ${next?.name ?? "next exercise"}`, next);
			return;
		}
		finish(nextDone);
	}
	advanceRef.current = advance;
	(0, import_react.useEffect)(() => {
		const first = exercises[0];
		if (first?.seconds) {
			timerKindRef.current = "work";
			remainingRef.current = first.seconds;
			endAtRef.current = Date.now() + first.seconds * 1e3;
			setRemaining(first.seconds);
		}
		const id = window.setInterval(() => {
			if (pausedRef.current || phaseRef.current === "done" || finishedRef.current) return;
			setElapsed(Math.floor((Date.now() - originRef.current - pausedMsRef.current) / 1e3));
			if (!endAtRef.current) return;
			const left = Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1e3));
			if (left > 0) {
				if (remainingRef.current !== left) setLeft(left);
				return;
			}
			const kind = timerKindRef.current;
			endAtRef.current = null;
			timerKindRef.current = null;
			setLeft(null);
			if (kind === "rest") {
				setPhase("work");
				phaseRef.current = "work";
				const next = exerciseRef.current;
				if (next?.seconds) arm("work", next.seconds);
				return;
			}
			if (kind === "work" && phaseRef.current === "work") advanceRef.current();
		}, 200);
		return () => window.clearInterval(id);
	}, []);
	function pause() {
		setPaused((value) => {
			if (!value) {
				pauseStartedRef.current = Date.now();
				if (endAtRef.current) {
					setLeft(Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1e3)));
					endAtRef.current = null;
				}
				return true;
			}
			if (pauseStartedRef.current) {
				pausedMsRef.current += Date.now() - pauseStartedRef.current;
				pauseStartedRef.current = null;
			}
			const left = remainingRef.current;
			if (timerKindRef.current && left && left > 0) endAtRef.current = Date.now() + left * 1e3;
			return false;
		});
	}
	function completeSet() {
		if (phaseRef.current !== "work" || finishedRef.current) return;
		clearTimer();
		advance();
	}
	function skipRest() {
		if (phaseRef.current !== "rest") return;
		endAtRef.current = null;
		timerKindRef.current = null;
		setLeft(null);
		setPhase("work");
		phaseRef.current = "work";
		armWork();
	}
	function goTo(nextIndex) {
		const next = exercises[nextIndex];
		if (!next || phaseRef.current === "done") return;
		clearTimer();
		setPhase("work");
		phaseRef.current = "work";
		setIndex(nextIndex);
		indexRef.current = nextIndex;
		exerciseRef.current = next;
		setSetNo(1);
		setNoRef.current = 1;
		armWork(next);
	}
	function skipExercise() {
		if (indexRef.current >= total - 1) return;
		goTo(indexRef.current + 1);
	}
	function previous() {
		if (indexRef.current === 0) return;
		goTo(indexRef.current - 1);
	}
	async function finish(count = doneCount) {
		if (finishedRef.current || saving) return;
		if (count < 1) {
			setError("Complete at least one exercise before ending.");
			setConfirmEnd(false);
			return;
		}
		finishedRef.current = true;
		setSaving(true);
		setError(null);
		setPhase("done");
		phaseRef.current = "done";
		endAtRef.current = null;
		try {
			const saved = await completeWorkout({ data: {
				workoutId: detail.workout.id,
				durationSec: Math.max(30, elapsed),
				exercisesCompleted: count,
				tzOffsetMin: (/* @__PURE__ */ new Date()).getTimezoneOffset()
			} });
			setResult(saved);
		} catch (caught) {
			finishedRef.current = false;
			setPhase("work");
			phaseRef.current = "work";
			setError(caught instanceof Error ? caught.message : "Could not save the session.");
		} finally {
			setSaving(false);
			setConfirmEnd(false);
		}
	}
	if (result) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-faint text-xs tracking-[0.2em] uppercase",
				children: "Session complete"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display hero-title rise mt-4",
				children: detail.workout.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-accent draw mt-8 h-px w-24" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 grid grid-cols-2 gap-x-6 gap-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Time",
						value: formatClock(result.durationSec)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Exercises",
						value: String(result.exercisesCompleted)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Calories",
						value: String(result.calories)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Streak",
						value: `${result.streak} day${result.streak === 1 ? "" : "s"}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted mt-6 text-sm tabular-nums",
				children: [
					result.totalWorkouts,
					" sessions logged · ",
					formatDuration(result.totalMinutes),
					" total"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						children: "Back to training"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/progress",
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "w-full",
						children: "View progress"
					})
				})]
			})
		]
	});
	if (!exercise) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted p-8",
		children: "This session has no exercises."
	});
	const resting = phase === "rest";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "text-muted text-sm",
						children: "Close"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums",
						children: [
							String(index + 1).padStart(2, "0"),
							" / ",
							String(total).padStart(2, "0")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tabular-nums",
						children: formatClock(elapsed)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-line mt-4 h-px",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-fg h-px",
					style: { width: `${index / Math.max(1, total) * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-faint mt-6 text-xs tracking-[0.18em] uppercase",
				children: detail.workout.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display mt-2 text-5xl sm:text-6xl",
				children: resting ? "Rest" : exercise.name
			}),
			resting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "display text-accent mt-4 text-7xl tabular-nums",
				children: formatClock(remaining ?? 0)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mt-3 text-lg",
				children: restLabel
			})] }) : exercise.seconds ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "display mt-4 text-7xl tabular-nums",
				children: formatClock(remaining ?? exercise.seconds)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted mt-3 text-lg",
				children: [
					"Set ",
					setNo,
					" of ",
					exercise.sets,
					paused ? " · paused" : ""
				]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted mt-3 text-lg",
				children: [
					"Set ",
					setNo,
					" of ",
					exercise.sets,
					" · ",
					prescription(1, exercise.reps, exercise.seconds).replace("1 × ", "")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaFrame, {
				src: exercise.thumbnailUrl,
				videoUrl: exercise.videoUrl,
				alt: exercise.name,
				label: exercise.name,
				className: "mt-6 aspect-[4/5] sm:aspect-[16/9]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted mt-4 text-sm",
				children: [
					exercise.targetMuscles.join(" · "),
					" · Rest ",
					exercise.restSeconds,
					"s"
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-accent mt-4 text-sm",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex flex-col gap-3 pt-6",
				children: [
					confirmEnd ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-line border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: "End this session and save what you finished?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => void finish(),
								disabled: saving,
								children: saving ? "Saving…" : "Save session"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => setConfirmEnd(false),
								children: "Keep going"
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: resting ? skipRest : completeSet,
						children: resting ? "Skip rest" : setNo < exercise.sets ? "Complete set" : index < total - 1 ? "Complete exercise" : "Finish workout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								onClick: previous,
								"aria-label": "Previous exercise",
								disabled: index === 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "size-4" }), "Prev"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								onClick: pause,
								"aria-label": paused ? "Resume" : "Pause",
								children: [paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }), paused ? "Resume" : "Pause"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								onClick: skipExercise,
								"aria-label": "Skip exercise",
								disabled: index >= total - 1,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "size-4" }), "Skip"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-muted text-sm",
						onClick: () => setCues((value) => !value),
						children: cues ? "Hide cues" : "Form cues"
					}),
					cues ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-line space-y-4 border p-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-faint text-xs tracking-[0.16em] uppercase",
								children: "How"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-2 list-decimal space-y-1 pl-4",
								children: exercise.instructions.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: step }, step))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-faint text-xs tracking-[0.16em] uppercase",
								children: "Watch for"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "text-muted mt-2 space-y-1",
								children: exercise.mistakes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-faint",
								children: "Easier · "
							}), exercise.beginnerMod] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-faint",
								children: "Harder · "
							}), exercise.advancedMod] })
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-faint pb-4 text-sm",
						onClick: () => setConfirmEnd(true),
						children: "End session early"
					})
				]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-faint text-xs tracking-[0.16em] uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "display mt-1 text-4xl tabular-nums",
		children: value
	})] });
}
function PlayerPage() {
	const { id } = Route.useParams();
	const { user, isPending } = useCurrentUserState();
	const [detail, setDetail] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let cancel = false;
		getWorkoutSession({ data: id }).then((next) => {
			if (cancel) return;
			if (!next) setError("That session does not exist.");
			else setDetail(next);
		}).catch((caught) => {
			if (!cancel) setError(caught instanceof Error ? caught.message : "Could not open the session.");
		});
		return () => {
			cancel = true;
		};
	}, [user?.id, id]);
	if (isPending || user && !detail && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-xl px-5 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: error })
	});
	if (!detail) return null;
	if (detail.locked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-faint text-xs tracking-[0.18em] uppercase",
				children: "TREX Pro"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display section-title mt-3",
				children: detail.workout.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted mt-4 text-sm",
				children: [
					"This session is part of ",
					detail.workout.programTitle,
					". The preview is open. The rest of the plan is on Pro."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/pricing",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "See Pro" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/workouts/$id",
					params: { id: detail.workout.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						children: "Session details"
					})
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkoutPlayer, { detail });
}
//#endregion
export { PlayerPage as component };
