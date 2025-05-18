import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  contentClassName?: string;
}

export function Card({
  title,
  className,
  contentClassName,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "border border-solid rounded-md px-4 py-2 border-gray-700 flex flex-col gap-2 items-center",
        className
      )}
      {...props}
    >
      <h6 className="text-sm font-medium">✨{title}✨</h6>

      <div className={contentClassName}>{children}</div>
    </div>
  );
}
