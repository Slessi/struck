import { getRandomWord } from "@/data/random-word";

export async function GET(request: Request) {
  // a slight, random artificial delay to simulate network conditionss
  const delay = Math.round(Math.random() * 1000 + 500);
  await new Promise((r) => setTimeout(r, delay));

  // 15% chance for errors
  if (Math.random() < 0.15) {
    return Response.json({ error: "Failed to fetch word" }, { status: 500 });
  }

  return Response.json({ delay, word: getRandomWord() });
}
