import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "West Summerlin", template: "%s | West Summerlin" },
  description: "Homes and neighborhoods in Summerlin West, Las Vegas, Nevada.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site">
          <div className="container">
            <Link href="/">West Summerlin</Link>
            <nav>
              <Link href="/3d-tour">3D Tour</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site">
          <div className="container">© {new Date().getFullYear()} West Summerlin · Las Vegas, NV</div>
        </footer>
      </body>
    </html>
  );
}
