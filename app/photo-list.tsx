"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENT_USER, MOCK_NOW, mockPhotos } from "@/lib/mock-photos";
import { canSee, daysLeft, fileNameFor, formatJst, isExpired, jstDate } from "@/lib/photo-rules";

type Scope = "all" | "mine" | "department";

export function PhotoList() {
  const now = useMemo(() => new Date(MOCK_NOW), []);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sender, setSender] = useState("");
  const [scope, setScope] = useState<Scope>("all");
  const [memo, setMemo] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Visible to this user and not expired, newest first.
  const visible = useMemo(
    () =>
      mockPhotos
        .filter((p) => canSee(p, CURRENT_USER) && !isExpired(p, now))
        .sort((a, b) => b.takenAt.localeCompare(a.takenAt)),
    [now],
  );

  const senders = useMemo(() => Array.from(new Set(visible.map((p) => p.senderEmail))).sort(), [visible]);

  const shown = visible.filter((p) => {
    const d = jstDate(p.takenAt);
    if (from && d < from) return false;
    if (to && d > to) return false;
    if (sender && p.senderEmail !== sender) return false;
    if (scope === "mine" && p.senderEmail !== CURRENT_USER.email) return false;
    if (scope === "department" && p.visibility !== "department") return false;
    if (memo && !p.memo.toLowerCase().includes(memo.toLowerCase())) return false;
    return true;
  });

  const selectedCount = shown.filter((p) => selected.has(p.id)).length;

  function toggle(id: string, on: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-bold">写真共有（練習版）</h1>
        <p className="text-sm text-muted-foreground">
          ログイン中：{CURRENT_USER.email}（{CURRENT_USER.department}）
        </p>
      </header>

      <p className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
        練習版です。表示しているのは架空のデータです（現在時刻も架空：{formatJst(MOCK_NOW)}）。業務の写真は送らないでください。
      </p>

      <section aria-label="絞り込み" className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="grid gap-1">
          <Label htmlFor="from">撮影日（から）</Label>
          <Input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="to">撮影日（まで）</Label>
          <Input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="sender">送った人</Label>
          <select
            id="sender"
            className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          >
            <option value="">全員</option>
            {senders.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="scope">公開範囲</Label>
          <select
            id="scope"
            className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
            value={scope}
            onChange={(e) => setScope(e.target.value as Scope)}
          >
            <option value="all">すべて</option>
            <option value="mine">自分が送ったもの</option>
            <option value="department">部署で共有</option>
          </select>
        </div>
        <div className="grid gap-1">
          <Label htmlFor="memo">メモ</Label>
          <Input id="memo" placeholder="部分一致" value={memo} onChange={(e) => setMemo(e.target.value)} />
        </div>
      </section>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="mr-2 text-sm font-semibold">
          表示 {shown.length}件／見られる写真 {visible.length}件
        </span>
        <Button variant="outline" size="sm" onClick={() => setSelected(new Set(shown.map((p) => p.id)))}>
          表示中をすべて選択
        </Button>
        <Button variant="outline" size="sm" onClick={() => setSelected(new Set())}>
          選択を外す
        </Button>
        <Button size="sm" disabled title="データベースにつないだ後（手順④⑤）に使えます">
          選択した写真をzipで保存（{selectedCount}枚）
        </Button>
        <span className="text-xs text-muted-foreground">保存はデータベースにつないだ後（手順④⑤）に使えます</span>
      </div>

      {shown.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          {visible.length === 0 ? "まだ写真がありません。" : "条件に合う写真がありません。条件を変えてください。"}
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {shown.map((p, i) => (
            <li key={p.id}>
              <Card className="h-full gap-2 py-3">
                <CardContent className="grid gap-2 px-3">
                  <div
                    className="flex aspect-square items-center justify-center rounded-md text-xl font-bold text-white"
                    style={{ backgroundColor: p.color }}
                    aria-label={`架空の写真 ${p.id}`}
                  >
                    TEST {p.id.slice(1)}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {p.visibility === "department" ? (
                      <Badge variant="secondary">部署で共有</Badge>
                    ) : (
                      <Badge variant="outline">自分だけ</Badge>
                    )}
                    <Badge variant="outline">あと{daysLeft(p, now)}日</Badge>
                  </div>
                  <dl className="grid gap-0.5 text-xs">
                    <dt className="sr-only">撮影日時</dt>
                    <dd>{formatJst(p.takenAt)}</dd>
                    <dt className="sr-only">送った人</dt>
                    <dd className="truncate text-muted-foreground">{p.senderEmail}</dd>
                    <dt className="sr-only">メモ</dt>
                    <dd className="font-semibold">メモ：{p.memo || "なし"}</dd>
                    <dt className="sr-only">保存するときのファイル名</dt>
                    <dd className="break-all text-muted-foreground">{fileNameFor(p, i + 1)}</dd>
                  </dl>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox checked={selected.has(p.id)} onCheckedChange={(v) => toggle(p.id, v === true)} />
                    選ぶ
                  </label>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
