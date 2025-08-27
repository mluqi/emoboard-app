import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import Login from "./Login";
import SignUp from "./SignUp";
import Image from "next/image";

const Auth = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="EmoBoard Logo" width={40} height={40} />
        <h1 className="flex space-x-2">
          <span className="font-bold text-2xl text-primary text-center sm:text-left">
            Emo<span className="text-gray-400">Board</span>
          </span>
        </h1>
      </div>
      <p className="text-muted-foreground max-w-sm">
        Welcome back! Log in or create an account to share your thoughts.
      </p>
      <Tabs defaultValue="login" className="w-[350px] sm:w-[400px] mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="mt-4">
          <Login />
        </TabsContent>
        <TabsContent value="signup" className="mt-4">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
