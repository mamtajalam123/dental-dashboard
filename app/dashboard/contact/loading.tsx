export default function Loading() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="space-y-3">

          <div className="h-8 w-72 animate-pulse rounded-lg bg-slate-200" />

          <div className="h-4 w-96 animate-pulse rounded-lg bg-slate-200" />

        </div>

        <div className="h-12 w-44 animate-pulse rounded-xl bg-slate-200" />

      </div>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-4">

        {Array.from({ length: 4 }).map((_, index) => (

          <div
            key={index}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >

            <div className="h-8 w-8 animate-pulse rounded bg-slate-200" />

            <div className="mt-5 h-8 w-20 animate-pulse rounded bg-slate-200" />

            <div className="mt-3 h-4 w-32 animate-pulse rounded bg-slate-200" />

          </div>

        ))}

      </div>

      {/* Filters */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-4">

          {Array.from({ length: 4 }).map((_, index) => (

            <div
              key={index}
              className="h-12 animate-pulse rounded-xl bg-slate-200"
            />

          ))}

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <div className="divide-y">

          {Array.from({ length: 8 }).map((_, index) => (

            <div
              key={index}
              className="grid grid-cols-7 items-center gap-4 p-5"
            >

              <div className="space-y-2">

                <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

              </div>

              <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

              <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />

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