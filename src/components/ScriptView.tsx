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
      <p className="text-sm font-bold opacity-90">Speakers</p>
      <p className="text-xs opacity-75">
        Roof Sales Rep (52.38%), Prospective Customer (47.62%){" "}
      </p>
      <div className="divider m-0"></div>

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
