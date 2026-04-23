/* ============================================================
   ANIMATED COUNTER — CountUp on scroll enter
   Source: Implementation Plan §3.3 (#5)
   Used by S-03 (Stats) and S-08 (Stats row)
   
   Uses requestAnimationFrame for smooth counting.
   Triggered by IntersectionObserver (counts when visible).
   Respects useAnimationConfig.enableCounters flag.
   ============================================================ */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface AnimatedCounterProps {
  /** Target number to count to */
  value: number;
  /** Optional suffix like "+" or "%" */
  suffix?: string;
  /** Optional prefix like "₹" */
  prefix?: string;
  /** Custom display value (e.g., "MDS") — overrides counting */
  displayValue?: string;
  /** Animation duration in ms */
  duration?: number;
  /** Label below the number */
  label: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  displayValue,
  duration = 2000,
  label,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const animate = useCallback(() => {
    if (displayValue) return;

    const startTime = performance.now();
    const startValue = 0;

    function updateCount(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out curve (decelerate)
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (value - startValue) * eased);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    }

    requestAnimationFrame(updateCount);
  }, [value, duration, displayValue]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
        } else {
          // Reset count so it can re-animate when scrolled back
          setCount(0);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  // Format number with commas for large values
  const formatNumber = (n: number): string => {
    if (n >= 1000) {
      return n.toLocaleString("en-US");
    }
    return n.toString();
  };

  return (
    <div ref={elementRef} className={className}>
      <div className="font-body text-3xl md:text-4xl font-bold tabular-nums">
        {prefix}
        {displayValue || formatNumber(count)}
        {!displayValue && suffix}
      </div>
      <p className="font-body text-sm mt-1 opacity-80">{label}</p>
    </div>
  );
}
