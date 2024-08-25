// TODO: we'll have to get state and send to an AI model.
"use client";
import { useEffect, useState } from "react";

interface OpenAIResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

const SummaryView: React.FC = () => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSummary = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/edge-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();

      // Assuming the summary is in the 'choices[0].message.content' field
      const generatedSummary =
        data.choices[0]?.message?.content || "No summary available";

      setSummary(generatedSummary); // Set the summary in state
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch summary from API
    fetchSummary();
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-[20px]">
      <p className="ml-2 font-bold">Here is a summary of your transcript:</p>
      <div className="flex rounded-xl bg-base-200 p-6 shadow-md">
        {isLoading ? (
          <div className="animate-pulse-slow">Generating...</div>
        ) : (
          summary
        )}
      </div>
    </div>
  );
};

export default SummaryView;
