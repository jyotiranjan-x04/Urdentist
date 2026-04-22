/* ============================================================
   STRUCTURED LOGGER — Zero-dependency structured JSON logging
   Source: Implementation Plan §5.4
   
   Logs BEFORE email send for zero lead loss.
   Edge Runtime compatible (no Node-only APIs).
   ============================================================ */

export type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  requestId?: string;
}

/**
 * Create a structured log entry.
 * In production, this can be piped to Vercel log drain.
 */
export function log(
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>,
  requestId?: string
): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(data && { data }),
    ...(requestId && { requestId }),
  };

  // In Edge Runtime, console output goes to Vercel serverless logs
  switch (level) {
    case "error":
      console.error(JSON.stringify(entry));
      break;
    case "warn":
      console.warn(JSON.stringify(entry));
      break;
    default:
      console.log(JSON.stringify(entry));
  }
}

/** Generate a short request ID for log correlation */
export function generateRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .substring(2, 8)}`;
}
