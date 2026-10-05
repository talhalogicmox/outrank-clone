import { headers } from "next/headers";

/**
 * Dynamically resolves the base URL of the application.
 * 1. Checks NEXT_PUBLIC_SITE_URL or SITE_URL environment variable.
 * 2. Checks Vercel deployment URLs (VERCEL_PROJECT_PRODUCTION_URL or VERCEL_URL).
 * 3. If provided a Request object, extracts its origin.
 * 4. Extracts dynamically from incoming request headers (x-forwarded-host / host).
 * 5. Falls back to http://localhost:3000.
 */
export async function getBaseUrl(req?: Request): Promise<string> {
  // 1. Environment variable override
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 2. Direct Request origin
  if (req) {
    try {
      const url = new URL(req.url);
      return url.origin;
    } catch {
      // Continue to headers
    }
  }

  // 3. Dynamic Next.js request headers
  try {
    const headersList = await headers();
    const host = headersList.get("x-forwarded-host") || headersList.get("host");
    if (host) {
      const proto =
        headersList.get("x-forwarded-proto") ||
        (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
      return `${proto}://${host}`;
    }
  } catch {
    // Catch build-time or outside-request execution
  }

  // 4. Default fallback
  return "http://localhost:3000";
}
