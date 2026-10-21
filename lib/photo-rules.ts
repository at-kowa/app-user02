import { RETENTION_DAYS, type Photo } from "./mock-photos";

const DAY_MS = 24 * 60 * 60 * 1000;

// Same rule the database will enforce later: own photos, or department-shared photos of the same department.
export function canSee(photo: Photo, user: { email: string; department: string }) {
  if (photo.senderEmail === user.email) return true;
  return photo.visibility === "department" && photo.department === user.department;
}

export function isExpired(photo: Photo, now: Date) {
  return now.getTime() - new Date(photo.sentAt).getTime() > RETENTION_DAYS * DAY_MS;
}

export function daysLeft(photo: Photo, now: Date) {
  const ms = new Date(photo.sentAt).getTime() + RETENTION_DAYS * DAY_MS - now.getTime();
  return Math.max(0, Math.ceil(ms / DAY_MS));
}

function jstParts(iso: string) {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { y: get("year"), m: get("month"), d: get("day"), h: get("hour"), min: get("minute") };
}

export function formatJst(iso: string) {
  const p = jstParts(iso);
  return `${p.y}/${p.m}/${p.d} ${p.h}:${p.min}`;
}

export function jstDate(iso: string) {
  const p = jstParts(iso);
  return `${p.y}-${p.m}-${p.d}`;
}

// File name rule from the requirements: taken-at + memo + sequence number.
export function fileNameFor(photo: Photo, seq: number) {
  const p = jstParts(photo.takenAt);
  const memo = photo.memo.replace(/[\\/:*?"<>|]/g, "_").replace(/\s+/g, "_").trim();
  const no = String(seq).padStart(2, "0");
  return memo
    ? `${p.y}${p.m}${p.d}_${p.h}${p.min}_${memo}_${no}.jpg`
    : `${p.y}${p.m}${p.d}_${p.h}${p.min}_${no}.jpg`;
}
