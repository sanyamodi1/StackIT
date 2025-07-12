'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import Highlight from '@tiptap/extension-highlight';

import { Bold, Italic, Strikethrough, List, ListOrdered } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function CustomInput({ value, onChange, placeholder = 'Write your question details here…' }: Props) {
  const [isReady, setIsReady] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: { class: 'list-disc ml-4' },
        },
        orderedList: {
          HTMLAttributes: { class: 'list-decimal ml-4' },
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Emoji.configure({
        emojis: gitHubEmojis,
        HTMLAttributes: { class: 'emoji' },
      }),
      Highlight.configure({
        HTMLAttributes: { class: 'bg-yellow-300 px-1 rounded-sm' },
      }),
    ],
    autofocus: 'end',
    content: value || '<p></p>',
    onCreate: () => setIsReady(true),
    editorProps: {
      attributes: {
        class:
          'prose prose-invert max-w-none min-h-[140px] focus:outline-none px-3 py-2',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (isReady && editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, isReady, editor]);

  if (!editor) return null;

  const buttonBase =
    'p-1.5 rounded-md hover:bg-gray-700 focus:ring-2 ring-offset-0 ring-white/50 disabled:opacity-40';

  return (
    <div className="relative rounded-lg border border-gray-600 bg-black text-white">
      {/* Toolbar */}
      <div className="flex gap-1 p-2 border-b border-gray-700">
        <button
          className={clsx(buttonBase, editor.isActive('bold') && 'bg-gray-700')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          className={clsx(buttonBase, editor.isActive('italic') && 'bg-gray-700')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          className={clsx(buttonBase, editor.isActive('strike') && 'bg-gray-700')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>
        <span className="mx-2 h-5 w-px bg-gray-600" />
        <button
          className={clsx(buttonBase, editor.isActive('bulletList') && 'bg-gray-700')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          className={clsx(buttonBase, editor.isActive('orderedList') && 'bg-gray-700')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered List"
        >
          <ListOrdered size={16} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Placeholder */}
      {editor.isEmpty && (
        <p
          className="pointer-events-none absolute z-0 p-3 text-gray-500 select-none"
          style={{ top: '46px' }}
        >
          {placeholder}
        </p>
      )}
    </div>
  );
}
