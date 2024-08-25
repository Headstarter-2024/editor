import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Define the shape of a comment
interface Comment {
  comment: string;
  timestamp: string;
  paragraphId: string;
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    // Access the KV namespace from the environment bindings
    const kv = getRequestContext().env.COMMENTS_KV as KVNamespace;

    if (!kv) {
      throw new Error("KV namespace not found");
    }

    // List all keys in the KV store (without prefix to get all comments)
    const keys = await kv.list();
    console.log(keys);
    // Retrieve and parse all comment data
    const comments: Comment[] = await Promise.all(
      keys.keys.map(async (key) => {
        const commentData = await kv.get(key.name);
        console.log(commentData);
        const parsedComment = JSON.parse(commentData || "{}");

        // Extract the paragraphId from the key if not already present
        const paragraphId = key.name.split(":")[1]; // Assuming key format `comment:paragraphId:timestamp`

        return {
          ...parsedComment,
          paragraphId, // Add paragraphId to the comment
        };
      }),
    );

    return new Response(JSON.stringify({ comments }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error retrieving all comments from KV:", error);
    return new Response(
      JSON.stringify({ error: "Failed to retrieve comments" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
