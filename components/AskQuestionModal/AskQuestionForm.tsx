"use client";
import { useState } from 'react';

type AskQuestionFormProps = {
  onCancel: () => void;
  onSubmit: (question: { title: string; body: string; tags: string[] }) => void;
};

export default function AskQuestionForm({ onCancel, onSubmit }: AskQuestionFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const parsedTags = tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .slice(0, 5);

  const handleSubmit = () => {
    onSubmit({ title, body, tags: parsedTags });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Ask a Question</h2>

      <div className="bg-white border border-gray-200 rounded-xl shadow p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
          <p className="text-xs text-gray-500 mb-2">
            Be specific and imagine you’re asking a question to another person
          </p>
          <input
            type="text"
            placeholder="e.g. How to use React hooks with TypeScript?"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Body</label>
          <p className="text-xs text-gray-500 mb-2">
            Include all the information someone would need to answer your question
          </p>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Describe your question in detail... Markdown is supported."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[160px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tags</label>
          <p className="text-xs text-gray-500 mb-2">Add up to 5 comma-separated tags</p>
          <input
            type="text"
            placeholder="e.g. react, typescript, hooks"
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {parsedTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {parsedTags.map((tag, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title || !body}
            className={`px-5 py-2.5 text-white rounded-lg transition ${
              !title || !body
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Post Question
          </button>
        </div>
      </div>
    </div>
  );
}
