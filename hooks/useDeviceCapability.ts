/* ============================================================
   useDeviceCapability — Hardware detection for animation tiers
   Source: Implementation Plan §2.2, PRODUCTION_UPGRADE §13.3
   
   Checks hardwareConcurrency + deviceMemory to determine
   if the device can handle full GSAP animations
   ============================================================ */

"use client";

import { useState, useEffect } from "react";

export interface DeviceCapability {
  /** CPU cores available (navigator.hardwareConcurrency) */
  cores: number;
  /** Device memory in GB (navigator.deviceMemory) — 0 if unavailable */
  memory: number;
  /** true if device can run full animations (≥4 cores AND ≥4GB RAM) */
  isHighEnd: boolean;
  /** true if device is mid-tier (2-3 cores OR 2-3GB RAM) */
  isMidTier: boolean;
  /** true if device is low-end (≤2 cores OR ≤2GB RAM) */
  isLowEnd: boolean;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    cores: 4,
    memory: 4,
    isHighEnd: true,
    isMidTier: false,
    isLowEnd: false,
  });

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;

    const isLowEnd = cores <= 2 || memory <= 2;
    const isHighEnd = cores >= 4 && memory >= 4;
    const isMidTier = !isLowEnd && !isHighEnd;

    setCapability({ cores, memory, isHighEnd, isMidTier, isLowEnd });
  }, []);

  return capability;
}
