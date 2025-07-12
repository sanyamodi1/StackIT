// app/components/AskQuestionForm.tsx or wherever it's used
'use client'

import { useState } from "react";
import { X } from "lucide-react";
import CustomInput from "../../components/Custom-input"; // ✅ import the Tiptap component

type AskQuestionFormProps = {
  onCancel: () => void;
  onSubmit: (question: { title: string; description: string; tags: string[] }) => void;
};

export default function AskQuestionForm({ onCancel, onSubmit }: AskQuestionFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(""); // for Tiptap HTML
  const [tags, setTags] = useState("");

  const parsedTags = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .slice(0, 5);

const handleSubmit = () => {
  onSubmit({ title, description: body, tags: parsedTags }); // ✅ fix here
};


  return (
    <div className="max-h-[80vh] overflow-y-auto text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Ask a Question</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <p className="text-xs text-gray-400 mb-2">
            Be specific and imagine you’re asking a question to another person.
          </p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to use React hooks with TypeScript?"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-sm font-medium mb-1">Body</label>
          <p className="text-xs text-gray-400 mb-2">
            Include all the information someone would need to answer your question.
          </p>
          <CustomInput value={body} onChange={setBody} /> {/* ✅ used here */}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <p className="text-xs text-gray-400 mb-2">Add up to 5 comma-separated tags.</p>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. react, typescript, hooks"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          {parsedTags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {parsedTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-white text-black text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-white border border-gray-600 rounded-lg hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title || !body}
            className={`px-5 py-2.5 text-black rounded-lg font-semibold transition ${
              !title || !body
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            Post Question
          </button>
        </div>
      </div>
    </div>
  );
}
