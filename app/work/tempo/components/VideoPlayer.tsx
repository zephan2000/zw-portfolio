"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { VIDEO_CAPTION } from "../data";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/
  );
  return match ? match[1] : null;
}

const YOUTUBE_URL = "https://www.youtube.com/watch?v=BTYSD4lohOQ";

export default function VideoPlayer() {
  const videoId = getYouTubeId(YOUTUBE_URL);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFloating, setIsFloating] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Track when the inline container scrolls out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);

        if (!visible && !dismissed) {
          setIsFloating(true);
        } else if (visible) {
          setIsFloating(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [dismissed]);

  // Autoplay (muted) when the video first enters viewport
  useEffect(() => {
    if (isVisible && !hasPlayed) {
      setHasPlayed(true);
    }
  }, [isVisible, hasPlayed]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    setIsFloating(false);
  }, []);

  const handleScrollBack = useCallback(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  // Build embed URL — autoplay muted once the user has scrolled to the section
  const embedParams = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    ...(hasPlayed ? { autoplay: "1", mute: "1" } : {}),
  });

  const embedSrc = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?${embedParams.toString()}`
    : null;

  return (
    <>
      {/* Inline container — always reserves space in the layout */}
      <div ref={containerRef}>
        <div
          className={`relative bg-foreground/5 rounded-lg overflow-hidden aspect-video transition-opacity duration-300 ${
            isFloating ? "opacity-0" : "opacity-100"
          }`}
        >
          {embedSrc && !isFloating ? (
            <iframe
              className="w-full h-full"
              src={embedSrc}
              title="TEMPO walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : !isFloating ? (
            <div className="w-full h-full flex items-center justify-center text-text-tertiary text-sm">
              Video unavailable
            </div>
          ) : null}
        </div>
        <p className="text-sm text-text-tertiary mt-3 text-center">
          {VIDEO_CAPTION}
        </p>
      </div>

      {/* Floating mini-player */}
      {isFloating && embedSrc && (
        <div
          className="fixed bottom-5 right-5 z-50 rounded-lg overflow-hidden shadow-2xl border border-border bg-foreground/5 animate-in slide-in-from-bottom-4 fade-in duration-300"
          style={{ width: 320, aspectRatio: "16/9" }}
        >
          <iframe
            className="w-full h-full"
            src={embedSrc}
            title="TEMPO walkthrough (mini)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Controls overlay */}
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button
              onClick={handleScrollBack}
              className="bg-black/60 hover:bg-black/80 text-white rounded-md p-1.5 transition-colors backdrop-blur-sm"
              title="Scroll back to video"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleDismiss}
              className="bg-black/60 hover:bg-black/80 text-white rounded-md p-1.5 transition-colors backdrop-blur-sm"
              title="Close mini player"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
