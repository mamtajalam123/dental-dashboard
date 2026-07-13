import Image from "next/image";
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <div
      className="
        w-full
        rounded-3xl
        bg-white
        p-8
        shadow-2xl
        border
        border-slate-200
      "
    >
      {/* Logo */}
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 shadow-sm">
          <Image
            src="/logo/logo.png"
            alt="Dr Sultan Dental Care"
            width={60}
            height={60}
            priority
          />
        </div>
      </div>

      {/* Heading */}
      <div className="mt-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sign in to access your
          <br />
          Dental Clinic Management System
        </p>
      </div>

      {/* Login Form */}
      <div className="mt-8">
        <LoginForm />
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-slate-200 pt-5 text-center">
        <p className="text-sm text-slate-400">
          © 2026{" "}
          <span className="font-semibold text-slate-600">
            Dr. Sultan Dental Care
          </span>
        </p>
      </div>
    </div>
  );
}