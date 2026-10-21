-- 写真共有（練習版）手順④-1：表を作る
-- training-practice の SQL Editor で、利用者が実行する。何度実行しても同じ結果になる。
-- 架空データの表示だけの練習用：誰でも読めるが、書き込みは誰にも許可しない。

create table if not exists public.app_user02_photos (
  id           text primary key,
  sender_email text not null,
  department   text not null,
  visibility   text not null check (visibility in ('private', 'department')),
  taken_at     timestamptz not null,
  sent_at      timestamptz not null default now(),
  memo         text not null default '' check (char_length(memo) <= 200),
  color        text not null default '#90a4ae' -- 架空の写真の代わりに表示する色
);

create index if not exists app_user02_photos_taken_at_idx
  on public.app_user02_photos (taken_at desc);

-- 行単位の権限（RLS）を有効にする
alter table public.app_user02_photos enable row level security;

-- 読むことだけを、誰にでも許可する（ログインなし＝anon を含む）
drop policy if exists app_user02_photos_read on public.app_user02_photos;
create policy app_user02_photos_read on public.app_user02_photos
  for select
  to anon, authenticated
  using (true);

-- 権限の付け直し：読む権限だけを付ける（追加・変更・削除の権限は付けない）
revoke all on table public.app_user02_photos from anon, authenticated;
grant select on table public.app_user02_photos to anon, authenticated;
