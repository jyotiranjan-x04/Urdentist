/* ============================================================
   EMAIL BUILDER — HTML email template for appointment confirmations
   Source: Implementation Plan §5.4
   
   Generates a clean HTML email for Resend delivery.
   Used by the appointment API route.
   ============================================================ */

import { AppointmentFormData, SERVICE_OPTIONS } from "./schema";
import { CLINIC } from "./constants";

/**
 * Build a styled HTML email body from appointment form data.
 * Designed for Resend delivery — inline CSS only.
 */
export function buildEmailHtml(data: AppointmentFormData): string {
  const serviceName =
    SERVICE_OPTIONS.find((s) => s.value === data.service)?.label ||
    data.service;

  const preferredDay = data.preferredDay === "weekend" ? "Weekend (Sunday)" : "Weekday (Mon–Sat)";
  const preferredTime =
    data.preferredTime === "morning"
      ? "Morning (10 AM – 1 PM)"
      : data.preferredTime === "evening"
        ? "Evening (4 PM – 8 PM)"
        : "No preference";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#FEFBF5;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FEFBF5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#2C2416;padding:24px 32px;text-align:center;">
              <h1 style="margin:0;color:#FEFBF5;font-size:24px;font-weight:700;letter-spacing:0.5px;">
                📋 New Appointment Request
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <!-- Patient Name -->
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #F0E9DC;">
                    <span style="color:#8A7F72;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Patient Name</span>
                    <p style="margin:4px 0 0;color:#2C2416;font-size:16px;font-weight:600;">${escapeHtml(data.name)}</p>
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #F0E9DC;">
                    <span style="color:#8A7F72;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone Number</span>
                    <p style="margin:4px 0 0;color:#2C2416;font-size:16px;font-weight:600;">
                      <a href="tel:${data.phone}" style="color:#C9A96E;text-decoration:none;">${data.phone}</a>
                    </p>
                  </td>
                </tr>

                <!-- Service -->
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #F0E9DC;">
                    <span style="color:#8A7F72;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Service Requested</span>
                    <p style="margin:4px 0 0;color:#2C2416;font-size:16px;font-weight:600;">${escapeHtml(serviceName)}</p>
                  </td>
                </tr>

                <!-- Preferred Schedule -->
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #F0E9DC;">
                    <span style="color:#8A7F72;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Preferred Schedule</span>
                    <p style="margin:4px 0 0;color:#2C2416;font-size:16px;font-weight:600;">${preferredDay} · ${preferredTime}</p>
                  </td>
                </tr>

                ${
                  data.notes
                    ? `
                <!-- Notes -->
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #F0E9DC;">
                    <span style="color:#8A7F72;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Special Notes</span>
                    <p style="margin:4px 0 0;color:#2C2416;font-size:14px;line-height:1.6;">${escapeHtml(data.notes)}</p>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>

              <!-- CTA -->
              <div style="margin-top:24px;text-align:center;">
                <a href="https://wa.me/91${CLINIC.phone}?text=${encodeURIComponent(`Hi, ${data.name} has requested an appointment for ${serviceName}. Please confirm.`)}"
                   style="display:inline-block;background-color:#25D366;color:#FFFFFF;padding:12px 32px;border-radius:12px;font-size:14px;font-weight:600;text-decoration:none;">
                  💬 Reply via WhatsApp
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F7F0E6;padding:16px 32px;text-align:center;">
              <p style="margin:0;color:#8A7F72;font-size:12px;">
                ${CLINIC.name} · ${CLINIC.address.full} · ${CLINIC.phone}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/** Escape HTML to prevent XSS in email content */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
