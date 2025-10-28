import { cookies } from "next/headers";

import { deleteSession, getSession } from "./store";
import type { SessionRecord } from "./store";

const SESSION_COOKIE = "admin_session";

export async function destroySession() {
  const sessionCookie = cookies().get(SESSION_COOKIE);
  if (sessionCookie) {
    await deleteSession(sessionCookie.value);
  }
  cookies().delete(SESSION_COOKIE);
}

export async function getActiveSession(): Promise<SessionRecord | null> {
  const sessionCookie = cookies().get(SESSION_COOKIE);
  if (!sessionCookie) {
    return null;
  }

  const session = await getSession(sessionCookie.value);
  if (!session) {
    cookies().delete(SESSION_COOKIE);
  }

  return session;
}
