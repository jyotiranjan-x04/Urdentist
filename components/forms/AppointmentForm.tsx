/* ============================================================
   APPOINTMENT FORM — 2-step booking form with 7-state machine
   Source: Implementation Plan §5.2 (C-02 + C-07)
   
   States: idle → step1 → step2 → submitting → success | error | timeout
   
   Features:
   - 2-step UX with independent Step 1 validation (C-02)
   - 7-state FormState machine (C-07)
   - 10s AbortController timeout
   - 2-retry exhaustion → auto-redirect to WhatsApp
   - localStorage draft persistence (no phone)
   - GA4 event on success
   - HeroStrip pre-fill integration (C-03)
   ============================================================ */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Spinner from "@/components/ui/Spinner";
import SuccessMessage from "@/components/forms/SuccessMessage";
import { useFormDraft } from "@/hooks/useFormDraft";
import {
  appointmentSchema,
  SERVICE_OPTIONS,
  DAY_OPTIONS,
  TIME_OPTIONS,
  type AppointmentFormData,
} from "@/lib/schema";
import { WA_LINK, WA_MESSAGES } from "@/lib/constants";
import { track } from "@/lib/analytics";

/* ═══════════════════════════════════════════
   FORM STATE MACHINE (C-07)
   ═══════════════════════════════════════════ */
type FormState =
  | "idle"
  | "step1"
  | "step2"
  | "submitting"
  | "success"
  | "error"
  | "timeout";

interface AppointmentFormProps {
  /** Pre-filled name from HeroStrip (C-03) */
  prefillName?: string;
  /** Pre-filled phone from HeroStrip (C-03) */
  prefillPhone?: string;
}

