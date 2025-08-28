"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
// import MobileBottomNavbar from "@/components/layout/MobileBottomNavbar";
// import Header from "./components/Header";

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
    <div>
      {/* <Header /> */}
      {children}
      {/* <MobileBottomNavbar /> */}
    </div>
  );
};

export default PrivatePagesLayout;
