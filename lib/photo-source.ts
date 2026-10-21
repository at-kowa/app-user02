import { mockPhotos, type Photo, type Visibility } from "./mock-photos";

// Read from the Supabase REST API with the publishable key (read-only table).
// Values come from .env.local (PC) or Vercel environment variables. Never hard-code them.
// Tolerate a trailing slash or a pasted "/rest/v1" suffix.
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const TABLE = "app_user02_photos";

export const hasDatabase = Boolean(URL && KEY);

type Row = {
  id: string;
  sender_email: string;
  department: string;
  visibility: Visibility;
  taken_at: string;
  sent_at: string;
  memo: string;
  color: string;
};

export async function loadPhotos(): Promise<Photo[]> {
  if (!hasDatabase) return mockPhotos;
  const res = await fetch(`${URL}/rest/v1/${TABLE}?select=*`, {
    headers: { apikey: KEY!, Authorization: `Bearer ${KEY}` },
    cache: "no-store",
  });
  if (!res.ok) {
    // Supabase error bodies carry a message and hint, never the key.
    let detail = "";
    try {
      const body = (await res.json()) as { message?: string; hint?: string };
      detail = [body.message, body.hint].filter(Boolean).join(" / ");
    } catch {}
    // The project URL is public (it is sent to every browser), so it is safe to show.
    const host = (() => {
      try {
        return new globalThis.URL(URL!).host;
      } catch {
        return "URLの形が正しくない";
      }
    })();
    throw new Error(`HTTP ${res.status}（接続先：${host}）${detail ? `：${detail}` : ""}`);
  }
  const rows = (await res.json()) as Row[];
  return rows.map((r) => ({
    id: r.id,
    senderEmail: r.sender_email,
    department: r.department,
    visibility: r.visibility,
    takenAt: r.taken_at,
    sentAt: r.sent_at,
    memo: r.memo,
    color: r.color,
  }));
}
