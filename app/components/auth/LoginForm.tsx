"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  // Later you'll validate the username/password here

  router.replace("/dashboard");
};

  return (
    <form onSubmit={handleLogin} className="space-y-6">

      {/* Email */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Email Address
        </label>

        <div className="relative">

          <Mail
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="email"
            placeholder="admin@drsultan.com"
            required
            className="
              h-14
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              pl-12
              pr-4
              text-slate-700
              placeholder:text-slate-400
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

        </div>

      </div>

      {/* Password */}

      <div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Password
        </label>

        <div className="relative">

          <Lock
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            className="
              h-14
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              pl-12
              pr-12
              text-slate-700
              placeholder:text-slate-400
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

      </div>

      {/* Remember Me */}

      <div className="flex items-center justify-between">

        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">

          <input
            type="checkbox"
            className="
              h-4
              w-4
              rounded
              border-slate-300
              text-blue-600
              focus:ring-blue-500
            "
          />

          Remember Me

        </label>

      </div>

      {/* Login Button */}

      <button
        type="submit"
        className="
          group
          flex
          h-14
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-blue-500
          text-base
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-xl
        "
      >
        Sign In

        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />

      </button>

    </form>
  );
}