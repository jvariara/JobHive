import { User } from "@/types/user";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

const UserAccountNav = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <div className="h-12 w-12 bg-gray-200 rounded-full cursor-pointer">
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

        <DropdownMenuItem className="cursor-pointer hover:bg-background/60">
            Log out
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
