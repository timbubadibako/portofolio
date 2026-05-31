import type { Metadata } from "next";
import { Geist, Geist_Mono, VT323, Press_Start_2P, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syifa Pajril Yaum | AI & Fullstack Developer",
  description: "Portofolio teknikal Syifa Pajril Yaum, AI & Fullstack Developer. Merancang infrastruktur dan arsitektur sistem dengan presisi tinggi, karena di dunia engineering: Small problems are still problems.",
  metadataBase: new URL('https://jrilym.dev'),
  openGraph: {
    title: "Syifa Pajril Yaum // Technical Portfolio",
    description: "System Architect | Fullstack & AI Developer",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wp14013807.jpg-R0GMP9bCUVPW5Qfg2rbLlUeYSGymlM.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syifa Pajril Yaum | AI & Fullstack Developer",
    description: "Portofolio teknikal Syifa Pajril Yaum, AI & Fullstack Developer.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} ${pressStart2P.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-zinc-50">
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
