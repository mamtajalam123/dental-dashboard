export default function Footer() {
  return (
    <footer
      className="
        fixed
        bottom-0
        left-0
        right-0
        lg:left-[270px]
        z-30
        border-t
        border-slate-200
        bg-white
        px-4
        py-4
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
          justify-between
          gap-3
          text-center
          text-xs
          text-slate-500
          sm:text-sm
          md:flex-row
          md:text-left
        "
      >
        {/* Copyright */}
        <p className="leading-6">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-slate-700">
            Dr. Sultan Dental Care
          </span>
          . All rights reserved.
        </p>

        {/* Right */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span>Version 1.0.0</span>

          <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:block" />

          <span>Made with ❤️</span>
        </div>
      </div>
    </footer>
  );
}