import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rulio — The Frequency Room · adaptive solfeggio for focus, sleep, energy",
  description:
    "9 solfeggio frequencies. 5 minutes each. A private screening room for your attention. Not a medical device.",
  themeColor: "#0c0c0e",
  metadataBase: new URL("https://rulio.app"),
  icons: {
    icon: [{ url: "/rulio-favicon-256.png", sizes: "any" }],
    apple: [{ url: "/rulio-app-icon-1024.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Rulio — The Frequency Room",
    description:
      "9 solfeggio frequencies. 5 minutes each. A private screening room for your attention.",
    type: "website",
    siteName: "Rulio Studio",
    images: [
      {
        url: "/rulio-og-card-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Rulio — The Frequency Room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rulio — The Frequency Room",
    description: "9 solfeggio frequencies. 5 minutes each.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="content-layer">
        <nav className="glass-nav" style={{ maxWidth: 1200, margin: "16px auto 48px" }}>
          <a href="/" className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <span>Rulio</span>
          </a>
          <div className="nav-links" style={{ fontSize: 14 }}>
            <a href="/pro">Pro</a>
            <a href="/shop">Shop</a>
            <a href="/qi">/qi</a>
            <a href="/workshop">Workshop</a>
            <span className="nav-ticker">
              <span className="dot-pulse" />
              ON AIR · 9 FREQ
            </span>
            <a href="mailto:hello@rulio.io" className="btn-text">Contact</a>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
