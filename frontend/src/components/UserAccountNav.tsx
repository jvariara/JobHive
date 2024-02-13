"use client";
import { User } from "@/types/user";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

const UserAccountNav = ({ user }: { user: User }) => {
  const router = useRouter();
  // @ts-ignore
  const { setLoggedIn } = useUser();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        router.push("/sign-in");
        setLoggedIn(false);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        {/* TODO: replace with profile picture */}
        <div className="cursor-pointer">
          <Image
            src="/default_pfp.jpg"
            alt="profile picture"
            className="object-contain aspect-square object-center rounded-full"
            width={50}
            height={50}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-secondary w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-secondary-foreground">
              {user?.username}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-primary" />

        <DropdownMenuItem asChild className="hover:bg-background/60">
          <Link className="cursor-pointer" href={`/profile/${user?.username}`}>
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer hover:bg-background/60"
          onClick={handleLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
