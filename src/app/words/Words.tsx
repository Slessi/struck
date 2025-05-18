"use client";

import { useQuery } from "@tanstack/react-query";
import { WordCard } from "./WordCard";
import { useState } from "react";

export default function Words() {
  // Maintaining own error state as react-query clears error state on refetch
  const [error, setError] = useState<Error | null>(null);
  const [isAutoRefetchEnabled, setIsAutoRefetchEnabled] = useState(true);

  const { data, isLoading, isFetching, refetch } = useQuery<{
    word: string;
  }>({
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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <WordCard
          word={data?.word}
          isRefreshing={isFetching}
          isAutoRefetchEnabled={isAutoRefetchEnabled}
          onRefresh={refetch}
          onToggleAutoRefetch={() => setIsAutoRefetchEnabled((p) => !p)}
        />

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
