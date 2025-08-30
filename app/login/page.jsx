"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Auth from "@/components/auth/Auth";
import EmoBoardLoader from "@/components/common/EmoBoardLoader";
import Beams from "@/components/Beams/Beams";

export default function LoginPage() {
  const { user, loading, isProcessingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || user || isProcessingAuth) {
    return <EmoBoardLoader />;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Beams */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Beams
          beamWidth={3}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={45}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-white/15 to-white/5 p-8 shadow-2xl backdrop-blur-xl">
          {/* Efek highlight pada sudut */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          <Auth />
        </div>
      </div>
    </div>
  );
}
