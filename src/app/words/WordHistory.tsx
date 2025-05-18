export function WordHistory({ words }: { words: string[] }) {
  return (
    <div className="border border-solid rounded-md px-4 py-2 border-gray-700 flex flex-col gap-2 items-center">
      <h6 className="text-sm font-medium">✨Words from previous moments✨</h6>

      <ul>
        {words.map((word) => (
          <li className="font-bold italic text-sm" key={word}>
            "{word}"
          </li>
        ))}
      </ul>
    </div>
  );
}
