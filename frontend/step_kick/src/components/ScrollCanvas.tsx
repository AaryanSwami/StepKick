"use client";

import { useEffect, useRef } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎛  CONFIGURATION — change anything here
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Total number of JPG frames in /public/frames/ */
const FRAME_COUNT = 285;

/**
 * Scroll height of the animation section.
 * ↑ taller  = slower animation (more scroll needed per frame)
 * ↓ shorter = faster animation
 * e.g. "200vh" | "400vh" | "600vh"
 */
const SCROLL_HEIGHT = "500vh";

/**
 * Filename pattern for your frames.
 * Current: ezgif-frame-001.jpg … ezgif-frame-020.jpg
 *
 * Examples to swap:
 *   `/frames/frame-${String(i).padStart(3,"0")}.jpg`   → frame-001.jpg
 *   `/frames/shoe_${String(i).padStart(2,"0")}.jpg`    → shoe_01.jpg
 *   `/frames/img${i}.jpg`                              → img1.jpg
 */
const FRAME_PATH = (i: number) =>
  `/frames3/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);

  /* ── draw a specific frame index ── */
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = images.current[index];
    if (!canvas || !img?.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // object-cover: scale image to fill canvas, centered
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const ox = (cw - sw) / 2;
    const oy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, sw, sh);
  };

  /* ── preload all frames ── */
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loaded++;
        if (loaded === 1) drawFrame(0); // paint first frame immediately
      };
      imgs.push(img);
    }
    images.current = imgs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── scroll handler ── */
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const windowH = window.innerHeight;

      // 0 = start of animation, 1 = end
      const progress = Math.min(Math.max((-top) / (height - windowH), 0), 1);

      const frameIndex = Math.min(
        Math.floor(progress * FRAME_COUNT),
        FRAME_COUNT - 1
      );

      if (frameIndex !== currentFrame.current) {
        currentFrame.current = frameIndex;
        drawFrame(frameIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── resize canvas when window changes ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawFrame(currentFrame.current);
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* "Scroll to explore" hint — uncomment to show */}
        {/* <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 z-10 pointer-events-none">
          <p className="text-xs tracking-widest uppercase opacity-50 text-foreground">
            Scroll to explore
          </p>
        </div> */}

        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
