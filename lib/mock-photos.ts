// Fictional data only. Replaced by the database in steps 4 and 5.

export type Visibility = "private" | "department";

export type Photo = {
  id: string;
  senderEmail: string;
  department: string;
  visibility: Visibility;
  takenAt: string; // ISO 8601 with offset
  sentAt: string;
  memo: string;
  color: string;
};

// Fixed "now" so the list looks the same on every machine.
export const MOCK_NOW = "2026-10-21T15:00:00+09:00";

// The signed-in user in this mock.
export const CURRENT_USER = {
  email: "user-a@mock.example",
  department: "部署A",
};

export const RETENTION_DAYS = 7;

export const mockPhotos: Photo[] = [
  { id: "p01", senderEmail: "user-a@mock.example", department: "部署A", visibility: "department", takenAt: "2026-10-21T14:30:00+09:00", sentAt: "2026-10-21T14:35:00+09:00", memo: "試験片A", color: "#e57373" },
  { id: "p02", senderEmail: "user-a@mock.example", department: "部署A", visibility: "department", takenAt: "2026-10-21T14:31:00+09:00", sentAt: "2026-10-21T14:35:00+09:00", memo: "試験片A", color: "#64b5f6" },
  { id: "p03", senderEmail: "user-c@mock.example", department: "部署A", visibility: "department", takenAt: "2026-10-20T10:05:00+09:00", sentAt: "2026-10-20T10:10:00+09:00", memo: "試験片B 断面", color: "#81c784" },
  { id: "p04", senderEmail: "user-a@mock.example", department: "部署A", visibility: "private", takenAt: "2026-10-19T16:00:00+09:00", sentAt: "2026-10-19T16:02:00+09:00", memo: "", color: "#ffb74d" },
  { id: "p05", senderEmail: "user-c@mock.example", department: "部署A", visibility: "private", takenAt: "2026-10-18T16:00:00+09:00", sentAt: "2026-10-18T16:05:00+09:00", memo: "自分用メモ", color: "#ba68c8" },
  { id: "p06", senderEmail: "user-b@mock.example", department: "部署B", visibility: "department", takenAt: "2026-10-16T11:20:00+09:00", sentAt: "2026-10-16T11:25:00+09:00", memo: "製品サンプル", color: "#4db6ac" },
  { id: "p07", senderEmail: "user-b@mock.example", department: "部署B", visibility: "private", takenAt: "2026-10-20T09:10:00+09:00", sentAt: "2026-10-20T09:12:00+09:00", memo: "設備1", color: "#a1887f" },
  { id: "p08", senderEmail: "user-d@mock.example", department: "部署A", visibility: "department", takenAt: "2026-10-16T08:40:00+09:00", sentAt: "2026-10-16T08:45:00+09:00", memo: "部会資料用 外観", color: "#7986cb" },
  { id: "p09", senderEmail: "user-a@mock.example", department: "部署A", visibility: "department", takenAt: "2026-10-15T13:00:00+09:00", sentAt: "2026-10-15T13:05:00+09:00", memo: "試験片C?/比較", color: "#f06292" },
  { id: "p10", senderEmail: "user-d@mock.example", department: "部署A", visibility: "department", takenAt: "2026-10-13T09:00:00+09:00", sentAt: "2026-10-13T09:05:00+09:00", memo: "8日前（期限切れ）", color: "#90a4ae" },
];
