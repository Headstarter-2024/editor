// pages/api/summarize.ts

import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

// Define types for your conversation data
interface Message {
  role: string;
  content: string;
}

const openai = new OpenAI();

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  try {
    // Read the JSON file
    const filePath = path.join(
      process.cwd(),
      "src/data",
      "demo-transcript.json",
    );
    const conversationData = await fs.readFile(filePath, "utf-8");
    const conversation = JSON.stringify(JSON.parse(conversationData));
  


    // Call OpenAI API for summarization
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            You are an AI assistant specialized in summarizing conversations. Your task is to read and analyze a conversation provided in JSON format, then produce a concise yet comprehensive summary.

            The JSON input will contain an array of message objects. Each message object has two key-value pairs:
            1. "speaker": A string indicating who is speaking (e.g., "user1", "user2")
            2. "content": A string containing the actual message

            Your summary should:
            1. Capture the main topics discussed
            2. Highlight key points or decisions made
            3. Note any significant agreements or disagreements
            4. Mention any action items or next steps, if applicable
            5. Be concise, ideally no more than 3-4 sentences

            Maintain a neutral tone and avoid inserting personal opinions. Focus on accurately representing the content and flow of the conversation.

            After analyzing the JSON input, provide your summary in plain text format.

            Example input format:
            [
              {"speaker": "user1", "content": "Hello, how are you?"},
              {"speaker": "user2", "content": "I'm good, thanks. Shall we discuss the project?"},
              {"speaker": "user1", "content": "Yes, let's start with the timeline."}
            ]

            Remember, your task is to summarize the actual conversation provided, not the example above. Prepare to receive and analyze the JSON input, then generate an appropriate summary. Good luck!

            `,
        },
        {
          role: "user",
          content: conversation,
        },
      ],
    });

    const summary = response.choices[0].message;
    console.log("Summary:", summary);
    return NextResponse.json(summary);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while summarizing the conversation",
      });
  }
}
