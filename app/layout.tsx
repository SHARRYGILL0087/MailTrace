import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Threat Shield — AI-Powered Email Threat Forensics & Intelligence Platform",
  description: "Threat Shield combines AI threat detection, email header forensics, infrastructure intelligence, and threat correlation in one unified platform.",
  icons: {
    icon: '/threat-shield-logo.svg',
    shortcut: '/threat-shield-logo.svg',
    apple: '/threat-shield-logo.svg',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* <body className="min-h-full flex flex-col">{children}</body> */}
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 selection:text-blue-700">
        {children}
      </body>
    </html>
  );
}
