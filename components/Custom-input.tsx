'use client'

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export default function CustomInput(){
    const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  })

   return <EditorContent editor={editor} />
}