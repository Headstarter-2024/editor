"use client";

import { useEditorStore } from "@/store";
import { useRef, useState } from "react";

interface AddCommentModalProps {
  paragraphId: number | null;
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({ paragraphId }) => {
  const [comment, setComment] = useState<string>("");
  const addComment = useEditorStore((state) => state.addComment);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleAddComment = () => {
    if (paragraphId !== null && comment.trim() !== "") {
      addComment(paragraphId, comment);
      setComment("");
      modalRef.current?.close();
    }
  };

  return (
    <dialog id="addCommentModal" ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Add Comment</h3>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here"
          className="textarea textarea-bordered my-4 w-full"
        ></textarea>
        <div className="modal-action">
          <button className="btn" onClick={handleAddComment}>
            Submit
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

export default AddCommentModal;
