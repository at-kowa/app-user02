-- 写真共有（練習版）手順④-2：架空データを10件入れる
-- 実在の会社名・人名は使わない。メールアドレスは架空のドメイン（mock.example）。
-- 同じ id がすでにあれば入れない（何度実行しても10件のまま）。

insert into public.app_user02_photos
  (id, sender_email, department, visibility, taken_at, sent_at, memo, color)
values
  ('p01', 'user-a@mock.example', '部署A', 'department', '2026-10-21 14:30+09', '2026-10-21 14:35+09', '試験片A',          '#e57373'),
  ('p02', 'user-a@mock.example', '部署A', 'department', '2026-10-21 14:31+09', '2026-10-21 14:35+09', '試験片A',          '#64b5f6'),
  ('p03', 'user-c@mock.example', '部署A', 'department', '2026-10-20 10:05+09', '2026-10-20 10:10+09', '試験片B 断面',     '#81c784'),
  ('p04', 'user-a@mock.example', '部署A', 'private',    '2026-10-19 16:00+09', '2026-10-19 16:02+09', '',                 '#ffb74d'),
  ('p05', 'user-c@mock.example', '部署A', 'private',    '2026-10-18 16:00+09', '2026-10-18 16:05+09', '自分用メモ',       '#ba68c8'),
  ('p06', 'user-b@mock.example', '部署B', 'department', '2026-10-16 11:20+09', '2026-10-16 11:25+09', '製品サンプル',     '#4db6ac'),
  ('p07', 'user-b@mock.example', '部署B', 'private',    '2026-10-20 09:10+09', '2026-10-20 09:12+09', '設備1',            '#a1887f'),
  ('p08', 'user-d@mock.example', '部署A', 'department', '2026-10-16 08:40+09', '2026-10-16 08:45+09', '部会資料用 外観',  '#7986cb'),
  ('p09', 'user-a@mock.example', '部署A', 'department', '2026-10-15 13:00+09', '2026-10-15 13:05+09', '試験片C?/比較',    '#f06292'),
  ('p10', 'user-d@mock.example', '部署A', 'department', '2026-10-13 09:00+09', '2026-10-13 09:05+09', '8日前（期限切れ）','#90a4ae')
on conflict (id) do nothing;

-- 確認用：10件入っていれば OK
select count(*) as 件数 from public.app_user02_photos;
