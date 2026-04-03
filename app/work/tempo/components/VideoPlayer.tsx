"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { VIDEO_CAPTION } from "../data";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/
  );
  return match ? match[1] : null;
}

const YOUTUBE_URL = "https://youtu.be/TmoN5tzbYkE";
const PIP_W = 320;
const PIP_H = 180;
const PIP_INSET = 20;

export default function VideoPlayer() {
  const videoId = getYouTubeId(YOUTUBE_URL);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const floatingRef = useRef(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [floating, setFloating] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [seen, setSeen] = useState(false);

  // ── Inline: rAF loop keeps the fixed wrapper aligned over the placeholder ──
  useEffect(() => {
    if (floating) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    floatingRef.current = false;

    const tick = () => {
      const ph = placeholderRef.current;
      const wr = wrapperRef.current;
      if (ph && wr) {
        const r = ph.getBoundingClientRect();
        wr.style.transition = "opacity 0.3s";
        wr.style.top = r.top + "px";
        wr.style.left = r.left + "px";
        wr.style.width = r.width + "px";
        wr.style.height = r.height + "px";
        wr.style.opacity = "1";
        wr.style.borderRadius = "8px";
        wr.style.boxShadow = "none";
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [floating]);

  // ── Floating: stop rAF, CSS-transition from last inline position to corner ──
  useEffect(() => {
    if (!floating) return;
    floatingRef.current = true;
    const wr = wrapperRef.current;
    if (!wr) return;

    // One frame delay so the browser paints the current (inline) position first
    requestAnimationFrame(() => {
      const ease = "0.5s cubic-bezier(0.4,0,0.2,1)";
      wr.style.transition = [
        `top ${ease}`,
        `left ${ease}`,
        `width ${ease}`,
        `height ${ease}`,
        "border-radius 0.3s ease",
        "box-shadow 0.4s ease",
      ].join(", ");
      wr.style.top = `${window.innerHeight - PIP_H - PIP_INSET}px`;
      wr.style.left = `${window.innerWidth - PIP_W - PIP_INSET}px`;
      wr.style.width = PIP_W + "px";
      wr.style.height = PIP_H + "px";
      wr.style.opacity = "1";
      wr.style.borderRadius = "12px";
      wr.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
    });

    // Schedule initial fade
    scheduleFade();

    // Reposition on window resize while floating
    const onResize = () => {
      if (!floatingRef.current || !wrapperRef.current) return;
      wrapperRef.current.style.transition = "none";
      wrapperRef.current.style.top = `${window.innerHeight - PIP_H - PIP_INSET}px`;
      wrapperRef.current.style.left = `${window.innerWidth - PIP_W - PIP_INSET}px`;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelFade();
      window.removeEventListener("resize", onResize);
    };
  }, [floating]);

  // ── Intersection observer: trigger float / unfloat ──
  useEffect(() => {
    const el = placeholderRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          // Don't auto-revert to inline — only the expand button does that
        } else if (seen && !dismissed) {
          setFloating(true);
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [seen, dismissed]);

  // ── Fade helpers: 3s hold at full opacity, then fade ──
  const cancelFade = useCallback(() => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const scheduleFade = useCallback(() => {
    cancelFade();
    fadeTimerRef.current = setTimeout(() => {
      if (!floatingRef.current) return;
      if (wrapperRef.current) {
        wrapperRef.current.style.transition = "opacity 0.6s ease";
        wrapperRef.current.style.opacity = "0.45";
      }
      if (controlsRef.current) controlsRef.current.style.opacity = "0";
    }, 3000);
  }, [cancelFade]);

  // ── Hover handlers ──
  // Work because the iframe is pointer-events-none when floating,
  // so the wrapper div receives mouse events over its full area.
  const onEnter = useCallback(() => {
    if (!floatingRef.current) return;
    cancelFade();
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = "opacity 0.2s ease";
      wrapperRef.current.style.opacity = "1";
    }
    if (controlsRef.current) controlsRef.current.style.opacity = "1";
  }, [cancelFade]);

  const onLeave = useCallback(() => {
    if (!floatingRef.current) return;
    scheduleFade();
  }, [scheduleFade]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    setFloating(false);
  }, []);

  const handleExpand = useCallback(() => {
    placeholderRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  const embedSrc = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&mute=1`
    : null;

  if (!embedSrc) return null;

  return (
    <div>
      {/* Placeholder — sits in document flow, reserves space */}
      <div
        ref={placeholderRef}
        className="relative rounded-lg overflow-hidden aspect-video bg-foreground/5"
      />

      {/* Single iframe wrapper — always position:fixed, repositioned via JS.
          When inline: rAF overlays it on the placeholder.
          When floating: CSS transition moves it to the corner. */}
      {seen && !dismissed && (
        <div
          ref={wrapperRef}
          className="fixed z-50 overflow-hidden"
          style={{ top: 0, left: 0, width: 0, height: 0, opacity: 0 }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          <iframe
            className={`w-full h-full border-0 ${
              floating ? "pointer-events-none" : ""
            }`}
            src={embedSrc}
            title="TEMPO walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* PiP controls — hidden when inline, fade in on hover when floating.
              pointer-events-auto so buttons remain clickable over the
              pointer-events-none iframe. */}
          {floating && (
            <div
              ref={controlsRef}
              className="absolute top-2 right-2 flex gap-1.5 pointer-events-auto"
              style={{ opacity: 0, transition: "opacity 0.2s ease" }}
            >
              <button
                onClick={handleExpand}
                className="bg-black/60 hover:bg-black/80 text-white rounded-md p-1.5 backdrop-blur-sm transition-colors"
                title="Back to video"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
              <button
                onClick={handleDismiss}
                className="bg-black/60 hover:bg-black/80 text-white rounded-md p-1.5 backdrop-blur-sm transition-colors"
                title="Close"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      <p className="text-sm text-text-tertiary mt-3 text-center">
        {VIDEO_CAPTION}
      </p>
    </div>
  );
}
