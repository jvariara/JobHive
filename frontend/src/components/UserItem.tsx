import { User } from "@/types/user";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

interface UserItemProps {
  user: User;
}

const UserItem = ({ user }: UserItemProps) => {
  return (
    <div className="px-8 py-4 bg-secondary rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-x-6">
        {/* TODO: Replace with profile picture */}
        <div className="h-16 w-16 bg-primary rounded-full"></div>
        <div className="flex flex-col items-start gap-y-1">
          <h1 className="text-3xl font-semibold">{user.display_name}</h1>
          <h3 className="text-primary text-base">@{user.username}</h3>
        </div>
      </div>

      <Link href={`/profile/${user.username}`} className={buttonVariants()}>
        View
      </Link>
    </div>
  );
};

export default UserItem;
