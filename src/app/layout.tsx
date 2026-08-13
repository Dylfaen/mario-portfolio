import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-loaded",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
};

// Lets the fullscreen video reach under the notch / home indicator, and makes
// the env(safe-area-inset-*) values used by the showreel meaningful on iOS.
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={sans.variable}>
      <body>
        {/* Header removed for now — re-add <SiteHeader /> here when needed.
            The footer lives in the (site) group, so the home page has none. */}
        {children}
      </body>
    </html>
  );
}
