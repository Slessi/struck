"use client";

import { useQuery } from "@tanstack/react-query";

export default function Words() {
  const { data } = useQuery<{ word: string }>({
    queryKey: ["random-word"],
    queryFn: async () => {
      const response = await fetch("/api/random-word");

      return await response.json();
    },
  });

  return <p>{data?.word}</p>;
}
