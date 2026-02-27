import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "../presentation/providers/AppProvider";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Jawalabs | Mobile App Creators",
  description: "Creating useful and entertaining mobile applications.",
  openGraph: {
    title: "Jawalabs",
    description: "Creating useful and entertaining mobile applications.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProvider>
          <header style={{ padding: '24px 0', borderBottom: '1px solid var(--glass-border)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/" style={{ fontSize: '24px', fontWeight: 800 }} className="gradient-text">
                Jawalabs.
              </Link>
              <nav style={{ display: 'flex', gap: '24px' }}>
                <Link href="/" style={{ fontWeight: 600 }}>Home</Link>
                <Link href="/apps" style={{ fontWeight: 600 }}>Portfolio</Link>
              </nav>
            </div>
          </header>

          <main className="page-wrapper container" style={{ padding: '60px 24px' }}>
            {children}
          </main>

          <footer style={{ marginTop: 'auto', padding: '40px 0', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
            <div className="container" style={{ opacity: 0.7, fontSize: '14px' }}>
              <p>&copy; {new Date().getFullYear()} Jawalabs. All Rights Reserved.</p>
              <p style={{ marginTop: '8px' }}>Creating useful and entertaining mobile applications.</p>
            </div>
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
