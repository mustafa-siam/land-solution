"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
  Undo2,
  Redo2,
  Quote,
  Pilcrow,
  Grid,
  Plus,
  Minus,
  SplitSquareVertical,
  Trash2,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import React, { JSX, useState } from "react";
import { Toggle } from "../ui/toggle";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  // ✅ Hooks MUST be declared first — before any returns or conditionals
  const [showTableForm, setShowTableForm] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [withHeader, setWithHeader] = useState(true);

  // ✅ You can return after defining hooks
  if (!editor) return null;

  const insertTable = () => {
    if (rows > 0 && cols > 0) {
      editor
        .chain()
        .focus()
        .insertTable({ rows, cols, withHeaderRow: withHeader })
        .run();
      setShowTableForm(false);
    }
  };

const headingOptions: { level: 1 | 2 | 3 | 4 | 5 | 6; icon: JSX.Element }[] = [
  { level: 1, icon: <Heading1 className="size-4" /> },
  { level: 2, icon: <Heading2 className="size-4" /> },
  { level: 3, icon: <Heading3 className="size-4" /> },
  { level: 4, icon: <Heading4 className="size-4" /> },
  { level: 5, icon: <Heading5 className="size-4" /> },
  { level: 6, icon: <Heading6 className="size-4" /> },
];

type MenuOption = {
  icon: JSX.Element;
  onClick: () => void;
  pressed?: boolean; // optional, because some buttons like table toggles don't need it
};


  const options: MenuOption[]  = [
    {
      icon: <Undo2 className="size-4" />,
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo2 className="size-4" />,
      onClick: () => editor.chain().focus().redo().run(),
    },
    ...headingOptions.map(({ level, icon }) => ({
      icon,
      onClick: () =>
        editor.chain().focus().toggleHeading({ level }).run(),
      pressed: editor.isActive("heading", { level }),
    })),
    {
      icon: <Pilcrow className="size-4" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Underline className="size-4" />,
      onClick: () => editor.chain().focus().toggleMark("underline").run(),
      pressed: editor.isActive("underline"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Quote className="size-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("codeBlock"),
    },
    // 🧩 Table tools
    {
      icon: <Grid className="size-4" />,
      onClick: () => setShowTableForm((prev) => !prev),
    },
    {
      icon: <Plus className="size-4" />,
      onClick: () => editor.chain().focus().addRowAfter().run(),
    },
    {
      icon: <Minus className="size-4" />,
      onClick: () => editor.chain().focus().deleteRow().run(),
    },
    {
      icon: <SplitSquareVertical className="size-4" />,
      onClick: () => editor.chain().focus().mergeOrSplit().run(),
    },
    {
      icon: <Trash2 className="size-4 text-red-500" />,
      onClick: () => editor.chain().focus().deleteTable().run(),
    },
  ];

  return (
    <div className="relative border border-b-0 rounded-t-sm p-2 bg-slate-50 flex flex-wrap gap-1">
      {options.map((option, index) => (
        <Toggle
  key={index}
  pressed={!!option.pressed}
  onPressedChange={option.onClick}
>
  <span className="cursor-pointer">{option.icon}</span>
</Toggle>

      ))}

      {/* 🧮 Table Form Popover */}
      {showTableForm && (
        <div className="absolute top-12 left-2 z-50 bg-white border rounded-md shadow-md p-3 w-52">
          <h4 className="text-sm font-medium mb-2">Insert Table</h4>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-600 flex justify-between items-center">
              Rows:
              <input
                type="number"
                min={1}
                value={rows}
                onChange={(e) => setRows(Number(e.target.value) || 1)}
                className="w-16 border rounded px-1 py-0.5 text-sm"
              />
            </label>
            <label className="text-xs text-gray-600 flex justify-between items-center">
              Columns:
              <input
                type="number"
                min={1}
                value={cols}
                onChange={(e) => setCols(Number(e.target.value) || 1)}
                className="w-16 border rounded px-1 py-0.5 text-sm"
              />
            </label>
            <label className="text-xs text-gray-600 flex items-center gap-1">
              <input
                type="checkbox"
                checked={withHeader}
                onChange={(e) => setWithHeader(e.target.checked)}
              />
              Include header row
            </label>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowTableForm(false)}
                className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={insertTable}
                className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
