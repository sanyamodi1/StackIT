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

  if (!question) return <div className="p-6 text-white">Question not found.</div>;

  return (
    <div className="bg-background text-white min-h-screen py-10">
      {/* ── Question Box ── */}
      <div className="border w-full rounded-xl p-6 mb-10 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{question.title}</h1>
        <p className="text-gray-300 text-lg">{question.description}</p>
      </div>

      {/* ── Answers Section ── */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Answers</h2>

        {answers.length === 0 ? (
          <p className="text-gray-500">No answers yet. Be the first to reply!</p>
        ) : (
          <div className="space-y-5">
            {answers.map((ans, idx) => (
              <div
                key={idx}
                className="border-l-4 border-blue-500 pl-4 py-4 rounded-md hover:bg-[#111111] transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-gray-200">{ans}</p>
                    <p className="text-xs text-gray-500 mt-2">Posted just now</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Answer Input ── */}
      <div className="mt-10 border  rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
        <textarea
          className="w-full bg-black text-white p-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a thoughtful response..."
        />
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium px-6 py-2 rounded-lg"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
}
