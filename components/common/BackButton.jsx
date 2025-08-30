"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ children, ...props }) => {
  const router = useRouter();

  return (
    <Button variant="outline" className={"cursor-pointer border-none shadow-md"} size="sm" onClick={() => router.back()} {...props}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      {children || "Back"}
    </Button>
  );
};

export default BackButton;

