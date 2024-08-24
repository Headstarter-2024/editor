"use client";

import { useEditorStore } from "@/store";

const CommentsView: React.FC = () => {
  const comments = useEditorStore((state) => state.comments);

  return (
    <div className="flex flex-col">
      {Object.entries(comments).map(([paragraphId, commentsList]) => (
        <div key={paragraphId} className="mt-4">
          <h4 className="text-lg font-semibold">
            Comments for Paragraph {paragraphId}
          </h4>
          <ul className="mt-2 list-inside list-disc">
            {commentsList.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CommentsView;
