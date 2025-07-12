import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import { SearchProvider } from '@/lib/SearchContext';

// ───────────────────────────────────────── fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

// ───────────────────────────────────────── metadata
export const metadata: Metadata = {
  title: 'StackIt',
  description: 'Q&A platform for developers — where bugs meet brains.',
};

// ───────────────────────────────────────── layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
          <SearchProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
          </SearchProvider>
        </Providers>
      </body>
    </html>
  );
}
