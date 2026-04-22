/* ============================================================
   BEFORE/AFTER SLIDER — Drag-based comparison
   Source: Implementation Plan §4.2 S-05, C-05
   
   C-05: Uses AI-generated illustrative images (not real patient photos)
   
   Touch + mouse drag. Divider line with gold handle.
   Labels "Before" / "After" pinned to corners.
   ============================================================ */

"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import clsx from "clsx";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-sand",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPosition)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setSliderPosition((p) => Math.max(p - 2, 5));
        if (e.key === "ArrowRight") setSliderPosition((p) => Math.min(p + 2, 95));
      }}
    >
      {/* After image (full, behind) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt="After treatment"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Before image (clipped to slider position) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before treatment"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-pearl shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold shadow-float flex items-center justify-center">
          <svg className="w-5 h-5 text-pearl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4M8 15l4 4 4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-espresso/60 text-pearl font-body text-xs font-medium z-10">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-espresso/60 text-pearl font-body text-xs font-medium z-10">
        {afterLabel}
      </span>
    </div>
  );
}
