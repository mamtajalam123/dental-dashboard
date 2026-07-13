export default function Loading() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="space-y-3">

          <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200" />

          <div className="h-4 w-80 animate-pulse rounded-lg bg-slate-200" />

        </div>

        <div className="h-12 w-44 animate-pulse rounded-xl bg-slate-200" />

      </div>

      {/* Filters */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-5">

          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />

        </div>

      </div>

      {/* Table Skeleton */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <div className="divide-y">

          {Array.from({ length: 8 }).map((_, index) => (

            <div
              key={index}
              className="grid grid-cols-6 items-center gap-4 p-5"
            >
              <div className="flex items-center gap-3">

                <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />

                <div className="space-y-2">

                  <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

                </div>

              </div>

              <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

              <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />

              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

              <div className="flex justify-end gap-2">

                <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200" />
                <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200" />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}