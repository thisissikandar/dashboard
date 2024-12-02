import { login } from "@/api/axios";
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
import { setToken } from "@/store/features/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.data.message);
      console.log(data);
      const token = {
        accessToken: data.data.data.accessToken,
        refreshToken: data.data.data.refreshToken,
      };
      dispatch(setToken(token));
      navigate("/");
    },
  });
  const loginHandler = () => {
    try {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (!email || !password) {
        return toast.error("email and password are required");
      }
      mutation.mutate({ email, password });
      console.log("data", { email, password });
    } catch (error) {
      toast.error("Failed to login");
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
            <Button
              type="submit"
              onClick={loginHandler}
              className="w-full "
              disabled={mutation.isPending}
            >
              {mutation.isPending && <LoaderCircle className="animate-spin" />}
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Create New Account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
