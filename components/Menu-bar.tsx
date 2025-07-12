'use client';

import { Toggle } from "@radix-ui/react-toggle";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Smile,
} from "lucide-react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  if (!editor) return null;

  const buttons = [
    {
      icon: <Heading1 className="size-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive('heading', { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive('bold'),
    },
    {
      icon: <Italic className="size-4" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive('italic'),
    },
    {
      icon: <Strikethrough className="size-4" />,
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive('strike'),
    },
    {
      icon: <Highlighter className="size-4" />,
      action: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive('highlight'),
    },
    {
      icon: <AlignLeft className="size-4" />,
      action: () => editor.chain().focus().setTextAlign('left').run(),
      active: editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      action: () => editor.chain().focus().setTextAlign('center').run(),
      active: editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: <AlignRight className="size-4" />,
      action: () => editor.chain().focus().setTextAlign('right').run(),
      active: editor.isActive({ textAlign: 'right' }),
    },
    {
      icon: <List className="size-4" />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered className="size-4" />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive('orderedList'),
    },
  ];

  return (
    <div className="relative z-50">
      <div className="border rounded-md p-2 mb-2 bg-slate-50 flex flex-wrap gap-2">
        {buttons.map((btn, index) => (
          <Toggle
            key={index}
            pressed={btn.active}
            onPressedChange={btn.action}
            className="p-2 rounded hover:bg-slate-100 data-[state=on]:bg-slate-200"
          >
            {btn.icon}
          </Toggle>
        ))}

        {/* Emoji Button with dropdown */}
        <div className="relative">
          <Toggle
            pressed={showEmojiPicker}
            onPressedChange={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded hover:bg-slate-100 data-[state=on]:bg-slate-200"
          >
            <Smile className="size-4" />
          </Toggle>

          {showEmojiPicker && (
            <div className="absolute top-12 z-50">
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  editor.chain().focus().insertContent(emojiData.emoji).run();
                  setShowEmojiPicker(false);
                }}
                lazyLoadEmojis
                width={300}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
