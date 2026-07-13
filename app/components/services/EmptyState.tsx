import { SearchX } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = "No Services Found",
  description = "Try changing your search or filters.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="rounded-full bg-slate-100 p-5">
        <SearchX
          size={42}
          className="text-slate-400"
        />
      </div>

      <h3 className="mt-6 text-2xl font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

    </div>
  );
}