import Background from "@/app/components/auth/Background";
import LoginCard from "@/app/components/auth/LoginCard";


export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* Background */}
      <Background />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <LoginCard />
      </div>

    </main>
  );
}