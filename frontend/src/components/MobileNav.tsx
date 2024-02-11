"use client";

import { signedInNavbarLinks, signedOutNavbarLinks } from "@/constants";
import { fetchUserSession } from "@/lib/fetch-user";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      const response = await fetchUserSession();
      setUser(response.user);
    })();
  }, []);

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-primary"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-30" />
      </div>

      <div className="fixed overflow-y-none overscroll-y-none inset-0 z-40 flex">
        <div className="w-4/5">
          <div className="relative flex w-full h-full max-w-sm flex-col overflow-y-auto bg-background pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6 flex flex-col justify-between h-full">
              {!user ? (
                <>
                  <div className="space-y-12">
                    {signedInNavbarLinks.map((link) => (
                      <div className="flow-root" key={link.label}>
                        <Link
                          onClick={() => closeOnCurrent(link.route)}
                          href={link.route}
                          className="-m-2 block p-2 font-medium text-white text-3xl hover:text-primary transition-all duration-200 ease-in"
                        >
                          {link.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="flow-root border-t border- pt-6">
                    <Link
                      onClick={() => closeOnCurrent("/sign-in")}
                      href="/sign-in"
                      className="-m-2 block p-2 font-medium text-white text-3xl hover:text-primary transition-all duration-200 ease-in"
                    >
                      Log out
                    </Link>
                  </div>
                </>
              ) : (
                <div className="space-y-12">
                  {signedOutNavbarLinks.map((link) => (
                    <div className="flow-root" key={link.label}>
                      <Link
                        onClick={() => closeOnCurrent(link.route)}
                        href={link.route}
                        className="-m-2 block p-2 font-medium text-white text-3xl hover:text-primary transition-all duration-200 ease-in"
                      >
                        {link.label}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
