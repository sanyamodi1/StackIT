'use client';

import { useState, useEffect } from 'react';
import { useSearch } from '@/lib/SearchContext';
import QuestionList from '@/components/QuestionList/QuestionList';
import AskQuestionModal from '@/components/AskQuestionModal/AskQuestionModal';

// ─────────────────────────── types and constants
export type Question = {
  id: string;               // ← UUIDs are strings
  title: string;
  description: string;
  answers: number;
  votes: number;            // upvotes − downvotes
  tags: string[];
  author: string;
  createdAt: string;        // ISO string
};

const featureOptions = [
  { key: 'new',        label: 'Newest' },
  { key: 'unanswered', label: 'Unanswered' },
  { key: 'highVotes',  label: '≥ 10 Votes' },
] as const;

type FeatureKey = (typeof featureOptions)[number]['key'];
const QUESTIONS_PER_PAGE = 5;

// ─────────────────────────── component
export default function ClientHome({
  initialQuestions,
}: {
  initialQuestions: Question[];
}) {
  // ───────── state
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const { term: searchTerm } = useSearch();

  const [showAskForm, setShowAskForm]   = useState(false);
  const [activeFeatures, setActiveFeatures] = useState<FeatureKey[]>([]);
  const [currentPage, setCurrentPage]   = useState(1);

  // ───────── handlers
  const toggleFeature = (key: FeatureKey) =>
    setActiveFeatures((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key],
    );

  const handleVote = (id: string, dir: 'up' | 'down') =>
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, votes: dir === 'up' ? q.votes + 1 : q.votes - 1 }
          : q,
      ),
    );

  const handleSubmitQuestion = (q: {
    title: string;
    description: string;
    tags: string[];
  }) => {
    const newQ: Question = {
      id: crypto.randomUUID(),      // ← generate a UUID string
      ...q,
      votes: 0,
      answers: 0,
      author: 'current_user',
      createdAt: new Date().toISOString(),
    };
    setQuestions((prev) => [newQ, ...prev]);
    setShowAskForm(false);
  };

  // reset to page 1 whenever filters or search change
  useEffect(() => setCurrentPage(1), [searchTerm, activeFeatures]);

  // ───────── searching and filtering
  const searchFiltered = questions.filter((q) => {
    const term = searchTerm.toLowerCase();
    return (
      q.title.toLowerCase().includes(term) ||
      q.description.toLowerCase().includes(term) ||
      q.tags.some((t) => t.toLowerCase().includes(term))
    );
  });

  const featureFiltered = searchFiltered.filter((q) => {
    let ok = true;
    if (activeFeatures.includes('unanswered')) ok &&= q.answers === 0;
    if (activeFeatures.includes('highVotes')) ok &&= q.votes >= 10;
    return ok;
  });

  const sortedQuestions = activeFeatures.includes('new')
    ? [...featureFiltered].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : featureFiltered;

  const totalPages = Math.ceil(sortedQuestions.length / QUESTIONS_PER_PAGE);
  const paginated = sortedQuestions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE,
  );

  // ───────── render
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">
            Welcome to Stack&nbsp;
            <span className="text-[#ff9696]">It</span> — where bugs meet brains.
          </h1>
        </div>

        {/* controls row */}
        <div className="mb-6 flex flex-col gap-4 items-center md:flex-row md:justify-between">
          {/* feature buttons */}
          <div className="flex flex-wrap gap-2">
            {featureOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggleFeature(key)}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  activeFeatures.includes(key)
                    ? 'bg-gray-900 border-white text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ask question */}
          <button
            onClick={() => setShowAskForm(true)}
            className="rounded-full border border-white bg-white px-5 py-2 font-medium text-black transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-white/70"
          >
            Ask Question
          </button>
        </div>

        {/* modal */}
        <AskQuestionModal
          isOpen={showAskForm}
          onClose={() => setShowAskForm(false)}
          onSubmit={handleSubmitQuestion}
        />

        {/* list */}
        <QuestionList
          questions={paginated}
          onVote={handleVote}
          onTagClick={() => {}}
        />

        {/* pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="rounded border px-3 py-1 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`rounded border px-3 py-1 ${
                  currentPage === n
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded border px-3 py-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
