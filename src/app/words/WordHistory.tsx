import { Card } from "../common/Card";

export function WordHistory({ words }: { words: string[] }) {
  return (
    <Card title="Words from previous moments">
      <ul>
        {words.map((word) => (
          <li className="font-bold italic text-sm" key={word}>
            "{word}"
          </li>
        ))}
      </ul>
    </Card>
  );
}
