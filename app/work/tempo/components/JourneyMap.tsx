"use client";

import { useState } from "react";
import { JOURNEY_TRACKS, type JourneyNode } from "../data";

function Arrow() {
  return (
    <div className="flex-shrink-0 w-3 h-10 flex items-center">
      <svg viewBox="0 0 12 8" fill="none" className="w-3 h-2">
        <line x1="0" y1="4" x2="9" y2="4" stroke="currentColor" strokeWidth="0.75" className="text-border" />
        <path d="M7 1.5L10 4L7 6.5" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="text-border" />
      </svg>
    </div>
  );
}

function NodeCircle({
  node,
  isActive,
  trackVariant,
  onClick,
  onHover,
  onLeave,
}: {
  node: JourneyNode;
  isActive: boolean;
  trackVariant: "setup" | "post";
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  const isSetup = trackVariant === "setup";

  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="flex flex-col items-center flex-1 cursor-pointer select-none group"
    >
      <div
        className={`relative w-10 h-10 rounded-full border-[1.5px] flex items-center justify-center text-xs font-medium transition-[color,border-color,background-color,box-shadow] duration-300 ease-out ${
          isActive
            ? isSetup
              ? "border-accent bg-accent-surface text-accent"
              : "border-emerald-400 bg-emerald-50 text-emerald-700"
            : `border-border bg-surface text-text-secondary ${
                isSetup
                  ? "group-hover:border-accent group-hover:text-accent"
                  : "group-hover:border-emerald-400 group-hover:text-emerald-700"
              }`
        }`}
        style={{
          boxShadow: isActive
            ? isSetup
              ? "0 0 0 1px var(--accent), 0 0 8px rgba(28, 78, 216, 0.1)"
              : "0 0 0 1px rgb(52, 211, 153), 0 0 8px rgba(52, 211, 153, 0.1)"
            : "inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 0 0 0.5px rgba(0, 0, 0, 0.04)",
        }}
      >
        {node.abbr}
        {node.hasBadge && (
          <span className="absolute -top-[3px] -right-[3px] w-[10px] h-[10px] rounded-full bg-amber-300 border-[1.5px] border-surface" />
        )}
      </div>
      <span
        className={`text-[10px] text-center mt-[5px] max-w-16 leading-[1.3] ${
          isActive ? "text-text-secondary font-medium" : "text-text-tertiary"
        }`}
      >
        {node.label}
      </span>
    </button>
  );
}

