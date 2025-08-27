import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import Login from "./Login";
import SignUp from "./SignUp";

const Auth = () => {
  return (
    <Tabs defaultValue="login" className="w-[400px] mt-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Login />
      </TabsContent>
      <TabsContent value="signup">
        <SignUp />
      </TabsContent>
    </Tabs>
  );
};

export default Auth;
