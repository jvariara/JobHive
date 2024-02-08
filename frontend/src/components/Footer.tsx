"use client";

import { usePathname } from "next/navigation";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import { signedInNavbarLinks, signedOutNavbarLinks } from "@/constants";

const Footer = () => {
  const pathname = usePathname();

  const user = false;

  const pathsToMinimize = ["/sign-up", "/sign-in"];

  return (
    <footer className="bg-secondary flex-grow-0">
      <MaxWidthWrapper>
        <div className="border-t border-primary/80">
          {pathsToMinimize.includes(pathname) && (
            <div className="pb-8 pt-16">
              <div className="flex justify-center">
                <Image
                  src="/Logo.png"
                  alt="JobHive logo"
                  height={140}
                  width={140}
                  className="object-cover aspect-square"
                />
              </div>
            </div>
          )}

          {pathsToMinimize.includes(pathname) && (
            <div>
              <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div
                    className="absolute bg-background inset-0 bg-gradient-to-br bg-opacity-90"
                    aria-hidden="true"
                  />
                </div>

                <div className="text-center relative mx-auto max-w-sm">
                  <h3 className="font-semibold text-primary">Secure a job</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    If you&apos;d like to find a job and meet others with
                    similar interests, you can do so in minutes!{" "}
                    <Link
                      href="/sign-in"
                      className="whitespace-nowrap font-medium text-primary hover:text-primary/80"
                    >
                      Get started &rarr;
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="py-10 md:flex md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              {user
                ? signedInNavbarLinks.map((link) => (
                    <Link
                      href={link.route}
                      className="text-sm text-muted-foreground hover:text-gray-900"
                      key={link.label}
                    >
                      {link.label}
                    </Link>
                  ))
                : signedOutNavbarLinks.map((link) => (
                    <Link
                      href={link.route}
                      className="text-sm text-muted-foreground hover:text-gray-900"
                      key={link.label}
                    >
                      {link.label}
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
