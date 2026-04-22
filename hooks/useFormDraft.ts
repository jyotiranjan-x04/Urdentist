/* ============================================================
   useFormDraft — localStorage persistence for form fields
   Source: Implementation Plan §5.3
   
   - Restores name, service, preferredDay, preferredTime on mount
   - Phone is NEVER stored (privacy)
   - Debounced 500ms write on each field change
   - clearDraft() called on submit success
   ============================================================ */

"use client";

import { useCallback, useEffect, useRef } from "react";

const STORAGE_KEY = "ur-dentist-form-draft";
const DEBOUNCE_MS = 500;

interface DraftData {
  name?: string;
  service?: string;
  preferredDay?: string;
  preferredTime?: string;
  notes?: string;
}

export function useFormDraft() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Restore saved draft (call on mount) */
  const restoreDraft = useCallback((): DraftData => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as DraftData;
      }
    } catch {
      // Corrupted data — clear it
      localStorage.removeItem(STORAGE_KEY);
    }
    return {};
  }, []);

  /** Save draft (debounced). Phone is explicitly excluded. */
  const saveDraft = useCallback((data: DraftData) => {
    if (typeof window === "undefined") return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ...safeData } = data;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData));
      } catch {
        // localStorage full or unavailable — silently fail
      }
    }, DEBOUNCE_MS);
  }, []);

  /** Clear draft (call on successful submission) */
  const clearDraft = useCallback(() => {
    if (typeof window === "undefined") return;
    if (timerRef.current) clearTimeout(timerRef.current);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { restoreDraft, saveDraft, clearDraft };
}
