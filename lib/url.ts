import { headers } from "next/headers";

// URL base do site em runtime (Railway/Vercel enviam x-forwarded-*).
export async function urlBase(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || "http";
  return `${proto}://${host}`;
}
