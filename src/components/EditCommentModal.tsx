"use client";

import { useEditorStore } from "@/store";
import { useEffect, useRef, useState } from "react";

interface EditCommentModalProps {
  paragraphId: number | null;
  commentIndex: number | null;
  initialText: string;
}

const EditCommentModal: React.FC<EditCommentModalProps> = ({
  paragraphId,
  commentIndex,
  initialText,
}) => {
  const [commentText, setCommentText] = useState<string>(initialText);
  const editComment = useEditorStore((state) => state.editComment);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setCommentText(initialText); // Update the text when the modal opens
  }, [initialText]);

  const handleEditComment = () => {
    if (
      paragraphId !== null &&
      commentIndex !== null &&
      commentText.trim() !== ""
    ) {
      editComment(paragraphId, commentIndex, commentText);
      modalRef.current?.close();
    }
  };

  return (
    <dialog id="editCommentModal" ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Edit Comment</h3>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Edit your comment"
          className="textarea textarea-bordered my-4 w-full"
        ></textarea>
        <div className="modal-action">
          <button className="btn" onClick={handleEditComment}>
            Save
          </button>
          <button className="btn" onClick={() => modalRef.current?.close()}>
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EditCommentModal;
