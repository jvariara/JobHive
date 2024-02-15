"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Searchbar from "@/components/Searchbar";
import UserItem from "@/components/UserItem";
import { fetchUserSession } from "@/lib/fetch-user";
import { User } from "@/types/user";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetchUserSession();
      if (!response.user) redirect("/sign-in");
      setUser(response.user);
    })();
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="mt-8 px-10 md:px-20 py-6 md:py-8 bg-secondary rounded-lg flex flex-col">
        <div className="flex items-center justify-between w-full mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-secondary-foreground">
            Search
          </h1>
        </div>

        <Searchbar type="search" />
      </div>

      <div aria-hidden="true" className="h-px bg-primary my-6" />

      {/* User items */}
      <div className="flex flex-col gap-y-6 mb-6">
        {user && <UserItem user={user} />}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
