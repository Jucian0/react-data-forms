import clsx from "clsx";

type Props = {
  className?: string;
  border?: boolean;
};

export function CodeWindow({
  children,
  className,
  border = true,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden border border-gray-200 shadow dark:border-gray-700 flex h-[31.625rem] max-h-[60vh] sm:max-h-[none] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem] dark:backdrop-blur dark:ring-inset dark:ring-white/10",
        className
      )}
    >
      <div className="relative w-full flex flex-col">
        <div
          className={clsx(
            "flex-none",
            border && "border-b border-gray-200 dark:border-gray-700"
          )}
        >
          <div className="flex items-center h-8 space-x-1.5 px-3">
            <div className="w-2.5 h-2.5 bg-brand rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
          </div>
        </div>
        <div className="relative min-h-0 flex-auto flex flex-col p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
