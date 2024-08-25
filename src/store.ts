import { create } from "zustand";
import * as Ably from "ably";
import setupAblyClient from "./utils/setupAblyclient";

interface Comment {
  text: string;
  timestamp: string;
}

// Define the shape of the state
interface EditorState {
  activeView: "summary" | "scripts" | "comments";
  comments: { [key: number]: Comment[] };
  setComments: (comments: { [key: number]: Comment[] }) => void;
  setActiveView: (view: "summary" | "scripts" | "comments") => void;
  addComment: (id: number, comment: string) => void;
  editComment: (
    paragraphId: number,
    commentIndex: number,
    updatedText: string,
  ) => void;
  deleteComment: (paragraphId: number, commentIndex: number) => void;

  ablyClient: Ably.Realtime | null;
  ablyChannel: Ably.RealtimeChannel | null;
  initializeAblyClient: () => Promise<void>;
  subscribeToAbly: () => void;
}

// Create Zustand store with TypeScript support
export const useEditorStore = create<EditorState>((set, get) => ({
  activeView: "scripts",
  comments: {},
  setActiveView: (view) => set({ activeView: view }),

  // Set fetched comments
  setComments: (newComments) => set({ comments: newComments }),

  ablyClient: null, // Initial state for the Ably client
  ablyChannel: null, // Initial state for the Ably channel

  // Initialize ABly client and store it in state
  initializeAblyClient: async () => {
    const { ably, channel } = await setupAblyClient();
    set({ ablyClient: ably, ablyChannel: channel }); // Store the Ably client in state
  },

  // Add Comment and publish to Ably
  addComment: async (paragraphId, comment) => {
    // Create a timestamp
    const timestamp = new Date().toISOString();

    // Update Zustand state
    set((state) => ({
      comments: {
        ...state.comments,
        [paragraphId]: [
          ...(state.comments[paragraphId] || []),
          { text: comment, timestamp },
        ],
      },
    }));

    // Store the comment in KV via Cloudflare Pages API
    try {
      const response = await fetch("/api/add-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paragraphId,
          comment,
          timestamp,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to store comment in KV");
      }

      console.log("Comment successfully stored in KV");
    } catch (error) {
      console.error("Error storing comment in KV:", error);
    }

    // Check for Ably channel
    const ablyChannel = get().ablyChannel;
    if (!ablyChannel) return;

    // Log before publishing
    console.log("Publishing ADD_COMMENT:", { paragraphId, comment, timestamp });

    // Publish to Ably channel
    ablyChannel.publish("ADD_COMMENT", { paragraphId, comment, timestamp });
  },

  // Edit Comment and publish to Ably
  editComment: (paragraphId, commentIndex, updatedText) => {
    const timestamp = new Date().toISOString();

    // Update Zustand state
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

    // Check for Ably channel
    const ablyChannel = get().ablyChannel;
    if (!ablyChannel) return;

    // Publish to Ably channel
    ablyChannel.publish("EDIT_COMMENT", {
      paragraphId,
      commentIndex,
      updatedText,
      timestamp,
    });
  },

  // Delete Comment and publish to Ably
  deleteComment: (paragraphId, commentIndex) => {
    // Update Zustand state
    set((state) => ({
      comments: {
        ...state.comments,
        [paragraphId]: state.comments[paragraphId].filter(
          (_, index) => index !== commentIndex,
        ),
      },
    }));

    // Check for Ably channel
    const ablyChannel = get().ablyChannel;
    if (!ablyChannel) return;

    // Publish to Ably channel
    ablyChannel.publish("DELETE_COMMENT", { paragraphId, commentIndex });
  },

  // Subscribe to Ably to receive real-time updates
  subscribeToAbly: () => {
    // Check for Ably channel
    const ablyChannel = get().ablyChannel;
    const ablyClient = get().ablyClient;

    if (!ablyChannel || !ablyClient) return;

    const clientId = ablyClient.auth.clientId; // Get the clientId of the current client
    console.log("clientId", clientId);

    console.log("Subscribing to Ably channel", ablyClient);

    // Subscribe to ADD_COMMENT
    ablyChannel.subscribe("ADD_COMMENT", (message) => {
      console.log(clientId, message.clientId);
      console.log("message", message);
      if (message.clientId === clientId) {
        console.log("Ignoring self-published message:", message.data);
        return; // Ignore the message
      }

      const { paragraphId, comment, timestamp } = message.data;
      set((state) => ({
        comments: {
          ...state.comments,
          [paragraphId]: [
            ...(state.comments[paragraphId] || []),
            { text: comment, timestamp },
          ],
        },
      }));
    });

    // Subscribe to EDIT_COMMENT
    ablyChannel.subscribe("EDIT_COMMENT", (message) => {
      if (message.clientId === clientId) {
        console.log("Ignoring self-published message:", message.data);
        return; // Ignore the message
      }

      const { paragraphId, commentIndex, updatedText, timestamp } =
        message.data;
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
    });

    // Subscribe to DELETE_COMMENT
    ablyChannel.subscribe("DELETE_COMMENT", (message) => {
      if (message.clientId === clientId) {
        console.log("Ignoring self-published message:", message.data);
        return; // Ignore the message
      }

      const { paragraphId, commentIndex } = message.data;
      set((state) => ({
        comments: {
          ...state.comments,
          [paragraphId]: state.comments[paragraphId].filter(
            (_, index) => index !== commentIndex,
          ),
        },
      }));
    });
  },
}));
