"use client";

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Head from "next/head";

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
  // Sample questions data
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
    {
      id: 2,
      title: 'React useState hook not updating immediately',
      body: "When I call setState, the value doesn't update right away. Why is this happening?",
      votes: 8,
      answers: 2,
      views: 85,
      tags: ['react', 'javascript', 'hooks'],
      author: 'react_lover',
      createdAt: '2023-06-02'
    },
    {
      id: 3,
      title: 'Best practices for API authentication in Next.js',
      body: "I'm building a Next.js app and need to implement secure authentication.",
      votes: 22,
      answers: 5,
      views: 210,
      tags: ['nextjs', 'authentication', 'security'],
      author: 'nextjs_fan',
      createdAt: '2023-06-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showAskForm, setShowAskForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    body: '',
    tags: ''
  });

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
  const handleSubmitQuestion = () => {
    const newQuestionObj: Question = {
      id: questions.length + 1,
      title: newQuestion.title,
      body: newQuestion.body,
      votes: 0,
      answers: 0,
      views: 0,
      tags: newQuestion.tags.split(',').map(tag => tag.trim()),
      author: 'current_user',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setQuestions([newQuestionObj, ...questions]);
    setNewQuestion({ title: '', body: '', tags: '' });
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
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full px-4 py-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button 
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 rounded ${!activeTag ? 'bg-blue-100 text-blue-800' : 'bg-gray-200'}`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`px-3 py-1 rounded ${tag === activeTag ? 'bg-blue-100 text-blue-800' : 'bg-gray-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Ask Question Form Modal */}
        {showAskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="What's your question?"
                    className="w-full px-4 py-2 border rounded"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Body</label>
                  <textarea
                    placeholder="Provide details about your question..."
                    className="w-full px-4 py-2 border rounded min-h-[150px]"
                    value={newQuestion.body}
                    onChange={(e) => setNewQuestion({...newQuestion, body: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Tags</label>
                  <input
                    type="text"
                    placeholder="comma-separated tags (e.g., react, javascript)"
                    className="w-full px-4 py-2 border rounded"
                    value={newQuestion.tags}
                    onChange={(e) => setNewQuestion({...newQuestion, tags: e.target.value})}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => setShowAskForm(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmitQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    disabled={!newQuestion.title || !newQuestion.body}
                  >
                    Post Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No questions found. Be the first to ask!</p>
            </div>
          ) : (
            filteredQuestions.map(question => (
              <div key={question.id} className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex gap-4">
                  {/* Votes and Answers */}
                  <div className="flex flex-col items-center w-20">
                    <div className="text-center">
                      <span className="block text-lg font-medium">{question.votes}</span>
                      <span className="text-xs text-gray-500">votes</span>
                    </div>
                    <div className="text-center mt-2">
                      <span className="block text-lg font-medium">{question.answers}</span>
                      <span className="text-xs text-gray-500">answers</span>
                    </div>
                    <div className="text-center mt-2">
                      <span className="block text-sm">{question.views} views</span>
                    </div>
                  </div>
                  
                  {/* Question Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 mb-1">
                      <a href={`/questions/${question.id}`}>{question.title}</a>
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{question.body}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {question.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                          onClick={() => setActiveTag(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Meta */}
                    <div className="flex justify-end text-xs text-gray-500">
                      <span>Asked by {question.author} on {question.createdAt}</span>
                    </div>
                  </div>
                  
                  {/* Vote Buttons */}
                  <div className="flex flex-col items-center">
                    <button 
                      onClick={() => handleVote(question.id, 'up')}
                      className="p-1 text-gray-500 hover:text-green-500"
                    >
                      ▲
                    </button>
                    <button 
                      onClick={() => handleVote(question.id, 'down')}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}