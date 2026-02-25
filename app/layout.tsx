import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Learn Yoruba | Heritage Language & Culture Platform",
  description:
    "A premium Yoruba language and culture learning platform for the global diaspora. Cinematic storytelling meets structured language instruction. Join the waitlist.",
  keywords: [
    "learn Yoruba",
    "Yoruba language course",
    "Yoruba for beginners",
    "Yoruba diaspora",
    "heritage language learning",
    "Yoruba culture",
    "African diaspora education",
    "Yoruba online lessons",
  ],
  openGraph: {
    title: "Learn Yoruba | Heritage Language & Culture Platform",
    description:
      "Reconnect with your roots. A premium Yoruba learning platform built for the diaspora — binge-worthy content that delivers real proficiency.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Yoruba | Heritage Language & Culture Platform",
    description:
      "Reconnect with your roots. Premium Yoruba learning for the global diaspora.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body
        style={{ fontFamily: "var(--font-body), sans-serif" }}
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
