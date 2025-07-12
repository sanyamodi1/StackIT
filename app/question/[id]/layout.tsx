// app/question/[id]/layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

export default function QuestionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-gray-200">
      {/* ——— Header ——— */}
      <header className="bg-background border-b border-gray-700 px-6 py-4 flex items-center justify-between shadow-sm">

        <Link
          href="/"
          className="text-sm text-blue-400 hover:white transition-colors duration-200 border border-blue-400 px-3 py-1 rounded-md hover:bg-blue-500 hover:text-white"
        >
          ← All Questions
        </Link>
      </header>

      {/* ——— Main content ——— */}
      <main className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 md:px-8">
        {children}
      </main>
    </div>
  );
}
