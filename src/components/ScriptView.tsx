"use client";

import { useState } from "react";

import demoTranscript from "@/data/demo-transcript.json";
import { useEditorStore } from "@/store";
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
      {demoTranscript.conversation.map((item, index) => (
        <Paragraph
          key={index}
          speaker={item.speaker}
          message={item.message}
          paragraphId={index}
          onClick={handleOpenModal}
        />
      ))}
      <AddCommentModal paragraphId={activeParagraph} />
    </div>
  );
};

export default ScriptsView;
