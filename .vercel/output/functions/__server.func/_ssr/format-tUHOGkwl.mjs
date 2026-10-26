//#region node_modules/.nitro/vite/services/ssr/assets/format-tUHOGkwl.js
function formatClock(totalSeconds) {
	const safe = Math.max(0, Math.floor(totalSeconds));
	const minutes = Math.floor(safe / 60);
	const seconds = safe % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function formatDuration(totalMinutes) {
	const safe = Math.max(0, Math.round(totalMinutes));
	const hours = Math.floor(safe / 60);
	const minutes = safe % 60;
	if (hours <= 0) return `${minutes}m`;
	return `${hours}h ${minutes}m`;
}
function prescription(sets, reps, seconds) {
	if (seconds && !reps) return `${sets} × ${seconds}s`;
	if (reps && seconds) return `${sets} × ${reps} + ${seconds}s`;
	if (reps) return `${sets} × ${reps}`;
	return `${sets} sets`;
}
function safeRedirect(value, fallback = "/dashboard") {
	if (typeof value !== "string") return fallback;
	if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
	return value;
}
//#endregion
export { safeRedirect as i, formatDuration as n, prescription as r, formatClock as t };
