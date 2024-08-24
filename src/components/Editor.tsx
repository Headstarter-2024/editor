"use client";

import { useEditorStore } from "@/store";
import { MessageSquareText, NotebookText, ScanText } from "lucide-react";
import ScriptsView from "./ScriptView";

const Editor: React.FC = () => {
  const activeView = useEditorStore((state) => state.activeView);
  const setActiveView = useEditorStore((state) => state.setActiveView);

  return (
    <div className="card w-full bg-gray-50 p-4 shadow-xl">
      <h1 className="text-slate-900">Script 1</h1>
      <div className="mt-4 flex w-fit items-center justify-between rounded-full bg-base-200 p-2">
        <button
          className={`btn ${activeView === "scripts" ? "btn-neutral" : ""}`}
          onClick={() => setActiveView("scripts")}
        >
          <NotebookText size={24} />
          Script
        </button>
        <button
          className={`btn mx-2 ${activeView === "summary" ? "btn-neutral" : ""}`}
          onClick={() => setActiveView("summary")}
        >
          <ScanText size={24} />
          Summary
        </button>
        <button
          className={`btn ${activeView === "comments" ? "btn-neutral" : ""}`}
          onClick={() => setActiveView("comments")}
        >
          <MessageSquareText size={24} />
          Comments
        </button>
      </div>
      <div className="container">
        <ScriptsView />
      </div>
    </div>
  );
};

export default Editor;
