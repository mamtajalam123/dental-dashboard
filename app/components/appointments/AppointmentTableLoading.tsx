export default function AppointmentTableLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-4 w-72 animate-pulse rounded-lg bg-gray-200" />
        </div>

        <div className="h-12 w-44 animate-pulse rounded-xl bg-gray-200" />
      </div>

      {/* Filter Skeleton */}
      <div className="flex gap-4 rounded-2xl border bg-white p-5">
        <div className="h-12 flex-1 animate-pulse rounded-xl bg-gray-200" />

        <div className="h-12 w-40 animate-pulse rounded-xl bg-gray-200" />

        <div className="h-12 w-40 animate-pulse rounded-xl bg-gray-200" />
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-2xl border bg-white">
        <div className="h-14 bg-gray-100" />

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 border-t p-5"
          >
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="h-5 animate-pulse rounded bg-gray-200"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}