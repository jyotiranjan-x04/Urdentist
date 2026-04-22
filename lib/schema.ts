/* ============================================================
   ZOD SCHEMA — Appointment form validation
   Source: Implementation Plan §5.1
   
   - appointmentSchema: full form (both steps)
   - step1Schema: Step 1 only (name + phone)
   - Service enum matches content/services.json slugs
   ============================================================ */

import { z } from "zod";

export const SERVICE_OPTIONS = [
  { value: "dental-checkup", label: "Dental Checkup" },
  { value: "braces", label: "Braces" },
  { value: "dental-implants", label: "Dental Implants" },
  { value: "missing-teeth", label: "Missing Teeth" },
  { value: "root-canal-treatment", label: "Root Canal Treatment" },
  { value: "invisible-aligners", label: "Invisible Aligners" },
  { value: "general-consultation", label: "General Consultation" },
] as const;

export const DAY_OPTIONS = [
  { value: "weekday", label: "Weekday (Mon–Sat)" },
  { value: "weekend", label: "Weekend (Sunday)" },
] as const;

export const TIME_OPTIONS = [
  { value: "morning", label: "Morning (10 AM – 1 PM)" },
  { value: "evening", label: "Evening (4 PM – 8 PM)" },
] as const;

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name is too long"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  service: z.enum(
    [
      "dental-checkup",
      "braces",
      "dental-implants",
      "missing-teeth",
      "root-canal-treatment",
      "invisible-aligners",
      "general-consultation",
    ],
    { errorMap: () => ({ message: "Please select a service" }) }
  ),
  preferredDay: z.enum(["weekday", "weekend"]).optional(),
  preferredTime: z.enum(["morning", "evening"]).optional(),
  notes: z.string().max(500, "Notes must be under 500 characters").optional(),
});

/** Step 1 schema — validates only name + phone (C-02 independent step validation) */
export const step1Schema = appointmentSchema.pick({
  name: true,
  phone: true,
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
export type Step1Data = z.infer<typeof step1Schema>;
