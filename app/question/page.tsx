'use client';

import Link from 'next/link';
import { questions } from '@/lib/data.js';

export default function QuestionsPage() {
  return (
    <div className="min-h-screen bg-background text-white px-4 sm:px-6 md:px-8 py-6 w-full">
      <h1 className="text-3xl font-bold mb-4">All Questions</h1>
      <hr className="border-gray-700 mb-6" />

      <ul className="space-y-4">
        {questions.map((q) => (
          <li
            key={q.id}
            className="w-full border border-gray-700 rounded-xl p-5 bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <Link href={`/question/${q.id}`} className="block">
              <h2 className="text-lg font-semibold text-blue-400 hover:text-blue-300 mb-1">
                {q.title}
              </h2>
              <p className="text-sm text-gray-400 line-clamp-2">
                {q.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
