import { getRandomWord } from "@/data/random-word";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Words from "./words/Words";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["random-word"],
    queryFn: getRandomWord,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Words />
    </HydrationBoundary>
  );
}
