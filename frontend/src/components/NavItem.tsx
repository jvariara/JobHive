"use client";
import { signedInNavbarLinks, signedOutNavbarLinks } from "@/constants";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserAccountNav from "./UserAccountNav";
import { buttonVariants } from "./ui/button";

const NavItem = () => {
  const pathname = usePathname();
  // @ts-ignore
  const { user } = useUser()


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
