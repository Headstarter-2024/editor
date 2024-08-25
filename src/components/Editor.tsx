"use client";

import { useEditorStore } from "@/store";
import { MessageSquareText, NotebookText, ScanText } from "lucide-react";
import { useEffect, useRef } from "react";
import CommentsView from "./CommentsView";
import ScriptsView from "./ScriptView";
import SummaryView from "./SummaryView";

interface KVComment {
  comment: string;
  timestamp: string;
  paragraphId: string;
}

interface StoreComment {
  text: string;
  timestamp: string;
}

const Editor: React.FC = () => {
  const activeView = useEditorStore((state) => state.activeView);
  const setActiveView = useEditorStore((state) => state.setActiveView);
  const setComments = useEditorStore((state) => state.setComments);

  const initializeAblyClient = useEditorStore(
    (state) => state.initializeAblyClient,
  );
  const subscribeToAbly = useEditorStore((state) => state.subscribeToAbly);

  const isSubscribed = useRef(false);

  useEffect(() => {
    initializeAblyClient().then(() => {
      if (!isSubscribed.current) {
        subscribeToAbly();
        isSubscribed.current = true;
      }
    });
    subscribeToAbly();
  }, [initializeAblyClient, subscribeToAbly]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/retrieve-all");

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        // Define the shape of the expected response
        const data: { comments: KVComment[] } = await response.json();
        console.log(data);

        // Initialize an empty object to group comments by paragraphId
        const formattedComments: { [key: number]: StoreComment[] } = {};

        data.comments.forEach((comment: KVComment) => {
          const paragraphId = parseInt(comment.paragraphId, 10);

          if (!formattedComments[paragraphId]) {
            formattedComments[paragraphId] = [];
          }

          const commentData = {
            text: comment.comment,
            timestamp: comment.timestamp,
          };
          formattedComments[paragraphId].push(commentData);
        });

        // Set the comments in Zustand store
        setComments(formattedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [setComments]);

  return (
    <div className="card mx-auto w-full max-w-4xl bg-gray-50 shadow-xl">
      <h1 className="rounded-t-lg bg-gradient-to-tl from-neutral-300 to-stone-300 p-4 font-bold text-slate-900">
        Roof Sales - Script 1
      </h1>

      <div className="p-4">
        <div className="flex w-fit items-center justify-between rounded-full bg-base-200 p-2">
          <button
            className={`btn btn-sm ${activeView === "scripts" ? "btn-neutral" : "btn-ghost"}`}
            onClick={() => setActiveView("scripts")}
          >
            <NotebookText size={24} />
            Script
          </button>
          <button
            className={`btn btn-sm mx-2 ${activeView === "comments" ? "btn-neutral" : "btn-ghost"}`}
            onClick={() => setActiveView("comments")}
          >
            <MessageSquareText size={24} />
            Comments
          </button>
          <button
            className={`btn btn-sm ${activeView === "summary" ? "btn-neutral" : "btn-ghost"}`}
            onClick={() => setActiveView("summary")}
          >
            <ScanText size={24} />
            Summary
          </button>
        </div>
        <div className="container">
          {activeView === "scripts" && <ScriptsView />}
          {activeView === "comments" && <CommentsView />}
          {activeView === "summary" && <SummaryView />}
        </div>
      </div>
    </div>
  );
};

export default Editor;
