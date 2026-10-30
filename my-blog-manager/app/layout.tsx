import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { MusicProvider } from "../components/MusicProvider";
import { ToastProvider } from "../components/ToastProvider";
import { OperationProvider } from "../context/OperationContext";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const serif = Noto_Serif_SC({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "ayu’s console · 内容与社区控制台",
  description: "管理 ayu’s blog 内容、TOC 同步和社区运营数据。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${sans.variable} ${mono.variable} ${serif.variable}`}><ThemeProvider><OperationProvider><ToastProvider><MusicProvider>{children}</MusicProvider></ToastProvider></OperationProvider></ThemeProvider></body></html>;
}
