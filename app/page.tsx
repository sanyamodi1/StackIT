'use client';

import { useState, useEffect } from 'react';
import { useSearch } from '@/lib/SearchContext';
import QuestionList from '@/components/QuestionList/QuestionList';
import AskQuestionModal from '@/components/AskQuestionModal/AskQuestionModal';

// ───────────────────────────────────────── types ──
type Question = {
  id: number;
  title: string;
  body: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  author: string;
  createdAt: string; // ISO date
};

// ───────────────────────────────────────── feature tags ──
const featureOptions = [
  { key: 'new', label: 'Newest' },
  { key: 'unanswered', label: 'Unanswered' },
  { key: 'highVotes', label: '≥ 10 Votes' },
  { key: 'highViews', label: '≥ 100 Views' },
] as const;
type FeatureKey = typeof featureOptions[number]['key'];

const QUESTIONS_PER_PAGE = 5;

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: 'How to center a div in CSS?',
      body: "I've tried multiple methods but can't seem to get my div centered properly.",
      votes: 15,
      answers: 3,
      views: 120,
      tags: ['css', 'html', 'frontend'],
      author: 'web_dev42',
      createdAt: '2023-05-15',
    },
    {
      id: 2,
      title: 'What is a closure in JavaScript?',
      body: 'Can someone explain closures in simple terms?',
      votes: 4,
      answers: 0,
      views: 85,
      tags: ['javascript', 'functions'],
      author: 'js_novice',
      createdAt: '2025-07-10',
    },
    {
      id: 3,
      title: 'Difference between var, let and const?',
      body: 'When should I use var over let or const?',
      votes: 12,
      answers: 1,
      views: 210,
      tags: ['javascript', 'es6'],
      author: 'codelearner',
      createdAt: '2025-07-01',
    },
    {
      id: 4,
      title: 'Best way to structure React project?',
      body: 'Looking for folder structure advice.',
      votes: 9,
      answers: 2,
      views: 95,
      tags: ['react', 'project-structure'],
      author: 'react_pro',
      createdAt: '2025-07-08',
    },
    {
      id: 5,
      title: 'What is tailwind and should I use it?',
      body: 'Heard about Tailwind CSS, worth switching from Bootstrap?',
      votes: 11,
      answers: 0,
      views: 130,
      tags: ['tailwindcss', 'css', 'framework'],
      author: 'designer23',
      createdAt: '2025-06-30',
    },
    {
      id: 6,
      title: 'How do Promises work in JS?',
      body: 'Still not clear about promise chaining.',
      votes: 3,
      answers: 0,
      views: 40,
      tags: ['javascript', 'promises'],
      author: 'asyncawait',
      createdAt: '2025-07-09',
    },
  ]);

  const { term: searchTerm } = useSearch();
  const [showAskForm, setShowAskForm] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState<FeatureKey[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFeature = (key: FeatureKey) =>
    setActiveFeatures((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );

  const handleVote = (id: number, dir: 'up' | 'down') =>
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? { ...q, votes: dir === 'up' ? q.votes + 1 : q.votes - 1 }
          : q
      )
    );

  const handleSubmitQuestion = (q: { title: string; body: string; tags: string[] }) => {
    const newQ: Question = {
      id: questions.length + 1,
      ...q,
      votes: 0,
      answers: 0,
      views: 0,
      author: 'current_user',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setQuestions([newQ, ...questions]);
    setShowAskForm(false);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFeatures]);

  const searchFiltered = questions.filter((q) => {
    const term = searchTerm.toLowerCase();
    return (
      q.title.toLowerCase().includes(term) ||
      q.body.toLowerCase().includes(term) ||
      q.tags.some((t) => t.toLowerCase().includes(term))
    );
  });

  const featureFiltered = searchFiltered.filter((q) => {
    let ok = true;
    if (activeFeatures.includes('unanswered')) ok = ok && q.answers === 0;
    if (activeFeatures.includes('highVotes')) ok = ok && q.votes >= 10;
    if (activeFeatures.includes('highViews')) ok = ok && q.views >= 100;
    return ok;
  });

  const filteredQuestions = activeFeatures.includes('new')
    ? [...featureFiltered].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : featureFiltered;

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* heading */}
        <div className="mb-6 flex items-center justify-center">
          <h1 className="flex text-2xl font-bold">
            Welcome to Stack&nbsp;
            <span className="text-[#ff9696]">It</span>&nbsp;— where bugs meet brains.
          </h1>
        </div>

        {/* controls row */}
        <div className="mb-6 flex flex-col gap-4 items-center md:flex-row md:justify-between">
          {/* feature‑tag bar */}
          <div className="flex flex-wrap gap-2">
            {featureOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => toggleFeature(key)}
                className={`rounded-full border px-3 py-1 text-md transition ${
                  activeFeatures.includes(key)
                    ? 'bg-background text-white border-white'
                    : 'bg-white text-gray-800 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Ask Question */}
          <button
            onClick={() => setShowAskForm(true)}
            autoFocus
            className="relative group rounded-full border border-white px-5 py-2 font-medium text-black bg-white transition-all hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span className="absolute inset-0 z-[-1] rounded-full bg-white/10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition" />
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
          questions={paginatedQuestions}
          onVote={handleVote}
          onTagClick={() => {}}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 border rounded ${
                  currentPage === pageNum ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
