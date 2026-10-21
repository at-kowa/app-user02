import type { CSSProperties } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "写真共有（練習版）",
  description: "携帯で撮った写真を、パソコンですぐ保存するための練習用アプリ（架空データ）",
};

// System fonts only, so the build does not fetch fonts from the internet.
const fontVars = {
  "--font-sans": '"Noto Sans JP", "Meiryo", "Hiragino Sans", sans-serif',
  "--font-geist-mono": 'Consolas, "Courier New", monospace',
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased" style={fontVars}>
      <body className="min-h-full flex flex-col bg-background">{children}</body>
    </html>
  );
}
