import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Define the shape of the request body
interface CommentRequestBody {
  paragraphId: string;
  comment: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  // Parse the incoming JSON body
  const { paragraphId, comment, timestamp }: CommentRequestBody = await request.json();

  // Generate a unique key for the comment
  const commentKey = `comment:${paragraphId}:${timestamp}`;

  // Access the KV namespace from the environment bindings
  const kv = getRequestContext().env.COMMENTS_KV;

  // Store the comment in KV, including the paragraphId in the data
  await kv.put(commentKey, JSON.stringify({ comment, timestamp, paragraphId }));

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
