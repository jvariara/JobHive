"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const searchParams = useSearchParams();
  // used for redirecting when user signs in but came from somewhere else in the app
  const origin = searchParams.get("origin");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userData = { username, password };

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/sign-in"
      );
      const data = response.data;
      if (data.status === "success") {
        toast.success("Successfully signed in!");
        router.push("/");
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
      } else {
        throw new Error("Error creating account.");
      }
    }
  };

  return (
    <>
      <div className="container relative flex p-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src="/Logo.png"
              alt="JobHive logo"
              height={140}
              width={140}
              className="object-cover aspect-square"
            />

            <h1 className="text-2xl sm:text-3xl font-bold">
              Sign in to your account
            </h1>

            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Don&apos;t have an account? Sign up now! &rarr;
            </Link>
          </div>

          {/* Sign In form */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                {/* Username */}
                <div className="gap-2 py-2 grid">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": errors.username,
                    })}
                    placeholder=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                  />
                </div>

                {/* Password */}
                <div className="gap-2 py-2 grid">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </div>

                <Button className="">Sign In</Button>
              </div>
            </form>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground py-4">
                  or
                </span>
              </div>
            </div>

            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "secondary",
                className: "gap-1.5 grid",
              })}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;