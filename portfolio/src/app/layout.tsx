import type { Metadata } from "next";
import "./globals.css";
import { personal } from "@/data/resume";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const siteUrl = "https://aayushgnawali.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
    siteName: `${personal.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: siteUrl,
  jobTitle: personal.role,
  address: {
    "@type": "PostalAddress",
    addressLocality: personal.location,
  },
  sameAs: [personal.github, personal.linkedin, personal.medium, personal.instagram].filter(Boolean),
  knowsAbout: [
    "Backend Development",
    "FastAPI",
    "DevOps",
    "DevSecOps",
    "Machine Learning",
    "Python",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="transition-colors duration-300">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-surface)] focus:border focus:border-[var(--color-border-strong)] focus:px-4 focus:py-2 focus:text-sm"
          >
            Skip to main content
          </a>
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
