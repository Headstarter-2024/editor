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
  editComment: (
    paragraphId: number,
    commentIndex: number,
    updatedText: string,
  ) => void;
  deleteComment: (paragraphId: number, commentIndex: number) => void;
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
        [paragraphId]: [
          ...(state.comments[paragraphId] || []),
          { text: comment, timestamp },
        ],
      },
    }));
  },
  editComment: (paragraphId, commentIndex, updatedText) => {
    const timestamp = new Date().toISOString();
    set((state) => ({
      comments: {
        ...state.comments,
        [paragraphId]: state.comments[paragraphId].map((comment, index) =>
          index === commentIndex
            ? { ...comment, text: updatedText, timestamp }
            : comment,
        ),
      },
    }));
  },
  deleteComment: (paragraphId, commentIndex) => {
    set((state) => ({
      comments: {
        ...state.comments,
        [paragraphId]: state.comments[paragraphId].filter(
          (_, index) => index !== commentIndex,
        ),
      },
    }));
  },
}));
