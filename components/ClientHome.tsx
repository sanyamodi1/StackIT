'use client';

import { useState } from 'react';
import { useSearch } from '@/lib/SearchContext';
import QuestionList from '@/components/QuestionList/QuestionList';
import AskQuestionModal from '@/components/AskQuestionModal/AskQuestionModal';

type Question = {
  id: number;
  title: string;
  body: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  author: string;
  createdAt: string;
};

type Props = {
  initialQuestions: Question[];
};

export default function ClientHome({ initialQuestions }: Props) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const { term: searchTerm } = useSearch();
  const [showAskForm, setShowAskForm] = useState(false);

  const handleSubmitQuestion = async (q: { title: string; body: string; tags: string[] }) => {
    const res = await fetch('/api/questions', {
      method: 'POST',
      body: JSON.stringify(q),
      headers: { 'Content-Type': 'application/json' }
    });
    const newQ = await res.json();
    setQuestions((prev) => [newQ, ...prev]);
    setShowAskForm(false);
  };

  const handleVote = async (id: number, dir: 'up' | 'down') => {
    const res = await fetch(`/api/questions/${id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ dir }),
      headers: { 'Content-Type': 'application/json' }
    });
    const updated = await res.json();
    setQuestions((prev) => prev.map(q => q.id === id ? updated : q));
  };

  const filteredQuestions = questions; // You can apply filtering logic here if needed

  // ✅ Ensure the JSX below is returned
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Questions</h1>

        <button
          onClick={() => setShowAskForm(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ask Question
        </button>

        <AskQuestionModal
          isOpen={showAskForm}
          onClose={() => setShowAskForm(false)}
          onSubmit={handleSubmitQuestion}
        />

        <QuestionList
          questions={filteredQuestions}
          onVote={handleVote}
          onTagClick={() => {}}
        />
      </div>
    </div>
  );
}
