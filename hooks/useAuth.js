import { useContext } from "react";
import { AuthContext } from "@/components/context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!AuthContext) {
    throw new Error("useAuth must be used in AuthProvider");
  }

  return context;
};

export default useAuth;
