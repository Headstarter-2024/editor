import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

// Define the shape of the request body
interface EditCommentRequestBody {
  paragraphId: string;
  comment: string;
  originalTimestamp: string;
}

export async function POST(request: NextRequest) {
  const { paragraphId, comment, originalTimestamp }: EditCommentRequestBody =
    await request.json();

  const kv = getRequestContext().env.COMMENTS_KV;

  // Generate the key for the original comment
  const originalCommentKey = `comment:${paragraphId}:${originalTimestamp}`;

  // Delete the old comment
  await kv.delete(originalCommentKey);

  // Generate a new timestamp for the edited comment
  const newTimestamp = new Date().toISOString();
  const newCommentKey = `comment:${paragraphId}:${newTimestamp}`;

  // Store the edited comment in KV with the new timestamp
  await kv.put(
    newCommentKey,
    JSON.stringify({ comment, timestamp: newTimestamp, paragraphId }),
  );

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
