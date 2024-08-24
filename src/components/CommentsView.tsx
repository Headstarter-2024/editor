"use client";

import demoTranscript from '@/data/demo-transcript.json'; // Import the transcript JSON
import { useEditorStore } from "@/store";
import { timeAgo } from "@/utils/timeAgo";

const CommentsView: React.FC = () => {
  const comments = useEditorStore((state) => state.comments);
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
                        <span className='text-xs font-semibold opacity-75'> Manager • </span>
                        <time className="text-xs opacity-50">{timeAgo(comment.timestamp)}</time>
                      </div>
                      <div className="text-sm">
                        {comment.text }
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
};

export default CommentsView;
