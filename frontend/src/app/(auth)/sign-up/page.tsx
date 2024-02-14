"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { UserValidator } from "@/lib/validations/user-validator";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({
      email: "",
      username: "",
      password: "",
    });

    if(confirmPassword !== password){
      setErrorMessage("Passwords do not match. Please try again.")
      return
    }

    const userData = { email, username, password };

    try {
      UserValidator.parse(userData);

      // if validation succeeds, submit data to backend
      fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success(
              "Successfully created an account! Sign in now to use JobHive"
            );
            router.push("/sign-in");
          } else {
            // error
            setErrorMessage(data.error);
          }
        })
        .catch((err: any) => {
          throw new Error(err.message);
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Initialize an object to accumulate errors
        const newErrors = { email: "", username: "", password: "" };

        // Iterate over the error.details array
        error.issues.forEach((issue) => {
          // Use the issue.path array to get the field name (e.g., "email", "username", "password")
          const fieldName = issue.path[0];
          // Update the newErrors object with the message for this field
          // Note: This will overwrite any previous message for the field
          // If you want to append errors, you could concatenate strings or use an array
          // @ts-ignore
          newErrors[fieldName] = issue.message;
        });

        // Update the state with the new errors
        setErrors(newErrors);
      } else {
        throw new Error("Error creating an account. Please try again");
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
              Create an account
            </h1>

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

          {errorMessage && (
            <p className="text-red-500 text-center font-semibold text-md">
              {errorMessage}
            </p>
          )}

          {/* Sign Up form */}
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

                {/* Confirm Password */}
                <div className="gap-2 py-2 grid">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder=""
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <Button className="">Create Account</Button>
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
