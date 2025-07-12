'use client';

import Link from 'next/link';
import { questions } from '@/lib/data.js';

export default function QuestionsPage() {
  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">All Questions</h1>

      <ul className="space-y-4">
        {questions.map((q) => (
          <li
            key={q.id}
            className="border border-gray-700 rounded-2xl p-5 bg-gray-900 hover:bg-gray-800 transition-colors"
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
