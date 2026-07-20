"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

// ✅ Correct imports for TipTap v3+
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

interface RichTextEditorProps {
  content: string | string[];
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc ml-3" } },
        orderedList: { HTMLAttributes: { class: "list-decimal ml-3" } },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      // ✅ Add table extensions
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border rounded-b-xs py-3 px-3 outline-none overflow-x-auto",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="mt-1">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
