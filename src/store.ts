import { create } from "zustand";

// Define the shape of the state
interface EditorState {
  activeView: "summary" | "scripts" | "comments";
  comments: { [key: number]: string[] };
  setActiveView: (view: "summary" | "scripts" | "comments") => void;
  addComment: (id: number, comment: string) => void;
}

// Create Zustand store with TypeScript support
export const useEditorStore = create<EditorState>((set) => ({
  activeView: "scripts",
  comments: {},
  setActiveView: (view) => set({ activeView: view }),
  addComment: (id, comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [id]: [...(state.comments[id] || []), comment],
      },
    })),
}));
