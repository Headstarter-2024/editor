"use client";

import { timeAgo } from "@/utils/timeAgo";
import { Pencil, Trash } from "lucide-react";
import React from "react";

interface CommentProps {
  paragraphId: number;
  commentIndex: number;
  commentText: string;
  timestamp: string;
  onEdit: (
    paragraphId: number,
    commentIndex: number,
    commentText: string,
  ) => void;
  onDelete: (paragraphId: number, commentIndex: number) => void;
}

const Comment: React.FC<CommentProps> = ({
  paragraphId,
  commentIndex,
  commentText,
  timestamp,
  onEdit,
  onDelete,
}) => {
  return (
    <li>
      <div className="my-2 flex flex-row justify-between rounded-lg bg-base-300 p-2 align-bottom">
        <div>
          <div>
            <span className="text-xs font-semibold opacity-75">Manager • </span>
            <time className="text-xs opacity-50">{timeAgo(timestamp)}</time>
          </div>
          <div className="text-sm">{commentText}</div>
        </div>
        <div className="align-bottom">
          <button
            className="btn btn-primary btn-xs ml-4 hover:btn-info"
            onClick={() => onEdit(paragraphId, commentIndex, commentText)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="btn btn-neutral btn-xs ml-2 hover:btn-warning"
            onClick={() => onDelete(paragraphId, commentIndex)}
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Comment;
