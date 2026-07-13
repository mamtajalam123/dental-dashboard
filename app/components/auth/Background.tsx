export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50">

      {/* Top Right Circle */}
      <div
        className="
          absolute
          -top-32
          -right-32
          h-96
          w-96
          rounded-full
          bg-blue-100
          blur-3xl
          opacity-70
        "
      />

      {/* Bottom Left Circle */}
      <div
        className="
          absolute
          -bottom-40
          -left-40
          h-[420px]
          w-[420px]
          rounded-full
          bg-sky-100
          blur-3xl
          opacity-70
        "
      />

      {/* Small Circle */}
      <div
        className="
          absolute
          top-20
          left-24
          h-32
          w-32
          rounded-full
          bg-cyan-100
          blur-2xl
          opacity-70
        "
      />

      {/* Right Small Circle */}
      <div
        className="
          absolute
          bottom-32
          right-24
          h-40
          w-40
          rounded-full
          bg-indigo-100
          blur-3xl
          opacity-70
        "
      />

      {/* Decorative Grid */}
      <div className="absolute left-20 top-32 grid grid-cols-5 gap-3 opacity-20">
        {Array.from({ length: 25 }).map((_, index) => (
          <span
            key={index}
            className="h-2 w-2 rounded-full bg-blue-500"
          />
        ))}
      </div>

      {/* Decorative Grid */}
      <div className="absolute bottom-24 right-20 grid grid-cols-5 gap-3 opacity-20">
        {Array.from({ length: 25 }).map((_, index) => (
          <span
            key={index}
            className="h-2 w-2 rounded-full bg-sky-500"
          />
        ))}
      </div>

      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-white" />
    </div>
  );
}