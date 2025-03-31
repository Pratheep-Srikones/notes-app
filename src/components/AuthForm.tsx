"use client";

import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition, useState } from "react";
import { Button } from "./ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { loginAction, signUpAction } from "@/actions/user";
import { toastError, toastSuccess } from "@/utils/toast";

type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      toastError("Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toastError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      toastError("Password must be at least 6 characters long.");
      return;
    }
    startTransition(async () => {
      let errorMessage;
      let title;
      let description;

      if (isLoginForm) {
        errorMessage = (await loginAction(email, password))
          .errorMessage as string;
        title = "Logged In";
        description = "You have successfully logged in.";
      } else {
        errorMessage = (await signUpAction(email, password))
          .errorMessage as string;
        title = "Signed Up";
        description = "Check your email to verify your account.";
      }

      if (!errorMessage) {
        toastSuccess(`${title} \n ${description}`);
        if (isLoginForm) {
          router.replace("/");
        }
        if (!isLoginForm) {
          router.replace("/login");
        }
      } else {
        toastError(errorMessage);
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            disabled={isPending}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              disabled={isPending}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isPending}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/signup" : "/login"}
            className={`text-blue-500 underline ${
              isPending ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
