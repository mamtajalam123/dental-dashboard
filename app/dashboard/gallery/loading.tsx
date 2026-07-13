
export default function Loading() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="space-y-3">

          <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />

          <div className="h-4 w-80 animate-pulse rounded-lg bg-slate-200" />

        </div>

        <div className="h-12 w-44 animate-pulse rounded-xl bg-slate-200" />

      </div>

      {/* Filters */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-4">

          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />

          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />

          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />

          <div className="h-12 animate-pulse rounded-xl bg-slate-200" />

        </div>

      </div>

      {/* Gallery Grid */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {Array.from({ length: 8 }).map((_, index) => (

          <div
            key={index}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm"
          >

            <div className="h-60 animate-pulse bg-slate-200" />

            <div className="space-y-3 p-5">

              <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />

              <div className="h-9 w-full animate-pulse rounded-lg bg-slate-200" />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}