import clsx from "clsx";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

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
    <Card title="Word of the moment" contentClassName="flex flex-col gap-2">
      <p className="text-2xl font-bold text-center italic">&quot;{word}&quot;</p>

      <div className="flex flex-col sm:flex-row gap-2">
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
    </Card>
  );
}
