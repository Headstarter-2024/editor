"use client";

import demoTranscript from "@/data/demo-transcript.json"; // Import the transcript JSON
import { useEditorStore } from "@/store";
import { timeAgo } from "@/utils/timeAgo";
import React, { useState } from "react";
import EditCommentModal from "./EditCommentModal";

const CommentsView: React.FC = () => {
  const comments = useEditorStore((state) => state.comments);

  // Track the paragraphId and commentIndex for the comment being edited
  const [editingComment, setEditingComment] = useState<{
    paragraphId: number | null;
    commentIndex: number | null;
  }>({
    paragraphId: null,
    commentIndex: null,
  });
  const [initialText, setInitialText] = useState<string>("");

  const openEditModal = (
    paragraphId: number,
    commentIndex: number,
    currentText: string,
  ) => {
    setEditingComment({ paragraphId, commentIndex });
    setInitialText(currentText);
    const modal = document.getElementById(
      "editCommentModal",
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <div className="flex flex-col">
      {Object.entries(comments).map(([paragraphId, commentsList]) => {
        const paragraphIndex = parseInt(paragraphId, 10);
        const paragraphData = demoTranscript.conversation[paragraphIndex];

        return (
          <div key={paragraphId} className="mt-4">
            <h4 className="text-sm font-semibold">
              Paragraph {paragraphId} ({paragraphData?.speaker}):
            </h4>
            <p className="mb-2 text-base italic">{paragraphData?.message}</p>

            <ul className="mt-2 list-inside">
              {commentsList.map((comment, index) => (
                <li key={index}>
                  <div className="rounded-lg bg-base-300 p-2">
                    <div className="">
                      <span className="text-xs font-semibold opacity-75">
                        Manager •{" "}
                      </span>
                      <time className="text-xs opacity-50">
                        {timeAgo(comment.timestamp)}
                      </time>
                    </div>
                    <div className="text-sm">{comment.text}</div>
                    <button
                      className="btn btn-secondary btn-xs ml-4"
                      onClick={() =>
                        openEditModal(
                          parseInt(paragraphId),
                          index,
                          comment.text,
                        )
                      }
                    >
                      Edit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {/* Edit Comment Modal */}
      <EditCommentModal
        paragraphId={editingComment.paragraphId}
        commentIndex={editingComment.commentIndex}
        initialText={initialText}
      />
    </div>
  );
};

export default CommentsView;
