export default function TeamSkeleton() {
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

      {/* Statistics */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {Array.from({ length: 4 }).map((_, index) => (

          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >

            <div className="flex items-center justify-between">

              <div className="space-y-3">

                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

                <div className="h-8 w-14 animate-pulse rounded bg-slate-300" />

              </div>

              <div className="h-14 w-14 animate-pulse rounded-xl bg-slate-200" />

            </div>

          </div>

        ))}

      </div>

      {/* Filters */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">

        <div className="grid gap-4 md:grid-cols-4">

          {Array.from({ length: 4 }).map((_, index) => (

            <div
              key={index}
              className="h-12 animate-pulse rounded-xl bg-slate-200"
            />

          ))}

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        {/* Table Header */}

        <div className="grid grid-cols-6 gap-4 border-b bg-slate-100 p-4">

          {Array.from({ length: 6 }).map((_, index) => (

            <div
              key={index}
              className="h-5 animate-pulse rounded bg-slate-300"
            />

          ))}

        </div>

        {/* Table Rows */}

        {Array.from({ length: 6 }).map((_, row) => (

          <div
            key={row}
            className="grid grid-cols-6 gap-4 border-b p-4"
          >

            {Array.from({ length: 6 }).map((_, col) => (

              <div
                key={col}
                className="h-5 animate-pulse rounded bg-slate-200"
              />

            ))}

          </div>

        ))}

      </div>

    </div>
  );
}