"use client";

import { Button } from "../ui/button";
import client from "@/api/client";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

const GoogleIcon = (props) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Google</title>
    <path
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.55 1.9-3.47 0-6.3-2.89-6.3-6.4s2.83-6.4 6.3-6.4c1.93 0 3.26.74 4.18 1.59l2.48-2.48C18.47 2.44 15.98 1 12.48 1 7.03 1 3 5.03 3 10.5s4.03 9.5 9.48 9.5c2.73 0 4.94-.91 6.57-2.54 1.72-1.72 2.26-4.25 2.26-6.84 0-.57-.05-.92-.12-1.28H12.48z"
      fill="currentColor"
    />
  </svg>
);

const OAuthButtons = () => {
  const { startProcessingAuth, stopProcessingAuth, isProcessingAuth } =
    useAuth();

  const handleGoogleLogin = async () => {
    startProcessingAuth();
    try {
      const { error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
        },
      });

      if (error) {
        toast.error(error.message || "Failed to sign in with Google.");
        stopProcessingAuth();
      }
    } catch (err) {
      toast.error("An unexpected error occurred during Google sign-in.");
      stopProcessingAuth();
    }
  };

  return (
    <>
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full mt-6 flex items-center gap-2"
        onClick={handleGoogleLogin}
        disabled={isProcessingAuth}
      >
        <GoogleIcon className="h-4 w-4" />
        Sign in with Google
      </Button>
    </>
  );
};

export default OAuthButtons;
