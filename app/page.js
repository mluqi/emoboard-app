"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Auth from "@/components/auth/Auth";
import EmoBoardLoader from "@/components/common/EmoBoardLoader";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return <EmoBoardLoader />;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <Auth />
    </main>
  );
}
