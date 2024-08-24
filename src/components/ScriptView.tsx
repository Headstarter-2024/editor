"use client";

import { useEditorStore } from "@/store";
import { useState } from "react";
import AddCommentModal from "./AddCommentModal";

const ScriptsView: React.FC = () => {
  const addComment = useEditorStore((state) => state.addComment);
  const [activeParagraph, setActiveParagraph] = useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setActiveParagraph(id);
    document.getElementById("addCommentModal")?.showModal();
  };

  return (
    <div className="my-2">
      <div className="tooltip tooltip-right" data-tip="Add Comment">
        <p
          className="mb-2 cursor-pointer p-2 hover:bg-gray-100"
          onClick={() => handleOpenModal(1)}
        >
          Ever wonder how some SaaS products captivate you at first glance?
        </p>
      </div>
      <p
        className="mb-2 cursor-pointer p-2 hover:bg-gray-100"
        onClick={() => handleOpenModal(2)}
      >
        It&apos;s all about presentation and clarity in communication...
      </p>
      {/* Add more paragraphs */}

      <AddCommentModal paragraphId={activeParagraph} />
    </div>
  );
};

export default ScriptsView;
