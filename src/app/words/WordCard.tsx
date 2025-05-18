import clsx from "clsx";
import { Button } from "../common/Button";

export function WordCard({
  word,
  isRefreshing,
  isAutoRefetchEnabled,
  onRefresh,
  onToggleAutoRefetch,
}: {
  word?: string;
  isAutoRefetchEnabled?: boolean;
  isRefreshing?: boolean;
  onRefresh: () => void;
  onToggleAutoRefetch: () => void;
}) {
  return (
    <div className="border border-solid rounded-md px-4 py-2 border-gray-700 flex flex-col gap-2 items-center">
      <h6 className="text-sm font-medium">✨Word of the moment✨</h6>
      <p className="text-2xl font-bold text-center italic">"{word}"</p>

      <div className="flex gap-2">
        <Button type="button" onClick={onRefresh} disabled={isRefreshing}>
          <span
            className={clsx("inline-block", isRefreshing && "animate-spin")}
          >
            ♻
          </span>{" "}
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isAutoRefetchEnabled}
            onChange={onToggleAutoRefetch}
          />
          Auto-refetch
        </label>
      </div>
    </div>
  );
}
