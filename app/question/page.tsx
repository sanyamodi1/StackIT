// app/question/page.tsx
'use client';

import Link from 'next/link';
import { questions } from '@/lib/data.js';

export default function QuestionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Questions</h1>
      <ul className="space-y-4">
        {questions.map((q) => (
          <li key={q.id} className="border p-4 rounded">
            <Link href={`/question/${q.id}`}>
              <div className="text-xl text-blue-600 hover:underline">{q.title}</div>
            </Link>
            <p className="text-gray-600">{q.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

