"use client";
import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import QuestionList from '@/components/QuestionList/QuestionList';
import SearchBar from '@/components/SearchBar';
import TagList from '@/components/TagList/TagList';
import AskQuestionModal from '@/components/AskQuestionModal/AskQuestionModal';
import CustomInput from '@/components/Custom-input';

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
      createdAt: '2023-05-15'
    },
    // ... other sample questions
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showAskForm, setShowAskForm] = useState(false);

  // Handle voting
  const handleVote = (id: number, direction: 'up' | 'down') => {
    setQuestions(questions.map(q =>
      q.id === id ? {
        ...q,
        votes: direction === 'up' ? q.votes + 1 : q.votes - 1
      } : q
    ));
  };

  // Handle new question submission
const handleSubmitQuestion = (newQuestion: { title: string; body: string; tags: string[] }) => {
  const newQuestionObj: Question = {
    id: questions.length + 1,
    ...newQuestion,
    votes: 0,
    answers: 0,
    views: 0,
    author: 'current_user', // You're adding this default value anyway
    createdAt: new Date().toISOString().split('T')[0]
  };

  setQuestions([newQuestionObj, ...questions]);
  setShowAskForm(false);
};

  // Filter questions based on search and active tag
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTag = activeTag ? question.tags.includes(activeTag) : true;

    return matchesSearch && matchesTag;
  });

  // Get all unique tags for filtering
  const allTags = Array.from(new Set(questions.flatMap(q => q.tags)));

  return (
  <div className="min-h-screen bg-gray-50">
    <Head>
      <title>Dev Overflow - Where Developers Learn & Share</title>
    </Head>

    <Navbar />

    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Questions</h1>
        <button
          onClick={() => setShowAskForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Ask Question
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search questions..."
          />
        </div>
        <TagList
          tags={allTags}
          activeTag={activeTag}
          onTagClick={setActiveTag}
        />
      </div>

      <AskQuestionModal
        isOpen={showAskForm}
        onClose={() => setShowAskForm(false)}
        onSubmit={handleSubmitQuestion}
      />

      <QuestionList
        questions={filteredQuestions}
        onVote={handleVote}
        onTagClick={setActiveTag}
      />
    </div>
  </div>
);

}
