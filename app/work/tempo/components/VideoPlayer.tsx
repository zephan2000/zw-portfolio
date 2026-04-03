"use client";

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

  return (
    <div>
      <div className="relative bg-foreground/5 rounded-lg overflow-hidden aspect-video">
        {videoId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title="TEMPO walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-tertiary text-sm">
            Video unavailable
          </div>
        )}
      </div>
      <p className="text-sm text-text-tertiary mt-3 text-center">
        {VIDEO_CAPTION}
      </p>
    </div>
  );
}
