const words = [
  "The",
  "list",
  "of",
  "possible",
  "words",
  "can",
  "be",
  "a",
  "simple",
  "array",
  "defined",
  "within",
  "the",
  "API",
  "route",
  "itself",
];

export function getRandomWord() {
  const randomWordIndex = Math.floor(Math.random() * words.length);

  return { word: words[randomWordIndex] };
}
