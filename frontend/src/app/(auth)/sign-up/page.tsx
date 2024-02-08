"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const searchParams = useSearchParams();
  // used for redirecting when user signs in but came from somewhere else in the app
  const origin = searchParams.get("origin");

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Image
              src="/Logo.png"
              alt="JobHive logo"
              height={140}
              width={140}
              className="object-cover aspect-square"
            />

            <h1 className="text-2xl font-bold">Create an account</h1>

            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Already have an account? Sign In &rarr;
            </Link>
          </div>

          {/* Sign In form */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                {/* Email */}
                <div className="gap-2 py-2 grid">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

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
                  {errors?.username && (
                    <p className="text-sm text-red-500">{errors.username}</p>
                  )}
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
                  {errors?.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
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
              href="/sign-in"
              className={buttonVariants({
                variant: "secondary",
                className: "gap-1.5 grid",
              })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
