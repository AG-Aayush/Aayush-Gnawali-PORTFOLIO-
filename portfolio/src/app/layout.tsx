import type { Metadata, Viewport } from "next";
import "./globals.css";
import { personal } from "@/data/resume";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const siteUrl = "https://www.aayushgnawali.com.np/";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f4f8" },
    { media: "(prefers-color-scheme: dark)", color: "#2d1f33" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: `${personal.name} — ${personal.role}`,
    template: `%s — ${personal.name}`,
  },
  description: personal.tagline,
  keywords: [
    "Aayush Gnawali",
    "Backend Developer",
    "FastAPI Developer",
    "Python Developer",
    "DevOps Engineer",
    "DevSecOps",
    "AI/ML Engineer",
    "Remote Software Engineer",
  ],
  authors: [{ name: personal.name, url: personal.github }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
    siteName: `${personal.name} — Portfolio`,
    images: [
      {
        url: `${siteUrl}${personal.profilePictureDark ?? personal.profilePicture}`,
        width: 1200,
        height: 630,
        alt: `${personal.name} — ${personal.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
    images: [`${siteUrl}${personal.profilePicture}`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}