export default function JourneyMap() {
  const [lockedNode, setLockedNode] = useState<JourneyNode>(
    JOURNEY_TRACKS[0].nodes[0]
  );
  const [hoveredNode, setHoveredNode] = useState<JourneyNode | null>(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  const activeNode = hoveredNode ?? lockedNode;
  const activeTrack = JOURNEY_TRACKS.find((t) =>
    t.nodes.some((n) => n.id === activeNode.id)
  );

  return (
    <div className="py-5 my-8 bg-surface border border-border rounded-xl px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-[13px] font-medium text-foreground">
          System architecture
        </span>
        <span className="text-[11px] text-text-tertiary">
          Hover to preview · click to lock
        </span>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-5 flex-wrap">
        <div className="flex items-center gap-[6px] text-[11px] text-text-secondary">
          <span className="w-[10px] h-[10px] rounded-full bg-accent-surface border border-accent" />
          Workspace setup (once)
        </div>
        <div className="flex items-center gap-[6px] text-[11px] text-text-secondary">
          <span className="w-[10px] h-[10px] rounded-full bg-emerald-50 border border-emerald-400" />
          Post automation (ongoing)
        </div>
        <div className="flex items-center gap-[6px] text-[11px] text-text-secondary">
          <span className="w-[10px] h-[10px] rounded-full bg-amber-100 border border-amber-300" />
          State management layer
        </div>
      </div>

      {/* Mobile track switcher */}
      <div className="flex gap-1 bg-[var(--background)] rounded-full p-1 w-fit mb-4 md:hidden">
        {JOURNEY_TRACKS.map((track, i) => (
          <button
            key={track.label}
            onClick={() => {
              setActiveTrackIndex(i);
              setLockedNode(track.nodes[0]);
            }}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
              activeTrackIndex === i
                ? "bg-surface text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            {track.label}
          </button>
        ))}
      </div>

      {/* Desktop: both tracks */}
      <div className="hidden md:block">
        {/* Setup track */}
        <div className="flex items-start mb-4">
          <div className="w-16 flex-shrink-0 pt-[13px]">
            <p className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.06em] leading-[1.3]">
              {JOURNEY_TRACKS[0].label}
            </p>
            <p className="text-[10px] text-text-tertiary mt-[2px]">
              {JOURNEY_TRACKS[0].sublabel}
            </p>
          </div>
          <div className="flex flex-1 items-start">
            {JOURNEY_TRACKS[0].nodes.map((node, i) => (
              <div key={node.id} className="contents">
                <NodeCircle
                  node={node}
                  isActive={activeNode.id === node.id}
                  trackVariant="setup"
                  onClick={() => setLockedNode(node)}
                  onHover={() => setHoveredNode(node)}
                  onLeave={() => setHoveredNode(null)}
                />
                {i < JOURNEY_TRACKS[0].nodes.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
        </div>

        {/* Automation boundary */}
        <div className="flex items-center gap-[10px] ml-16 mb-4">
          <div className="flex-1 h-[0.5px] bg-border" />
          <span className="text-[10px] text-text-tertiary uppercase tracking-[0.06em] whitespace-nowrap">
            automation boundary
          </span>
          <div className="flex-1 h-[0.5px] bg-border" />
        </div>

        {/* Per post track */}
        <div className="flex items-start">
          <div className="w-16 flex-shrink-0 pt-[13px]">
            <p className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.06em] leading-[1.3]">
              {JOURNEY_TRACKS[1].label}
            </p>
            <p className="text-[10px] text-text-tertiary mt-[2px]">
              {JOURNEY_TRACKS[1].sublabel}
            </p>
          </div>
          <div className="flex flex-1 items-start">
            {JOURNEY_TRACKS[1].nodes.map((node, i) => (
              <div key={node.id} className="contents">
                <NodeCircle
                  node={node}
                  isActive={activeNode.id === node.id}
                  trackVariant="post"
                  onClick={() => setLockedNode(node)}
                  onHover={() => setHoveredNode(node)}
                  onLeave={() => setHoveredNode(null)}
                />
                {i < JOURNEY_TRACKS[1].nodes.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: single track */}
      <div className="md:hidden">
        <div className="flex items-start overflow-x-auto pb-2">
          {JOURNEY_TRACKS[activeTrackIndex].nodes.map((node, i) => (
            <div key={node.id} className="contents">
              <NodeCircle
                node={node}
                isActive={activeNode.id === node.id}
                trackVariant={JOURNEY_TRACKS[activeTrackIndex].variant}
                onClick={() => setLockedNode(node)}
                onHover={() => setHoveredNode(node)}
                onLeave={() => setHoveredNode(null)}
              />
              {i < JOURNEY_TRACKS[activeTrackIndex].nodes.length - 1 && (
                <Arrow />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="mt-4 border border-border rounded-lg p-[14px_18px] bg-[var(--background)] min-h-[90px] glass-surface">
        {activeNode ? (
          <>
            <div className="flex items-start justify-between gap-[10px] mb-2">
              <h4 className="text-[13px] font-medium text-foreground leading-[1.4]">
                {activeNode.title}
              </h4>
              <span
                className={`text-[10px] px-2 py-[2px] rounded-full whitespace-nowrap flex-shrink-0 ${
                  activeTrack?.variant === "post"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-accent-surface text-accent"
                }`}
              >
                {activeTrack?.variant === "post" ? "Per post" : "Setup"}
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-[1.65]">
              {activeNode.description}
            </p>
            {activeNode.note && (
              <div className="mt-[10px] p-[8px_12px] rounded-md bg-amber-50 text-[11px] text-amber-800 leading-[1.55]">
                {activeNode.note}
              </div>
            )}
          </>
        ) : (
          <p className="text-xs text-text-tertiary">
            Select a node above to see how each component works.
          </p>
        )}
      </div>
    </div>
  );
}
