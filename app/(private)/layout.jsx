"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import MobileBottomNavbar from "@/components/layout/MobileBottomNavbar";
import Header from "./components/Header";

import useAuth from "@/hooks/useAuth";

const PrivatePagesLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <MobileBottomNavbar />
    </div>
  );
};

export default PrivatePagesLayout;
