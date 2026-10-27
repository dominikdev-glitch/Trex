import { useEffect, useRef, useState } from "react";

export function MediaFrame({
  src,
  videoUrl,
  alt,
  label,
  className = "",
  autoPlay = false,
  loop = false,
  muted = true,
  playing = true,
}: {
  src?: string | null;
  videoUrl?: string | null;
  alt: string;
  label: string;
  className?: string;
  /** Player mode: autoplay muted loop demos without chrome controls. */
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playing?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setVideoFailed(false);
  }, [videoUrl]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !videoUrl || videoFailed) return;
    if (playing && autoPlay) {
      void node.play().catch(() => {
        /* autoplay may be blocked until a user gesture */
      });
    } else {
      node.pause();
    }
  }, [playing, autoPlay, videoUrl, videoFailed]);

  const showVideo = Boolean(videoUrl) && !videoFailed;
  const showImage = Boolean(src) && !imageFailed;

  return (
    <div className={`bg-subtle relative overflow-hidden ${className}`}>
      {showVideo ? (
        <video
          key={videoUrl ?? "video"}
          ref={videoRef}
          className="h-full w-full object-cover"
          src={videoUrl ?? undefined}
          poster={src ?? undefined}
          controls={!autoPlay}
          playsInline
          muted={muted}
          loop={loop}
          preload="auto"
          onError={() => setVideoFailed(true)}
        />
      ) : showImage ? (
        <img
          src={src ?? undefined}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex h-full min-h-56 flex-col justify-between p-5">
          <span className="text-faint text-xs tracking-[0.18em] uppercase">Demonstration</span>
          <p className="display text-4xl">{label}</p>
          <p className="text-muted max-w-sm text-sm">
            Drop a 10-second loop at this exercise&apos;s video URL. Until then, the thumbnail shows form.
          </p>
        </div>
      )}
    </div>
  );
}
