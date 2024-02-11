"use client";
import { signedInNavbarLinks, signedOutNavbarLinks } from "@/constants";
import { fetchUserSession } from "@/lib/fetch-user";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import UserAccountNav from "./UserAccountNav";
import { User } from "@/types/user";

const NavItem = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetchUserSession();
      setUser(response.user);
    })();
  }, [localStorage.getItem('token')]);

  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      {user
        ? signedInNavbarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link
                href={link.route}
                key={link.label}
                className={cn(buttonVariants({ variant: "ghost" }), {
                  "bg-primary text-primary-foreground hover:bg-primary/90":
                    isActive,
                })}
              >
                <p>{link.label}</p>
              </Link>
            );
          })
        : signedOutNavbarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link
                href={link.route}
                key={link.label}
                className={cn(buttonVariants({ variant: "ghost" }), {
                  "bg-primary text-primary-foreground hover:bg-primary/90":
                    isActive,
                })}
              >
                <p>{link.label}</p>
              </Link>
            );
          })}
      {user && <UserAccountNav user={user} />}
    </div>
  );
};

export default NavItem;
