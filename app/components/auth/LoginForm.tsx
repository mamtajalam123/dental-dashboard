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

import { useAppDispatch } from "../../store/hooks";
import {
  login,
  setLoading,
  setToken,
  setUser,
} from "../../store/slices/authSlice";

import AuthService from "../../services/auth.service";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    try {
      dispatch(setLoading(true));

      const response = await AuthService.login({
        email,
        password,
      });

      console.log("Login Response:", response);

      if (!response.success) {
        setError(response.message);
        return;
      }

// Save Local Storage
localStorage.setItem("token", response.token);

localStorage.setItem(
  "user",
  JSON.stringify(response.user)
);

// Save Redux State
dispatch(setToken(response.token));
dispatch(setUser(response.user));

// Or, if you prefer a single action, use:
// dispatch(login({ user: response.user, token: response.token }));

// Redirect
router.push("/dashboard");

    } catch (error: any) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Login failed."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-6"
    >
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
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
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
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
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
            onClick={() =>
              setShowPassword(!showPassword)
            }
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

      {/* Error Message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300"
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