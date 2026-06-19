"use client";

import { useEffect, useRef, useState } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎛  CONFIGURATION — change anything here
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Total number of JPG frames in /public/frames3/ */
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
 * Current: ezgif-frame-001.jpg … ezgif-frame-285.jpg
 */
const FRAME_PATH = (i: number) =>
  `/frames3/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);

  // Loading Overlay states
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isOverlayMounted, setIsOverlayMounted] = useState(true);

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
    let loadedCount = 0;

    // Prevent scrolling during preload
    document.body.style.overflow = "hidden";

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      
      img.onload = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / FRAME_COUNT) * 100);
        setLoadProgress(percent);

        if (loadedCount === 1) {
          drawFrame(0); // paint first frame immediately
        }

        if (loadedCount === FRAME_COUNT) {
          setIsLoading(false);
          document.body.style.overflow = ""; // enable scrolling
          setTimeout(() => {
            setIsOverlayMounted(false);
          }, 800); // wait for fade transition
        }
      };

      img.onerror = () => {
        // Fallback for errors to prevent blocking the site forever
        loadedCount++;
        const percent = Math.round((loadedCount / FRAME_COUNT) * 100);
        setLoadProgress(percent);

        if (loadedCount === FRAME_COUNT) {
          setIsLoading(false);
          document.body.style.overflow = "";
          setTimeout(() => {
            setIsOverlayMounted(false);
          }, 800);
        }
      };

      imgs.push(img);
    }
    images.current = imgs;

    // Cleanup: restore scroll if the component unmounts early
    return () => {
      document.body.style.overflow = "";
    };
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
      
      {/* 🎬 Premium Experience Preloader */}
      {isOverlayMounted && (
        <div 
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d0d] text-white transition-opacity duration-700 ease-in-out ${
            isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center space-y-6 max-w-xs w-full px-4 text-center">
            {/* Luxury Serif Title */}
            <h1 className="font-serif text-3xl tracking-wider font-light italic">
              Stepkick
            </h1>
            
            {/* Elegant Circular Progress SVG */}
            <div className="relative flex items-center justify-center w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="white"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray={213.6}
                  strokeDashoffset={213.6 - (213.6 * loadProgress) / 100}
                  className="transition-all duration-200 ease-out"
                />
              </svg>
              <span className="absolute text-sm font-sans font-medium tracking-tight">
                {loadProgress}%
              </span>
            </div>

            {/* Status indicators */}
            <div className="space-y-1">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/50">
                Preloading Experience
              </p>
              <p className="text-xs text-white/70 font-light">
                Assembling shoe craft animation...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
