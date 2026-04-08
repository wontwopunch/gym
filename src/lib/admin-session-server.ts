import { cookies } from "next/headers";

import {
  getSessionCookieName,
  verifyAdminSessionToken,
} from "@/lib/admin-session";

export async function readSessionFromCookies(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(getSessionCookieName())?.value;
  return await verifyAdminSessionToken(token);
}
