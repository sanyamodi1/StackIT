// app/question/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { questions } from '@/lib/data';
import { useState } from 'react';

export default function QuestionDetail() {
  const { id } = useParams();
  const question = questions.find((q) => q.id === id);

  const [comment, setComment] = useState('');
  const [answers, setAnswers] = useState(question?.answers || []);

  const handleSubmit = () => {
    if (comment.trim()) {
      setAnswers([...answers, comment]);
      setComment('');
    }
  };

  if (!question) return <div className="p-6">Question not found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
      <p className="mb-4">{question.description}</p>

      <div>
        <h2 className="text-lg font-semibold mb-2">Answers</h2>
        <ul className="list-disc pl-6 mb-4">
          {answers.map((ans, idx) => (
            <li key={idx}>{ans}</li>
          ))}
        </ul>

        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your answer..."
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}