export default function AppointmentForm({
  prefillName,
  prefillPhone,
}: AppointmentFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [successName, setSuccessName] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const { restoreDraft, saveDraft, clearDraft } = useFormDraft();

  // ═══ React Hook Form setup ═══
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: undefined,
      preferredDay: undefined,
      preferredTime: undefined,
      notes: "",
    },
  });

  // ═══ Restore draft on mount ═══
  useEffect(() => {
    const draft = restoreDraft();
    if (draft.name) setValue("name", draft.name);
    if (draft.service) setValue("service", draft.service as AppointmentFormData["service"]);
    if (draft.preferredDay) setValue("preferredDay", draft.preferredDay as AppointmentFormData["preferredDay"]);
    if (draft.preferredTime) setValue("preferredTime", draft.preferredTime as AppointmentFormData["preferredTime"]);
    if (draft.notes) setValue("notes", draft.notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ═══ Apply HeroStrip pre-fill (C-03) ═══
  useEffect(() => {
    if (prefillName) setValue("name", prefillName);
    if (prefillPhone) setValue("phone", prefillPhone);
    if (prefillName || prefillPhone) {
      setFormState("step1");
    }
  }, [prefillName, prefillPhone, setValue]);

  // ═══ Save draft on field changes (debounced) ═══
  const watchedFields = watch(["name", "service", "preferredDay", "preferredTime", "notes"]);
  useEffect(() => {
    if (formState === "success") return;
    const [name, service, preferredDay, preferredTime, notes] = watchedFields;
    saveDraft({ name, service, preferredDay, preferredTime, notes });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedFields[0], watchedFields[1], watchedFields[2], watchedFields[3], watchedFields[4]]);

  // ═══ Step 1 → Step 2 transition ═══
  const handleStep1Next = useCallback(async () => {
    // Use RHF trigger to validate + clear stale errors
    const isValid = await trigger(["name", "phone"]);
    if (!isValid) return;

    setFormState("step2");
    track.formStep2();
  }, [trigger]);

  // ═══ Back to Step 1 ═══
  const handleBack = useCallback(() => {
    setFormState("step1");
  }, []);

  // ═══ SUBMIT (C-07 flow) ═══
  const onSubmit = useCallback(
    async (data: AppointmentFormData) => {
      setFormState("submitting");
      setErrorMessage("");

      // Create AbortController with 10s timeout (C-07)
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch("/api/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          // ✅ Success
          setFormState("success");
          setSuccessName(data.name);
          clearDraft();
          track.formSubmit();
        } else if (response.status === 429) {
          setErrorMessage(
            "Too many requests. Please try again later or use WhatsApp."
          );
          setFormState("error");
        } else if (response.status === 422) {
          const body = await response.json();
          setErrorMessage(
            body.errors?.join(", ") || "Please check your details and try again."
          );
          setFormState("error");
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      } catch (err) {
        clearTimeout(timeoutId);

        if (err instanceof DOMException && err.name === "AbortError") {
          // Timeout
          setFormState("timeout");
          // Timeout — no specific track method needed
        } else {
          // Network/server error
          const attempt = retryCount + 1;
          setRetryCount(attempt);

          if (attempt >= 2) {
            // Auto-redirect to WhatsApp after 2 failures
            window.open(WA_LINK(WA_MESSAGES.formFallback), "_blank");
            setFormState("error");
            setErrorMessage(
              "We've opened WhatsApp for you. Please send your details there."
            );
          } else {
            setFormState("error");
            setErrorMessage(
              "Something went wrong. Please try again or use WhatsApp."
            );
          }
        }
      }
    },
    [retryCount, clearDraft]
  );

  // ═══ Reset form ═══
  const handleReset = useCallback(() => {
    reset();
    setFormState("idle");
    setRetryCount(0);
    setErrorMessage("");
  }, [reset]);

  // ═══ Track form focus (idle → step1) ═══
  const handleFieldFocus = useCallback(() => {
    if (formState === "idle") {
      setFormState("step1");
      track.formStart();
    }
  }, [formState]);

  // ═══ Is Step 2 visible? (includes error/timeout since they happen after step2) ═══
  const isStep2 =
    formState === "step2" ||
    formState === "submitting" ||
    formState === "error" ||
    formState === "timeout";
  const isSubmitting = formState === "submitting";

  // ═══ RENDER ═══

  // Success state — replace entire form
  if (formState === "success") {
    return <SuccessMessage patientName={successName} onReset={handleReset} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      {/* ═══ STEP INDICATOR ═══ */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold transition-colors ${
              isStep2
                ? "bg-trust text-pearl"
                : "bg-gold text-pearl"
            }`}
          >
            {isStep2 ? "✓" : "1"}
          </div>
          <span className="font-body text-sm text-espresso">Your Details</span>
        </div>
        <div className="flex-1 h-px bg-sand" />
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold transition-colors ${
              isStep2
                ? "bg-gold text-pearl"
                : "bg-sand text-muted"
            }`}
          >
            2
          </div>
          <span
            className={`font-body text-sm transition-colors ${
              isStep2 ? "text-espresso" : "text-muted"
            }`}
          >
            Preferences
          </span>
        </div>
      </div>

      {/* ═══ STEP 1 — Name + Phone ═══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Your Name"
          placeholder="e.g., Rahul Sharma"
          {...register("name")}
          error={errors.name?.message}
          onFocus={handleFieldFocus}
          disabled={isSubmitting}
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="10-digit mobile number"
          {...register("phone")}
          error={errors.phone?.message}
          onFocus={handleFieldFocus}
          disabled={isSubmitting}
        />
      </div>

      {/* Step 1 → 2 button (visible only when not in step 2) */}
      {!isStep2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={handleStep1Next}
            className="inline-flex items-center gap-2 bg-gold text-pearl px-8 py-3 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors cursor-pointer"
          >
            Continue
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>
      )}

      {/* ═══ STEP 2 — Service + Preferences ═══ */}
      <AnimatePresence>
        {isStep2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="space-y-4 overflow-hidden"
          >
            {/* Service */}
            <Select
              label="Type of Appointment"
              placeholder="Select service..."
              options={[...SERVICE_OPTIONS]}
              {...register("service")}
              error={errors.service?.message}
              disabled={isSubmitting}
            />

            {/* Day + Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Preferred Day"
                placeholder="Select day..."
                options={[...DAY_OPTIONS]}
                {...register("preferredDay")}
                disabled={isSubmitting}
              />
              <Select
                label="Preferred Time"
                placeholder="Select time..."
                options={[...TIME_OPTIONS]}
                {...register("preferredTime")}
                disabled={isSubmitting}
              />
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-sm font-medium text-espresso">
                Special Requests / Notes
              </label>
              <textarea
                rows={3}
                placeholder="Any specific concerns or requests..."
                {...register("notes")}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-sand bg-pearl px-4 py-3 font-body text-sm text-espresso placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors resize-none disabled:opacity-50"
              />
            </div>

            {/* ═══ ERROR / TIMEOUT BANNERS ═══ */}
            <AnimatePresence>
              {formState === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3"
                >
                  <span className="text-red-500 text-lg">⚠️</span>
                  <div>
                    <p className="font-body text-sm text-red-700">
                      {errorMessage}
                    </p>
                    <a
                      href={WA_LINK(WA_MESSAGES.formFallback)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 font-body text-xs font-semibold text-trust hover:underline"
                    >
                      💬 Book via WhatsApp instead →
                    </a>
                  </div>
                </motion.div>
              )}

              {formState === "timeout" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-gold/30 bg-gold/5 p-4 flex items-start gap-3"
                >
                  <span className="text-lg">⏰</span>
                  <div>
                    <p className="font-body text-sm text-espresso">
                      Slow connection? WhatsApp is faster!
                    </p>
                    <a
                      href={WA_LINK(WA_MESSAGES.formFallback)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 font-body text-xs font-semibold text-trust hover:underline"
                    >
                      💬 Continue on WhatsApp →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ═══ ACTION BUTTONS ═══ */}
            <div className="flex items-center gap-3 pt-2">
              {/* Back button */}
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 border border-sand text-muted px-5 py-3 rounded-xl font-body text-sm hover:border-gold/40 hover:text-espresso transition-colors cursor-pointer disabled:opacity-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-gold text-pearl px-8 py-3 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" />
                    Sending...
                  </>
                ) : (
                  <>
                    Book Appointment
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
