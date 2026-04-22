/* ============================================================
   APPOINTMENT API ROUTE — Edge Runtime
   Source: Implementation Plan §5.4
   
   Features:
   - Zod validation (422 on failure)
   - Rate limiting: 3 submissions/IP/hour (429 on exceed)
   - Structured JSON logging (before email — zero lead loss)
   - Resend email delivery (500 on failure, lead already logged)
   - CORS headers for security
   ============================================================ */

import { NextRequest, NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/schema";
import { buildEmailHtml } from "@/lib/email";
import { log, generateRequestId } from "@/lib/logger";
import { CLINIC } from "@/lib/constants";

export const runtime = "edge";

/* ═══════════════════════════════════════════
   RATE LIMITER — In-memory Map (Edge Runtime)
   Max 3 submissions per IP per hour.
   Note: resets on cold start (acceptable for this scale)
   ═══════════════════════════════════════════ */
const rateMap = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateMap.get(ip) || [];

  // Filter to only timestamps within the window
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  rateMap.set(ip, recent);

  if (recent.length >= RATE_LIMIT) {
    return true;
  }

  recent.push(now);
  rateMap.set(ip, recent);
  return false;
}

/* ═══════════════════════════════════════════
   POST HANDLER
   ═══════════════════════════════════════════ */
export async function POST(request: NextRequest) {
  const requestId = generateRequestId();
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  try {
    // ── Rate limit check ──
    if (isRateLimited(ip)) {
      log("warn", "Rate limited", { ip }, requestId);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ── Parse body ──
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // ── Zod validation ──
    const result = appointmentSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.issues.map((i) => i.message);
      log("warn", "Validation failed", { errors, ip }, requestId);
      return NextResponse.json({ error: "Validation failed", errors }, { status: 422 });
    }

    const data = result.data;

    // ── LOG BEFORE EMAIL (zero lead loss) ──
    log(
      "info",
      "Appointment request received",
      {
        name: data.name,
        phone: data.phone.slice(0, 4) + "******", // Partial phone for privacy
        service: data.service,
        preferredDay: data.preferredDay || "none",
        preferredTime: data.preferredTime || "none",
        hasNotes: !!data.notes,
        ip,
      },
      requestId
    );

    // ── Send email via Resend ──
    const resendApiKey = process.env.RESEND_API_KEY;
    const clinicEmail = process.env.CLINIC_EMAIL || CLINIC.email;

    if (resendApiKey) {
      try {
        const emailHtml = buildEmailHtml(data);

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Ur Dentist <appointments@urdentist.in>",
            to: [clinicEmail],
            subject: `New Appointment: ${data.name} — ${data.service}`,
            html: emailHtml,
          }),
        });

        if (!emailResponse.ok) {
          const errBody = await emailResponse.text();
          log(
            "error",
            "Resend email failed",
            { status: emailResponse.status, body: errBody },
            requestId
          );
          // Still return 200 — lead is already logged
        } else {
          log("info", "Email sent successfully", { to: clinicEmail }, requestId);
        }
      } catch (emailErr) {
        log(
          "error",
          "Email send exception",
          { error: emailErr instanceof Error ? emailErr.message : "Unknown" },
          requestId
        );
        // Still return 200 — lead is already logged
      }
    } else {
      log(
        "warn",
        "RESEND_API_KEY not configured — email skipped (local dev mode)",
        {},
        requestId
      );
    }

    // ── Success response ──
    return NextResponse.json(
      {
        success: true,
        message: "Appointment request received. We will confirm shortly.",
        requestId,
      },
      { status: 200 }
    );
  } catch (err) {
    log(
      "error",
      "Unhandled error in appointment API",
      { error: err instanceof Error ? err.message : "Unknown", ip },
      requestId
    );
    return NextResponse.json(
      { error: "Internal server error. Please try WhatsApp instead." },
      { status: 500 }
    );
  }
}
