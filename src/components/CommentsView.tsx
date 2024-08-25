"use client";

import demoTranscript from "@/data/demo-transcript.json"; // Import the transcript JSON
import { useEditorStore } from "@/store";
import React, { useState } from "react";
import Comment from "./Comment";
import EditCommentModal from "./EditCommentModal";

const CommentsView: React.FC = () => {
  const comments = useEditorStore((state) => state.comments);
  const deleteComment = useEditorStore((state) => state.deleteComment);

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

  const handleDeleteComment = (paragraphId: number, commentIndex: number) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      // Optional confirmation
      deleteComment(paragraphId, commentIndex);
    }
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
                <Comment
                  key={index}
                  paragraphId={parseInt(paragraphId)}
                  commentIndex={index}
                  commentText={comment.text}
                  timestamp={comment.timestamp}
                  onEdit={openEditModal}
                  onDelete={handleDeleteComment}
                />
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
