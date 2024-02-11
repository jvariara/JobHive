"use client";
import { signedInNavbarLinks, signedOutNavbarLinks } from "@/constants";
import { fetchUserSession } from "@/lib/fetch-user";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";

const NavItem = () => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetchUserSession();
      setUser(response.user);
    })();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
      {user && <div className="h-12 w-12 bg-gray-200 rounded-full"></div>}
    </div>
  );
};

export default NavItem;
