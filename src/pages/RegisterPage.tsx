import { register } from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.data.message);
      console.log(data);
      navigate("/auth/login");
    },
    onError(error:any) {
      toast.error(error.response.data.message);
    },
  });
  const registerHandler = () => {
    try {
      const name = nameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (!name || !email || !password) {
        return toast.error("All Fields are required");
      }
      mutation.mutate({ name, email, password });
      console.log("data", { name, email, password });
    } catch (error) {
      console.log("error", error);
      
      toast.error("Failed to login");
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to Create new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="text"
                ref={nameRef}
                placeholder="john doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                ref={emailRef}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" ref={passwordRef} type="password" required />
            </div>
            <Button onClick={registerHandler} type="submit" className="w-full">
              Register
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/login" className="underline">
              Create New Account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
