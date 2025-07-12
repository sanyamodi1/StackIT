'use client';

import { useState } from 'react';
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
  { key: 'new', label: 'Newest' }, // sorts by date (desc)
  { key: 'unanswered', label: 'Unanswered' }, // answers === 0
  { key: 'highVotes', label: '≥ 10 Votes' }, // votes  ≥ 10
  { key: 'highViews', label: '≥ 100 Views' }, // views  ≥ 100
] as const;
type FeatureKey = typeof featureOptions[number]['key'];

export default function Home() {
  // ───────────────────────────────────────── state ──
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
    // …more seed questions
  ]);

  const { term: searchTerm } = useSearch(); // ⬅ search term from context
  const [showAskForm, setShowAskForm] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState<FeatureKey[]>([]);

  // ───────────────────────────────────────── handlers ──
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

  // ───────────────────────────────────────── filtering ──
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

  // ───────────────────────────────────────── render ──
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
          questions={filteredQuestions}
          onVote={handleVote}
          onTagClick={() => {}}
        />
      </div>
    </div>
  );
}
