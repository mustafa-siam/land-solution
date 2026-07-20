// components/ui/keyword-input.tsx
"use client";

import React, { KeyboardEvent } from "react";
import { MdCancel } from "react-icons/md";

interface KeywordInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

const GlobalKeywordInput: React.FC<KeywordInputProps> = ({
  keywords,
  onChange,
}) => {
  const handleAddKeyword = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget.value.trim();
    if (e.key === "Enter" && inputValue && !keywords.includes(inputValue)) {
      e.preventDefault();
      onChange([...keywords, inputValue]);
      e.currentTarget.value = "";
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    onChange(keywords.filter((k) => k !== keyword));
  };

  return (
   <div className="flex flex-wrap items-start border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-900 relative mt-1">
  {keywords?.map((keyword, index) => (
    <div
      key={index}
      className="flex items-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-3 py-1 mr-2 mb-2 rounded"
    >
      {keyword}
      <button
        type="button"
        onClick={() => handleRemoveKeyword(keyword)}
        className="ml-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 cursor-pointer"
      >
        <MdCancel />
      </button>
    </div>
  ))}
  <textarea
    onKeyUp={handleAddKeyword}
    placeholder="Type and press Enter"
    className="flex-grow border-none focus:outline-none px-2 py-1 text-sm text-gray-900 dark:text-gray-200 bg-transparent resize-none"
  />
</div>

  );
};

export default GlobalKeywordInput;
