import type { NextRequest } from "next/server";

const COOKIE_NAME = "stance_admin_session";

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "stance-dev-only-change-in-production";
}

function utf8ToBase64Url(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlToUtf8(s: string): string {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

function bufferToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  return bufferToHex(sig);
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

export async function createAdminSessionToken(): Promise<string> {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = `admin:${exp}`;
  const sig = await hmacSha256Hex(getSecret(), payload);
  return `${utf8ToBase64Url(payload)}.${sig}`;
}

export async function verifyAdminSessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const b64 = token.slice(0, dot);
  const sigHex = token.slice(dot + 1);
  if (!/^[0-9a-f]+$/i.test(sigHex) || sigHex.length !== 64) return false;

  let payload: string;
  try {
    payload = base64UrlToUtf8(b64);
  } catch {
    return false;
  }

  const expectedHex = await hmacSha256Hex(getSecret(), payload);
  if (!timingSafeEqualHex(sigHex.toLowerCase(), expectedHex.toLowerCase())) {
    return false;
  }

  const colon = payload.indexOf(":");
  if (colon < 0) return false;
  const role = payload.slice(0, colon);
  const exp = Number(payload.slice(colon + 1));
  if (role !== "admin" || !Number.isFinite(exp) || exp < Date.now()) {
    return false;
  }
  return true;
}

export function getSessionCookieName(): typeof COOKIE_NAME {
  return COOKIE_NAME;
}

export async function readSessionFromRequest(
  request: NextRequest,
): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export function getDefaultAdminCredentials(): { user: string; pass: string } {
  return {
    user: process.env.ADMIN_USERNAME ?? "admin",
    pass: process.env.ADMIN_PASSWORD ?? "admin",
  };
}
