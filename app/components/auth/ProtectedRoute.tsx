"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setToken, setUser } from "../../store/slices/authSlice";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");

    if (localToken) {
      dispatch(setToken(localToken));

      if (localUser) {
        dispatch(setUser(JSON.parse(localUser)));
      }

      setChecking(false);
      return;
    }

    router.replace("/login");
  }, [dispatch, router]);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!token) return null;

  return <>{children}</>;
}