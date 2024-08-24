"use client";

import { useEditorStore } from "@/store";
import { useState } from "react";

const ScriptsView: React.FC = () => {
  const addComment = useEditorStore((state) => state.addComment);
  const [activeParagraph, setActiveParagraph] = useState<number | null>(null);

  const handleAddComment = (comment: string) => {
    if (activeParagraph !== null) {
      addComment(activeParagraph, comment);
    }
  };

  return (
    <div className="my-2">
      <p
        className="mb-2 cursor-pointer p-2 hover:bg-gray-100"
        onClick={() => setActiveParagraph(1)}
      >
        Ever wonder how some SaaS products captivate you at first glance?
      </p>
      <p
        className="mb-2 cursor-pointer p-2 hover:bg-gray-100"
        onClick={() => setActiveParagraph(2)}
      >
        It&apos;s all about presentation and clarity in communication...
      </p>
      {/* Add more paragraphs */}

      {activeParagraph !== null && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a comment"
            className="input input-bordered w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value) {
                handleAddComment(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ScriptsView;
