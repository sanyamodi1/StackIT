'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { Bold, Italic, Strikethrough, List, ListOrdered, Underline as UIcon } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function CustomInput({ value, onChange, placeholder = '' }: Props) {
  const [isReady, setIsReady] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: 'end',
    content: value || '<p></p>',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose prose-invert max-w-none min-h-[140px] focus:outline-none',
      },
    },
    onCreate: () => setIsReady(true),
  });

  // sync external value → editor only *after* the first mount
  useEffect(() => {
    if (isReady && editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, isReady, editor]);

  if (!editor) return null;

  const buttonBase =
    'p-1.5 rounded-md hover:bg-gray-700 focus:ring-2 ring-offset-0 ring-white/50 disabled:opacity-40';

  return (
    <div className="rounded-lg border border-gray-600 bg-black text-white">
      {/* Toolbar */}
      <div className="flex gap-1 p-2 border-b border-gray-700">
        <button
          className={clsx(buttonBase, editor.isActive('bold') && 'bg-gray-700')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </button>
        <button
          className={clsx(buttonBase, editor.isActive('italic') && 'bg-gray-700')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </button>
        <button
          className={clsx(buttonBase, editor.isActive('strike') && 'bg-gray-700')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strikethrough (Ctrl+Shift+S)"
        >
          <Strikethrough size={16} />
        </button>
        <span className="mx-2 h-5 w-px bg-gray-600" />
        <button
          className={clsx(buttonBase, editor.isActive('bulletList') && 'bg-gray-700')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bulleted list (Ctrl+Shift+8)"
        >
          <List size={16} />
        </button>
        <button
          className={clsx(buttonBase, editor.isActive('orderedList') && 'bg-gray-700')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Numbered list (Ctrl+Shift+7)"
        >
          <ListOrdered size={16} />
        </button>
      </div>

      {/* Editable area */}
      <EditorContent editor={editor} />

     
    </div>
  );
}
