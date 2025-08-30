"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Auth from "@/components/auth/Auth";
import EmoBoardLoader from "@/components/common/EmoBoardLoader";

export default function Home() {
  const { user, loading, isProcessingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user || isProcessingAuth) {
    return <EmoBoardLoader />;
  }

  return (
    <div className="flex flex-grow w-full flex-col items-center justify-center p-4">
      <Auth />
    </div>
  );
}
