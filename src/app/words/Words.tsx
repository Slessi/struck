"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WordCard } from "./WordCard";
import { WordHistory } from "./WordHistory";

export default function Words() {
  // Maintaining own error state as react-query clears error state on refetch
  const [error, setError] = useState<Error | null>(null);
  const [isAutoRefetchEnabled, setIsAutoRefetchEnabled] = useState(true);

  const { data, isLoading, isFetching, refetch } = useQuery<{
    word: string;
  }>({
    // Assignment references cacheTime, but its been renamed to gcTime
    gcTime: 10_000, // Remove query from cache after 10 seconds of no query being mounted
    staleTime: 1_000, // Mark data as stale after 1 second
    queryKey: ["random-word"],
    refetchInterval: isAutoRefetchEnabled ? 10_000 : false,
    refetchIntervalInBackground: true,
    queryFn: async () => {
      const response = await fetch("/api/random-word");

      try {
        const data = (await response.json()) as
          | { word: string }
          | { error: string };

        if ("error" in data) {
          throw new Error(data.error);
        }

        setError(null);
        setWordHistory((p) => [...new Set([data.word, ...p])].slice(0, 5));

        return data;
      } catch (error) {
        throw new Error(`Invalid server response: ${error}`);
      }
    },
    retry(failureCount, error) {
      setError(error);

      return true;
    },
  });

  const [wordHistory, setWordHistory] = useState<string[]>(
    [data?.word].filter((s) => typeof s === "string")
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <div className="flex gap-8">
          <WordCard
            word={data?.word}
            isRefreshing={isFetching}
            isAutoRefetchEnabled={isAutoRefetchEnabled}
            onRefresh={refetch}
            onToggleAutoRefetch={() => setIsAutoRefetchEnabled((p) => !p)}
          />

          <WordHistory
            // Excluding the first word as it's the current word
            words={wordHistory.slice(1)}
          />
        </div>

        {/* This will never show as I prefetch the word, but leaving here for reference */}
        {isLoading && <p className="text-sm">Loading first word...</p>}

        {error && (
          <p className="text-red-500 text-sm">
            Could not fetch a new word. Retrying...
          </p>
        )}
      </main>
    </div>
  );
}
