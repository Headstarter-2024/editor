"use client";

import { useEditorStore } from "@/store";
import { useState } from "react";
import AddCommentModal from "./AddCommentModal";
import Paragraph from "./Paragraph";

const ScriptsView: React.FC = () => {
  const addComment = useEditorStore((state) => state.addComment);
  const [activeParagraph, setActiveParagraph] = useState<number | null>(null);

  const handleOpenModal = (id: number) => {
    setActiveParagraph(id);
    const modal = document.getElementById(
      "addCommentModal",
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div className="my-2">
      <Paragraph
        text="Ever wonder how some SaaS products captivate you at first glance?"
        paragraphId={1}
        onClick={handleOpenModal}
      />
      <Paragraph
        text=" It's all about presentation and clarity in communication..."
        paragraphId={2}
        onClick={handleOpenModal}
      />
      <AddCommentModal paragraphId={activeParagraph} />
    </div>
  );
};

export default ScriptsView;
