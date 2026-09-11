import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rulio Engine — fall asleep faster",
  description:
    "Adaptive binaural-beat and solfeggio frequency sessions. A relaxation tool — not a medical device.",
  themeColor: "#0c0c0e",
  metadataBase: new URL("https://rulio.app"),
  icons: {
    icon: [{ url: "/rulio-favicon-256.png", sizes: "any" }],
    apple: [{ url: "/rulio-app-icon-1024.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Rulio Engine",
    description: "Adaptive binaural-beat and solfeggio sessions.",
    type: "website",
    siteName: "Rulio Studio",
    images: [
      {
        url: "/rulio-youtube-banner-2560x1440.png",
        width: 2560,
        height: 1440,
        alt: "Rulio — adaptive audio for founders",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0c0c0e] text-white antialiased">
        <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/rulio-app-icon-1024.png"
              alt="Rulio"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-sm tracking-widest uppercase">Rulio Engine</span>
          </a>
          <div className="flex gap-6 text-sm text-[#a1a1aa]">
            <a href="/" className="hover:text-white">Home</a>
            <a href="/pro" className="hover:text-white">Pro</a>
            <a href="/shop" className="hover:text-white">Shop</a>
            <a href="/qi" className="hover:text-white">/qi</a>
            <a href="mailto:hello@rulio.io" className="hover:text-white">Contact</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
