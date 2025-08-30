import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";

import client from "@/api/client";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const { startProcessingAuth, stopProcessingAuth, isProcessingAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    startProcessingAuth();

    if (!email || !password) {
      toast.error("Please fill all the fields");
      stopProcessingAuth();
      return;
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Unable to Login. Please try again.");
        stopProcessingAuth();
        return;
      }

      if (data.user) {
        toast.success("Login Successful!");
        // The onAuthStateChange listener in AuthProvider will handle the redirect and stop the loader.
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isProcessingAuth}
              />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isProcessingAuth}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isProcessingAuth}>
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
