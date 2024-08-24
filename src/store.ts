import { create } from "zustand";

interface Comment {
  text: string;
  timestamp: string;
}

// Define the shape of the state
interface EditorState {
  activeView: "summary" | "scripts" | "comments";
  comments: { [key: number]: Comment[] };
  setActiveView: (view: "summary" | "scripts" | "comments") => void;
  addComment: (id: number, comment: string) => void;
}

// Create Zustand store with TypeScript support
export const useEditorStore = create<EditorState>((set) => ({
  activeView: "scripts",
  comments: {},
  setActiveView: (view) => set({ activeView: view }),
  addComment: (paragraphId, comment) => {
      const timestamp = new Date().toISOString(); // Create a timestamp

      set((state) => ({
        comments: {
          ...state.comments,
          [paragraphId]: [...(state.comments[paragraphId] || []), { text: comment, timestamp }],
        },
      }));
    },
}));
