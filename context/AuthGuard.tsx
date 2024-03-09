"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  return <>{user || loading ? children : null}</>;
};
export default AuthGuard;
