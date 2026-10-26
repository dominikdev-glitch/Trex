import { o as __toESM } from "../_runtime.mjs";
import { $ as require_react, E as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-Bs8-O59h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MediaFrame({ src, videoUrl, alt, label, className = "" }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const showImage = Boolean(src) && !failed;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `bg-subtle relative overflow-hidden ${className}`,
		children: videoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			className: "h-full w-full object-cover",
			src: videoUrl,
			poster: src ?? void 0,
			controls: true,
			playsInline: true,
			preload: "metadata"
		}) : showImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: src ?? void 0,
			alt,
			className: "h-full w-full object-cover",
			onError: () => setFailed(true)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full min-h-56 flex-col justify-between p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-faint text-xs tracking-[0.18em] uppercase",
					children: "Demonstration"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "display text-4xl",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted max-w-sm text-sm",
					children: "No video is attached yet. A video URL saved on this exercise will play in this frame."
				})
			]
		})
	});
}
//#endregion
export { MediaFrame as t };
