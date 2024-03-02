"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const searchParams = useSearchParams();
  // used for redirecting when user signs in but came from somewhere else in the app
  const origin = searchParams.get("origin");

  // @ts-ignore
  const { user } = useUser();

  if(user) {
    if(origin){
      // send them back to where they were
      router.push(`/${origin}`)
      return
    }
    router.push("/")
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userData = { username, password };

    try {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success("Successfully logged in!");
            router.push(origin || "/");
          } else {
            setErrorMessage(data.error || "An error occurred during login.");
          }
        })
        .catch((err: any) => {
          throw new Error(err.message);
        });
    } catch (error) {
      throw new Error("Error signing in. Please try again.");
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

          {errorMessage && (
            <p className="text-red-500 text-center font-semibold text-md">
              {errorMessage}
            </p>
          )}

          {/* Sign In form */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                {/* Username */}
                <div className="gap-2 py-2 grid">
                  <Label htmlFor="username">Username</Label>
                  <Input
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
