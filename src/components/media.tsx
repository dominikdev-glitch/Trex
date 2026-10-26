import { useState } from "react";

export function MediaFrame({
  src,
  videoUrl,
  alt,
  label,
  className = "",
}: {
  src?: string | null;
  videoUrl?: string | null;
  alt: string;
  label: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={`bg-subtle relative overflow-hidden ${className}`}>
      {videoUrl ? (
        <video
          className="h-full w-full object-cover"
          src={videoUrl}
          poster={src ?? undefined}
          controls
          playsInline
          preload="metadata"
        />
      ) : showImage ? (
        <img
          src={src ?? undefined}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full min-h-56 flex-col justify-between p-5">
          <span className="text-faint text-xs tracking-[0.18em] uppercase">Demonstration</span>
          <p className="display text-4xl">{label}</p>
          <p className="text-muted max-w-sm text-sm">
            No video is attached yet. A video URL saved on this exercise will play in this frame.
          </p>
        </div>
      )}
    </div>
  );
}
