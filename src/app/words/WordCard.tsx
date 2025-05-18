import clsx from "clsx";
import { Button } from "../common/Button";

export function WordCard({
  word,
  isRefreshing,
  onRefresh,
}: {
  word?: string;
  isRefreshing?: boolean;
  onRefresh: () => void;
}) {
  return (
    <div className="border border-solid rounded-md px-4 py-2 border-gray-700 flex flex-col gap-2 items-center">
      <h6 className="text-sm font-medium">✨Word of the moment✨</h6>
      <p className="text-2xl font-bold text-center italic">"{word}"</p>
      <Button type="button" onClick={onRefresh} disabled={isRefreshing}>
        <span className={clsx("inline-block", isRefreshing && "animate-spin")}>
          ♻
        </span>{" "}
        {isRefreshing ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  );
}
