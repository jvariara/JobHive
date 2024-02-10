"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import { signedInNavbarLinks, signedOutNavbarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const user = false;
  const pathname = usePathname();

  return (
    <div className="bg-secondary sticky z-50 top-0 inset-x-0 h-16 shadow-lg">
      <header className="relative bg-secondary">
        <MaxWidthWrapper>
          <div>
            <div className="flex h-16 items-center">
              {/* TODO: MobileNav */}
              <MobileNav />

              <div className="ml-4 flex lg:ml-0 items-center">
                <Link href="/">
                  <Image
                    src="/Logo.png"
                    alt="JobHive logo"
                    height={70}
                    width={70}
                    className="object-cover aspect-square"
                  />
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold ml-2 text-white">
                  Job<span className="text-primary">Hive</span>
                </h1>
              </div>

              {/* Right side of navbar */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {/* if user is logged out, show "sign in" and "create account" items
                        Otherwise show Home, Search, Jobs, and Profile Picture
                  */}
                  {user
                    ? signedInNavbarLinks.map((link) => {
                        const isActive =
                          (pathname.includes(link.route) &&
                            link.route.length > 1) ||
                          pathname === link.route;

                        return (
                          <Link
                            href={link.route}
                            key={link.label}
                            className={cn(
                              buttonVariants({ variant: "ghost" }),
                              {
                                "bg-primary text-primary-foreground hover:bg-primary/90":
                                  isActive,
                              }
                            )}
                          >
                            <p>{link.label}</p>
                          </Link>
                        );
                      })
                    : signedOutNavbarLinks.map((link) => {
                        const isActive =
                          (pathname.includes(link.route) &&
                            link.route.length > 1) ||
                          pathname === link.route;

                        return (
                          <Link
                            href={link.route}
                            key={link.label}
                            className={cn(
                              buttonVariants({ variant: "ghost" }),
                              {
                                "bg-primary text-primary-foreground hover:bg-primary/90":
                                  isActive,
                              }
                            )}
                          >
                            <p>{link.label}</p>
                          </Link>
                        );
                      })}

                  {user && (
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
