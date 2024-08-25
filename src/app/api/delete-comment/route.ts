import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Define the shape of the request body
interface DeleteCommentRequestBody {
  paragraphId: string;
  timestamp: string; // Assuming we use timestamp to identify the comment
}

export async function POST(request: NextRequest) {
  // Parse the incoming JSON body
  const { paragraphId, timestamp }: DeleteCommentRequestBody =
    await request.json();

  // Generate the key for the comment to be deleted
  const commentKey = `comment:${paragraphId}:${timestamp}`;

  // Access the KV namespace from the environment bindings
  const kv = getRequestContext().env.COMMENTS_KV;

  // Delete the comment from KV
  await kv.delete(commentKey);

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
