import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";

import client from "@/api/client";

const SignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    const { data, error } = await client.auth.signUp({
      email,
      password,
    });

    if (data) {
      toast.success("Sign Up Successful, Please login now.");
      return;
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Enter Email and Password to Sign Up</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input id="password" type="password"></Input>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
