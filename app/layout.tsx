import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Asa | African Heritage Language Learning",
  description:
    "Asa teaches African heritage languages through cinematic cultural storytelling. Yoruba, Swahili, Twi, Igbo and more — built for the global diaspora. Join the waitlist.",
  keywords: [
    "learn Yoruba online",
    "Swahili learning app",
    "African language courses",
    "heritage language learning",
    "Twi Akan online",
    "Igbo language course",
    "African diaspora education",
    "Asa language platform",
    "learn African language",
    "Yoruba for beginners",
  ],
  openGraph: {
    title: "Asa | African Heritage Language Learning",
    description:
      "You're not learning a language. You're coming home. The first platform that teaches African heritage languages through cinematic cultural storytelling.",
    type: "website",
    locale: "en_US",
    siteName: "Asa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asa | African Heritage Language Learning",
    description:
      "You're not learning a language. You're coming home. Yoruba, Swahili, Twi, Igbo and more — built for the diaspora.",
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
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body
        style={{ fontFamily: "var(--font-body), sans-serif" }}
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
