import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

const AUTH_PATH = path.join(process.cwd(), "data", "auth.json");

export type MagicLinkTokenRecord = {
  tokenHash: string;
  email: string;
  expiresAt: string;
};

export type SessionRecord = {
  sessionIdHash: string;
  email: string;
  expiresAt: string;
};

export type AuthFile = {
  tokens: MagicLinkTokenRecord[];
  sessions: SessionRecord[];
};

async function readAuthFile(): Promise<AuthFile> {
  try {
    const raw = await fs.readFile(AUTH_PATH, "utf-8");
    return JSON.parse(raw) as AuthFile;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      const empty: AuthFile = { tokens: [], sessions: [] };
      await writeAuthFile(empty);
      return empty;
    }

    throw error;
  }
}

async function writeAuthFile(data: AuthFile) {
  await fs.writeFile(AUTH_PATH, JSON.stringify(data, null, 2));
}

function hashValue(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function storeMagicLinkToken(email: string, token: string, expiresAt: Date) {
  const auth = await readAuthFile();
  const tokenHash = hashValue(token);
  auth.tokens = auth.tokens.filter((record) => record.email !== email);
  auth.tokens.push({ tokenHash, email, expiresAt: expiresAt.toISOString() });
  await writeAuthFile(auth);
}

export async function consumeMagicLinkToken(token: string): Promise<MagicLinkTokenRecord | null> {
  const auth = await readAuthFile();
  const tokenHash = hashValue(token);
  const now = Date.now();
  const record = auth.tokens.find((entry) => entry.tokenHash === tokenHash);

  auth.tokens = auth.tokens.filter((entry) => entry.tokenHash !== tokenHash);
  await writeAuthFile(auth);

  if (!record) {
    return null;
  }

  if (new Date(record.expiresAt).getTime() < now) {
    return null;
  }

  return record;
}

export async function createSession(email: string, ttlMinutes = 1440): Promise<string> {
  const sessionId = crypto.randomBytes(32).toString("hex");
  const sessionIdHash = hashValue(sessionId);
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);

  const auth = await readAuthFile();
  auth.sessions = auth.sessions.filter((session) => new Date(session.expiresAt).getTime() > Date.now());
  auth.sessions.push({ sessionIdHash, email, expiresAt: expiresAt.toISOString() });
  await writeAuthFile(auth);

  return sessionId;
}

export async function getSession(sessionId: string): Promise<SessionRecord | null> {
  const auth = await readAuthFile();
  const sessionIdHash = hashValue(sessionId);
  const session = auth.sessions.find((record) => record.sessionIdHash === sessionIdHash);

  if (!session) {
    return null;
  }

  if (new Date(session.expiresAt).getTime() < Date.now()) {
    await deleteSession(sessionId);
    return null;
  }

  return session;
}

export async function deleteSession(sessionId: string) {
  const auth = await readAuthFile();
  const sessionIdHash = hashValue(sessionId);
  auth.sessions = auth.sessions.filter((record) => record.sessionIdHash !== sessionIdHash);
  await writeAuthFile(auth);
}

export async function clearExpiredTokens() {
  const auth = await readAuthFile();
  const now = Date.now();
  auth.tokens = auth.tokens.filter((record) => new Date(record.expiresAt).getTime() > now);
  auth.sessions = auth.sessions.filter((record) => new Date(record.expiresAt).getTime() > now);
  await writeAuthFile(auth);
}
